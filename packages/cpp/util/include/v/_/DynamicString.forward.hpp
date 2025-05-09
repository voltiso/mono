#pragma once
#include <v/_/_>

#include "v/concepts/Options"

namespace VOLTISO_NAMESPACE::dynamicString {
template <class TOptions>
  requires concepts::Options<TOptions>
class Custom;

template <class Options>
  requires concepts::Options<Options>
struct Specializations;
} // namespace VOLTISO_NAMESPACE::dynamicString

//

namespace VOLTISO_NAMESPACE {
class DynamicString;
} // namespace VOLTISO_NAMESPACE

// !

namespace VOLTISO_NAMESPACE::dynamicString {
// Overload for C-style string literals
template <std::size_t NUM_ITEMS_WITH_NULL>
[[nodiscard]] VOLTISO_FORCE_INLINE auto
from(const char (&rawString)[NUM_ITEMS_WITH_NULL]);

// Generic overload for other char-yielding ranges
template <class OtherItems>
  requires(
    (std::is_reference_v<OtherItems> ||
     std::is_const_v<std::remove_reference_t<OtherItems>>) &&
    (std::is_same_v<
      char,
      std::remove_cvref_t<decltype(*std::begin(std::declval<OtherItems>()))>>))
[[nodiscard]] VOLTISO_FORCE_INLINE auto from(OtherItems &&otherItems);
} // namespace VOLTISO_NAMESPACE::dynamicString
