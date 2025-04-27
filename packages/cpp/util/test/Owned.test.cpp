#include <gtest/gtest.h>

#include <voltiso/Owned>
// #include <voltiso/context>

#include <memory>

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

TEST(Owned, trivial) {
  auto owned = Owned<int>::create(123);

  // Owned<int> owned =
  //     Owned(123); // explicit! (memory allocation), uses deduction guide

  EXPECT_EQ(sizeof(owned),
            sizeof(std::unique_ptr<int>)); // Owned is now always a ptr

  // operator ==
  EXPECT_EQ(owned, 123); // todo: this was working before?
  EXPECT_EQ(123, owned); // todo: this was working before?

  // operator !=
  EXPECT_NE(owned, 124); // todo: this was working before?
  EXPECT_NE(124, owned); // todo: this was working before?

  // operator *
  EXPECT_EQ(*owned, 123);

  // operator -
  EXPECT_EQ(owned - 1, 122);
  EXPECT_EQ(1 - owned, -122);

  EXPECT_EQ((owned += 1) += 1, 125);
  EXPECT_EQ(owned, 125);

  EXPECT_EQ((int &)owned, 125);
  EXPECT_EQ((const int &)owned, 125);
  EXPECT_EQ((int &&)owned, 125);
  EXPECT_EQ((const int &&)owned, 125);
  // EXPECT_EQ((int)owned, 123);
  // EXPECT_EQ((const int)owned, 123);
}

//

TEST(Owned, compare) {
  // // should be ambiguous
  // EXPECT_NE(Owned<int>::create(123), Owned<int>::create(123));

  struct A final {
    int value;
  };
  auto owned1 = Owned<A>::create({123});
  auto owned2 = Owned<A>::create({123});
  EXPECT_NE(owned1, owned2);
}

//

TEST(Owned, big) {
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

  Owned<A> owned = Owned<A>::create({1, 2, 3});

  EXPECT_EQ(sizeof(owned), sizeof(std::unique_ptr<A>));

  // operator ==
  EXPECT_EQ(*owned, (A{1, 2, 3}));
  EXPECT_EQ(owned, (A{1, 2, 3}));
  EXPECT_EQ((A &)owned, (A{1, 2, 3}));
  EXPECT_EQ((const A &)owned, (A{1, 2, 3}));
  EXPECT_EQ((A &&)owned, (A{1, 2, 3}));
  EXPECT_EQ((const A &&)owned, (A{1, 2, 3}));

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

struct BigDestructible final {
  static int numDestructorCalls;
  ~BigDestructible() { numDestructorCalls += 1; }
  char data[1024];
};

int BigDestructible::numDestructorCalls = 0;

// Pool<BigDestructible> poolBigDestructible;
// context::Guard<Pool<BigDestructible>> poolBigDestructibleGuard =
//     context::Guard<Pool<BigDestructible>>(poolBigDestructible);

TEST(Owned, destructor_big) {
  {
    Owned<BigDestructible> owned = Owned<BigDestructible>::create();
    // Owned<BigDestructible> owned = Owned(BigDestructible{});
    BigDestructible::numDestructorCalls = 0;
  }

  EXPECT_EQ(BigDestructible::numDestructorCalls, 1);
}

TEST(Owned, weak) {
  Owned<int> owned = Owned<int>::create(123);
  auto weak = owned.weak();
  static_assert(std::is_same_v<decltype(weak), Owned<int>::Weak>);
  EXPECT_EQ(*weak, 123);
  weak = owned.weak();
  EXPECT_EQ(*weak, 123);
}

TEST(Owned, weak_compare) {
  struct A final {};
  Owned<A> owned = Owned<A>::create();
  auto weak = owned.weak();
  EXPECT_EQ(weak, owned.weak());
  EXPECT_EQ(owned, weak);
  EXPECT_EQ(weak, owned);
}
