#pragma once
#include <v/_/_>

#include "../options.hpp"
#include "base.hpp"

#include "v/is/option"
#include "v/options"

#include <v/ON>

namespace V::box::_ {

template <is::Option... Os>
using GetOptions = typename Options<Os...>::template WithIfMissing<
  V::options::option::defaultOptions<DefaultOptions>>;

template <is::Option... Os> using GetBase = Base<GetOptions<Os...>>;
} // namespace V::box::_

#include <v/OFF>
