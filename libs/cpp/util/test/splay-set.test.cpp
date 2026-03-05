#include <gtest/gtest.h>

#include <v/splay-set>

using namespace VOLTISO_NAMESPACE;

TEST(SplaySet, initializerList) {
	SplaySet<int> a = {1, 2, 3};

	// EXPECT_EQ(a.numItems, 3);
	// EXPECT_EQ(a.buckets.numItems, 4);
	EXPECT_EQ(a[1], 1);
	EXPECT_EQ(a[2], 2);
	EXPECT_EQ(a[3], 3);
	EXPECT_TRUE(a(3).exists());
	EXPECT_FALSE(a(4).exists());
}

TEST(SplaySet, iterate) {
	SplaySet<int> a = {1, 2, 3};

	int sum = 0;
	for (auto &entry : a) {
		sum += entry;
	}
	EXPECT_EQ(sum, 6);
}

namespace {
struct S {
	int x;
	static int numConstructorCalls;
	static int numDestructorCalls;
	~S() { numDestructorCalls += 1; }
	S(int x) : x(x) { numConstructorCalls += 1; }
	S(const S &) = delete;
	S &operator=(const S &) = delete;

	// This is required for SplaySet to work. If the object is not at least
	// movable, it's impossible to get key before the object is created.
	// And it's not good to construct it in the splay pool before we know
	// that we need it. This might be ok with insert, but not with maybeInsert.
	// So we'd need separate insert and maybeInsert implementations.
	// Well, just make it movable (at least).
	S(S &&other) : x(other.x) { numConstructorCalls += 1; }

	bool operator==(const S &other) const { return x == other.x; }
	bool operator<(const S &other) const { return x < other.x; }
};
int S::numConstructorCalls = 0;
int S::numDestructorCalls = 0;
} // namespace

TEST(SplaySet, nonMovable) {
	S::numConstructorCalls = 0;
	S::numDestructorCalls = 0;
	{
		SplaySet<S> set;
		for (int i = 0; i < 10; ++i) {
			set.insert(i);
			// set.insert(S(i));
		}
	}
	EXPECT_EQ(S::numDestructorCalls, S::numConstructorCalls);
	EXPECT_EQ(S::numDestructorCalls, 10);
}

TEST(SplaySet, owned) {
	S::numConstructorCalls = 0;
	S::numDestructorCalls = 0;
	{
		SplaySet<S> set;
		for (int i = 0; i < 100; ++i) {
			set.insert(S(i));
		}
	}
	EXPECT_EQ(S::numDestructorCalls, S::numConstructorCalls);
	EXPECT_EQ(S::numDestructorCalls, 200); // need 1 move
}

TEST(SplaySet, ownedEmplace) {
	S::numConstructorCalls = 0;
	S::numDestructorCalls = 0;
	{
		SplaySet<S> set;
		for (int i = 0; i < 100; ++i) {
			set.insert(i);
		}
	}
	EXPECT_EQ(S::numDestructorCalls, S::numConstructorCalls);
	EXPECT_EQ(S::numDestructorCalls, 100);
}
