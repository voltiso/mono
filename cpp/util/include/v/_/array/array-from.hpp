#pragma once
#include <v/_/_>

#include "array.hpp"

#include <initializer_list>

#include <v/ON>

namespace V::array {
template <class Item, Size numItems>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto from(const Item (&rawArray)[numItems]) {
	return Array<Item, numItems>::from(rawArray);
}

template <class Item, Size numItems>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const std::initializer_list<Item> &list) {
	static_assert(list.size() == numItems, "wrong constructor selected");
	return Array<Item, numItems>::from(list);
}
} // namespace V::array

#include <v/OFF>
