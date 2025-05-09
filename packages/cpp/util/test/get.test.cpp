#include <gtest/gtest.h>

#include <v/Array>
#include <v/DynamicArray>
#include <v/get/EXTENT>

#include <array>
#include <tuple>

TEST(get, EXTENT) {
	static_assert(v::get::EXTENT<int[3]> == 3);
	static_assert(v::get::EXTENT<int[3][4]> == 3);
	static_assert(v::get::EXTENT<std::array<int, 3>> == 3);
	static_assert(v::get::EXTENT<std::tuple<int, int, int>> == 3);
	static_assert(v::get::EXTENT<v::Array<int, 3>> == 3);
	static_assert(v::get::EXTENT<v::Slice<int, 3>> == 3);
	static_assert(v::has::extent<v::DynamicArray<int>>);
	static_assert(v::get::EXTENT<v::DynamicArray<int>> == v::Extent::DYNAMIC);
}
