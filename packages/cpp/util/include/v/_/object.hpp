#pragma once
#include <v/_/_>

#include "v/_/copy.forward.hpp"
#include "v/_/object.forward.hpp" // IWYU pragma: keep

#include "v/option/custom-template"
#include "v/option/input-options"
#include "v/option/self"
#include "v/option/trivially-relocatable"

#include <memory>
#include <type_traits>

namespace VOLTISO_NAMESPACE {

// Here we could test if Final is actually final, but it's impossible, because:
//  - We want `Object` default-constructible (can't test in
//  constructor/destructor)
//  - Can't test in `Object` body, because `Final` may be incomplete
template <class TOptions>
// requires concepts::Options<Options> && std::is_final_v<Final>
class Object {
public:
	using Options = TOptions;

	static constexpr bool IS_VOLTISO_OBJECT = true;
	static constexpr bool IS_TRIVIALLY_RELOCATABLE =
	  Options::template GET<option::TRIVIALLY_RELOCATABLE>;

protected:
	template <class OptionsArg>
	using CustomTemplate =
	  Options::template GetTemplate<option::CustomTemplate, OptionsArg>;

	// Use InputOptions if provided, otherwise fall back to Options
	using InputOptions = std::conditional_t<
	  !std::is_same_v<typename Options::template Get<option::InputOptions>, void>,
	  typename Options::template Get<option::InputOptions>, Options>;

protected:
	// CRTP
	using Self = std::conditional_t<
	  !std::is_same_v<typename Options::template Get<option::Self>, void>,
	  typename Options::template Get<option::Self>,
	  // if option::Self was not provided for true CRTP,
	  // try using provided `CustomTemplate<InputOptions>` instead
	  // (which might not yield the final class in chain)
	  CustomTemplate<InputOptions>>;

protected:
	// get Self from CRTP, and apply correct cvref-qualifiers
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	self(this auto &&self) noexcept {
		return std::forward<decltype(self)>(self).template as<Self>();
	}

public:
	template <class... MoreOptions>
	using With = CustomTemplate<typename InputOptions ::template With<
	  MoreOptions...>::template Without<option::Self>>;

	template <class... MoreOptions>
	using WithDefault =
	  CustomTemplate<typename InputOptions ::template WithDefault<
	    MoreOptions...>::template Without<option::Self>>;

public:
	/// cast to another class, preserving cvref-qualifiers
	template <class NewSelfClass>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	as(this auto &&self) noexcept {
		static_assert(sizeof(NewSelfClass) == sizeof(self));
		static_assert(!std::is_reference_v<NewSelfClass>);
		static_assert(!std::is_const_v<NewSelfClass>);
		static_assert(!std::is_volatile_v<NewSelfClass>);
		using Self = decltype(self);

		// Determine cv-qualifiers based on self's underlying type
		constexpr bool isConst = std::is_const_v<std::remove_reference_t<Self>>;
		constexpr bool isVolatile =
		  std::is_volatile_v<std::remove_reference_t<Self>>;

		// Apply cv-qualifiers to the target base type NewSelfClass
		// Build the non-reference cv-qualified type first
		using MaybeConstNewSelf =
		  std::conditional_t<isConst, const NewSelfClass, NewSelfClass>;
		using NewSelfCvQualified = std::conditional_t<
		  isVolatile, std::add_volatile_t<MaybeConstNewSelf>, MaybeConstNewSelf>;

		// Determine the final target type including reference qualifier
		using TargetCvRefQualified = std::conditional_t<
		  std::is_rvalue_reference_v<Self>,
		  std::add_rvalue_reference_t<NewSelfCvQualified>,
		  std::add_lvalue_reference_t<NewSelfCvQualified>>;

		// Step 1: Cast address to pointer to the cv-qualified VALUE type
		// (Safety of reinterpret_cast still depends on relationship between
		// SelfClass and NewSelfClass)
		auto *targetPtr =
		  reinterpret_cast<NewSelfCvQualified *>(std::addressof(self));

		// Step 2: Dereference and static_cast the result to the final
		// CVREF-qualified type
		return static_cast<TargetCvRefQualified>(*targetPtr);
	}

public:
	template <class Brand>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	brand(this auto &&self) noexcept {
		using Self = decltype(self);
		using SelfClass = std::remove_cvref_t<Self>;
		// static_assert(std::is_final_v<SelfClass>);

		// use `With` from the derived class (`Object::With` may be overridden)
		using NewSelfClass = typename SelfClass::template With<Brand>;

		return std::forward<decltype(self)>(self).template as<NewSelfClass>();
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
	// Your code must respect constness of the rvalue reference!
	// it's not a temporary just because it's rvalue!
	template <class Self>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr decltype(auto)
	copy(this Self &self) noexcept {
		// requires {
		// 	Self(std::declval<const Self &&>());
		// 	std::declval<Self &>() = std::declval<const Self &&>();
		// }
		if constexpr (std::is_constructible_v<Self, const Self &&>
		              // && std::is_assignable_v<std::remove_const_t<Self> &, const
		              // Self &&>
		) {
			using NewSelf = const Self &&;
			return static_cast<NewSelf>(self);
		} else {
			// since trivially copyable types are unable to support the const-rvalue
			// syntax, we use `Copy` wrapper instead
			return Copy<Self>{self};
		}
	}

	// public:
	// // our explicit copy mechanism (see `.copy()`)
	// Object(const Self &&) {}

	// VOLTISO_FORCE_INLINE consteval Object(
	//   tag::ExplicitCopyConsteval, const Object &other) noexcept = default;

	// VOLTISO_FORCE_INLINE constexpr Object(
	//   tag::ExplicitCopy, const Object &other) noexcept = default;

public:
	Object() = default;  // must be trivially default constructible
	~Object() = default; // must be trivially destructible
};
} // namespace VOLTISO_NAMESPACE
