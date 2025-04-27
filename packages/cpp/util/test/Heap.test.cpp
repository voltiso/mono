#include <gtest/gtest.h>

#include <voltiso/Heap>

using namespace VOLTISO_NAMESPACE;

TEST(Heap, initializerList) {
  Heap<int> a = {1, 7, 3};
  EXPECT_EQ(a.numItems, 3);
  EXPECT_EQ(a.peek(), 7);
  EXPECT_EQ(a.pop(), 7);
  EXPECT_EQ(a.peek(), 3);
  EXPECT_EQ(a.pop(), 3);
  EXPECT_EQ(a.peek(), 1);

  EXPECT_EQ(a.numItems, 1);

  a.push(10);
  EXPECT_EQ(a.peek(), 10);
  EXPECT_EQ(a.pop(), 10);
  EXPECT_EQ(a.peek(), 1);

  a.push(-1);

  EXPECT_EQ(a.peek(), 1);
  EXPECT_EQ(a.pop(), 1);
  EXPECT_EQ(a.peek(), -1);
  EXPECT_EQ(a.pop(), -1);
  EXPECT_EQ(a.numItems, 0);
}

TEST(Heap, iterate) {
  Heap<int> a = {1, 2, 3};

  int sum = 0;
  for (auto &entry : a) {
    sum += entry;
  }
  EXPECT_EQ(sum, 6);
}
