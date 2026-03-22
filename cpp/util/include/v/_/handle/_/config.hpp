#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"

#include <v/ON>
namespace V::handle::_ {

template <is::Options O> class Config {
public:
	using Value = O::template Get<option::Value>;
	using Brand = O::template Get<option::Brand>;
};

} // namespace V::handle::_
#include <v/OFF>
