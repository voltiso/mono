#include "v/Storage"

#include "gtest/gtest.h"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

TEST(Storage, doesNotInitialize) {
  int memory = 333;
  struct S {
    int value = 123'456'789;
  };
  new (&memory) Storage<S>;
  auto &storage = *reinterpret_cast<Storage<S> *>(&memory);
  EXPECT_EQ(storage.item().value, 333);
  EXPECT_EQ(storage.bytes.NUM_ITEMS, sizeof(S));

  //

  static_assert(std::is_trivially_constructible_v<Storage<S>>);
  static_assert(std::is_trivially_default_constructible_v<Storage<S>>);

  static_assert(sizeof(Storage<int>) == sizeof(int));
  struct Test {
    short a;
    int b;
    char c;
  };
  static_assert(sizeof(Storage<Test>) == sizeof(Test));
  static_assert(alignof(Storage<Test>) == alignof(Test));

  // static_assert(std::is_trivially_default_constructible_v<Storage<int>>);
  // static_assert(std::is_trivially_destructible_v<Storage<int>>);

  // static_assert(std::is_trivially_constructible_v<Storage<S>>);
  // static_assert(std::is_trivially_destructible_v<Storage<S>>);
}

TEST(Storage, zeroInitialize) {
  struct S {
    int value = 123'456'789;
  };
  Storage<S> storage = {};
  EXPECT_EQ(storage.item().value, 0);
}
