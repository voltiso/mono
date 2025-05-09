#include <gtest/gtest.h>

#include <v/RawArray>

using namespace VOLTISO_NAMESPACE;

TEST(RawArray, staticAsserts) {
  static_assert(std::is_same_v<RawArray<int>, int[]>);
  static_assert(std::is_same_v<RawArray<int, 3>, int[3]>);
  static_assert(std::is_same_v<RawArray<int, 2, 3>, int[2][3]>);
  static_assert(std::is_same_v<RawArray<int, -1, 2, 3>, int[][2][3]>);
  static_assert(std::is_same_v<RawArray<int, -1>, int[]>);

  static_assert(
      std::is_same_v<v::RawArray<const char, 123> &, const char(&)[123]>);
}
