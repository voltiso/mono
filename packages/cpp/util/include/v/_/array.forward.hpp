#pragma once
#include <v/_/_>

#include "v/concepts/options"

#include <cstddef>

namespace VOLTISO_NAMESPACE {
template <class Item, size_t NUM_ITEMS> class Array;
} // namespace VOLTISO_NAMESPACE

namespace VOLTISO_NAMESPACE::array {
template <class Options>
  requires concepts::Options<Options>
class Custom;
} // namespace VOLTISO_NAMESPACE::array
