#include <gtest/gtest.h>

#include "v/extents"

using namespace VOLTISO_NAMESPACE;

TEST(Extents, Static) {
	Extents<2, 3, 4> e;
	static_assert(sizeof(e) == 1);
	EXPECT_EQ(e.rank(), 3);
	EXPECT_EQ(e[0], 2);
	EXPECT_EQ(e[1], 3);
	EXPECT_EQ(e[2], 4);
}

TEST(Extents, Dynamic) {
	Extents<2, Extent::dynamic, 4, Extent::dynamic> e(10, 20);
	static_assert(sizeof(e) == sizeof(Size) * 2);
	EXPECT_EQ(e.rank(), 4);
	EXPECT_EQ(e[0], 2);
	EXPECT_EQ(e[1], 10);
	EXPECT_EQ(e[2], 4);
	EXPECT_EQ(e[3], 20);
}

constexpr bool testConstexpr() {
	// 1. Fully Static Extents
	Extents<2, 3, 4> staticExtents;
	if (staticExtents.rank() != 3) return false;
	if (staticExtents[0] != 2) return false;
	if (staticExtents[1] != 3) return false;
	if (staticExtents[2] != 4) return false;

	// 2. Dynamic Extents
	Extents<2, Extent::dynamic, 4, Extent::dynamic> dynamicExtents(10, 20);
	if (dynamicExtents.rank() != 4) return false;
	if (dynamicExtents[0] != 2) return false;
	if (dynamicExtents[1] != 10) return false;
	if (dynamicExtents[2] != 4) return false;
	if (dynamicExtents[3] != 20) return false;

	return true;
}

static_assert(testConstexpr());
