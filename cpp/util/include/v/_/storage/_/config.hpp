#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/is/options"

#include <v/ON>
namespace V::storage::_ {

//

template <is::Options O> class Config {
public:
	using Item = O::template Get<option::Item>;
};

//

} // namespace V::storage::_
#include <v/OFF>
