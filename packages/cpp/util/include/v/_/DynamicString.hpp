#pragma once
#include <v/_/_>

#include "v/ConstStringSlice"
#include "v/DynamicArray"
#include "v/Options"
#include "v/Slice" // For dynamicString::from(const char[])
#include "v/_/DynamicString.forward.hpp"
#include "v/get/Brands"
#include "v/option/CustomTemplate"
#include "v/option/Item"
#include "v/option/Self"
#include <utility>

namespace VOLTISO_NAMESPACE::dynamicString {
template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};

template <class... Args>
using GetCustom = typename Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::dynamicString

// !

namespace VOLTISO_NAMESPACE::dynamicString {
template <class TOptions>
  requires concepts::Options<TOptions>
class Custom
    : public dynamicArray::Custom<typename TOptions::template WithDefault<
        option::Item<char>, option::CustomTemplate<GetCustom>>> {
	using Base = dynamicArray::Custom<typename TOptions::template WithDefault<
	  option::Item<char>, option::CustomTemplate<GetCustom>>>;
	using Base::Base;

public:
	VOLTISO_FORCE_INLINE auto dynamic() const && -> auto {
		return dynamicArray::from(this->self());
	}

public:
	template <class Other>
	decltype(auto) operator<<=(this auto &&self, const Other &other) {
		self.template cast<Base>().operator<<=(ConstStringSlice(other));
		return std::forward<decltype(self)>(self);
	}
};
} // namespace VOLTISO_NAMESPACE::dynamicString

// !

namespace VOLTISO_NAMESPACE {
class DynamicString : public dynamicString::Custom<VOLTISO_NAMESPACE::Options<
                        option::Item<char>, option::Self<DynamicString>>> {
	using Base = dynamicString::Custom<VOLTISO_NAMESPACE::Options<
	  option::Item<char>, option::Self<DynamicString>>>;
	using Base::Base;
};
} // namespace VOLTISO_NAMESPACE

// !

namespace VOLTISO_NAMESPACE::dynamicString {
// Overload for C-style string literals
// Creates a DynamicString from a raw string, excluding the null terminator.
template <std::size_t NUM_ITEMS_WITH_NULL>
[[nodiscard]] VOLTISO_FORCE_INLINE auto
from(const char (&rawString)[NUM_ITEMS_WITH_NULL]) {
	// Create a slice of the raw string, excluding the null terminator.
	// NUM_ITEMS_WITH_NULL must be >= 1. If 1 (empty string ""), size is 0.
	auto slice = VOLTISO_NAMESPACE::Slice(
	  rawString, NUM_ITEMS_WITH_NULL > 0 ? NUM_ITEMS_WITH_NULL - 1 : 0);
	// Delegate to DynamicString's static from method (inherited from
	// dynamicArray::Custom) This will construct a new DynamicString by copying
	// elements from the slice.
	return VOLTISO_NAMESPACE::DynamicString::from(slice);
}

// Generic overload for other char-yielding ranges.
// Creates a new DynamicString by copying, propagating brands from OtherItems.
template <class OtherItems>
  requires(
    // Standard copy semantics: if rvalue, must be const.
    (std::is_reference_v<OtherItems> ||
     std::is_const_v<std::remove_reference_t<OtherItems>>) &&
    // Ensure items are char after removing cv-ref qualifiers.
    (std::is_same_v<
      char,
      std::remove_cvref_t<decltype(*std::begin(std::declval<OtherItems>()))>>))
[[nodiscard]] VOLTISO_FORCE_INLINE auto from(OtherItems &&otherItems) {
	using OtherItemsClass = std::remove_reference_t<OtherItems>;
	using OtherBrands = get::Brands<OtherItemsClass>;
	using ResultType =
	  typename VOLTISO_NAMESPACE::DynamicString::template WithDefault<
	    OtherBrands>;
	return ResultType::from(std::forward<OtherItems>(otherItems));
}
} // namespace VOLTISO_NAMESPACE::dynamicString
