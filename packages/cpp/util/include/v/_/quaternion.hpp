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

	[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto identity()
	  requires(std::is_constructible_v<Item, int>)
	{
		return Quaternion{Item(1), Item(0), Item(0), Item(0)};
	}

	template <class OtherItem>
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr auto
	operator*(const Quaternion<OtherItem> &other) const {
		using ResultItem = std::common_type_t<Item, OtherItem>;
		const ResultItem aw = this->w();
		const ResultItem ax = this->x();
		const ResultItem ay = this->y();
		const ResultItem az = this->z();

		const ResultItem bw = other.w();
		const ResultItem bx = other.x();
		const ResultItem by = other.y();
		const ResultItem bz = other.z();

		return Quaternion<ResultItem>{
		  aw * bw - ax * bx - ay * by - az * bz,
		  aw * bx + ax * bw + ay * bz - az * by,
		  aw * by - ax * bz + ay * bw + az * bx,
		  aw * bz + ax * by - ay * bx + az * bw};
	}

	template <class OtherItem>
	VOLTISO_FORCE_INLINE constexpr auto
	operator*=(const Quaternion<OtherItem> &other) -> Quaternion & {
		using ResultItem = std::common_type_t<Item, OtherItem>;
		static_assert(std::is_convertible_v<ResultItem, Item>);
		const auto r = (*this) * other;
		this->w() = static_cast<Item>(r.w());
		this->x() = static_cast<Item>(r.x());
		this->y() = static_cast<Item>(r.y());
		this->z() = static_cast<Item>(r.z());
		return *this;
	}
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
