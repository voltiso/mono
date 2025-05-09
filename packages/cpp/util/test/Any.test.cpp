#include <gtest/gtest.h>

#include <v/Any>
#include <v/Owned>
#include <v/Shared>

using namespace VOLTISO_NAMESPACE;

struct TestObject {
  static int numDestructorCalls;
  ~TestObject() { numDestructorCalls += 1; }
  // char data[1024];

  TestObject() = default;

  TestObject(const TestObject &) = delete;
  TestObject &operator=(const TestObject &) = delete;
};

int TestObject::numDestructorCalls = 0;

TEST(Any, owned) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Any<TestObject>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Owned<TestObject>::create());
    vec.emplace_back(Owned<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}

TEST(Any, owned_to_void) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Any<>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Owned<TestObject>::create());
    vec.emplace_back(Owned<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}

TEST(Any, shared_to_void) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Any<>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Shared<TestObject>::create());
    vec.emplace_back(Shared<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}

struct Base {
  Base(int) {}
  Base(const Base &) = delete;
  Base &operator=(const Base &) = delete;

  // no virtual destructor
};

struct Derived : Base {
  Derived(char) : Base(123) { numConstructorCalls += 1; }
  Derived(const Derived &) = delete;
  Derived &operator=(const Derived &) = delete;

  ~Derived() { numDestructorCalls += 1; }

  static int numConstructorCalls;
  static int numDestructorCalls;
};

int Derived::numConstructorCalls = 0;
int Derived::numDestructorCalls = 0;

TEST(Any, polymorphic) {
  Derived::numConstructorCalls = 0;
  Derived::numDestructorCalls = 0;
  {
    std::vector<Any<Base>> vec;
    vec.push_back(Owned<Derived>::create('a'));
    vec.emplace_back(Owned<Derived>::create('b'));
    EXPECT_EQ(Derived::numDestructorCalls, 0);
  }
  EXPECT_EQ(Derived::numDestructorCalls, 2);
  EXPECT_EQ(Derived::numConstructorCalls, Derived::numDestructorCalls);
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

TEST(Any, freeze) {
  S::numConstructorCalls = 0;
  S::numDestructorCalls = 0;
  {
    // test is more tricky if Ref itself is const
    Any<S> ref = Owned<S>::create(123);
    const Any<S> constRef = Owned<S>::create(123);

    // ! should not compile
    // auto& _x = ref.freeze(); // !!!
    // (void)_x;

    // ! should not compile
    // auto& _x = constRef.freeze(); // !!!
    // (void)_x;

    // ! should not compile
    // ! this is tricky if Ref itself is const
    // ! currently static_assert inside frozen() is triggered
    // ! (no error reported on this line though)
    // auto &_x = std::move(ref).frozen(); // !!!
    // (void)_x;

    auto &_frozen = ref.frozen(); // ok
    (void)_frozen;

    auto &_constFrozen = constRef.frozen(); // ok
    (void)_constFrozen;

    auto _freeze = std::move(ref).freeze(); // ok
    (void)_freeze;

    // ! also should not compile (cannot move-out from const)
    // auto _constFreeze = std::move(constRef).freeze(); // !!!
    // (void)_constFreeze;

    //

    static_assert(
        std::is_same_v<decltype(std::move(ref).freeze()), Any<const S> &&>);

    auto frozenRef = std::move(ref).freeze().freeze();
    static_assert(std::is_same_v<decltype(frozenRef), Any<const S>>);
  }

  EXPECT_EQ(S::numDestructorCalls, S::numConstructorCalls);
  EXPECT_EQ(S::numDestructorCalls, 2);
}

TEST(Any, worksLikeReference) {
  Any<int> ref = Owned<int>::create(123);
  EXPECT_EQ(ref, 123);
  EXPECT_EQ(*ref, 123);
  EXPECT_EQ((int &)ref, 123);
  EXPECT_EQ((const int &)ref, 123);
  EXPECT_EQ((int &&)ref, 123);
  EXPECT_EQ((const int &&)ref, 123);
}

TEST(Any, moveSemantics) {
  Any<int> ref = Owned<int>::create(123);

  // ! should be illegal (Ref might be Shared, etc.)
  // Owned<int> owned2 = std::move(ref); // !!!

  Any<int> ref2 = std::move(ref);

  EXPECT_EQ(ref2, 123);

  int x = 123;
  ref2 = x;
  ref2 = std::move(x);

  // ! should be illegal (Owned is reference-like, can't assign to it)
  // ! ...and we want to avoid ambiguity
  // ! if need to move-out pointed value instead, be explicit
  // ref2 = ref;            // !!!
  // ref2 = std::move(ref); // !!!
}

TEST(Any, illegal) {
  // ! should be illegal, Owned is reference-style, always present
  // !  (unless moved-out)
  // Any<int> ref; // !!!
}

TEST(Any, baseRef) {
  struct Base {
    Base(int) {}
    Base(const Base &) = delete;
    Base &operator=(const Base &) = delete;
  };

  struct Derived : Base {
    Derived(char) : Base(123) {}
  };

  // ! illegal down-cast
  // Any<Derived> ref = Owned<Base>::create(123); // !!!
}
