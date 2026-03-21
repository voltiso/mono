#pragma once
#include <v/_/_>

#include "config.hpp"

#include "v/_/mixin/crtp/crtp.hpp"
#include "v/is/options"
#include "v/mixin/array"
#include "v/mixin/copy"

#include <v/ON>
namespace V::array::_ {

//

template <is::Options O>
class Base : public V::mixin::Builder<O>,
             public V::mixin::Crtp<O>,
             //
             public mixin::Array<O>,
             public mixin::Copy {
protected:
	using Config = _::Config<O>;
};

//

#include <v/OFF>
} // namespace V::array::_
