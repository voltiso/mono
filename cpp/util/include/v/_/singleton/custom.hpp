#pragma once
#include <v/_/_>

#include "_/get-base.hpp"
#include "forward.hpp"

#include "v/empty"
#include "v/is/option"

#include <v/ON>

namespace V::singleton {

template <is::Option... Os> class Custom : public _::GetBase<Os...> {
	using Base = _::GetBase<Os...>;
	using typename Base::Config;
	using Item = Config::Item;

public:
	using ConstructKey = Config::ConstructKey;

protected:
	struct Data {
		Config::Storage storage{}; // need to zero-initialize for constinit?
		[[no_unique_address]] Config::Mutex mutex;
		[[no_unique_address]] Config::IsInitialized isInitialized = false;

		constexpr Data() noexcept = default;
		constexpr Data() noexcept
		  requires(Config::initializeImmediately && !std::is_trivially_constructible_v<Item>)
		{
			_construct(storage);
		}

		constexpr ~Data() noexcept = default;
		constexpr ~Data() noexcept
		  requires(Config::initializeImmediately && !std::is_trivially_destructible_v<Item>)
		{
			_destroy(storage);
		}
	};

private:
	using ConstinitGlobal = std::conditional_t<!Config::threadLocal, Data, Empty>;
	using ConstinitThreadLocal = std::conditional_t<Config::threadLocal, Data, Empty>;

	// ⚠️ Constexpr-constructible `Item` must initialize all members - otherwise it's invalid to
	// `constinit` it.

	static inline constinit ConstinitGlobal
	  _constinitGlobal; // ⚠️ If constexpr-constructible, initialize all your members!

	static inline constinit thread_local ConstinitThreadLocal
	  _constinitThreadLocal; // ⚠️ If constexpr-constructible, initialize all your members!

protected:
	INLINE static constexpr Data &_static() noexcept {
		if constexpr (Config::threadLocal) {
			static_assert(
			  Config::lazy || Config::trivialConstinitItem,
			  "Use `::Lazy` to avoid injecting TLS guard code.");
			return _constinitThreadLocal;
		} else /* global */ {
			static_assert(
			  Config::lazy || Config::trivialConstinitItem,
			  "Use `::Lazy` to avoid SIOF (static-initialization-order-fiasco).");
			return _constinitGlobal;
		}
	}

public:
	Custom() = delete;
	~Custom() = delete;

private:
	INLINE static consteval void _staticChecks() noexcept {
		// make sure no builtin TLS branch on access
		// static_assert(concepts::ConstexprConstructible<Data> &&
		// std::is_trivially_destructible_v<Data>);
	}

private:
	INLINE static constexpr void
	_construct(Config::Storage &storage) noexcept(std::is_nothrow_constructible_v<Item>) {
		if constexpr (Config::hasIsInitialized) {
			CHECK(!_static().isInitialized.load(std::memory_order_acquire));
		}
		if constexpr (std::is_constructible_v<Item, ConstructKey>) {
			new (std::addressof(storage.storedItem())) Item{ConstructKey{}};
		} else {
			new (std::addressof(storage.storedItem())) Item;
		}
	}

	friend struct Destructor;
	INLINE static void
	_destroy(Config::Storage &storage) noexcept(std::is_nothrow_destructible_v<Item>) {
		storage.destroy();
	}

public:
	static INLINE Item &instance() noexcept(std::is_nothrow_constructible_v<Item>) {
		_staticChecks();
		_maybeInitialize();
		return _static().storage.storedItem();
	}

	static INLINE Item &instanceUnchecked() noexcept
	  requires(Config::hasIsInitialized)
	{
		_staticChecks();
		CHECK(_static().isInitialized.load(std::memory_order_acquire));
		return _static().storage.storedItem();
	}

	// [[deprecated("You can call just `::instance()` instead, as your singleton is
	// auto-initialized.")]] static INLINE Item &instanceUnchecked() noexcept
	//   requires(!_hasIsInitialized)
	// {
	// 	return instance();
	// }

private:
	INLINE static constexpr void _maybeInitialize() noexcept
	  requires(!Config::hasIsInitialized)
	{}

	INLINE static constexpr void _maybeInitialize() noexcept(std::is_nothrow_constructible_v<Item>)
	  requires(Config::hasIsInitialized)
	{
		if (_static().isInitialized.load(std::memory_order_acquire)) [[likely]] {
			return;
		}

		_initialize();
	}

	COLD static void _initialize() noexcept(std::is_nothrow_constructible_v<Item>) {
		auto _guard = _static().mutex.guard();

		// check if somebody else already initialized
		if (_static().isInitialized.load(std::memory_order_relaxed)) [[unlikely]] {
			return;
		}
		if constexpr (!Config::initializeImmediately) {
			_construct(_static().storage);
		}
		_static().isInitialized.store(true, std::memory_order_release);
		_registerDestructor();
	}

	// ⚠️ can't be constexpr
	INLINE static void _registerDestructor() noexcept {
		if constexpr (!std::is_trivially_destructible_v<Item>) {
			if constexpr (Config::threadLocal) {
				static thread_local Destructor destructor;
			} else {
				static Destructor destructor;
			}
		}
	}

	struct Destructor {
		~Destructor() { _destroy(_static().storage); }
	};

public:
	template <is::Option... More> using With = Base::template With<More...>;
	using Lazy = With<option::lazy<true>>;
	using ThreadLocal = With<option::threadLocal<true>>;
	using Concurrent = With<option::concurrent<true>>;
}; // class Custom

} // namespace V::singleton

#include <v/OFF>
