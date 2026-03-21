#pragma once
#include <v/_/_>

#include "v/options"

#include "v/is/options"

#include <v/ON>
namespace V::mixin {

template <is::Options O> class Options_ {
public:
	using DefaultOptions = O::template Get<options::option::defaultOptions>;
	using Options = O;
};

} // namespace V::mixin
#include <v/OFF>
