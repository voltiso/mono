#include <gtest/gtest.h>

#include "v/tensor"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;
using namespace VOLTISO_NAMESPACE::tensor;

TEST(RawArray, staticAsserts) {
	static_assert(std::is_same_v<Raw<int>, int[]>);

	static_assert(std::is_same_v<Raw<int, Extent::dynamic>, int[]>);
	static_assert(std::is_same_v<Raw<int, 3>, int[3]>);
	static_assert(std::is_same_v<Raw<int, 2, 3>, int[2][3]>);
	static_assert(std::is_same_v<Raw<int, Extent::dynamic, 2, 3>, int[][2][3]>);
}
