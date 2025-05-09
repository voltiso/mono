#include <gtest/gtest.h>

#include <v/Entry>
#include <v/Owned>
// #include <v/context>

#include <memory>

using namespace VOLTISO_NAMESPACE;

//

static_assert(sizeof(Owned<int>) == sizeof(void *));

//

TEST(Owned, trivial) {
  auto owned = Owned<int>::create(123);

  // Owned<int> owned =
  //     Owned(123); // explicit! (memory allocation), uses deduction guide

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
	// using W = Owned<int>::With<option::WEAK<true>>;
	Owned<int> owned = Owned<int>::create(123);
	auto weak = owned.weak();
	static_assert(std::is_same_v<decltype(weak), Owned<int>::Weak>);
	EXPECT_EQ(*weak, 123);
  // weak = owned.weak();
  // EXPECT_EQ(*weak, 123);
}

TEST(Owned, weak_compare) {
  struct A final {};
  Owned<A> owned = Owned<A>::create();
  auto weak = owned.weak();
  EXPECT_EQ(weak, owned.weak());
  EXPECT_EQ(owned, weak);
  EXPECT_EQ(weak, owned);
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

TEST(Owned, freeze) {
  S::numConstructorCalls = 0;
  S::numDestructorCalls = 0;
  // see Ref for better tests
  {
    auto owned = Owned<S>::create(123);

    auto &frozenRef = owned.frozen();
    static_assert(std::is_same_v<decltype(frozenRef), Owned<const S> &>);

    auto frozen = std::move(owned).freeze().freeze();
    static_assert(std::is_same_v<decltype(frozen), Owned<const S>>);
  }

  EXPECT_EQ(S::numDestructorCalls, S::numConstructorCalls);
  EXPECT_EQ(S::numDestructorCalls, 1);
}

TEST(Owned, doesInitialize) {
  auto a = Owned<int>::create();
  EXPECT_EQ(a, 0);
}

TEST(Owned, worksLikeReference) {
  Owned<int> owned = Owned<int>::create(123);
  EXPECT_EQ(owned, 123);
  EXPECT_EQ(*owned, 123);
  EXPECT_EQ((int &)owned, 123);
  EXPECT_EQ((const int &)owned, 123);
  EXPECT_EQ((int &&)owned, 123);
  EXPECT_EQ((const int &&)owned, 123);
}

TEST(Owned, moveSemantics) {
  auto owned = Owned<int>::create(123);
  Owned<int> owned2 = std::move(owned);
  EXPECT_EQ(owned2, 123);

  int x = 123;
  owned2 = x;
  owned2 = std::move(x);

  // ! should be illegal (Owned is reference-like, can't assign to it)
  // ! ...and we want to avoid ambiguity
  // ! if need to move-out pointed value instead, be explicit
  // owned2 = owned;            // !!!
  // owned2 = std::move(owned); // !!!
}

TEST(Owned, illegal) {
  // ! should be illegal, Owned is reference-style, always present
  // !  (unless moved-out)
  // Owned<int> owned; // !!!
}

TEST(Owned, baseRef) {
  struct Base {
    Base(int) {}
    Base(const Base &) = delete;
    Base &operator=(const Base &) = delete;
  };

  struct Derived : Base {
    Derived(char) : Base(123) {}
  };

  // ! should not compile (use Ref for polymorphism)
  // Owned<Base> owned = Owned<Derived>::create('a'); // !!!

  // ! illegal
  // Owned<Derived> owned = Owned<Base>::create(123); // !!!
}
