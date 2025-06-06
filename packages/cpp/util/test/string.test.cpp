#include <gtest/gtest.h>

#include <v/string>

#include <string>
#include <type_traits>

using namespace VOLTISO_NAMESPACE;

TEST(String, fromCharsAsArray) {
	auto arr = tensor::from("abc");
	static_assert(std::is_same_v<decltype(arr), v::Tensor<char, 4>>);
}

TEST(String, fromChars) {
	auto str = string::from("abc");
	static_assert(std::is_same_v<decltype(str), v::String<3>>);
	EXPECT_EQ(str, string::from("abc"));
	EXPECT_EQ(std::string_view(str), "abc");
	EXPECT_EQ(std::string(str), "abc");

	// auto a = ConstStringView<3>(str);
	// (void)a;

	// auto b = ConstStringView("abc");
	// (void)b;

	EXPECT_EQ(str, "abc");
	EXPECT_EQ("abc", str);
}

TEST(String, literal) {
	// using namespace VOLTISO_NAMESPACE::string;
	// auto str = FixedString("abc");
	// auto str = Array<char, 4>("abc");
	// auto str = Array("abc");

	auto str = String<3>("abc");
	(void)str;

	// auto str3 = string::Custom("abc");

	auto str2 = String("abc");
	static_assert(std::is_same_v<decltype(str2), String<3>>);

	// auto str = String("abc");

	// auto &a = "abc"s;
	auto &b1 = "bcd"_s;
	auto &b2 = "bcd"_s;
	// auto bCopy = "bcd"s;

	static_assert(std::is_same_v<decltype(b1), const String<3> &>);

	EXPECT_EQ(b1, "bcd");
	EXPECT_EQ(b1, "bcd"_s);

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

TEST(String, concat) {
	auto a = "Hello"_s << " " << "world";
	static_assert(std::is_same_v<decltype(a), String<11L>>);
	EXPECT_EQ(a, "Hello world"_s);

	// a = (a << "!").copy(); // ! illegal for now
	// EXPECT_EQ(a, "Hello world!"_s);

	// a <<= '!'; // ! illegal
	// EXPECT_EQ(a, "Hello world!!"_s);
}

TEST(String, concatRhs) {
	auto a = "Hello" << " "_s << "world";
	static_assert(std::is_same_v<decltype(a), String<11>>);
	EXPECT_EQ(a, "Hello world"_s);
}

TEST(String, concatRhsDynamic) {
	auto a = "Hello" << dynamicString::from(" ") << "world";
	static_assert(std::is_same_v<decltype(a), DynamicString>);
	EXPECT_EQ(a, "Hello world"_s);
	EXPECT_EQ(a.numItems(), 11);
}

TEST(String, stdInterop) {
	auto &a = "Hello world"_s;
	EXPECT_EQ(std::string_view(a), "Hello world");
	EXPECT_EQ(std::string(a), "Hello world");
	EXPECT_EQ(std::string_view(a).size(), 11);
	EXPECT_EQ(std::string(a).size(), 11);
	EXPECT_EQ(a.size(), 11);
	EXPECT_EQ(a.NUM_ITEMS, 11);
}

TEST(DynamicString, stdInterop) {
	auto a = dynamicString::from("Hello world");
	EXPECT_EQ(std::string_view(a), "Hello world");
	EXPECT_EQ(std::string(a), "Hello world");
	EXPECT_EQ(std::string_view(a).size(), 11);
	EXPECT_EQ(std::string(a).size(), 11);
	EXPECT_EQ(a.size(), 11);
	EXPECT_EQ(a.numItems(), 11);
}
