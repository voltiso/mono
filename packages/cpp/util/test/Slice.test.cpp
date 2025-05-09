#include <gtest/gtest.h>

#include <v/ConstStringSlice>
#include <v/RawArray>
#include <v/Slice>
#include <v/assert>

// #include <type_traits>

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_constructible_v<Slice<const char, 4>, const char[4]>);
static_assert(!std::is_constructible_v<Slice<const char, 5>, const char[4]>);
static_assert(!std::is_constructible_v<Slice<const char, 3>, const char[4]>);

TEST(Slice, chars) {
	// this way we capture the NULL terminator too
	// if you want to omit it, use `StringView` instead
	auto str = Slice("abc");
	static_assert(std::is_same_v<decltype(str), Slice<const char, 4>>);
	// static_assert(std::is_same_v<decltype(str.items), const char (*)[4]>); // !

	EXPECT_EQ(str.extent(), 4);

	// these use the ConstStringSlice comparison,
	// so string literals do not include the NULL terminator
	EXPECT_EQ(str, "abc\0");
	EXPECT_EQ("abc\0", str);

	auto shortStr = Slice((const char (&)[2]) "abc");
	EXPECT_EQ(shortStr.EXTENT, 2);

	auto &source = "test";
	auto sourceView = Slice(source);
	auto shortStr2 = sourceView.slice<1, 3>();
	static_assert(std::is_same_v<decltype(shortStr2), Slice<const char, 2>>);
	EXPECT_EQ(shortStr2.EXTENT, 2);
	EXPECT_EQ(shortStr2, (Slice("es").slice<0, 2>()));
	EXPECT_EQ(shortStr2, "es");

	static_assert(std::tuple_size_v<Slice<const char, 2>> == 2);

	auto lhs = ConstStringSlice(shortStr2);
	(void)lhs;

	auto rhs = ConstStringSlice("!!");
	(void)rhs;

	EXPECT_NE(shortStr2, "!!");

	auto x = shortStr2 == "es"; // ok
	(void)x;
	// auto y = shortStr2 == "too long"; // compile-time-error
	// auto z = shortStr2 == ""; // compile-time-error (too short)
}

TEST(Slice, dynamic) {
	auto str = Slice("abc");
	auto dynamicStr = str.slice(1, 2);
	static_assert(
	  std::is_same_v<decltype(dynamicStr), Slice<const char, Extent::DYNAMIC>>);

	EXPECT_EQ(dynamicStr.extent(), 1);
	EXPECT_EQ(dynamicStr, "b");
	EXPECT_NE(dynamicStr, "!");
}
