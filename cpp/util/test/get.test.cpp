#include <gtest/gtest.h>

#include "v/dynamic-array"
#include "v/get/extent"
#include "v/tensor"

#include <array>
#include <tuple>

TEST(get, EXTENT) {
	static_assert(v::get::EXTENT<int[3]> == 3);
	static_assert(v::get::EXTENT<int[3][4]> == 3);
	static_assert(v::get::EXTENT<std::array<int, 3>> == 3);
	static_assert(v::get::EXTENT<std::tuple<int, int, int>> == 3);
	static_assert(v::get::EXTENT<v::Tensor<int, 3>> == 3);
	// static_assert(v::get::EXTENT<v::View<int, 3>> == 3);
	static_assert(v::has::extent<v::DynamicArray<int>>);
	static_assert(v::get::EXTENT<v::DynamicArray<int>> == v::extent::DYNAMIC);
}
