#pragma once
#include <v/_/_>

#include "_/impl.hpp"
#include "forward.hpp"

#include "v/_/is/relocatable.hpp"

#include <v/ON>

namespace VOLTISO_NAMESPACE::array {
template <is::Option... Os> class Custom : public array::_::Impl<Os...> {
	using Base = array::_::Impl<Os...>;
	VOLTISO_INHERIT(Custom);
};

template <is::Option... Os>
  requires is::relocatable<typename Options<Os...>::template Get<option::Item>>
class RELOCATABLE(Custom<Os...>) : public array::_::Impl<Os...> {
	using Self = Custom;
	RELOCATABLE_BODY
	using Base = array::_::Impl<Os...>;
	VOLTISO_INHERIT(Custom);
};
} // namespace VOLTISO_NAMESPACE::array

#include <v/OFF>
