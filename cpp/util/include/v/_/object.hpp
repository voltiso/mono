#pragma once
#include <v/_/_>

#include "v/_/0-object.forward.hpp" // IWYU pragma: keep

#include "v/option/custom-template"
#include "v/option/final"
#include "v/option/implicit-copy" // IWYU pragma: keep for macro
#include "v/option/input-options"
#include "v/options"

#include <memory>
#include <type_traits>

#include <v/ON>

namespace VOLTISO_NAMESPACE {

// Here we could test if Final is actually final, but it's impossible, because:
//  - We want `Object` default-constructible (can't test in
//  constructor/destructor)
//  - Can't test in `Object` body, because `Final` may be incomplete
template <class TOptions = Options<>>
// requires concepts::Options<Options> && std::is_final_v<Final>
class RELOCATABLE(Object) {
	RELOCATABLE_BODY(Object<TOptions>);

public:
	using Options = TOptions;

protected:
	template <class OptionsArg>
	using CustomTemplate =
	  Options::template GetTemplate<option::CustomTemplate, OptionsArg>;

	// Use InputOptions if provided, otherwise fall back to Options
	using InputOptions = std::conditional_t<
	  !std::is_same_v<typename Options::template Get<option::InputOptions>, void>,
	  typename Options::template Get<option::InputOptions>, Options>;

public:
	// CRTP
	using Final = std::conditional_t<
	  !std::is_same_v<typename Options::template Get<option::Final>, void>,
	  typename Options::template Get<option::Final>,
	  // if option::Final was not provided for true CRTP,
	  // try using provided `CustomTemplate<InputOptions>` instead
	  // (which might not yield the final class in chain)
	  CustomTemplate<InputOptions>>;

public:
	Object(const Object &) = default;

	// ! we can't do this for trivially-copyable types
	// Object(const Object &other) noexcept(
	//   noexcept(Final(static_cast<const Final &&>(other))))
	//   requires(Options::template GET<option::implicitCopy>)
	// {
	// 	static_assert(
	// 	  !std::is_constructible_v<Final, const Final &>,
	// 	  "option::implicitCopy is only valid when object is not copyable by "
	// 	  "default");

	// 	new (&final()) Final(static_cast<const Final &&>(other));
	// }

protected:
	// get Final from CRTP, and apply correct cvref-qualifiers
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	final(this auto &&self) noexcept {
		return std::forward<decltype(self)>(self).template as<Final>();
	}

public:
	template <class... MoreOptions>
	using With = CustomTemplate<typename InputOptions ::template With<
	  MoreOptions...>::template Without<option::Final>>;

	template <class... MoreOptions>
	using WithDefault =
	  CustomTemplate<typename InputOptions ::template WithDefault<
	    MoreOptions...>::template Without<option::Final>>;

public:
	/// cast to another class, preserving cvref-qualifiers
	template <class NewFinalClass>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	as(this auto &&self) noexcept {
		static_assert(sizeof(NewFinalClass) == sizeof(self));
		static_assert(!std::is_reference_v<NewFinalClass>);
		static_assert(
		  !std::is_const_v<NewFinalClass>,
		  "don't apply cv-qualifiers, they are auto-inferred correctly");
		static_assert(!std::is_volatile_v<NewFinalClass>);
		using Param = decltype(self);

		// Determine cv-qualifiers based on param's underlying type
		constexpr bool isConst = std::is_const_v<std::remove_reference_t<Param>>;
		constexpr bool isVolatile =
		  std::is_volatile_v<std::remove_reference_t<Param>>;

		// Apply cv-qualifiers to the target base type NewFinalClass
		// Build the non-reference cv-qualified type first
		using MaybeConstNewFinal =
		  std::conditional_t<isConst, const NewFinalClass, NewFinalClass>;
		using NewFinalCvQualified = std::conditional_t<
		  isVolatile, std::add_volatile_t<MaybeConstNewFinal>, MaybeConstNewFinal>;

		// Determine the final target type including reference qualifier
		using TargetCvRefQualified = std::conditional_t<
		  std::is_rvalue_reference_v<Param>,
		  std::add_rvalue_reference_t<NewFinalCvQualified>,
		  std::add_lvalue_reference_t<NewFinalCvQualified>>;

		// Step 1: Cast address to pointer to the cv-qualified VALUE type
		// (Safety of reinterpret_cast still depends on relationship between
		// FinalClass and NewFinalClass)
		auto *targetPtr =
		  reinterpret_cast<NewFinalCvQualified *>(std::addressof(self));

		// Step 2: Dereference and static_cast the result to the final
		// CVREF-qualified type
		return static_cast<TargetCvRefQualified>(*targetPtr);
	}

public:
	template <class Brand>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	brand(this auto &&self) noexcept {
		using Param = decltype(self);
		using FinalClass = std::remove_cvref_t<Param>;
		// static_assert(std::is_final_v<FinalClass>);

		// use `With` from the derived class (`Object::With` may be overridden)
		using NewFinalClass = typename FinalClass::template With<Brand>;

		return std::forward<decltype(self)>(self).template as<NewFinalClass>();
	}

public:
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	move(this auto &&self) noexcept
	  requires(!std::is_const_v<std::remove_reference_t<decltype(self)>>)
	{
		using NewSelf = std::remove_reference_t<decltype(self)> &&;
		return static_cast<NewSelf>(self);
	}

public:
	// * We use our magic explicit copy semantics - constructing from `const
	// Final&& other` is a copy.
	// * Your code must respect constness of the rvalue reference!
	// it's not a temporary just because it's rvalue!
	template <class T>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	copy(this T &self) noexcept
	// requires(std::is_constructible_v<T, const T &&>)
	{
		return static_cast<const T &&>(self);
	}

	// // If object does not support `const Final &&` construction, maybe it
	// supports
	// // `Copy<Final>`.
	// // since trivially copyable types are unable to support the const-rvalue
	// // syntax, we use `Copy` wrapper instead
	// template <class T>
	// [[nodiscard]] VOLTISO_FORCE_INLINE constexpr auto
	// copy(this T &self) noexcept
	//   requires(std::is_constructible_v<T, const Copy<T> &>)
	// {
	// 	return Copy<T>{self};
	// }

public:
	Object() = default;  // must be trivially default constructible
	~Object() = default; // must be trivially destructible
};
} // namespace VOLTISO_NAMESPACE

// static_assert(std::is_trivially_copyable_v<v::Object<>>);

// ! BELOW: experiments how to make derived class explicit-copy only, while
// keeping it trivially-copyable

// struct S {
// 	int a;

// 	S() = default;
// 	S(const S &) = delete;

// 	S(S &&) = delete;
// 	// S(S &&) {}

// 	template <class Source>
// 	  requires std::is_same_v<Source, S>
// 	S(const Source &&) {}

// 	// template <class Source, std::enable_if_t<std::is_same_v<Source, S>, int>
// =
// 	// 0> S(const Source &&) {}
// };

// struct D : S {
// 	// using S::S;
// 	D(const D &) = delete;
// 	D(D &&) = delete;

// 	template <class Source>
// 	  requires std::is_same_v<Source, D>
// 	D(const Source &&other) : S(static_cast<const S &&>(other)) {}

// 	// template <class... Args> D(Args &&...args) :
// S(std::forward<Args>(args)...)
// 	// {}
// };

// static_assert(std::is_trivially_copyable_v<S>);
// static_assert(std::is_trivially_copyable_v<D>);

// static_assert(!std::is_constructible_v<S, S>);
// static_assert(!std::is_constructible_v<D, D>);

// static_assert(!std::is_constructible_v<S, S &>);
// static_assert(!std::is_constructible_v<D, D &>);

// static_assert(std::is_constructible_v<S, const S &&>);
// static_assert(std::is_constructible_v<D, const D &&>);

// ⚠️ Requires `Base` typedef in scope.
// - We want it trivially copyable
#define VOLTISO_INHERIT_RVALUE_COPY(Self)                                      \
public:                                                                        \
	using Base::Base;                                                            \
	using Base::operator=;                                                       \
                                                                               \
public:                                                                        \
	Self(Self &&) = delete;                                                      \
	Self(Self &&)                                                                \
	  requires(Base::Options::template GET<option::implicitCopy>)                \
	= default;                                                                   \
                                                                               \
	Self(const Self &other)                                                      \
	  requires(Base::Options::template GET<option::implicitCopy>)                \
	= default;                                                                   \
                                                                               \
	Self &operator=(const Self &) = delete;                                      \
	Self &operator=(const Self &other)                                           \
	  requires(Base::Options::template GET<option::implicitCopy>)                \
	= default;                                                                   \
                                                                               \
protected:                                                                     \
	explicit Self(const Self &) = default; /* for [[trivial_abi]] */             \
                                                                               \
public:                                                                        \
	/* explicit copy construct */                                                \
	template <class Src>                                                         \
	  requires std::is_same_v<Src, Self> &&                                      \
	           std::is_constructible_v<Base, const Src &&>                       \
	Self(const Src &&src) : Base(static_cast<const Src &&>(src)) {}              \
                                                                               \
	/* move assign */                                                            \
	template <class Src>                                                         \
	  requires(!std::is_reference_v<Src> && !std::is_const_v<Src>)               \
	auto &operator=(Src &&src)                                                   \
	  requires requires { Base::operator=(static_cast<Src &&>(src)); }           \
	{                                                                            \
		return Base::operator=(static_cast<Src &&>(src));                          \
	}                                                                            \
                                                                               \
private:

#include <v/OFF>

/*



*/

// !

/*
  Final &operator=(Final &&) = delete;                                         \

  Final &operator=(Final &&)                                                   \
    requires(Base::Options::template GET<option::implicitCopy>)                \
  = default;                                                                   \

                               \
  template <class Arg>                                                         \
  auto &operator=(const Arg &&arg)                                             \
    requires requires { Base::operator=(static_cast<const Arg &&>(arg)); }     \
  {                                                                            \
    return Base::operator=(static_cast<const Arg &&>(arg));                    \
  }                                                                            \

*/
