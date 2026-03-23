#pragma once
#include <v/_/_>

#include "tensor.hpp"

#include <initializer_list>

#include <v/ON>

namespace V::tensor {
template <class Item, Size numItems>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto from(const Item (&rawArray)[numItems]) {
	return Tensor<Item, numItems>::from(rawArray);
}

template <class Item, Size numItems>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const std::initializer_list<Item> &list) {
	static_assert(list.size() == numItems, "wrong constructor selected");
	return Tensor<Item, numItems>::from(list);
}
} // namespace V::tensor

#include <v/OFF>
