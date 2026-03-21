#pragma once
#include <v/_/_>

#include "../options.hpp"
#include "base.hpp"

#include "v/is/option"
#include "v/mixin/crtp"
#include "v/options"

#include <v/ON>
namespace V::storage::_ {

template <is::Option... Os>
using GetBase = Base<typename Options<Os...>::template WithIfMissing<
  mixin::crtp::option::InputOptions<Os...>, options::option::defaultOptions<DefaultOptions>>>;

} // namespace V::storage::_
#include <v/OFF>
