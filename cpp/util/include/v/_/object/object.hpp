#pragma once
#include <v/_/_>

#include "v/_/mixin/builder/option.hpp"

#include "v/_/0-object.forward.hpp" // IWYU pragma: keep

#include "v/apply-pack"
#include "v/options"

#include <memory>
#include <type_traits>

#include <v/ON>

namespace VOLTISO_NAMESPACE {

// Here we could test if Final is actually final, but it's impossible, because:
//  - We want `Object` default-constructible (can't test in
//  constructor/destructor)
//  - Can't test in `Object` body, because `Final` may be incomplete
template <class Options = Options<>>
// requires is::Options<Options> && std::is_final_v<Final>
class RELOCATABLE(Object) {
	using Self = Object;
	RELOCATABLE_BODY

protected:
	// get Final from CRTP, and apply correct cvref-qualifiers
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto) final(this auto &&self) noexcept {
		return std::forward<decltype(self)>(self).template as<Final>();
	}

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
};
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
