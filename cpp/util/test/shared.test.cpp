#include <gtest/gtest.h>

#include <v/shared>

using namespace VOLTISO_NAMESPACE;

static_assert(!std::is_default_constructible_v<Shared<int>>);
static_assert(std::is_copy_constructible_v<Shared<int>>);

TEST(Shared, trivial) {
	auto shared = Shared<int>::create(123);

	// Owned<int> owned =
	//     Owned(123); // explicit! (memory allocation), uses deduction guide

	EXPECT_EQ(sizeof(shared), sizeof(void *));

	EXPECT_EQ(
	  sizeof(shared),
	  sizeof(std::unique_ptr<int>)); // Owned is now always a ptr

	// operator ==
	EXPECT_EQ(shared, 123);
	EXPECT_EQ(123, shared);

	// operator !=
	EXPECT_NE(shared, 124);
	EXPECT_NE(124, shared);

	// operator *
	EXPECT_EQ(*shared, 123);

	// operator -
	EXPECT_EQ(shared - 1, 122);
	EXPECT_EQ(1 - shared, -122);

	EXPECT_EQ((shared += 1) += 1, 125);
	EXPECT_EQ(shared, 125);

	EXPECT_EQ((int &)shared, 125);
	EXPECT_EQ((const int &)shared, 125);
	EXPECT_EQ((int &&)shared, 125);
	EXPECT_EQ((const int &&)shared, 125);
	// EXPECT_EQ((int)owned, 123);
	// EXPECT_EQ((const int)owned, 123);
}

TEST(Shared, big) {
	struct A final {
		int a, b, c;
		bool operator==(const A &other) const {
			return a == other.a && b == other.b && c == other.c;
		}
	};
	EXPECT_GT(sizeof(A), sizeof(std::unique_ptr<A>));

	// Pool<A> poolA;
	// context::Guard<Pool<A>> poolAGuard = context::Guard<Pool<A>>(poolA);

	// Owned<A> owned =
	//     Owned(A{1, 2, 3}); // explicit! (memory allocation), uses deduction
	//     guide

	Shared<A> shared = Shared<A>::create({1, 2, 3});

	EXPECT_EQ(sizeof(shared), sizeof(std::unique_ptr<A>));

	// operator ==
	EXPECT_EQ(*shared, (A{1, 2, 3}));
	EXPECT_EQ(shared, (A{1, 2, 3}));
	EXPECT_EQ((A &)shared, (A{1, 2, 3}));
	EXPECT_EQ((const A &)shared, (A{1, 2, 3}));
	EXPECT_EQ((A &&)shared, (A{1, 2, 3}));

	struct AA {
		A a;
		char c;
	};

	struct BB {
		char c;
		A a;
	};

	EXPECT_EQ(sizeof(AA), sizeof(BB));
}

// struct SmallDestructible final {
//   static int numDestructorCalls;
//   ~SmallDestructible() { numDestructorCalls += 1; }
// };

// int SmallDestructible::numDestructorCalls = 0;

// TEST(Owned, destructor_small) {
//   {
//     Owned<SmallDestructible> owned = SmallDestructible{};
//     SmallDestructible::numDestructorCalls = 0;
//   }

//   EXPECT_EQ(SmallDestructible::numDestructorCalls, 1);
// }

struct BigDestructibleA final {
	static int numDestructorCalls;
	~BigDestructibleA() { numDestructorCalls += 1; }
	char data[1024];
};

int BigDestructibleA::numDestructorCalls = 0;

// Pool<BigDestructible> poolBigDestructible;
// context::Guard<Pool<BigDestructible>> poolBigDestructibleGuard =
//     context::Guard<Pool<BigDestructible>>(poolBigDestructible);

TEST(Shared, destructor_big) {
	{
		Shared<BigDestructibleA> shared = Shared<BigDestructibleA>::create();
		// Owned<BigDestructible> owned = Owned(BigDestructible{});
		BigDestructibleA::numDestructorCalls = 0;
	}

	EXPECT_EQ(BigDestructibleA::numDestructorCalls, 1);
}

namespace {
struct S {
	static int numConstructorCalls;
	static int numDestructorCalls;
	~S() { numDestructorCalls += 1; }
	S(int) { numConstructorCalls += 1; }
	S(const S &) = delete;
	S &operator=(const S &) = delete;
};
int S::numConstructorCalls = 0;
int S::numDestructorCalls = 0;
} // namespace

TEST(Shared, freeze) {
	// see Ref for better tests
	S::numConstructorCalls = 0;
	S::numDestructorCalls = 0;
	{
		auto shared = Shared<const S>::create(123);

		auto &frozenRef = shared.frozen();
		static_assert(std::is_same_v<decltype(frozenRef), Shared<const S> &>);

		auto frozen = std::move(shared).freeze().freeze();
		static_assert(std::is_same_v<decltype(frozen), Shared<const S>>);
	}

	EXPECT_EQ(S::numDestructorCalls, S::numConstructorCalls);
	EXPECT_EQ(S::numDestructorCalls, 1);
}

TEST(Shared, worksLikeReference) {
	Shared<int> shared = Shared<int>::create(123);
	EXPECT_EQ(shared, 123);
	EXPECT_EQ(*shared, 123);
	EXPECT_EQ((int &)shared, 123);
	EXPECT_EQ((const int &)shared, 123);
	EXPECT_EQ((int &&)shared, 123);
	EXPECT_EQ((const int &&)shared, 123);
}

TEST(Shared, copyConstruction) {
	auto shared = Shared<int>::create(123);
	EXPECT_EQ(shared.numReferences(), 1);

	Shared<int> copy(shared);
	EXPECT_EQ(shared, 123);
	EXPECT_EQ(copy, 123);
	EXPECT_EQ(shared.numReferences(), 2);
	EXPECT_EQ(copy.numReferences(), 2);
}

TEST(Shared, copyAssignment) {
	auto shared = Shared<int>::create(123);
	auto other = Shared<int>::create(456);
	EXPECT_EQ(shared.numReferences(), 1);
	EXPECT_EQ(other.numReferences(), 1);

	other = shared;
	EXPECT_EQ(shared, 123);
	EXPECT_EQ(other, 123);
	EXPECT_EQ(shared.numReferences(), 2);
	EXPECT_EQ(other.numReferences(), 2);
}

TEST(Shared, moveSemantics) {
	auto shared = Shared<int>::create(123);
	Shared<int> shared2 = std::move(shared);
	EXPECT_EQ(shared2, 123);

	int x = 123;
	shared2 = x;
	shared2 = std::move(x);

	static_assert(std::is_assignable_v<Shared<int> &, int>);
}

TEST(Shared, moveAssignment) {
	auto shared = Shared<int>::create(123);
	auto other = Shared<int>::create(456);
	EXPECT_EQ(shared.numReferences(), 1);
	EXPECT_EQ(other.numReferences(), 1);

	other = std::move(shared);
	EXPECT_EQ(other, 123);
	EXPECT_EQ(other.numReferences(), 1);
}

TEST(Shared, customPool) {
	static_assert(
	  sizeof(Shared<int>::ControlBlock) ==
	  sizeof(void *) + sizeof(Pool<int>::Handle));

	// with custom pool, control block is bigger
	static_assert(
	  sizeof(Shared<int>::WithCustomPool::ControlBlock) ==
	  sizeof(void *) + sizeof(Pool<int>::Handle) + sizeof(void *));

	using Shared = Shared<int>::WithCustomPool;
	Pool<Shared::ControlBlock> pool;

	auto shared = Shared::create(pool, 123);
	EXPECT_EQ(shared, 123);
}

// TEST(Shared, assignmentAmbiguity) {
// 	auto a = Shared<int>::create(123);
// 	auto b = Shared<int>::create(456);

// 	a = b;
// }
