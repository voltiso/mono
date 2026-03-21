#include <gtest/gtest.h>

#include "v/raw-array"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

TEST(RawArray, staticAsserts) {
	static_assert(std::is_same_v<RawArray<int>, int[]>);

	static_assert(std::is_same_v<RawArray<int, Extent::dynamic>, int[]>);
	static_assert(std::is_same_v<RawArray<int, 3>, int[3]>);
	static_assert(std::is_same_v<RawArray<int, 2, 3>, int[2][3]>);
	static_assert(std::is_same_v<RawArray<int, Extent::dynamic, 2, 3>, int[][2][3]>);
}
