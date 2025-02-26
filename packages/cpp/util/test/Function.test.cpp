#include "voltiso/Function"

#include <gtest/gtest.h>

#include <cstdlib>
#include <string>

using namespace VOLTISO_NAMESPACE;

static_assert(sizeof(Function<int(int)>) == sizeof(void *) * 3);
static_assert(is_trivially_relocatable<Function<int(int)>>);

TEST(Function, Basic) {
  Function<int(int)> f = [](int x) { return x * 2; };
  EXPECT_EQ(f(5), 10);

  Function<int(int, int)> add = [](int a, int b) { return a + b; };
  EXPECT_EQ(add(3, 4), 7);
}

TEST(Function, MoveOnly) {
  Function<std::string(std::string)> concat = [](std::string s) {
    return s + " world";
  };

  EXPECT_EQ(concat("hello"), "hello world");

  // Test move constructor
  auto concat2 = std::move(concat);
  EXPECT_EQ(concat2("hello"), "hello world");
}

TEST(Function, ComplexTypes) {
  static int numConstructorCalls;
  static int numDestructorCalls;

  numConstructorCalls = 0;
  numDestructorCalls = 0;

  struct Counter {
    int count = 0;
    int operator()() { return ++count; }

    Counter() { numConstructorCalls += 1; }
    Counter(const Counter &) { numConstructorCalls += 1; }
    Counter &operator=(const Counter &) = delete;
    ~Counter() { numDestructorCalls += 1; }
  };

  {
    Function<int()> counter = Counter{};
    EXPECT_EQ(counter(), 1);
    EXPECT_EQ(counter(), 2);
  }

  EXPECT_EQ(numConstructorCalls, 2);
  EXPECT_EQ(numDestructorCalls, 2);
}

TEST(Function, Capture) {
  int multiplier = 3;
  Function<int(int)> multiply = [multiplier](int x) { return x * multiplier; };
  EXPECT_EQ(multiply(4), 12);

  std::string prefix = "test_";
  Function<std::string(std::string)> prefixer = [prefix](std::string s) {
    return prefix + s;
  };
  EXPECT_EQ(prefixer("value"), "test_value");
}

TEST(Function, CaptureBig) {
  std::vector<int> data = {1, 2, 3, 4, 5};
  Function<int(int)> sum = [data](int index) { return data[index]; };
  EXPECT_EQ(sum(2), 3);
}
