#include <gtest/gtest.h>

#include <voltiso/HashMap>
#include <voltiso/HashSet>

using namespace VOLTISO_NAMESPACE;

TEST(HashMap, initializerList) {
  HashMap<int, int> a = {{1, 10}, {2, 20}, {3, 30}};

  EXPECT_EQ(a.numItems, 3);
  EXPECT_EQ(a.buckets.numItems, 4);
  EXPECT_EQ(a[1], 10);
  EXPECT_EQ(a[2], 20);
  EXPECT_EQ(a[3], 30);
  EXPECT_TRUE(a[3].exists);
  EXPECT_FALSE(a[4].exists);
}

TEST(HashSet, initializerList) {
  HashSet<int> a = {1, 2, 3};

  EXPECT_EQ(a.numItems, 3);
  EXPECT_EQ(a.buckets.numItems, 4);
  EXPECT_EQ(a[1], 1);
  EXPECT_EQ(a[2], 2);
  EXPECT_EQ(a[3], 3);
  EXPECT_TRUE(a[3].exists);
  EXPECT_FALSE(a[4].exists);
}
