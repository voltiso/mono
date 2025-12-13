#include <gtest/gtest.h>

#include "v/_/quaternion.hpp"
#include "v/quaternion"
#include "v/storage"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_trivially_copyable_v<Quaternion<int>>);

TEST(Quaternion, uninitialized) {
	Storage<Quaternion<int>> q;
	*(int *)&q = 123;

	new (&q) Quaternion<int>;
	EXPECT_EQ(((Quaternion<int> &)q).w(), 123);
}

TEST(Quaternion, defaultInitialized) {
	Storage<Quaternion<int>> q;
	*(int *)&q = 123;

	new (&q) Quaternion<int>{};
	EXPECT_EQ(((Quaternion<int> &)q).w(), 0);
}

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

TEST(Quaternion, identity) {
	const auto id = Quaternion<int>::identity();
	EXPECT_EQ(id, (Quaternion<int>{1, 0, 0, 0}));

	const Quaternion<int> q = {1, 2, 3, 4};
	EXPECT_EQ(id * q, q);
	EXPECT_EQ(q * id, q);
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

TEST(Quaternion, multiply_basis) {
	const Quaternion<int> one = {1, 0, 0, 0};
	const Quaternion<int> i = {0, 1, 0, 0};
	const Quaternion<int> j = {0, 0, 1, 0};
	const Quaternion<int> k = {0, 0, 0, 1};

	EXPECT_EQ(one * i, i);
	EXPECT_EQ(i * one, i);

	EXPECT_EQ(i * j, k);
	EXPECT_EQ(j * i, (Quaternion<int>{0, 0, 0, -1}));
}

TEST(Quaternion, multiply_assign) {
	Quaternion<int> a = {1, 2, 3, 4};
	const Quaternion<int> b = {5, 6, 7, 8};
	const auto expected = a * b;
	a *= b;
	EXPECT_EQ(a, expected);

	Quaternion<int> i = {0, 1, 0, 0};
	const Quaternion<int> j = {0, 0, 1, 0};
	i *= j;
	EXPECT_EQ(i, (Quaternion<int>{0, 0, 0, 1}));
}

TEST(Quaternion, noImplicitCopy) {
	static_assert(!std::is_constructible_v<Quaternion<int>, Quaternion<int> &>);
	static_assert(!std::is_constructible_v<Quaternion<int>, Quaternion<int>>);
	Quaternion<int> q = {1, 2, 3, 4};
	Quaternion<int> copy = q.copy();
	EXPECT_EQ(copy, q);
}
