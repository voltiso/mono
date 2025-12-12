#pragma once
#include <v/_/_>

#include "v/_/quaternion.forward.hpp"

#include "v/_/tensor.hpp"

#include <initializer_list>
#include <type_traits>

#include <v/ON>

namespace VOLTISO_NAMESPACE {
template <class Item>
class Quaternion : public tensor::Custom<Options<
                     option::Item<Item>, option::Extents<ValuePack<4>>,
                     option::Self<Quaternion<Item>>>> {
	using Base = tensor::Custom<Options<
	  option::Item<Item>, option::Extents<ValuePack<4>>,
	  option::Self<Quaternion<Item>>>>;
	using Base::Base;

public:
	constexpr auto w() const -> const Item & { return (*this)[0]; }
	constexpr auto x() const -> const Item & { return (*this)[1]; }
	constexpr auto y() const -> const Item & { return (*this)[2]; }
	constexpr auto z() const -> const Item & { return (*this)[3]; }

	constexpr auto w() -> Item & { return (*this)[0]; }
	constexpr auto x() -> Item & { return (*this)[1]; }
	constexpr auto y() -> Item & { return (*this)[2]; }
	constexpr auto z() -> Item & { return (*this)[3]; }
};

template <
  class T, class U, class V, class W,
  std::enable_if_t<
    std::conjunction_v<
      std::is_same<T, U>, std::is_same<T, V>, std::is_same<T, W>>,
    int> = 0>
Quaternion(T, U, V, W) -> Quaternion<std::type_identity_t<T>>;

namespace quaternion {
template <class Item, int EXTENT>
  requires(EXTENT == 4)
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const Item (&rawArray)[EXTENT]) {
	return Quaternion<Item>::from(rawArray);
}

template <class Item, int EXTENT>
  requires(EXTENT == 4)
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const std::initializer_list<Item> &list) {
	EQ(list.size(), EXTENT);
	return Quaternion<Item>::from(list);
}
} // namespace quaternion

} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
