#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"
#include "v/mixin/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::atomic::_ {

//

template <is::Options O> struct Config {
	using _Options = V::mixin::Options_<O>::Options;

	using Item = _Options::template Get<option::Item>;
	static constexpr bool enabled = _Options::template get<option::enabled>;
};

//

} // namespace VOLTISO_NAMESPACE::atomic::_
#include <v/OFF>
