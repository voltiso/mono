#include <gtest/gtest.h>

#include <voltiso/SplayMap>
#include <voltiso/SplaySet>

using namespace VOLTISO_NAMESPACE;

TEST(SplayMap, initializerList) {
  SplayMap<int, int> a = {{1, 10}, {2, 20}, {3, 30}};

  // EXPECT_EQ(a.numItems, 3);
  // EXPECT_EQ(a.buckets.numItems, 4);
  EXPECT_EQ(a[1], 10);
  EXPECT_EQ(a[2], 20);
  EXPECT_EQ(a[3], 30);
  EXPECT_TRUE(a[3].exists);
  EXPECT_FALSE(a[4].exists);
}

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

TEST(SplayMap, iterate) {
  SplayMap<int, int> a = {{1, 10}, {2, 20}, {3, 30}};

  int sumKeys = 0;
  int sumValues = 0;
  for (auto &entry : a) {
    sumKeys += entry.key;
    sumValues += entry.value;
  }
  EXPECT_EQ(sumKeys, 6);
  EXPECT_EQ(sumValues, 60);
}

TEST(SplaySet, iterate) {
  SplaySet<int> a = {1, 2, 3};

  int sum = 0;
  for (auto &entry : a) {
    sum += entry;
  }
  EXPECT_EQ(sum, 6);
}

TEST(SplayMap, maybeInsert) {
  SplayMap<int, int> a;

  a[1].maybeInsert() += 10;
  a[2].maybeInsert() += 20;
  a[3].maybeInsert() += 30;

  a[1].maybeInsert() += 100;
  a[2].maybeInsert() += 200;
  a[3].maybeInsert() += 300;

  EXPECT_EQ(a[1], 110);
  EXPECT_EQ(a[2], 220);
  EXPECT_EQ(a[3], 330);
}
