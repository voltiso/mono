#pragma once
#include <v/_/_>

#include "extent.hpp"
#include "forward.hpp"
#include "stride.hpp"

#include "v/mixin/crtp"
#include "v/option"
#include "v/options"
#include "v/size"

#include <v/ON>

namespace V::tensor::option {
template <class I> struct item : Option::Type<I> {};
template <Size n> struct numItems : Option::Value<n> {};
template <bool b> struct implicitCopy : Option::Value<b> {};

template <Extent... e> struct extents : Option::Value<Extents{e...}> {};
template <Stride... s> struct strides : Option::Value<Strides{s...}> {};
// template <Origin... o> struct origins : Option::Value<Origins{o...}> {};

/// std interop
template <bool b> struct std : Option::Value<b> {};
} // namespace V::tensor::option

namespace V::tensor {
using DefaultOptions = Options<
  option::item<void>, option::numItems<0>,
  //
  option::implicitCopy<false>,
  //
  option::std<false>,
  //
  mixin::crtp::option::customTemplate<GetCustom>>;
} // namespace V::tensor

#include <v/OFF>
