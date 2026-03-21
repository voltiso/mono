#pragma once
#include <v/_/_>

#include "config.hpp"
#include "mixin/arithmetic.hpp"
#include "mixin/bitwise.hpp"
#include "mixin/comparable.hpp"
#include "mixin/logical.hpp"

#include "v/is/options"
#include "v/mixin/builder"

#include <v/ON>
namespace V::box::_ {

//

template <is::Options O>
class Base : public V::mixin::Options_<O>,
             public V::mixin::Builder<O>,
             public mixin::Comparable<O>,
             public mixin::Arithmetic<O>,
             public mixin::Bitwise<O>,
             public mixin::Logical<O> {
protected:
	using Config = _::Config<O>;
};

//

} // namespace V::box::_
#include <v/OFF>
