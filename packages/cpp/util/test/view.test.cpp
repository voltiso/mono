#include <gtest/gtest.h>

#include <v/assert>
#include <v/const-string-view>
#include <v/raw-array>
#include <v/view>

// #include <type_traits>

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_constructible_v<View<const char, 4>, const char[4]>);
static_assert(!std::is_constructible_v<View<const char, 5>, const char[4]>);
static_assert(!std::is_constructible_v<View<const char, 3>, const char[4]>);

TEST(View, chars) {
	// this way we capture the NULL terminator too
	// if you want to omit it, use `StringView` instead
	auto str = View("abc");
	static_assert(std::is_same_v<decltype(str), View<const char, 4L>>);
	// static_assert(std::is_same_v<decltype(str.items), const char (*)[4]>); // !

	EXPECT_EQ(str.extent(), 4);

	// these use the ConstStringView comparison,
	// so string literals do not include the NULL terminator
	EXPECT_EQ(str, "abc\0");
	EXPECT_EQ("abc\0", str);

	auto shortStr = View((const char (&)[2]) "abc");
	EXPECT_EQ(shortStr.EXTENT, 2);

	auto &source = "test";
	auto sourceView = View(source);
	auto shortStr2 = sourceView.view<1, 3>();
	static_assert(std::is_same_v<decltype(shortStr2), View<const char, 2L>>);
	EXPECT_EQ(shortStr2.EXTENT, 2);
	EXPECT_EQ(shortStr2, (View("es").view<0, 2>()));
	EXPECT_EQ(shortStr2, "es");

	static_assert(std::tuple_size_v<View<const char, 2>> == 2);

	auto lhs = ConstStringView(shortStr2);
	(void)lhs;

	auto rhs = ConstStringView("!!");
	(void)rhs;

	EXPECT_NE(shortStr2, "!!");

	auto x = shortStr2 == "es"; // ok
	(void)x;
	// auto y = shortStr2 == "too long"; // compile-time-error
	// auto z = shortStr2 == ""; // compile-time-error (too short)
}

TEST(View, dynamic) {
	auto str = View("abc");
	auto dynamicStr = str.view(1, 2);
	static_assert(
	  std::is_same_v<decltype(dynamicStr), View<const char, extent::DYNAMIC>>);

	EXPECT_EQ(dynamicStr.extent(), 1);
	EXPECT_EQ(dynamicStr, "b");
	EXPECT_NE(dynamicStr, "!");
}
