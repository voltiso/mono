#include <gtest/gtest.h>

#include <voltiso/Owned>

#include <memory>

using namespace VOLTISO_NAMESPACE;

TEST(Owned, trivial) {
  Owned<int> owned =
      Owned(123); // explicit! (memory allocation), uses deduction guide
  EXPECT_EQ(sizeof(owned),
            sizeof(std::unique_ptr<int>)); // Owned is now always a ptr

  // operator ==
  EXPECT_EQ(owned, 123);
  EXPECT_EQ(123, owned);

  // operator !=
  EXPECT_NE(owned, 124);
  EXPECT_NE(124, owned);

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

TEST(Owned, big) {
  struct A final {
    int a, b, c;
    bool operator==(const A &other) const {
      return a == other.a && b == other.b && c == other.c;
    }
  };
  EXPECT_GT(sizeof(A), sizeof(std::unique_ptr<A>));

  Owned<A> owned =
      Owned(A{1, 2, 3}); // explicit! (memory allocation), uses deduction guide
  EXPECT_EQ(sizeof(owned), sizeof(std::unique_ptr<A>));

  // operator ==
  EXPECT_EQ(*owned, (A{1, 2, 3}));
  EXPECT_EQ(owned, (A{1, 2, 3}));
  EXPECT_EQ((A &)owned, (A{1, 2, 3}));
  EXPECT_EQ((const A &)owned, (A{1, 2, 3}));
  EXPECT_EQ((A &&)owned, (A{1, 2, 3}));

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

TEST(Owned, destructor_big) {
  {
    Owned<BigDestructible> owned = Owned(BigDestructible{});
    BigDestructible::numDestructorCalls = 0;
  }

  EXPECT_EQ(BigDestructible::numDestructorCalls, 1);
}
