#include <gtest/gtest.h>

#include <voltiso/String>

using namespace VOLTISO_NAMESPACE;

TEST(String, fromChars) {
  auto str = string::from("abc");
  static_assert(std::is_same_v<decltype(str), v::String<3>>);
  EXPECT_EQ(str, string::from("abc"));
  EXPECT_EQ(std::string_view(str), "abc");
  EXPECT_EQ(std::string(str), "abc");
  EXPECT_EQ(str, "abc");
  EXPECT_EQ("abc", str);
}

TEST(String, literal) {
  using namespace VOLTISO_NAMESPACE::string;
  // auto str = FixedString("abc");
  // auto str = Array<char, 4>("abc");
  // auto str = Array("abc");
  // auto str = String<4>("abc");
  // auto str = String("abc");

  // auto &a = "abc"s;
  auto &b1 = "bcd"s;
  auto &b2 = "bcd"s;
  // auto bCopy = "bcd"s;

  EXPECT_EQ(b1, "bcd");
  EXPECT_EQ(b1, "bcd"s);

  EXPECT_EQ(b1, b2);
  EXPECT_EQ(&b1, &b2); // both share the same memory

  // ! should not compile (const)
  // b2[0] = '!'; // !!!

  // signal SIGSEGV: invalid permissions for mapped object (fault address:
  // 0x5555557544d0)
  EXPECT_DEATH(const_cast<String<3> &>(b2)[0] = '!', "");

  static_assert(std::is_same_v<decltype(b2), const v::String<3> &>);

  // EXPECT_EQ(a, "abc");
  // EXPECT_EQ(b1, "bcd");

  // EXPECT_EQ(b1, b2);

  // EXPECT_EQ(b1[0], '!');

  // EXPECT_EQ(bCopy, "bcd");
}
