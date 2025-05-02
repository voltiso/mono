#include <gtest/gtest.h>

#include <voltiso/RawArray>
#include <voltiso/Slice>
#include <voltiso/assert>

// #include <type_traits>

using namespace VOLTISO_NAMESPACE;

struct S {};

TEST(Slice, chars) {
  // this way we capture the NULL terminator too
  // if you want to omit it, use `StringView` instead
  auto str = Slice("abc");
  static_assert(std::is_same_v<decltype(str), Slice<const char[4]>>);
  static_assert(std::is_same_v<decltype(str.items), const char(&)[4]>);

  EXPECT_EQ(str.EXTENT, 4);
  EXPECT_EQ(str, "abc");
  EXPECT_EQ("abc", str);

  auto shortStr = Slice((const char(&)[2]) "abc");
  EXPECT_EQ(shortStr.EXTENT, 2);

  auto &source = "test";
  auto sourceView = Slice(source);
  auto shortStr2 = sourceView.slice<1, 3>();
  EXPECT_EQ(shortStr2.EXTENT, 2);
  EXPECT_EQ(shortStr2, (Slice("es").slice<0, 2>()));

  auto x = shortStr2 == "e"; // ok
  (void)x;
  // auto y = shortStr2 == "too long"; // compile-time-error
  // auto z = shortStr2 == ""; // compile-time-error (too short)

  static_assert(std::is_constructible_v<Slice<const char[4]>, const char[4]>);
  static_assert(!std::is_constructible_v<Slice<const char[5]>, const char[4]>);
  static_assert(!std::is_constructible_v<Slice<const char[3]>, const char[4]>);
}
