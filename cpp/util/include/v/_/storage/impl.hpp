#pragma once
#include <v/_/_>

#include "_data-bytes.hpp"
#include "_data-union.hpp"
#include "forward.hpp"

#include "v/_/is/relocatable.hpp"
#include "v/concepts/options"
#include "v/object"
#include "v/option/non-union"

#include <cstddef>
#include <cstring>

#include <v/ON>

// 👉 `Storage<Item>` cannot have constexpr access to its item, and

// 👉 `Storage<Item>::Constexpr` is not trivially_copyable, nor constructible
// and destructible (unless Item is).

namespace VOLTISO_NAMESPACE::storage::_ {
template <concepts::Options Options>
using DataMembers = std::conditional_t<
  Options::template GET<option::nonUnion>, DataBytes<Options>, DataUnion<Options>>;
} // namespace VOLTISO_NAMESPACE::storage::_

// !

namespace VOLTISO_NAMESPACE::storage::_ {
template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::storage::_

// !

namespace VOLTISO_NAMESPACE::storage::_ {
#pragma push_macro("BASE")
#define BASE                                                                                       \
	Object<typename Options::template WithDefault<                                                   \
	  option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>

// ⚠️ Not necessarily relocatable! Never use this directly.
template <class Options>
  requires concepts::Options<Options>
class Impl : public BASE, public _::DataMembers<Options> {
	using Base = BASE;
#pragma pop_macro("BASE")

public:
	using Item = Options::template Get<option::Item>;

	// ! ---------------------------------
	// ! CONSTRUCT
	// ! ---------------------------------
public:
	constexpr Impl() noexcept = default;
	constexpr ~Impl() noexcept = default;

protected:
	Impl(const Impl &) = delete;

	// ! if item is not relocatable, stop compiler from applying trivial_abi
	constexpr Impl(const Impl &) noexcept
	  requires(!is::relocatable<Item>)
	{}

	explicit Impl(Impl &&) = default; // for [[trivial_abi]]

	Impl &operator=(const Impl &) = delete;
	Impl &operator=(Impl &&) = delete;

	// ! ---------------------------------
	// ! AUTO - INIT (trivial only)
	// ! ---------------------------------
	// template <class... Args>
	//   requires(std::is_trivially_copyable_v<Item>)
	// INLINE constexpr Impl(Args &&...args) noexcept(std::is_nothrow_constructible_v<Item, Args...>)
	// { 	construct(std::forward<Args>(args)...);
	// }

	// ! ---------------------------------
	// ! COPY CONSTRUCT
	// ! ---------------------------------
public:
	// if Item is trivial, and allows copies, allow too
	// Impl(const Impl &) = delete;
	// Impl(const Impl &)
	//   requires(std::is_trivially_copyable_v<Item> && std::is_copy_constructible_v<Item>)
	// = default;

protected:
	// for [[trivial_abi]] when Item is relocatable
	// - make it pseudo-copyable anyway (protected)
	// Impl(const Impl &)
	//   requires(!(std::is_trivially_copyable_v<Item> && std::is_copy_constructible_v<Item>) &&
	//            is::relocatable<Item>)
	// = default;

	// ! ---------------------------------
	// ! MOVE CONSTRUCT
	// ! ---------------------------------
public:
	// if Item is trivial, and allows moves, allow too
	// Impl(Impl &&) = delete;
	// Impl(Impl &&)
	//   requires(std::is_trivially_copyable_v<Item> && std::is_move_constructible_v<Item>)
	// = default;

	// template <class Source>
	//   requires(std::is_base_of_v<Impl, Source>)
	// Impl(const Source &&other)
	//   requires(std::is_trivially_copyable_v<Item>)
	// {
	// 	static_assert(sizeof(Impl) == sizeof(Item));
	// 	std::memcpy(this, &other, sizeof(Impl));
	// }

	// ! ---------------------------------
	// ! COPY ASSIGN
	// ! ---------------------------------
public:
	// Impl &operator=(const Impl &) = delete;
	// Impl &operator=(const Impl &)
	//   requires(std::is_trivially_copyable_v<Item> && std::is_copy_assignable_v<Item>)
	// = default;

	// ! ---------------------------------
	// ! MOVE ASSIGN
	// ! ---------------------------------
	// Impl &operator=(Impl &&) = delete;
	// Impl &operator=(Impl &&)
	//   requires(std::is_trivially_copyable_v<Item> && std::is_move_assignable_v<Item>)
	// = default;

	// // We allow `operator=` for trivially copyable items
	// // template so storage itself stays trivially copyable
	// // But only explicit-copy. (see `Object.copy()`)
	// Impl &operator=(const Impl &) = delete;
	// Impl &operator=(Impl &&) = delete;
	// template <class TOther>
	//   requires(std::is_base_of_v<Impl, TOther>)
	// Impl &operator=(const TOther &&other)
	//   requires(std::is_trivially_copyable_v<Item>)
	// {
	// 	static_assert(sizeof(Impl) == sizeof(Item));
	// 	std::memcpy(this, &other, sizeof(Impl));
	// 	return Base::final();
	// }

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
		return std::bit_cast<Item>(this->bytes());
		// #endif
	}

	// ! (3) if `std::bit_cast` would NOT work, try `memcpy`
	// (this other approach unfortunately requires
	// `std::is_trivially_default_constructible`)
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr Item relocate() noexcept
	  requires(
	    !requires { Item::relocateFrom(*this); } && is::relocatable<Item> &&
	    !std::is_trivially_copyable_v<Item> && std::is_trivially_default_constructible_v<Item>)
	{
		Item result; // we want trivial default constructor here
		std::memcpy((void *)&result, &this->bytes(), sizeof(Item));
		return result; // ! hoping for RVO
	}

	// pre-condition: other object constructed
	// post-condition: other object NOT constructed
	VOLTISO_FORCE_INLINE constexpr auto &relocateFrom(Impl &other) noexcept
	  requires(is::relocatable<Item>)
	{
		static_assert(sizeof(Impl) == sizeof(Item));
		std::memcpy(this, &other, sizeof(Impl));
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
	// requires(_constexpr)
	constexpr void
	construct(Args &&...args) noexcept(std::is_nothrow_constructible_v<Item, Args...>) {
		// note: not using `std::construct_at` because TObject constructor may be
		// private and friend Storage<TObject>
		new (std::addressof(this->storedItem())) Item{std::forward<Args>(args)...};
	}

	// ⚠️ Remember to call `.destroy()` if you constructed something
	void destroy() noexcept(std::is_nothrow_destructible_v<Item>) { this->storedItem().~Item(); }

public:
	template <class... OptionsList> using With = Base::template With<OptionsList...>;

	using NonUnion = With<option::nonUnion<true>>;
}; // class Impl
} // namespace VOLTISO_NAMESPACE::storage::_

// !

#include <v/OFF>
