#include <gtest/gtest.h>

#include "voltiso/Array"
#include "voltiso/Slice"
#include "voltiso/Storage"

using namespace VOLTISO_NAMESPACE;

TEST(Array, uninitialized) {
  Storage<Array<int, 10>> array;
  *(int *)&array = 123;

  new (&array) Array<int, 10>;
  EXPECT_EQ(((Array<int, 10> &)array)[0], 123);
}

TEST(Array, defaultInitialized) {
  Storage<Array<int, 10>> array;
  *(int *)&array = 123;

  new (&array) Array<int, 10>{};
  EXPECT_EQ(((Array<int, 10> &)array)[0], 0);
}

TEST(Array, initializerList) {
  Array<int, 3> array = {1, 2};

  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 2);
  EXPECT_EQ(array[2], 0);
}

TEST(Array, initializerList_assign) {
  Array<int, 3> array;
  array = {1, 2}; // this is copy assignment?

  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 2);
  EXPECT_EQ(array[2], 0);
}

TEST(Array, initializerList_deductionGuide) {
  Array array = {1, 2};

  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 2);
}

TEST(Array, sliceOfArrayDeductionGuide) {
  Array<int, 3> array = {1, 2, 3};
  auto slice = Slice(array);
  static_assert(std::is_same_v<decltype(slice), Slice<int[3]>>);
  EXPECT_EQ(slice[0], 1);
  EXPECT_EQ(slice[1], 2);
  EXPECT_EQ(slice[2], 3);
  EXPECT_EQ(slice, array);
}

TEST(Array, compareWithRaw) {
  Array<int, 3> array = {1, 2, 3};
  int raw[3] = {1, 2, 3};
  EXPECT_EQ(Slice<int[3]>(array), Slice<int[3]>(raw));
  EXPECT_EQ(array, raw);
  EXPECT_EQ(raw, array);
}
