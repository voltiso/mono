#include <gtest/gtest.h>

#include "v/Array"
#include "v/Slice"
#include "v/Storage"

using namespace VOLTISO_NAMESPACE;

TEST(Array, uninitialized) {
  Storage<Array<int, 10>> array;
  *(int *)&array = 123;

  new (&array) Array<int, 10>;
  EXPECT_EQ(((Array<int, 10> &)array)[0], 123);
}

TEST(Array, defaultInitialized) {
  Storage<Array<int, 10>> array;
  *(int *)&array = 123;

  new (&array) Array<int, 10>{};
  EXPECT_EQ(((Array<int, 10> &)array)[0], 0);
}

TEST(Array, initializerList) {
	// Array<int, 3> array = std::initializer_list{1, 2};
	// Array<int, 3> array = {1, 2}; // should fail, need 3 items?
	Array<int, 3> array = {1, 2, 0}; // should fail, need 3 items?

	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 0);
}

// ! currently explicit
// TEST(Array, initializerList_assign) {
//   Array<int, 3> array;
//   array = {1, 2}; // copy assignment must be explicit?

//   EXPECT_EQ(array[0], 1);
//   EXPECT_EQ(array[1], 2);
//   EXPECT_EQ(array[2], 0);
// }

TEST(Array, initializerList_deductionGuide) {
  Array array = {1, 2};

  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 2);
}

TEST(Array, sliceOfArrayDeductionGuide) {
  Array<int, 3> array = {1, 2, 3};
  auto slice = Slice(array);
	static_assert(std::is_same_v<decltype(slice), Slice<int, 3>>);
	EXPECT_EQ(slice[0], 1);
	EXPECT_EQ(slice[1], 2);
	EXPECT_EQ(slice[2], 3);
	EXPECT_EQ(slice, array);
}

TEST(Array, from) {
	auto str = array::from("abc");
	static_assert(std::is_same_v<decltype(str), Array<char, 4>>);

	auto arr = array::from({1, 2, 3});
	static_assert(std::is_same_v<decltype(arr), Array<int, 3>>);

	auto arr2 = array::from({"a"});
	static_assert(std::is_same_v<decltype(arr2), Array<const char *, 1>>);

	// auto arr3 = array::from(std::initializer_list{"a"});
}

TEST(Array, deductionGuideStr) {
	Array array = {"a", "b"};
	static_assert(std::is_same_v<decltype(array), Array<const char *, 2>>);

	// Array arr = {"abc"};

	// ! this is currently disabled - use `array::from` instead
	// auto str = Array("abc");
	// static_assert(std::is_same_v<decltype(str), Array<char, 4>>);

	Array arr = {"abc"};
	// auto arr = Array{"abc"};
	static_assert(std::is_same_v<decltype(arr), Array<const char *, 1>>);
}

TEST(Array, compareWithRaw) {
  Array<int, 3> array = {1, 2, 3};
  int raw[3] = {1, 2, 3};
	EXPECT_EQ((Slice<int, 3>(array)), (Slice<int, 3>(raw)));
	EXPECT_EQ(array, raw);
	EXPECT_EQ(raw, array);
}

TEST(Array, concat) {
	Array<int, 3> a = {1, 2, 3};
	auto b = Array{4, 5, 6};

	auto c = a << b;
	static_assert(std::is_same_v<decltype(c), Array<int, 6>>);
	EXPECT_EQ(c[0], 1);
	EXPECT_EQ(c[1], 2);
	EXPECT_EQ(c[2], 3);
	EXPECT_EQ(c[3], 4);
	EXPECT_EQ(c[4], 5);
	EXPECT_EQ(c[5], 6);
	EXPECT_EQ(c, (Array<int, 6>{1, 2, 3, 4, 5, 6}));
}
