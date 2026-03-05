#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/_/0-object.forward.hpp"
#include "v/_/is/relocatable.hpp"
#include "v/_/tensor/tensor.hpp"
#include "v/object"
#include "v/option/constexpr"
#include "v/options"

// #include "glog/logging.h"

#include <cstddef>
#include <cstring>
#include <initializer_list>

#include <v/ON>

namespace VOLTISO_NAMESPACE::storage {
template <class Options>
  requires concepts::Options<Options>
struct Specializations;
} // namespace VOLTISO_NAMESPACE::storage

namespace VOLTISO_NAMESPACE::storage::_ {
template <class Options>
  requires concepts::Options<Options>
class RELOCATABLE(DataMembersUnion) {
	VOLTISO_RELOCATABLE_BODY(DataMembersUnion);
	using Item = Options::template Get<option::Item>;

public:
	union {
		Tensor<std::byte, sizeof(Item)> bytes;
		// ⚠️ This may not be constructed yet
		Item item; // note: better use .storedItem() for compat
	};

public:
	// ⚠️ This may not be constructed yet
	constexpr Item &storedItem() noexcept { return this->item; }
	// ⚠️ This may not be constructed yet
	constexpr const Item &storedItem() const noexcept { return this->item; }

protected:
	constexpr DataMembersUnion() noexcept
	  requires(std::is_trivially_constructible_v<Item>)
	= default;

	constexpr DataMembersUnion() noexcept
	  requires(!std::is_trivially_constructible_v<Item>)
	{}

	constexpr ~DataMembersUnion() noexcept
	  requires(std::is_trivially_destructible_v<Item>)
	= default;

	constexpr ~DataMembersUnion() noexcept
	  requires(!std::is_trivially_destructible_v<Item>)
	{}

protected:
	Item &_item() noexcept { return this->item; }
	const Item &_item() const noexcept { return this->item; }
};

// ⚠️ Not necessarily relocatable! Never use this directly.
template <class Options>
  requires concepts::Options<Options>
class RELOCATABLE(DataMembersBytes) {
	using Item = Options::template Get<option::Item>;

public:
	alignas(Item) Tensor<std::byte, sizeof(Item)>::WithImplicitCopy bytes;

public:
	constexpr DataMembersBytes() noexcept = default;

protected:
	DataMembersBytes(const DataMembersBytes &) =
	  default; /* for [[trivial_abi]] */

public:
	// ⚠️ This may not be constructed yet
	Item &storedItem() noexcept { return reinterpret_cast<Item &>(this->bytes); }

	// ⚠️ This may not be constructed yet
	const Item &storedItem() const noexcept {
		return reinterpret_cast<const Item &>(this->bytes);
	}

protected:
	Item &_item() noexcept { return this->storedItem(); }
	const Item &_item() const noexcept { return this->storedItem(); }
};

template <class Options>
  requires concepts::Options<Options>
using DataMembers = std::conditional_t<
  Options::template GET<option::CONSTEXPR>, DataMembersUnion<Options>,
  DataMembersBytes<Options>>;
} // namespace VOLTISO_NAMESPACE::storage::_

// !

namespace VOLTISO_NAMESPACE::storage::_ {
template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::storage::_

// !

namespace VOLTISO_NAMESPACE::storage {
template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};
template <class Item> struct Specializations<Options<option::Item<Item>>> {
	using Result = Storage<Item>;
};
} // namespace VOLTISO_NAMESPACE::storage

// !

namespace VOLTISO_NAMESPACE::storage::_ {
#pragma push_macro("BASE")
#define BASE                                                                   \
	Object<typename Options::template WithDefault<                               \
	  option::relocatable<                                                       \
	    is::relocatable<typename Options::template Get<option::Item>>>,          \
	  option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>

// ⚠️ Not really relocatable! Never use this directly.
template <class Options>
  requires concepts::Options<Options>
class RELOCATABLE(CustomNR) : public BASE, public _::DataMembers<Options> {
	using Base = BASE;
#pragma pop_macro("BASE")

public:
	using Item = Options::template Get<option::Item>;

private:
	static constexpr bool _DEFAULT_CONSTRUCTIBLE =
	  !Options::template GET<option::CONSTEXPR> ||
	  std::is_trivially_constructible_v<Item>;

	static constexpr bool _DEFAULT_DESTRUCTIBLE =
	  !Options::template GET<option::CONSTEXPR> ||
	  std::is_trivially_destructible_v<Item>;

public:
	constexpr CustomNR() noexcept
	  requires(_DEFAULT_CONSTRUCTIBLE)
	= default;

	constexpr CustomNR() noexcept
	  requires(!_DEFAULT_CONSTRUCTIBLE)
	{}

	~CustomNR() noexcept
	  requires(_DEFAULT_DESTRUCTIBLE)
	= default;

	~CustomNR() noexcept
	  requires(!_DEFAULT_DESTRUCTIBLE)
	{
		// destruction handled manually
	}

	constexpr CustomNR(std::initializer_list<std::byte> bytes) noexcept
	    : _::DataMembers<Options>(bytes) {}

	// allow explicit-copy for trivially copyable Items
protected:
	CustomNR(const CustomNR &) = delete;

	CustomNR(const CustomNR &)
	  requires(is::relocatable<Item>)
	= default; /* for [[trivial_abi]] */

public:
	CustomNR(CustomNR &&) = delete;
	template <class Source>
	  requires std::is_base_of_v<CustomNR, Source>
	CustomNR(const Source &&other)
	  requires(std::is_trivially_copyable_v<Item>)
	{
		static_assert(sizeof(CustomNR) == sizeof(Item));
		std::memcpy(this, &other, sizeof(CustomNR));
	}

	// We allow `operator=` for trivially copyable items
	// template so storage itself stays trivially copyable
	// But only explicit-copy. (see `Object.copy()`)
	CustomNR &operator=(const CustomNR &) = delete;
	CustomNR &operator=(CustomNR &&) = delete;
	template <class TOther>
	  requires(std::is_base_of_v<CustomNR, TOther>)
	CustomNR &operator=(const TOther &&other)
	  requires(std::is_trivially_copyable_v<Item>)
	{
		static_assert(sizeof(CustomNR) == sizeof(Item));
		std::memcpy(this, &other, sizeof(CustomNR));
		return Base::self();
	}

	// ! (1) if there is TObject::relocateFrom(Storage) - use it
	// pre-condition: this object constructed
	// post-condition: this object NOT constructed
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr Item
	relocate() noexcept(noexcept(Item::relocateFrom(*this)))
	  requires requires { Item::relocateFrom(*this); }
	{
		return Item::relocateFrom(*this);
	}

	// ! (2) if std::bit_cast would work, use it
	// pre-condition: this object constructed
	// post-condition: this object NOT constructed
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr Item relocate() noexcept
	  requires(
	    !requires { Item::relocateFrom(*this); } && is::relocatable<Item> &&
	    // ! unfortunately, even the `__builtin_bit_cast` forces this:
	    std::is_trivially_copyable_v<Item>)
	{
		// simply bit-copy this
		// #if VOLTISO_HAS_BUILTIN_BIT_CAST
		// 		return __builtin_bit_cast(TObject, bytes);
		// #else
		// std::bit_cast requires TObject to be trivially copyable
		return std::bit_cast<Item>(this->bytes);
		// #endif
	}

	// ! (3) if `std::bit_cast` would NOT work, try `memcpy`
	// (this other approach unfortunately requires
	// `std::is_trivially_default_constructible`)
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr Item relocate() noexcept
	  requires(
	    !requires { Item::relocateFrom(*this); } && is::relocatable<Item> &&
	    !std::is_trivially_copyable_v<Item> &&
	    std::is_trivially_default_constructible_v<Item>)
	{
		Item result; // we want trivial default constructor here
		std::memcpy((void *)&result, &this->bytes, sizeof(Item));
		return result; // ! hoping for RVO
	}

	// pre-condition: other object constructed
	// post-condition: other object NOT constructed
	VOLTISO_FORCE_INLINE constexpr auto &relocateFrom(CustomNR &other) noexcept
	  requires(is::relocatable<Item>)
	{
		static_assert(sizeof(CustomNR) == sizeof(Item));
		std::memcpy(this, &other, sizeof(CustomNR));
		return *this;
	}

	// TODO: we can add specialization for TObject::relocate() if provided

	// // ...but enable back for trivially relocatable items
	// constexpr Storage(Storage &&other) noexcept
	//   requires(is::relocatable<TObject>)
	// {
	// 	static_assert(sizeof(Storage) == sizeof(TObject));
	// 	std::memcpy(this, &other, sizeof(Storage));
	// }
	// Storage &operator=(Storage &&other) noexcept
	//   requires(is::relocatable<TObject>)
	// {
	// 	static_assert(sizeof(Storage) == sizeof(TObject));
	// 	std::memcpy(this, &other, sizeof(Storage));
	// 	return *this;
	// }

	// // bitwise compare
	// constexpr bool operator==(const Storage &other) const noexcept {
	// 	return std::memcmp(this, &other, sizeof(Storage)) == 0;
	// }

	// constexpr bool operator<(const Storage &other) const noexcept {
	// 	return std::memcmp(this, &other, sizeof(Storage)) < 0;
	// }

	// ⚠️ Remember to call `.destroy()` if you constructed
	// something
	template <class... Args>
	void construct(Args &&...args) noexcept(
	  std::is_nothrow_constructible_v<Item, Args...>) {
		// note: not using `std::construct_at` because TObject constructor may be
		// private and friend Storage<TObject>
		new (&this->bytes) Item{std::forward<Args>(args)...};
	}

	// ⚠️ Remember to call `.destroy()` if you constructed something
	void destroy() noexcept(std::is_nothrow_destructible_v<Item>) {
		this->_item().~Item();
	}

public:
	template <class... OptionsList>
	using With = Base::template With<OptionsList...>;

	using Constexpr = With<option::CONSTEXPR<true>>;
}; // class Storage
} // namespace VOLTISO_NAMESPACE::storage::_

// !

namespace VOLTISO_NAMESPACE::storage {
template <concepts::Options Options>
class Custom : public _::CustomNR<Options> {
	using Base = _::CustomNR<Options>;
	using Base::Base;
	VOLTISO_INHERIT_RVALUE_COPY(Custom, Base);
};

template <concepts::Options Options>
  requires is::relocatable<typename Options::template Get<option::Item>>
class RELOCATABLE(Custom<Options>) : public _::CustomNR<Options> {
	using Base = _::CustomNR<Options>;
	using Base::Base;
	VOLTISO_INHERIT_RVALUE_COPY(Custom, Base);
};
} // namespace VOLTISO_NAMESPACE::storage

// !

namespace VOLTISO_NAMESPACE {
// To replace `std::aligned_storage`
// https://stackoverflow.com/a/71828512/1123898
// ⚠️ Remember to call `.destroy()` if you constructed something
// ⚠️ The `::Constexpr` version never zero-initializes, even with `= {}`
template <class Item>
class Storage : public storage::Custom<Options<option::Item<Item>>> {
	using Base = storage::Custom<Options<option::Item<Item>>>;
	using Base::Base;
	VOLTISO_INHERIT_RVALUE_COPY(Storage, Base);
};

template <class Item>
  requires is::relocatable<Item>
class RELOCATABLE(Storage<Item>)
    : public storage::Custom<Options<option::Item<Item>>> {
	using Base = storage::Custom<Options<option::Item<Item>>>;
	using Base::Base;
	VOLTISO_INHERIT_RVALUE_COPY(Storage, Base);
};
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
