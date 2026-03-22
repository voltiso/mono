#pragma once
#include <v/_/_>

#include "../options.hpp"
#include "base.hpp"

#include "v/is/option"
#include "v/options"

#include <v/ON>
namespace V::singleton::_ {

template <is::Option... Os>
using GetBase = Base<
  typename Options<Os...>::template WithIfMissing<options::option::defaultOptions<DefaultOptions>>>;

} // namespace V::singleton::_
#include <v/OFF>
