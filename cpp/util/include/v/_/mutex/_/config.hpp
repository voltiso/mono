#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::mutex::_ {

template <is::Options O> class Config {
	using _Options = V::mixin::Options_<O>::Options;

public:
	static constexpr bool enabled = _Options::template get<option::enabled>;
};

} // namespace VOLTISO_NAMESPACE::mutex::_
#include <v/OFF>
