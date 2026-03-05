#pragma once
#include <v/_/_>

#include "v/concepts/options"

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

template <class Other>
[[nodiscard]] VOLTISO_FORCE_INLINE auto from(Other &&other);

template <class... Args>
[[nodiscard]] VOLTISO_FORCE_INLINE auto concat(Args &&...args);
} // namespace VOLTISO_NAMESPACE::dynamicString
