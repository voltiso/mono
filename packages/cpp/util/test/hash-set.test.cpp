#include <gtest/gtest.h>

#include "v/hash-set"
#include "v/owned"

using namespace VOLTISO_NAMESPACE;

namespace {

TEST(HashSet, empty) {
	HashSet<int> a;
	static_assert(has::hash<int>);
	EXPECT_EQ(a.numItems(), 0);
	EXPECT_EQ(a.buckets().numItems(), 0);
	EXPECT_FALSE(a(4).exists());
}

TEST(HashSet, single) {
	HashSet<int> a;
	a.insert(123);
	EXPECT_EQ(a[123], 123);
	EXPECT_TRUE(a(123).exists());
	EXPECT_FALSE(a(666).exists());
}

TEST(HashSet, initializerList_single) {
	HashSet<int> a = {123};

	EXPECT_EQ(a.numItems(), 1);
	EXPECT_EQ(a.buckets().numItems(), 1 * 2);
	EXPECT_EQ(a[123], 123);
	EXPECT_TRUE(a(123).exists());
	EXPECT_FALSE(a(666).exists());
}

TEST(HashSet, initializerList) {
	HashSet<int> a = {1, 2, 3};

	EXPECT_EQ(a.numItems(), 3);
	EXPECT_EQ(a.buckets().numItems(), 4 * 2);
	EXPECT_EQ(a[1], 1);
	EXPECT_EQ(a[2], 2);
	EXPECT_EQ(a(3), 3);
	EXPECT_TRUE(a(3).exists());
	EXPECT_FALSE(a(4).exists());
}

struct S {
	static int numConstructed;
	static int numDestructed;
	S() { ++numConstructed; }
	~S() { ++numDestructed; }
	S(const S &) = delete;
	S &operator=(const S &) = delete;
	float data[16];
};

int S::numConstructed = 0;
int S::numDestructed = 0;

TEST(HashSet, owned) {
	S::numConstructed = 0;
	S::numDestructed = 0;
	{
		HashSet<Owned<S>> a;
		static_assert(std::is_same_v<HashSet<Owned<S>>::Entry, Owned<S>>);
		static_assert(std::is_same_v<HashSet<Owned<S>>::Key, Pool<S>::Handle>);
		for (int i = 0; i < 100; ++i) {
			a.insert(Owned<S>::create());
		}

		// auto maxBucketSize = a.debugGetMaxBucketSize();
		// std::cout << "maxBucketSize: " << maxBucketSize << " for num items "
		//           << a.numItems() << std::endl;

		EXPECT_EQ(S::numConstructed, 100);
		EXPECT_EQ(S::numDestructed, 0);
	}
	EXPECT_EQ(S::numConstructed, 100);
	EXPECT_EQ(S::numDestructed, 100);
}

} // namespace
