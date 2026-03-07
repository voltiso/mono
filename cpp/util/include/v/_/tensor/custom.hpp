#pragma once
#include <v/_/_>

#include "_forward.hpp"
#include "impl.hpp"

#include "v/_/is/relocatable.hpp"
#include "v/concepts/options"
#include "v/option/item"

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor {
template <concepts::Options Options>
class Custom : public _::tensor::CustomNNR<Options> {
	using Base = _::tensor::CustomNNR<Options>;
	using Base::Base;
	VOLTISO_INHERIT_RVALUE_COPY(Custom, Base);
};

template <concepts::Options Options>
  requires is::relocatable<typename Options::template Get<option::Item>>
class RELOCATABLE(Custom<Options>) : public _::tensor::CustomNNR<Options> {
	RELOCATABLE_BODY(Custom<Options>);

private:
	using Base = _::tensor::CustomNNR<Options>;
	using Base::Base;
	VOLTISO_INHERIT_RVALUE_COPY(Custom, Base);
};
} // namespace VOLTISO_NAMESPACE::tensor

#include <v/OFF>
