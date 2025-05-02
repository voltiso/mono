#include <gtest/gtest.h>

#include "voltiso/Entry"

// #include "gtest/gtest.h"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_same_v<GetKey<Entry<int, char>>, int>);
static_assert(std::is_same_v<GetValue<Entry<int, char>>, char>);

static_assert(has::value<Entry<int, char>>);
static_assert(has::value<Entry<int, char &>>);

static_assert(std::is_same_v<GetKey<Entry<char &, int &>>, char &>);
static_assert(std::is_same_v<GetValue<Entry<char &, int &>>, int &>);

static_assert(std::is_same_v<GetKey<int &>, int &>);
static_assert(std::is_same_v<GetValue<int &>, int &>);

static_assert(std::is_same_v<std::remove_cvref_t<decltype(getValue(
                                 std::declval<Entry<char, int>>()))>,
                             int>);

TEST(Entry, braceInitialization) {
  Entry<int, Entry<int, int>> entry = {1, {2, 3}};
  EXPECT_EQ(entry.key, 1);
  EXPECT_EQ(entry.value.key, 2);
  EXPECT_EQ(entry.value.value, 3);
}

TEST(Entry, braceInitializationRef) {
  int a, b, c;
  Entry<int &, Entry<int &, int &>> entry = {a, {b, c}};
  a = 1;
  b = 2;
  c = 3;
  EXPECT_EQ(entry.key, 1);
  EXPECT_EQ(entry.value.key, 2);
  EXPECT_EQ(entry.value.value, 3);
}
