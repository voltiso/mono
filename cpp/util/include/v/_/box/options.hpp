#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/mixin/crtp"
#include "v/option"
#include "v/options"

#include <v/ON>
namespace V::box {

namespace option {
template <class TItem> struct Item : Option::Type<TItem> {};

template <bool b> struct comparable : Option::Value<b> {};
template <bool b> struct arithmetic : Option::Value<b> {};
template <bool b> struct bitwise : Option::Value<b> {};
template <bool b> struct logical : Option::Value<b> {};
template <bool b> struct implicit : Option::Value<b> {};
} // namespace option

using DefaultOptions = Options<
  option::Item<void>,
  //
  option::comparable<false>, option::arithmetic<false>, option::bitwise<false>,
  option::logical<false>, option::implicit<false>,
  //
  mixin::crtp::option::customTemplate<GetCustom>>;

} // namespace V::box
#include <v/OFF>
