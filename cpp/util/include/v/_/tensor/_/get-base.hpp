#pragma once
#include <v/_/_>

#include "../option.hpp"
#include "base.hpp"

#include "v/is/option"
#include "v/options"

#include <v/ON>
namespace V::tensor::_ {

template <is::Option... Os>
using GetBase = Base<
  typename Options<Os...>::template WithIfMissing<options::option::defaultOptions<DefaultOptions>>>;

} // namespace V::tensor::_
#include <v/OFF>
