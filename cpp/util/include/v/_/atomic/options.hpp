#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/mixin/crtp"
#include "v/option"
#include "v/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE::atomic::option {
template <class I> struct Item : Option::Type<I> {};
template <bool b> struct enabled : Option::Value<b> {};
} // namespace VOLTISO_NAMESPACE::atomic::option

//

namespace VOLTISO_NAMESPACE::atomic {
using DefaultOptions = Options<
  option::Item<void>,
  //
  option::enabled<true>,
  //
  mixin::crtp::option::customTemplate<GetCustom>>;

} // namespace VOLTISO_NAMESPACE::atomic

#include <v/OFF>
