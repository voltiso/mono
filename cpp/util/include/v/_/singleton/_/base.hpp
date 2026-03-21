#pragma once
#include <v/_/_>

#include "config.hpp"

#include "v/is/options"
#include "v/mixin/builder"

#include <v/ON>
namespace V::singleton::_ {

template <is::Options O> class Base : public V::mixin::Builder<O>, public V::mixin::Options_<O> {
protected:
	using Config = _::Config<O>;
};

} // namespace V::singleton::_
#include <v/OFF>
