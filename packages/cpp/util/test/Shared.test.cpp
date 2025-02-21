#include <gtest/gtest.h>

#include <voltiso/Shared>

using namespace VOLTISO_NAMESPACE;

// struct Global {
//   // order is important
//   allocator::Malloc malloc;
//   context::Guard<allocator::Malloc> mallocGuard =
//       context::Guard<allocator::Malloc>(malloc);

//   Pool<int> poolInt;
//   context::Guard<Pool<int>> poolIntGuard =
//   context::Guard<Pool<int>>(poolInt);
// };
// Global global;

TEST(Shared, trivial) {
  auto shared = Shared<int>::create(123);

  // Owned<int> owned =
  //     Owned(123); // explicit! (memory allocation), uses deduction guide

  EXPECT_EQ(sizeof(shared),
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

TEST(Shared, clone_freeze) {
  {
    auto testState = Shared<const BigDestructibleA>::create();
    // Shared<const BigDestructibleA> testState;
    auto s = testState.clone();
    static_assert(std::is_same_v<decltype(s), Shared<BigDestructibleA>>);
    s->data[0] = 123;
    auto newState = std::move(s).freeze();
    static_assert(
        std::is_same_v<decltype(newState), Shared<const BigDestructibleA>>);

    EXPECT_EQ(BigDestructibleA::numDestructorCalls, 0);
  }

  EXPECT_EQ(BigDestructibleA::numDestructorCalls, 2);
}
