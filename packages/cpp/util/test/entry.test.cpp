#include <gtest/gtest.h>

#include "v/entry"
#include "v/get/key"
#include "v/get/value"

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_same_v<get::Key<Entry<int, char>>, int>);

// decltype(auto) identity(auto &&x) {
// 	return (std::forward<decltype(x)>(x).member);
// 	// return std::forward<decltype(x)>(x);
// }

// TEST(a,b) {
// 	decltype(auto) x = identity(S{});
// }

static_assert(std::is_same_v<get::Key<int>, int>);

static_assert(!has::entry<int>);

static_assert(std::is_same_v<
              decltype(get::value(std::declval<Entry<char, int> &>())), int &>);

static_assert(
  std::is_same_v<decltype(get::value(std::declval<Entry<char, int>>())), int>);

static_assert(std::is_same_v<get::Key<Entry<int, char>>, int>);
static_assert(std::is_same_v<get::Value<Entry<int, char>>, char>);

static_assert(has::value<Entry<int, char>>);
static_assert(requires { Entry<int, char>::value; });

static_assert(has::value<Entry<int, char &>>);
static_assert(requires { Entry<int, char &>::value; });

static_assert(std::is_same_v<get::Key<Entry<char &, int &>>, char &>);
static_assert(std::is_same_v<get::Value<Entry<char &, int &>>, int &>);

// static_assert(std::is_same_v<get::Key<int &>, int &>);
// static_assert(std::is_same_v<get::Value<int &>, int &>);

// static_assert(std::is_same_v<get::Key<Entry<int, char> &>, int &>); // ok?

// !

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

TEST(Entry, valueIsDefaulted) {
	Entry<int, int> entry = {1};
	EXPECT_EQ(entry.key, 1);
	EXPECT_EQ(entry.value, 0);
}
