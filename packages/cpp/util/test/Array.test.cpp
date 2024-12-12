#include <gtest/gtest.h>

#include "voltiso/Array"
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
  array = {1, 2};

  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 2);
  EXPECT_EQ(array[2], 0);
}
