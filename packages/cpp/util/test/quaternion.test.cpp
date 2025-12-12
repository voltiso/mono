#include <gtest/gtest.h>

#include "v/quaternion"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_trivially_copyable_v<Quaternion<int>>);

TEST(Quaternion, initializerList) {
	Quaternion<int> q = {1, 2, 3, 4};
	EXPECT_EQ(q.w(), 1);
	EXPECT_EQ(q.x(), 2);
	EXPECT_EQ(q.y(), 3);
	EXPECT_EQ(q.z(), 4);
}

TEST(Quaternion, accessors_mutable) {
	Quaternion<int> q = {1, 2, 3, 4};
	q.w() = 10;
	q.x() = 20;
	q.y() = 30;
	q.z() = 40;
	EXPECT_EQ(q[0], 10);
	EXPECT_EQ(q[1], 20);
	EXPECT_EQ(q[2], 30);
	EXPECT_EQ(q[3], 40);
}

TEST(Quaternion, deductionGuide) {
	auto q = Quaternion{1, 2, 3, 4};
	static_assert(std::is_same_v<decltype(q), Quaternion<int>>);
	EXPECT_EQ(q.w(), 1);
	EXPECT_EQ(q.x(), 2);
	EXPECT_EQ(q.y(), 3);
	EXPECT_EQ(q.z(), 4);
}

TEST(Quaternion, from) {
	int raw[4] = {1, 2, 3, 4};
	auto q = quaternion::from(raw);
	static_assert(std::is_same_v<decltype(q), Quaternion<int>>);
	EXPECT_EQ(q, (Quaternion<int>{1, 2, 3, 4}));

	auto q2 = quaternion::from({1, 2, 3, 4});
	static_assert(std::is_same_v<decltype(q2), Quaternion<int>>);
	EXPECT_EQ(q2, (Quaternion<int>{1, 2, 3, 4}));
}

TEST(Quaternion, noImplicitCopy) {
	static_assert(!std::is_constructible_v<Quaternion<int>, Quaternion<int> &>);
	static_assert(!std::is_constructible_v<Quaternion<int>, Quaternion<int>>);
	Quaternion<int> q = {1, 2, 3, 4};
	Quaternion<int> copy = q.copy();
	EXPECT_EQ(copy, q);
}
