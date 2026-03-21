#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/mixin/crtp"
#include "v/option"
#include "v/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::mutex::option {
template <bool b> struct enabled : Option::Value<b> {};
} // namespace VOLTISO_NAMESPACE::mutex::option

//

namespace VOLTISO_NAMESPACE::mutex {
using DefaultOptions = Options<
  option::enabled<true>,
  //
  mixin::crtp::option::CustomTemplate<GetCustom>, mixin::crtp::option::InputOptions<>>;
} // namespace VOLTISO_NAMESPACE::mutex

#include <v/OFF>
