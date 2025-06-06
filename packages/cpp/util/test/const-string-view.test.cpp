#include <gtest/gtest.h>

#include <v/const-string-view>
#include <v/string>

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_constructible_v<ConstStringView<3>, const char[4]>);
static_assert(!std::is_constructible_v<ConstStringView<3>, const char[5]>);
static_assert(!std::is_constructible_v<ConstStringView<3>, const char[3]>);

static_assert(std::is_constructible_v<ConstStringView<3>, char[4]>);
static_assert(!std::is_constructible_v<ConstStringView<3>, char[5]>);
static_assert(!std::is_constructible_v<ConstStringView<3>, char[3]>);

static_assert(get::EXTENT<ConstStringView<3>> == 3);

TEST(ConstStringView, fromChars) {
	auto str = ConstStringView("abc");
	static_assert(std::is_same_v<decltype(str), ConstStringView<3L>>);

	char data[4]; // null-terminated
	auto str2 = ConstStringView(data);
	static_assert(std::is_same_v<decltype(str2), ConstStringView<3L>>);

	// static_assert(std::is_convertible_v<StringSlice<3>, ConstStringView<3>>);
	// static_assert(std::is_convertible_v<ConstStringView<3>, StringSlice<3>>);

	static_assert(requires { ConstStringView("abc"); });
	static_assert(requires { ConstStringView(ConstStringView("abc")); });

	EXPECT_NE(ConstStringView("a"), ConstStringView("b"));

	// bool a = str == "ab"; // !!! too short
	// bool a = str == "too long"; // !!! too long
	bool a = str == "abc"; // ok
	(void)a;

	EXPECT_EQ(str, "abc");
	EXPECT_EQ(std::string(str), "abc");
	EXPECT_EQ(std::string_view(str), "abc");
}

TEST(ConstStringView, stdInterop) {
	std::string str = "abc";
	auto slice = ConstStringView(str);
	static_assert(slice.EXTENT == extent::DYNAMIC);
	EXPECT_EQ(slice.extent(), 3);
	EXPECT_EQ(ConstStringView{slice}.extent(), 3);
	EXPECT_EQ(ConstStringView{"abc"}.extent(), 3);
	EXPECT_EQ(slice, "abc");
	EXPECT_TRUE(slice == "abc");
	EXPECT_EQ(slice, "abc"_s);
}

TEST(ConstStringView, fromDynamicString) {
	auto str = dynamicString::from("abc");
	auto slice = ConstStringView(str);
	(void)slice;
}
