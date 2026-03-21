#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/mixin/crtp"
#include "v/option"
#include "v/options"

#include <v/ON>

namespace V::handle::option {
template <class I> struct Value : Option::Type<I> {};
template <class B> struct Brand : Option::Type<B> {};
} // namespace V::handle::option

namespace V::handle {
using DefaultOptions = Options<
  option::Value<void *>, option::Brand<void>,
  //
  mixin::crtp::option::CustomTemplate<GetCustom>, mixin::crtp::option::InputOptions<>>;
} // namespace V::handle

#include <v/OFF>
