#pragma once
#include <v/_/_>

#include "config.hpp"
#include "mixin/all.hpp"

#include "v/_/mixin/crtp/crtp.hpp"
#include "v/is/options"
#include "v/mixin/copy"
#include "v/mixin/move"

#include <v/ON>
namespace V::tensor::_ {

//

template <is::Options O>
class Base : public V::mixin::Builder<O>,
             public V::mixin::Crtp<O>,
             //
             public mixin::All<O>,
             //
             public V::mixin::Copy<O>,
             public V::mixin::Move<O> {
protected:
	using Config = _::Config<O>;
};

//

#include <v/OFF>
} // namespace V::tensor::_
