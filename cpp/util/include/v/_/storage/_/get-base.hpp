#pragma once
#include <v/_/_>

#include "../options.hpp"
#include "base.hpp"

#include "v/is/option"
#include "v/options"

#include <v/ON>
namespace V::storage::_ {

template <is::Option... Os>
using GetBase = Base<
  typename Options<Os...>::template WithIfMissing<options::option::defaultOptions<DefaultOptions>>>;

} // namespace V::storage::_
#include <v/OFF>
