#pragma once
#include <v/_/_>

#include "v/concepts/options"

#include <type_traits>

namespace VOLTISO_NAMESPACE::dynamicArray {
template <class Options>
  requires concepts::Options<Options>
class Custom;
} // namespace VOLTISO_NAMESPACE::dynamicArray

//

namespace VOLTISO_NAMESPACE {
template <class Item> class DynamicArray;
} // namespace VOLTISO_NAMESPACE

// !

// namespace VOLTISO_NAMESPACE::dynamicArray {
// template <class Items>
// DynamicArray<
//   std::remove_reference_t<decltype(*std::begin(std::declval<Items>()))>>
// from(Items &&items);
// } // namespace VOLTISO_NAMESPACE::dynamicArray

namespace VOLTISO_NAMESPACE::dynamicArray {
// explicit copy
// if OtherItems is rvalue, it must be const (marked for copy)
template <class OtherItems>
  requires(
    std::is_reference_v<OtherItems> ||
    std::is_const_v<std::remove_reference_t<OtherItems>>)
[[nodiscard]] VOLTISO_FORCE_INLINE /*constexpr*/ auto
from(OtherItems &&otherItems);

template <class Item>
[[nodiscard]] VOLTISO_FORCE_INLINE /*constexpr*/ auto
from(std::initializer_list<Item> items);
} // namespace VOLTISO_NAMESPACE::dynamicArray
