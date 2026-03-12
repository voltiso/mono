#pragma once
#include <v/_/_>

#include "impl.hpp"

#include "v/concepts/options"
// #include "v/option/item"

#include <v/ON>

namespace VOLTISO_NAMESPACE::storage {
template <concepts::Options Options> class Custom : public _::Impl<Options> {
	using Base = _::Impl<Options>;
	using Self = Custom;
	using Item = typename Options::template Get<option::Item>;
	RELOCATABLE_BODY_IF(is::relocatable<Item>)
	VOLTISO_INHERIT(Custom);
};

// template <concepts::Options Options>
//   requires is::relocatable<typename Options::template Get<option::Item>>
// class RELOCATABLE(Custom<Options>) : public _::Impl<Options> {
// 	RELOCATABLE_BODY(Custom<Options>);
// 	using Base = _::Impl<Options>;
// 	VOLTISO_INHERIT(Custom);
// };
} // namespace VOLTISO_NAMESPACE::storage

#include <v/OFF>
