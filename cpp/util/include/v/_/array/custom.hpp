#pragma once
#include <v/_/_>

#include "_forward.hpp"
#include "impl.hpp"

#include "v/_/is/relocatable.hpp"
#include "v/concepts/options"
#include "v/option/item"

#include <v/ON>

namespace VOLTISO_NAMESPACE::array {
template <concepts::Options Options> class Custom : public array::_::Impl<Options> {
	using Base = array::_::Impl<Options>;
	VOLTISO_INHERIT(Custom);
};

template <concepts::Options Options>
  requires is::relocatable<typename Options::template Get<option::Item>>
class RELOCATABLE(Custom<Options>) : public array::_::Impl<Options> {
	using Self = Custom;
	RELOCATABLE_BODY
	using Base = array::_::Impl<Options>;
	VOLTISO_INHERIT(Custom);
};
} // namespace VOLTISO_NAMESPACE::array

#include <v/OFF>
