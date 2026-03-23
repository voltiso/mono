#pragma once
#include <v/_/_>

#include "_/impl.hpp"
#include "forward.hpp"

#include "v/_/is/relocatable.hpp"

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor {
template <is::Option... Os> class Custom : public tensor::_::Impl<Os...> {
	using Base = tensor::_::Impl<Os...>;
	VOLTISO_INHERIT(Custom);
};

template <is::Option... Os>
  requires is::relocatable<typename Options<Os...>::template Get<option::item>>
class RELOCATABLE(Custom<Os...>) : public tensor::_::Impl<Os...> {
	using Self = Custom;
	RELOCATABLE_BODY
	using Base = tensor::_::Impl<Os...>;
	VOLTISO_INHERIT(Custom);
};
} // namespace VOLTISO_NAMESPACE::tensor

#include <v/OFF>
