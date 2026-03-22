#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/mixin/crtp"
#include "v/option"
#include "v/options"

#include <v/ON>
namespace V::storage {

namespace option {
template <class TItem> struct Item : Option::Type<TItem> {};
template <bool B> struct nonUnion : Option::Value<B> {};
} // namespace option

using DefaultOptions = Options<
  option::Item<void>, option::nonUnion<false>,
  //
  mixin::crtp::option::customTemplate<GetCustom>>;

} // namespace V::storage
#include <v/OFF>
