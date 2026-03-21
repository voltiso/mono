#pragma once
#include <v/_/_>

#include "config.hpp"

#include "v/is/options"
#include "v/mixin/builder"

#include <v/ON>
namespace V::handle::_ {

template <is::Options O> class Base : public V::mixin::Builder<O> {
protected:
	using Config = _::Config<O>;
};

} // namespace V::handle::_
#include <v/OFF>
