#include <gtest/gtest.h>

#include <experimental/type_traits>

#include <voltiso/InPlace>

using namespace std;
using namespace std::experimental;
using namespace VOLTISO_NAMESPACE;

struct Base {
  // static constexpr auto size = Size;

  // virtual void test() = 0;

  virtual ~Base() = default;

  virtual void copy(void *data) const = 0;
  virtual void move(void *data) = 0;
};

struct Derived : Base {
  Derived(int a, int b, int c) : a(a), b(b), c(c) {}

  // void test() override {}

  void copy(void *data) const override { new (data) Derived(*this); }
  void move(void *data) override { new (data) Derived(std::move(*this)); }

  int a, b, c;
};

struct SmallDerived : Base {
  int a;
};

TEST(InPlace, trivial) {
  InPlace<int> inPlace = 123;
  // EXPECT_EQ(inPlace.size, sizeof(int));
  EXPECT_EQ(*(int *)&inPlace, 123);
}

TEST(inPlace, simple_class) {
  struct A final {};
  InPlace<A> inPlace = A();
}

// TEST(InPlace, inheritance) {
// static_assert(sizeof(Derived) <= sizeof(InPlace<Base>));

// static_assert(std::alignment_of_v<Derived> <=
//               std::alignment_of_v<InPlace<Base>>);

// const int reserve = 32;

// voltiso::InPlace<Base, reserve> inPlace = Derived(1, 2, 3);

// EXPECT_EQ(((Derived *)&inPlace)->a, 1);
// EXPECT_EQ(((Derived *)&inPlace)->b, 2);
// EXPECT_EQ(((Derived *)&inPlace)->c, 3);

// inPlace = Derived(2, 3, 4);

// EXPECT_EQ(((Derived *)&inPlace)->a, 2);
// EXPECT_EQ(((Derived *)&inPlace)->b, 3);
// EXPECT_EQ(((Derived *)&inPlace)->c, 4);
// }

// ! nice test, but does not compile

// template <class B, class D>
// using assign_too_big =
//     decltype(declval<InPlace<B> &>() = declval<InPlace<D> &&>());

// TEST(InPlace, value_too_big) {
//   static_assert(is_detected_v<assign_too_big, Base<1>, Derived<1>>);
//   InPlace<Base<1>> inPlace = Derived<1>(1, 2, 3);
// }
