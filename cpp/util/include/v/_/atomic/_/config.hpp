#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::atomic::_ {

//

template <is::Options O> struct Config {
	using Item = O::template Get<option::Item>;
	static constexpr bool enabled = O::template get<option::enabled>;
};

//

} // namespace VOLTISO_NAMESPACE::atomic::_
#include <v/OFF>
