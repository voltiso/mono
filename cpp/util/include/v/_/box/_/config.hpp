#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"

#include <v/ON>
namespace V::box::_ {

template <is::Options O> class Config {

public:
	using Item = O::template Get<option::Item>;
	static constexpr auto arithmetic = O::template get<option::arithmetic>;
	static constexpr auto bitwise = O::template get<option::bitwise>;
	static constexpr auto comparable = O::template get<option::comparable>;
	static constexpr auto logical = O::template get<option::logical>;
	static constexpr auto implicit = O::template get<option::implicit>;
};

} // namespace V::box::_
#include <v/OFF>
