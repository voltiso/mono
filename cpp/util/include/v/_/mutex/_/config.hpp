#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::mutex::_ {

template <is::Options O> class Config {
public:
	static constexpr bool enabled = O::template get<option::enabled>;
};

} // namespace VOLTISO_NAMESPACE::mutex::_
#include <v/OFF>
