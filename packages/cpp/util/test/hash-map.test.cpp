#include <gtest/gtest.h>

#include <v/hash-map>

using namespace VOLTISO_NAMESPACE;

TEST(HashMap, initializerList) {
	HashMap<int, int> a = {{1, 10}, {2, 20}, {3, 30}};

	EXPECT_EQ(a.numItems(), 3);
	EXPECT_EQ(a.buckets().numItems(), 4 * 2);
	EXPECT_EQ(a[1], 10);
	EXPECT_EQ(a[2], 20);
	EXPECT_EQ(a[3], 30);
	EXPECT_TRUE(a(3).exists());
	EXPECT_FALSE(a(4).exists());
}

TEST(HashMap, iterate) {
	HashMap<int, int> a = {{1, 10}, {2, 20}, {3, 30}};
	int sum = 0;
	for (auto [key, value] : a) {
		sum += key + value;
	}
	EXPECT_EQ(sum, 1 + 10 + 2 + 20 + 3 + 30);
}
