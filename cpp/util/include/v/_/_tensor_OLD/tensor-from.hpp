#pragma once
#include <v/_/_>

#include "tensor.hpp"

#include <initializer_list>

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor {
template <class Item, int EXTENT>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const Item (&rawArray)[EXTENT]) {
	return Tensor<Item, EXTENT>::from(rawArray);
}

template <class Item, int EXTENT>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const std::initializer_list<Item> &list) {
	static_assert(list.size() == EXTENT, "wrong constructor selected");
	return Tensor<Item, EXTENT>::from(list);
}
} // namespace VOLTISO_NAMESPACE::tensor

#include <v/OFF>
