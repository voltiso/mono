#include <gtest/gtest.h>

#include <voltiso/HashSet>

using namespace VOLTISO_NAMESPACE;

TEST(HashSet, initializerList) {
  HashSet<int> a = {1, 2, 3};

  EXPECT_EQ(a.numItems, 3);
  EXPECT_EQ(a.buckets.numItems, 4 * 2);
  EXPECT_EQ(a[1], 1);
  EXPECT_EQ(a[2], 2);
  EXPECT_EQ(a[3], 3);
  EXPECT_TRUE(a[3].exists);
  EXPECT_FALSE(a[4].exists);
}
