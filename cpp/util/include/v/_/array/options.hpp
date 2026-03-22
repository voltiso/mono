#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/mixin/copy"
#include "v/mixin/crtp"
#include "v/option"
#include "v/options"
#include "v/size"

#include <v/ON>

namespace V::array::option {
template <class I> struct Item : Option::Type<I> {};
template <Size n> struct numItems : Option::Value<n> {};
// template <std::make_signed_t<Size> n> struct startingIndex : Option::Value<n> {};
// template <bool B> struct implicitCopy : Option::Value<B> {};
} // namespace V::array::option

namespace V::array {
using DefaultOptions = Options<
  option::Item<void>, option::numItems<0>,
  //
  mixin::copy::option::implicitCopy<false>,
  //
  mixin::crtp::option::customTemplate<GetCustom>>;
} // namespace V::array

#include <v/OFF>
