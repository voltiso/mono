#pragma once
#include <v/_/_>

#include "v/concepts/options"

namespace VOLTISO_NAMESPACE::storage {
template <class Options>
  requires concepts::Options<Options>
class Custom;
}

namespace VOLTISO_NAMESPACE {
template <class Item> class Storage;
} // namespace VOLTISO_NAMESPACE
