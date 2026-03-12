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
	using Self = Object;
	RELOCATABLE_BODY

public:
	using Options = TOptions;

protected:
	template <class OptionsArg>
	using CustomTemplate = Options::template GetTemplate<option::CustomTemplate, OptionsArg>;

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
	// Object(const Object &) = default;

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
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto) final(this auto &&self) noexcept {
		return std::forward<decltype(self)>(self).template as<Final>();
	}

public:
	template <class... MoreOptions>
	using With = CustomTemplate<
	  typename InputOptions ::template With<MoreOptions...>::template Without<option::Final>>;

	template <class... MoreOptions>
	using WithDefault = CustomTemplate<
	  typename InputOptions ::template WithDefault<MoreOptions...>::template Without<option::Final>>;

public:
	/// cast to another class, preserving cvref-qualifiers
	template <class NewFinalClass>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto) as(this auto &&self) noexcept {
		static_assert(sizeof(NewFinalClass) == sizeof(self));
		static_assert(!std::is_reference_v<NewFinalClass>);
		static_assert(
		  !std::is_const_v<NewFinalClass>,
		  "don't apply cv-qualifiers, they are auto-inferred correctly");
		static_assert(!std::is_volatile_v<NewFinalClass>);
		using Param = decltype(self);

		// Determine cv-qualifiers based on param's underlying type
		constexpr bool isConst = std::is_const_v<std::remove_reference_t<Param>>;
		constexpr bool isVolatile = std::is_volatile_v<std::remove_reference_t<Param>>;

		// Apply cv-qualifiers to the target base type NewFinalClass
		// Build the non-reference cv-qualified type first
		using MaybeConstNewFinal = std::conditional_t<isConst, const NewFinalClass, NewFinalClass>;
		using NewFinalCvQualified =
		  std::conditional_t<isVolatile, std::add_volatile_t<MaybeConstNewFinal>, MaybeConstNewFinal>;

		// Determine the final target type including reference qualifier
		using TargetCvRefQualified = std::conditional_t<
		  std::is_rvalue_reference_v<Param>, std::add_rvalue_reference_t<NewFinalCvQualified>,
		  std::add_lvalue_reference_t<NewFinalCvQualified>>;

		// Step 1: Cast address to pointer to the cv-qualified VALUE type
		// (Safety of reinterpret_cast still depends on relationship between
		// FinalClass and NewFinalClass)
		auto *targetPtr = reinterpret_cast<NewFinalCvQualified *>(std::addressof(self));

		// Step 2: Dereference and static_cast the result to the final
		// CVREF-qualified type
		return static_cast<TargetCvRefQualified>(*targetPtr);
	}

public:
	template <class Brand>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto) brand(this auto &&self) noexcept {
		using Param = decltype(self);
		using FinalClass = std::remove_cvref_t<Param>;
		// static_assert(std::is_final_v<FinalClass>);

		// use `With` from the derived class (`Object::With` may be overridden)
		using NewFinalClass = typename FinalClass::template With<Brand>;

		return std::forward<decltype(self)>(self).template as<NewFinalClass>();
	}

public:
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto) move(this auto &&self) noexcept
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
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto) copy(this T &self) noexcept
	// requires(std::is_constructible_v<T, const T &&>)
	{
		return static_cast<const T &&>(self);
	}
};
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
