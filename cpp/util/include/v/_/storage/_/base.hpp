#pragma once
#include <v/_/_>

#include "../options.hpp"
#include "data-bytes.hpp"
#include "data-union.hpp"

#include "v/is/options"
#include "v/mixin/builder"

#include <v/ON>
namespace V::storage::_ {

//

template <is::Options O>
using Data = std::conditional_t<
  mixin::Options_<O>::Options::template get<option::nonUnion>, DataBytes<O>, DataUnion<O>>;

template <is::Options O> class Base : public V::mixin::Builder<O>, public Data<O> {
protected:
	using Config = _::Config<O>;
};

//

} // namespace V::storage::_
#include <v/OFF>
