#include <gtest/gtest.h>

#include <v/array>
#include <v/get/raw-array>

TEST(getRawArray, rawArray) {
	int a[5] = {1, 2, 3, 4, 5};
	auto &b = v::get::rawArray(a);
	static_assert(std::is_same_v<decltype(b), int (&)[5]>);
	auto c = v::get::rawArray(a); // decay
	static_assert(std::is_same_v<decltype(c), int *>);
}

TEST(getRawArray, vArray) {
	v::Array<int, 5> a = {1, 2, 3, 4, 5};
	static_assert(v::get::extent(a).value == 5);
	auto &aa = static_cast<int (&)[5]>(a);
	static_assert(std::is_same_v<decltype(aa), int (&)[5]>);
	static_assert(std::is_constructible_v<int (&)[5], decltype(a)>);

	// this is false: explicit conversion operator
	// static_assert(std::is_convertible_v<decltype(a), int (&)[5]>);

	// auto& aaa = decltype (&a[0]){};

	auto &b = v::get::rawArray(a);
	static_assert(std::is_same_v<decltype(b), int (&)[5]>);
	auto c = v::get::rawArray(a); // decay
	static_assert(std::is_same_v<decltype(c), int *>);
}

TEST(getRawArray, stdArray) {
	std::array<int, 5> a = {1, 2, 3, 4, 5};
	auto &b = v::get::rawArray(a);
	static_assert(std::is_same_v<decltype(b), int (&)[5]>);
	auto c = v::get::rawArray(a); // decay
	static_assert(std::is_same_v<decltype(c), int *>);
}

TEST(getRawArray, stdVector) {
	std::vector<int> a = {1, 2, 3, 4, 5};
	auto &b = v::get::rawArray(a);
	static_assert(std::is_same_v<decltype(b), int (&)[]>);
	auto c = v::get::rawArray(a); // decay
	static_assert(std::is_same_v<decltype(c), int *>);
}

TEST(getRawArray, vDynamicArray) {
	v::DynamicArray<int> a = {1, 2, 3, 4, 5};
	auto &b = v::get::rawArray(a);
	static_assert(std::is_same_v<decltype(b), int (&)[]>);
	auto c = v::get::rawArray(a); // decay
	static_assert(std::is_same_v<decltype(c), int *>);
}
