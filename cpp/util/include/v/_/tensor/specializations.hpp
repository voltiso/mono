#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/option/extents"
#include "v/option/item"
#include "v/options"
// #include "v/value-pack"
// #include "v/tensor"

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor {
template <class Item, auto... ES>
struct Specializations<
  Options<option::Item<Item>, option::Extents<ValuePack<ES...>>>> {
	using Result = Tensor<Item, ES...>;
};
} // namespace VOLTISO_NAMESPACE::tensor

#include <v/OFF>
