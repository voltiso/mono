#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"
#include "v/mixin/options"

#include <v/ON>
namespace V::storage::_ {

//

template <is::Options O> class Config {
	using _Options = V::mixin::Options_<O>::Options;

public:
	using Item = _Options::template Get<option::Item>;
};

//

} // namespace V::storage::_
#include <v/OFF>
