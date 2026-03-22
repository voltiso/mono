#include <gtest/gtest.h>

#include "v/box"

// #include <concepts>

using namespace VOLTISO_NAMESPACE;

// ============================================================================
// Builder
// ============================================================================

struct TestBuilder {
	using A = Box<int>::Arithmetic::Bitwise::With<box::option::arithmetic<false>>;
	static_assert(std::is_same_v<A, Box<int>::Bitwise>);
	using B = Box<int>::Bitwise::With<box::option::bitwise<false>>;
	static_assert(std::is_same_v<B, Box<int>>);
};

// ============================================================================
// Basic Construction and Assignment
// ============================================================================

TEST(Box, constructAssign) {
	struct MyInt : Box<int> {
		using Box::Box;
	};
	MyInt box = 123;
	EXPECT_EQ(box, 123);

	// operator `==` and `!=`
	EXPECT_TRUE(box == 123);
	EXPECT_TRUE(123 == box);
	EXPECT_TRUE(box != 1);
	EXPECT_TRUE(1 != box);

	static_assert(std::equality_comparable<MyInt>);
	static_assert(std::equality_comparable_with<MyInt, int>);
	static_assert(std::equality_comparable_with<int, MyInt>);

	// no comparison by default
	static_assert(!std::three_way_comparable_with<MyInt, MyInt>);

	// explicit conversion by default
	static_assert(!std::is_convertible_v<MyInt, int>);
	static_assert(std::is_constructible_v<int, MyInt>);

	auto assignResult = box = 456;
	EXPECT_EQ(box, 456);
	static_assert(std::is_same_v<decltype(assignResult), MyInt>);
}

// ============================================================================
// Cross-Type Safety
// ============================================================================

template <class A, class B>
concept CanEq = requires(A a, B b) {
	{ a == b };
};

template <class A, class B>
concept CanAdd = requires(A a, B b) {
	{ a + b };
};

template <class A, class B>
concept CanBitwiseAnd = requires(A a, B b) {
	{ a & b };
};

template <class A, class B>
concept CanAddAssign = requires(A a, B b) {
	{ a += b };
};

template <class A, class B>
concept CanBitwiseAndAssign = requires(A a, B b) {
	{ a &= b };
};

template <class A, class B>
concept CanLogicalAnd = requires(A a, B b) {
	{ a && b };
};

struct TestCrossType {
	struct MyInt1 : Box<int>::Arithmetic::Bitwise::Logical {
		using Custom::Custom;
	};
	struct MyInt2 : Box<int>::Arithmetic::Bitwise::Logical {
		using Custom::Custom;
	};
	static_assert(!std::is_assignable_v<MyInt1 &, MyInt2>);
	static_assert(!std::equality_comparable_with<MyInt1, MyInt2>);
	static_assert(!CanEq<MyInt1, MyInt2>);

	// Arithmetic operators should not cross types
	static_assert(!CanAdd<MyInt1, MyInt2>);
	static_assert(!CanAdd<MyInt2, MyInt1>);
	static_assert(!CanAddAssign<MyInt1, MyInt2>);

	// Let's check IntArithmetic specifically
	// (moved further down where concepts are defined)

	// Bitwise operators should not cross types
	static_assert(!CanBitwiseAnd<MyInt1, MyInt2>);
	static_assert(!CanBitwiseAnd<MyInt2, MyInt1>);
	static_assert(!CanBitwiseAndAssign<MyInt1, MyInt2>);

	// Logical operators should not cross types
	static_assert(!CanLogicalAnd<MyInt1, MyInt2>);
	static_assert(!CanLogicalAnd<MyInt2, MyInt1>);
};

// ============================================================================
// Non-Type Template Parameters (NTTP)
// ============================================================================

struct Nttp {
	struct MyInt : Box<int> {
		using Box::Box;
	};
	template <MyInt x> struct S {};
	S<123> s;
};

// ============================================================================
// Concepts for Testing Mixins
// ============================================================================

template <class T>
concept Arithmetic = requires(T a, T b) {
	{ a + b } -> std::same_as<T>;
	{ a - b } -> std::same_as<T>;
	{ a * b } -> std::same_as<T>;
	{ a / b } -> std::same_as<T>;
	{ a % b } -> std::same_as<T>;
	{ a += b } -> std::same_as<T &>;
	{ a -= b } -> std::same_as<T &>;
	{ a *= b } -> std::same_as<T &>;
	{ a /= b } -> std::same_as<T &>;
	{ a %= b } -> std::same_as<T &>;
};

template <class T>
concept IntArithmetic = requires(T a, int b) {
	{ a + b } -> std::same_as<T>;
	{ a - b } -> std::same_as<T>;
	{ a * b } -> std::same_as<T>;
	{ a / b } -> std::same_as<T>;
	{ a % b } -> std::same_as<T>;
	{ a += b } -> std::same_as<T &>;
	{ a -= b } -> std::same_as<T &>;
	{ a *= b } -> std::same_as<T &>;
	{ a /= b } -> std::same_as<T &>;
	{ a %= b } -> std::same_as<T &>;
};

template <class T>
concept Bitwise = requires(T a, T b) {
	{ a & b } -> std::same_as<T>;
	{ a | b } -> std::same_as<T>;
	{ a ^ b } -> std::same_as<T>;
	{ a << b } -> std::same_as<T>;
	{ a >> b } -> std::same_as<T>;
	{ a &= b } -> std::same_as<T &>;
	{ a |= b } -> std::same_as<T &>;
	{ a ^= b } -> std::same_as<T &>;
	{ a <<= b } -> std::same_as<T &>;
	{ a >>= b } -> std::same_as<T &>;
};

template <class T>
concept IntBitwise = requires(T a, int b) {
	{ a & b } -> std::same_as<T>;
	{ a | b } -> std::same_as<T>;
	{ a ^ b } -> std::same_as<T>;
	{ a << b } -> std::same_as<T>;
	{ a >> b } -> std::same_as<T>;
	{ a &= b } -> std::same_as<T &>;
	{ a |= b } -> std::same_as<T &>;
	{ a ^= b } -> std::same_as<T &>;
	{ a <<= b } -> std::same_as<T &>;
	{ a >>= b } -> std::same_as<T &>;
};

// ============================================================================
// Comparable Mixin
// ============================================================================

struct TestComparable {
	struct MyInt : Box<int>::Comparable {
		using Custom::Custom;
	};
	static_assert(std::three_way_comparable_with<MyInt, MyInt>);
	static_assert(!IntArithmetic<MyInt>);
};

// ============================================================================
// Arithmetic Mixin
// ============================================================================

TEST(Box, Arithmetic) {
	struct MyInt : Box<int>::Arithmetic {
		using Custom::Custom;
	};
	static_assert(Arithmetic<MyInt>);
	static_assert(IntArithmetic<MyInt>);

	MyInt a = 1;
	a += 2;
	EXPECT_EQ(a, 3);
	a += a;
	EXPECT_EQ(a, 6);
	auto b = 1 + a;
	static_assert(std::same_as<decltype(b), MyInt>);
	EXPECT_EQ(b, 7);
	auto c = a + 1;
	static_assert(std::same_as<decltype(c), MyInt>);
	EXPECT_EQ(c, 7);

	MyInt d = 5;
	EXPECT_EQ(+d, 5);
	EXPECT_EQ(-d, -5);
	EXPECT_EQ(++d, 6);
	EXPECT_EQ(d++, 6);
	EXPECT_EQ(d, 7);
	EXPECT_EQ(--d, 6);
	EXPECT_EQ(d--, 6);
	EXPECT_EQ(d, 5);
}

// ============================================================================
// Bitwise Mixin
// ============================================================================

TEST(Box, Bitwise) {
	struct MyInt : Box<int>::Bitwise {
		using Custom::Custom;
	};
	static_assert(Bitwise<MyInt>);
	static_assert(IntBitwise<MyInt>);
	static_assert(!Arithmetic<MyInt>);

	MyInt a = 1;
	a |= 2;
	EXPECT_EQ(a, 3);
	a <<= 1;
	EXPECT_EQ(a, 6);
	auto b = 1 | a;
	static_assert(std::same_as<decltype(b), MyInt>);
	EXPECT_EQ(b, 7);
	auto c = a & 3;
	static_assert(std::same_as<decltype(c), MyInt>);
	EXPECT_EQ(c, 2);

	MyInt d = 0b1010;
	EXPECT_EQ(~d, ~0b1010);
}

// ============================================================================
// Implicit Mixin
// ============================================================================

TEST(Box, Implicit) {
	struct MyInt : Box<int>::Implicit {
		using Custom::Custom;
	};
	MyInt a = 123;
	int b = a;
	EXPECT_EQ(b, 123);
}

// ============================================================================
// Logical Mixin
// ============================================================================

TEST(Box, Logical) {
	struct MyBool : Box<bool>::Logical {
		using Custom::Custom;
	};
	MyBool a = true;
	MyBool b = false;

	EXPECT_TRUE(a || b);
	EXPECT_FALSE(a && b);
	EXPECT_FALSE(!a);
	EXPECT_TRUE(!b);

	EXPECT_TRUE(a || false);
	EXPECT_TRUE(true || b);
}

// ============================================================================
// constexpr Evaluation
// ============================================================================

constexpr bool testConstexpr() {
	struct MyInt : Box<int>::Arithmetic::Bitwise::Comparable {
		using Custom::Custom;
	};

	MyInt a = 5;
	a += 10;
	a *= 2;
	a |= 1;

	MyInt b = 31;

	return a == b && a == 31 && a != 0 && (a + 1) == 32 && (a & 1) == 1;
}

static_assert(testConstexpr());
