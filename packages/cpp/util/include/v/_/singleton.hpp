#pragma once
#include <v/_/_>

#include "v/_/storage.forward.hpp"

#include "v/atomic"
#include "v/concepts/constexpr-constructible"
#include "v/concepts/options"
#include "v/mutex"
#include "v/object"
#include "v/option/custom-template"
#include "v/option/input-options"
#include "v/option/item"
#include "v/option/lazy"
#include "v/option/thread-local"
#include "v/options"
#include "v/size"

#include <atomic>
#include <type_traits>

#ifndef VOLTISO_DEBUG_SINGLETON
	#define VOLTISO_DEBUG_SINGLETON VOLTISO_DEBUG
#endif

#if VOLTISO_DEBUG_SINGLETON
	#include "v/demangle"
	#include <iostream>
#endif

#include <v/ON>

namespace VOLTISO_NAMESPACE::singleton {
template <class Options>
  requires concepts::Options<Options>
class Custom;
}

namespace VOLTISO_NAMESPACE {
template <class Item> class Singleton;
}

namespace VOLTISO_NAMESPACE::singleton {
template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};
template <class Item> struct Specializations<Options<option::Item<Item>>> {
	using Result = Singleton<Item>;
};
} // namespace VOLTISO_NAMESPACE::singleton

namespace VOLTISO_NAMESPACE::singleton {
template <class... Args> using GetCustom = Specializations<Args...>::Result;
}

//

namespace VOLTISO_NAMESPACE::singleton::_ {

// Do we have `isInitialized` flag to check in `maybeInitialize`?
// * The ConstexprConstructible && !TriviallyDestructible case is fringe -
// ideally we could initialize once, allow access, and register destructor only
// on maybeInitialize. But it's not possible to initialize static with this
// fringe type without compiler generating guard code. So instead we don't
// initialize until maybeInitialize (so we have isInitialized check in hot-path
// unfortunately).
template <class Options>
static constexpr bool haveIsInitialized =
  !(concepts::ConstexprConstructible<
      typename Options::template Get<option::Item>> &&
    std::is_trivially_destructible_v<
      typename Options::template Get<option::Item>>);

// `LazyData` static is slow when it's not constinit or not trivially
// destructible
template <class Options>
static constexpr bool useSlowStatic = false; // haveIsInitialized<Options>;

template <class Options>
static constexpr bool haveNumReferences = !std::is_trivially_destructible_v<
  typename Options::template Get<option::Item>>;

// need ref-count only for non-trivially destructible items
template <class Options> class LazyDataMembersNumReferences {
protected:
	Size numReferences = 0;
};

template <class Options>
  requires(
    haveNumReferences<Options> && !Options::template GET<option::THREAD_LOCAL>)
class LazyDataMembersNumReferences<Options> {
protected:
	Atomic<Size> numReferences = 0;
};

template <class Options>
  requires(!haveNumReferences<Options>)
class LazyDataMembersNumReferences<Options> {};

//

template <class Options> class LazyDataMembersIsInitialized {
protected:
	bool isInitialized = false;
};

template <class Options>
  requires(
    haveIsInitialized<Options> && !Options::template GET<option::THREAD_LOCAL>)
class LazyDataMembersIsInitialized<Options> {
protected:
	Atomic<bool> isInitialized = false;
};

template <class Options>
  requires(!haveIsInitialized<Options>)
class LazyDataMembersIsInitialized<Options> {
	// no isInitialized member
};

//

template <class Options>
static constexpr bool needMutex =
  !Options::template GET<option::THREAD_LOCAL> &&
  (haveNumReferences<Options> || haveIsInitialized<Options>);

// Lazy needs mutex if (not THREAD_LOCAL) and (have either numReferences or
// isInitialized)
template <class Options> class LazyDataMembersMutex {
	// no mutex
};
template <class Options>
  requires(needMutex<Options>)
class LazyDataMembersMutex<Options> {
protected:
	Mutex mutex;
};

//

template <class Options>
static constexpr bool initializeImmediately =
  !std::is_trivially_constructible_v<
    typename Options::template Get<option::Item>> &&
  !haveIsInitialized<Options>;

// constexpr storage is not trivially destructible (if Item is not)
template <class Options>
static constexpr bool useConstexprStorage =
  std::is_trivially_destructible_v<
    typename Options::template Get<option::Item>> ||
  initializeImmediately<Options>;

template <class Options> class LazyDataMembersStorage {
	using Item = Options::template Get<option::Item>;

protected:
	Storage<Item> _storage = {}; // need for constinit
	// static_assert(std::is_trivially_destructible_v<decltype(_storage)>);
};

template <class Options>
  requires(useConstexprStorage<Options>)
class LazyDataMembersStorage<Options> {
	using Item = Options::template Get<option::Item>;

protected:
	Storage<Item>::Constexpr _storage = {}; // need for constinit
	// static_assert(std::is_trivially_destructible_v<decltype(_storage)>);
};

// -----------------------------------------------------------------------------

// 🛠️ `LazyData`
template <class Options>
class LazyData : public LazyDataMembersStorage<Options>,
                 public LazyDataMembersNumReferences<Options>,
                 public LazyDataMembersIsInitialized<Options>,
                 public LazyDataMembersMutex<Options> {
	using Item = Options::template Get<option::Item>;

private:
	template <class T>
	INLINE static auto _load(const T &value, std::memory_order order) noexcept {
		if constexpr (requires { &T::load; }) {
			return value.load(order);
		} else {
			return value;
		}
	}

	template <class T, class V>
	INLINE static void
	_store(T &value, const V &desired, std::memory_order order) noexcept {
		if constexpr (requires { &T::store; }) {
			value.store(desired, order);
		} else {
			value = desired;
		}
	}

	template <class T, class V>
	INLINE static auto
	_fetchSub(T &value, const V &desired, std::memory_order order) noexcept {
		if constexpr (requires { &T::fetchSub; }) {
			return value.fetchSub(desired, order);
		} else {
			auto old = value;
			value -= desired;
			return old;
		}
	}

	template <class T, class V>
	INLINE static auto
	_fetchAdd(T &value, const V &desired, std::memory_order order) noexcept {
		if constexpr (requires { &T::fetchAdd; }) {
			return value.fetchAdd(desired, order);
		} else {
			auto old = value;
			value += desired;
			return old;
		}
	}

	INLINE auto _lockGuard() {
		if constexpr (requires { this->mutex; }) {
			return std::lock_guard(this->mutex);
		} else {
			return 0;
		}
	}

public:
	INLINE Item &item() noexcept {
		if constexpr (requires { this->isInitialized; }) {
			CHECK(_load(this->isInitialized, std::memory_order_acquire));
		}
		// if constexpr (requires { this->_storage; }) {
		return this->_storage.storedItem();
		// } else {
		// 	return this->_item;
		// }
	}

private:
	// here is a small hack - we don't ever have to destroy
	// constexpr-constructible items (but we do if user calls `maybeInitialize`)
	static constexpr bool mustUseDestructorImmediately =
	  !std::is_trivially_destructible_v<Item> && initializeImmediately<Options> &&
	  !concepts::ConstexprConstructible<Item>;
	static constexpr bool canUseRegularDestructor = useSlowStatic<Options>;
	static constexpr bool canRegisterDestructorImmediately =
	  useSlowStatic<Options>;
	static_assert(
	  !mustUseDestructorImmediately || canRegisterDestructorImmediately ||
	  canUseRegularDestructor);

	static constexpr bool useRegisterDestructorImmediately =
	  mustUseDestructorImmediately && !canUseRegularDestructor;

	static_assert(!useRegisterDestructorImmediately || useSlowStatic<Options>);

public:
	INLINE constexpr LazyData() noexcept = default;

	// when no `isInitialized` member, we must construct immediately
	INLINE constexpr LazyData() noexcept
	  requires(initializeImmediately<Options> || useRegisterDestructorImmediately)
	{
		if constexpr (initializeImmediately<Options>) {
			_create();
		}
		if constexpr (useRegisterDestructorImmediately) {
			_registerDestructor();
		}
	}

	// ⚠️ can't be constexpr
	INLINE void _registerDestructor() noexcept {
		if constexpr (!std::is_trivially_destructible_v<Item>) {
			if constexpr (Options::template GET<option::THREAD_LOCAL>) {
				// std::cout << "registering thread-local destructor" << std::endl;
				static thread_local Destructor destructor{*this};
			} else {
				static Destructor destructor{*this};
			}
		}
	}

private:
	struct Destructor {
		LazyData<Options> &lazyData;
		~Destructor() {
			// ⚠️ copy-pasted from `decrement` - but `[[likely]]`
			if (_fetchSub(lazyData.numReferences, 1, std::memory_order_release) == 0)
			  [[likely]] {
				lazyData._maybeDestroy();
			}
		}
	};

public:
	INLINE ~LazyData() noexcept = default;

	INLINE ~LazyData() noexcept
	  requires(mustUseDestructorImmediately && canUseRegularDestructor)
	{
		Destructor destructor{*this};
	}

public:
	INLINE constexpr void maybeInitialize() noexcept(!requires {
		this->isInitialized;
	} || std::is_nothrow_constructible_v<Item>) {
		if constexpr (requires { this->isInitialized; }) {
			if (_load(this->isInitialized, std::memory_order_acquire)) [[likely]] {
				return;
			}

			auto _lock = _lockGuard();
			(void)_lock; // avoid unused warning

			// check if somebody else already initialized
			if (_load(this->isInitialized, std::memory_order_relaxed)) [[unlikely]] {
				return;
			}
			_create();
			_store(this->isInitialized, true, std::memory_order_release);
			_registerDestructor();
		}
	}

private:
	INLINE void _create() {
		if constexpr (!std::is_trivially_constructible_v<Item>) {
			// relay to resolve private constructors and `friend` status
			Custom<Options>::construct(this->_storage);
		}
	}

	INLINE constexpr void _create()
	  requires(useConstexprStorage<Options>)
	{
		if constexpr (!std::is_trivially_constructible_v<Item>) {
			// relay to resolve private constructors and `friend` status
			Custom<Options>::construct(this->_storage);
		}
	}

	INLINE void _destroy() noexcept(std::is_nothrow_destructible_v<Item>) {
#if VOLTISO_DEBUG_SINGLETON
		std::cout << "Singleton<" << demangle(typeid(Item)) << "> DESTROY"
		          << std::endl;
#endif
		if constexpr (!std::is_trivially_destructible_v<Item>) {
			this->_storage.destroy();
		}
	}

	INLINE void _maybeDestroy() noexcept(std::is_nothrow_destructible_v<Item>) {
		// fence is required because we just used `release` instead of `acq_rel` in
		// `numRefs--`
		static_assert(
		  needMutex<Options> == !Options::template GET<option::THREAD_LOCAL>);

		static_assert(requires { this->numReferences; });

		if constexpr (!Options::template GET<option::THREAD_LOCAL>) {
			std::atomic_thread_fence(std::memory_order_acquire);
		}

		if constexpr (requires { this->isInitialized; }) {
			if (_load(this->isInitialized, std::memory_order_acquire)) [[likely]] {
				_destroy();
			}
		} else {
			// constinit-initialized (so always isInitialized)
			_destroy();
		}
	}

public:
	INLINE void increment() {
		if constexpr (requires { this->numReferences; }) {
			// Note: this does not cause creation, user needs to call
			// `maybeInitialize`
			_fetchAdd(this->numReferences, 1, std::memory_order_relaxed);
		}
	}
	INLINE void decrement() noexcept
	  requires(std::is_trivially_destructible_v<Item>)
	{
		static_assert(!requires { this->numReferences; });
	}
	INLINE void decrement() noexcept(std::is_nothrow_destructible_v<Item>)
	  requires(!std::is_trivially_destructible_v<Item>)
	{
		// when `numRefs` drops to -1 (was 0), destroy the singleton
		// we ref-count guards + LazyData itself
		// elegant way would be to initialize `numReferences` to 1, but we keep
		// constructor simple by zeroing everything
		if (_fetchSub(this->numReferences, 1, std::memory_order_release) == 0)
		  [[unlikely]] {
			_maybeDestroy();
		}
	}
}; // struct LazyData

// Only for `lazy` version
template <class Options> class Guard {
public:
	constexpr Guard() noexcept { Custom<Options>::_data.increment(); }
	constexpr ~Guard() noexcept { Custom<Options>::_data.decrement(); }
}; // class Guard
} // namespace VOLTISO_NAMESPACE::singleton::_

//

namespace VOLTISO_NAMESPACE::singleton::_ {
template <class Options> class ImplEagerGlobal {
protected:
	using Item = Options::template Get<option::Item>;
	static inline Item _item;
};
template <class Options> class ImplEagerThreadLocal {
protected:
	using Item = Options::template Get<option::Item>;
	static inline thread_local Item _item;
};

//

template <class Options> class ImplLazyGlobal {
	using Item = Options::template Get<option::Item>;

protected:
	friend Guard<Options>;
	static inline constinit _::LazyData<Options> _data;
	static_assert(std::is_trivially_destructible_v<decltype(_data)>);
};

template <class Options>
  requires(useSlowStatic<Options>)
class ImplLazyGlobal<Options> {
protected:
	friend Guard<Options>;
	static inline _::LazyData<Options> _data;
};

//

template <class Options> class ImplLazyThreadLocal {
	using Item = Options::template Get<option::Item>;

protected:
	friend Guard<Options>;
	// this forces no TLS guard code!
	static inline constinit thread_local _::LazyData<Options> _data;
	static_assert(std::is_trivially_destructible_v<decltype(_data)>);
};

template <class Options>
  requires(useSlowStatic<Options>)
class ImplLazyThreadLocal<Options> {
protected:
	friend Guard<Options>;
	// allow TLS guard code - only if we don't double-guard with `isInitialized`
	static inline thread_local _::LazyData<Options> _data;
};

template <class Options>
class ImplLazy : public std::conditional_t<
                   Options::template GET<option::THREAD_LOCAL>,
                   ImplLazyThreadLocal<Options>, ImplLazyGlobal<Options>> {
	// ⚠️ If your singletons depend on each other, derive the user-singleton class
	// from `Guard`
public:
	using Guard = _::Guard<Options>;
};

template <class Options>
using FinalImpl = std::conditional_t<
  Options::template GET<option::LAZY>, ImplLazy<Options>,
  std::conditional_t<
    Options::template GET<option::THREAD_LOCAL>, ImplEagerThreadLocal<Options>,
    ImplEagerGlobal<Options>>>;
} // namespace VOLTISO_NAMESPACE::singleton::_

namespace VOLTISO_NAMESPACE::singleton {
template <class Options>
  requires concepts::Options<Options>
class Custom
    : public Object<typename Options::template WithDefault<
        option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>,
      public _::FinalImpl<Options> {
	using Base = Object<typename Options::template WithDefault<
	  option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>;
	using Impl = _::FinalImpl<Options>;

public:
	using Item = Options::template Get<option::Item>;
	static_assert(!std::is_reference_v<Item>);
	static_assert(!std::is_const_v<Item>);
	static_assert(!std::is_volatile_v<Item>);

private:
	INLINE static constexpr void _staticChecks() noexcept {
		if constexpr (
		  _::initializeImmediately<Options> &&
		  concepts::ConstexprConstructible<Item>) {
			static_assert(concepts::ConstexprConstructible<Custom>);
		}
	}

private:
	friend _::LazyData<Options>;

	static void
	construct(auto &storage) noexcept(std::is_nothrow_constructible_v<Item>) {
		_staticChecks();
		if constexpr (std::is_same_v<Custom, GetCustom<Options>>) {
			new (&storage.storedItem()) Item;
		} else {
			GetCustom<Options>::construct(storage);
		}
	}

	static constexpr void
	construct(auto &storage) noexcept(std::is_nothrow_constructible_v<Item>)
	  requires(_::useConstexprStorage<Options>)
	{
		_staticChecks();
		if constexpr (std::is_same_v<Custom, GetCustom<Options>>) {
			new (&storage.storedItem()) Item;
		} else {
			GetCustom<Options>::construct(storage);
		}
	}

public:
	static INLINE Item &
	maybeInitialize() noexcept(std::is_nothrow_constructible_v<Item>)
	  requires(Options::template GET<option::LAZY>)
	{
		_staticChecks();
		Impl::_data.maybeInitialize();
		return instance();
	}

	static INLINE Item &
	maybeInitialize() noexcept(std::is_nothrow_constructible_v<Item>)
	  requires(!Options::template GET<option::LAZY>)
	{
		// noop - for compat with non-lazy version
		_staticChecks();
		return instance();
	}

	static INLINE Item &instance() noexcept
	  requires(Options::template GET<option::LAZY>)
	{
		_staticChecks();
		return Impl::_data.item();
	}

	static INLINE Item &instance() noexcept
	  requires(!Options::template GET<option::LAZY>)
	{
		_staticChecks();
		return Impl::_item;
	}

public:
	template <class... MoreOptions>
	using With = Base::template With<MoreOptions...>;

	using Lazy = With<option::LAZY<true>>;
	using ThreadLocal = With<option::THREAD_LOCAL<true>>;
}; // class Singleton
} // namespace VOLTISO_NAMESPACE::singleton

namespace VOLTISO_NAMESPACE {
template <class Item>
class Singleton : public singleton::Custom<Options<option::Item<Item>>> {
	using Base = singleton::Custom<Options<option::Item<Item>>>;
	using Base::Base;

private:
	friend Base;
	static INLINE void
	construct(auto &storage) noexcept(std::is_nothrow_constructible_v<Item>) {
		// `Base` relays this call to us, because we may be friend of `Item`
		new (&storage.storedItem) Item;
	}
}; // class Singleton
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
