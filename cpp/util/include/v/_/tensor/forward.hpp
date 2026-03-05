#pragma once
#include <v/_/_>

#include "v/_/is/relocatable.hpp"
#include "v/concepts/options"
#include "v/option/item"

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor {

//

template <concepts::Options Options> class Custom;

template <concepts::Options Options>
  requires is::relocatable<typename Options::template Get<option::Item>>
class RELOCATABLE(Custom<Options>);

//

template <concepts::Options Options> struct Specializations {
	using Result = Custom<Options>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::tensor

namespace VOLTISO_NAMESPACE {
template <class Item, auto... ES> class Tensor;
template <class Item, auto... ES>
  requires is::relocatable<Item>
class RELOCATABLE(Tensor<Item COMMA ES...>);
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
