#include <gtest/gtest.h>

#include <voltiso/HashSet>

using namespace VOLTISO_NAMESPACE;

TEST(HashSet, empty) {
  HashSet<int> a;
  EXPECT_EQ(a.numItems, 0);
  EXPECT_EQ(a.buckets.numItems, 0);
  EXPECT_FALSE(a[4].exists);
}

TEST(HashSet, single) {
  HashSet<int> a;
  a.insert(123);
  EXPECT_EQ(a[123], 123);
  EXPECT_TRUE(a[123].exists);
  EXPECT_FALSE(a[666].exists);
}

TEST(HashSet, initializerList_single) {
  HashSet<int> a = {123};

  EXPECT_EQ(a.numItems, 1);
  EXPECT_EQ(a.buckets.numItems, 1 * 2);
  EXPECT_EQ(a[123], 123);
  EXPECT_TRUE(a[123].exists);
  EXPECT_FALSE(a[666].exists);
}

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
