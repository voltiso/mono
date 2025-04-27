#include <gtest/gtest.h>

#include <voltiso/SplaySet>

using namespace VOLTISO_NAMESPACE;

TEST(SplaySet, initializerList) {
  SplaySet<int> a = {1, 2, 3};

  // EXPECT_EQ(a.numItems, 3);
  // EXPECT_EQ(a.buckets.numItems, 4);
  EXPECT_EQ(a[1], 1);
  EXPECT_EQ(a[2], 2);
  EXPECT_EQ(a[3], 3);
  EXPECT_TRUE(a[3].exists);
  EXPECT_FALSE(a[4].exists);
}

TEST(SplaySet, iterate) {
  SplaySet<int> a = {1, 2, 3};

  int sum = 0;
  for (auto &entry : a) {
    sum += entry;
  }
  EXPECT_EQ(sum, 6);
}
