#pragma once
#include <v/_/_>

#include "forward.hpp"
#include "impl.hpp"

#include "v/_/is/relocatable.hpp"
#include "v/is/options"
#include "v/option/item"

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor {
template <is::Options Options> class Custom : public _::tensor::CustomNNR<Options> {
	using Self = Custom;
	RELOCATABLE_BODY_IF(is::relocatable<typename Options::template Get<option::Item>>)
	using Base = _::tensor::CustomNNR<Options>;
	VOLTISO_INHERIT(Custom);
};

// template <is::Options Options>
//   requires is::relocatable<typename Options::template Get<option::Item>>
// class RELOCATABLE(Custom<Options>) : public _::tensor::CustomNNR<Options> {
// 	using Self = Custom;
// 	RELOCATABLE_BODY
// 	using Base = _::tensor::CustomNNR<Options>;
// 	VOLTISO_INHERIT(Custom);
// };
} // namespace VOLTISO_NAMESPACE::tensor

#include <v/OFF>
