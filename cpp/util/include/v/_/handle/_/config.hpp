#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"

#include <v/ON>
namespace V::handle::_ {

template <is::Options O> class Config {
	using _Options = V::mixin::Options_<O>::Options;

public:
	using Value = _Options::template Get<option::Value>;
	using Brand = _Options::template Get<option::Brand>;
};

} // namespace V::handle::_
#include <v/OFF>
