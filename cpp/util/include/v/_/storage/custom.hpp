#pragma once
#include <v/_/_>

#include "impl.hpp"

#include "v/concepts/options"
#include "v/mixin/non-relocatable"
#include "v/option/item"

#include <v/ON>

namespace VOLTISO_NAMESPACE::storage {
template <concepts::Options Options>
class Custom : public _::Impl<Options>, public mixin::NonRelocatable {
	using Base = _::Impl<Options>;
	VOLTISO_INHERIT_RVALUE_COPY(Custom);
};

template <concepts::Options Options>
  requires is::relocatable<typename Options::template Get<option::Item>>
class RELOCATABLE(Custom<Options>) : public _::Impl<Options> {
	RELOCATABLE_BODY(Custom<Options>);
	using Base = _::Impl<Options>;
	VOLTISO_INHERIT_RVALUE_COPY(Custom);
};
} // namespace VOLTISO_NAMESPACE::storage

#include <v/OFF>
