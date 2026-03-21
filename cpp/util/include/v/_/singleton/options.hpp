#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/mixin/crtp"
#include "v/option"
#include "v/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE::singleton::option {
template <class I> struct Item : Option::Type<I> {};
template <bool b> struct lazy : Option::Value<b> {};
template <bool b> struct threadLocal : Option::Value<b> {};
template <bool b> struct concurrent : Option::Value<b> {};
} // namespace VOLTISO_NAMESPACE::singleton::option

namespace VOLTISO_NAMESPACE::singleton {
using DefaultOptions = Options<
  option::Item<void>, option::lazy<false>, option::threadLocal<false>, option::concurrent<false>,
  //
  mixin::crtp::option::CustomTemplate<GetCustom>, mixin::crtp::option::InputOptions<>>;
} // namespace VOLTISO_NAMESPACE::singleton

#include <v/OFF>
