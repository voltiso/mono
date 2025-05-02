#include <gtest/gtest.h>

#include <voltiso/ConstStringSlice>
#include <voltiso/String>

using namespace VOLTISO_NAMESPACE;

TEST(ConstStringSlice, fromChars) {
  auto str = ConstStringSlice("abc");
  static_assert(std::is_same_v<decltype(str), ConstStringSlice<3>>);

  char data[4]; // null-terminated
  auto str2 = ConstStringSlice(data);
  static_assert(std::is_same_v<decltype(str2), ConstStringSlice<3>>);

  // static_assert(std::is_convertible_v<StringSlice<3>, ConstStringSlice<3>>);
  // static_assert(std::is_convertible_v<ConstStringSlice<3>, StringSlice<3>>);

  static_assert(requires { ConstStringSlice("abc"); });
  static_assert(requires { ConstStringSlice(ConstStringSlice("abc")); });

  EXPECT_NE(ConstStringSlice("a"), ConstStringSlice("b"));

  // bool a = str == "ab"; // !!! too short
  // bool a = str == "too long"; // !!! too long
  bool a = str == "abc"; // ok
  (void)a;

  EXPECT_EQ(str, "abc");
  EXPECT_EQ(std::string(str), "abc");
  EXPECT_EQ(std::string_view(str), "abc");

  static_assert(std::is_constructible_v<ConstStringSlice<3>, const char[4]>);
  static_assert(!std::is_constructible_v<ConstStringSlice<3>, const char[5]>);
  static_assert(!std::is_constructible_v<ConstStringSlice<3>, const char[3]>);

  static_assert(std::is_constructible_v<ConstStringSlice<3>, char[4]>);
  static_assert(!std::is_constructible_v<ConstStringSlice<3>, char[5]>);
  static_assert(!std::is_constructible_v<ConstStringSlice<3>, char[3]>);
}
