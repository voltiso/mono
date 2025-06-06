#include <gtest/gtest.h>

#include "v/_/tensor.hpp"
#include "v/storage"
#include "v/tensor"
#include "v/view"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

// ! note: our Tensor is not an aggregate type !
// there's too many cool stuff in it
// we don't want implicit linear-time copies, etc.
// - If you need an aggregate type, just use `std::array`
static_assert(std::is_aggregate_v<std::array<int, 3>>);
static_assert(!std::is_aggregate_v<Tensor<int, 3>>);

TEST(Tensor, uninitialized) {
	Storage<Tensor<int, 10>> array;
	*(int *)&array = 123;

	new (&array) Tensor<int, 10>;
	EXPECT_EQ(((Tensor<int, 10> &)array)[0], 123);
}

TEST(Tensor, defaultInitialized) {
	Storage<Tensor<int, 10>> array;
	*(int *)&array = 123;

	new (&array) Tensor<int, 10>{};
	EXPECT_EQ(((Tensor<int, 10> &)array)[0], 0);
}

TEST(Tensor, initializerList) {
	// Tensor<int, 3> array = std::initializer_list{1, 2};
	// Tensor<int, 3> array = {1, 2}; // should fail, need 3 items?
	Tensor<int, 3> array = {1, 2, 0}; // should fail, need 3 items?

	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 0);
}

TEST(Tensor, deductionGuide) {
	auto array = Tensor{1, 2, 3};
	static_assert(std::is_same_v<decltype(array), Tensor<int, 3L>>);
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 3);
}

TEST(Tensor, deductionGuideStrings) {
	auto array = Tensor{"a", "b"};
	static_assert(std::is_same_v<decltype(array), Tensor<const char *, 2L>>);
	EXPECT_EQ(array[0], "a");
	EXPECT_EQ(array[1], "b");
}

TEST(Tensor, deductionGuideSingleString) {
	auto array = Tensor{"a"};
	static_assert(std::is_same_v<decltype(array), Tensor<const char *, 1L>>);
	EXPECT_EQ(array[0], "a");
}

// ! currently explicit
// TEST(Tensor, initializerList_assign) {
//   Tensor<int, 3> array;
//   array = {1, 2}; // copy assignment must be explicit?

//   EXPECT_EQ(array[0], 1);
//   EXPECT_EQ(array[1], 2);
//   EXPECT_EQ(array[2], 0);
// }

TEST(Tensor, initializerList_deductionGuide) {
	Tensor array = {1, 2};

	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
}

TEST(Tensor, sliceOfTensorDeductionGuide) {
	Tensor<int, 3> tensor = {1, 2, 3};
	static_assert(Tensor<int, 3>::NUM_ITEMS == 3);
	static_assert(Tensor<int, 3>::EXTENT == 3);
	auto slice = View{tensor};
	static_assert(std::is_same_v<decltype(slice), View<int, 3>>);
	EXPECT_EQ(slice[0], 1);
	EXPECT_EQ(slice[1], 2);
	EXPECT_EQ(slice[2], 3);
	EXPECT_EQ(slice, tensor);
}

TEST(Tensor, from) {
	auto str = tensor::from("abc");
	static_assert(std::is_same_v<decltype(str), Tensor<char, 4>>);

	auto arr = tensor::from({1, 2, 3});
	static_assert(std::is_same_v<decltype(arr), Tensor<int, 3>>);

	auto arr2 = tensor::from({"a"});
	static_assert(std::is_same_v<decltype(arr2), Tensor<const char *, 1>>);

	// auto arr3 = tensor::from(std::initializer_list{"a"});
}

TEST(Tensor, deductionGuideStr) {
	Tensor array = {"a", "b"};
	static_assert(std::is_same_v<decltype(array), Tensor<const char *, 2L>>);

	// Tensor arr = {"abc"};

	// ! this is currently disabled - use `array::from` instead
	// auto str = Tensor("abc");
	// static_assert(std::is_same_v<decltype(str), Tensor<char, 4>>);

	Tensor arr = {"abc"};
	// auto arr = Tensor{"abc"};
	static_assert(std::is_same_v<decltype(arr), Tensor<const char *, 1L>>);
}

TEST(Tensor, compareWithRaw) {
	Tensor<int, 3> array = {1, 2, 3};
	int raw[3] = {1, 2, 3};
	EXPECT_EQ((View<int, 3>(array)), (View<int, 3>(raw)));
	EXPECT_EQ(array, raw);
	EXPECT_EQ(raw, array);
}

TEST(Tensor, concat) {
	Tensor<int, 3> a = {1, 2, 3};
	auto b = Tensor{4, 5, 6};
	static_assert(std::is_same_v<decltype(b), Tensor<int, 3L>>);

	auto c = a << b;
	static_assert(std::is_same_v<decltype(c), Tensor<int, 6L>>);
	EXPECT_EQ(c[0], 1);
	EXPECT_EQ(c[1], 2);
	EXPECT_EQ(c[2], 3);
	EXPECT_EQ(c[3], 4);
	EXPECT_EQ(c[4], 5);
	EXPECT_EQ(c[5], 6);
	EXPECT_EQ(c, (Tensor<int, 6>{1, 2, 3, 4, 5, 6}));
}

TEST(Tensor, md) {
	Tensor<int, 2, 2> tensor = {{1, 2}, {3, 4}};
	static_assert(std::is_same_v<decltype(tensor.items), RawArray<int, 4>>);
	static_assert(std::is_same_v<decltype(tensor.items[0]), int &>);
	static_assert(std::is_same_v<decltype(tensor[0]), View<int, 2>>);
	static_assert(std::is_same_v<decltype(tensor[0][0]), int &>);
	EXPECT_EQ(tensor[0][0], 1);
	EXPECT_EQ(tensor[0][1], 2);
	EXPECT_EQ(tensor[1][0], 3);
	EXPECT_EQ(tensor[1][1], 4);
}

TEST(tensor, md_const) {
	const Tensor<int, 2, 2> tensor = {{1, 2}, {3, 4}};

	// not const?
	static_assert(std::is_same_v<decltype(tensor.items), RawArray<int, 4>>);
	static_assert(std::is_same_v<decltype(tensor.items[0]), const int &>);

	static_assert(std::is_same_v<decltype(tensor[0]), View<const int, 2>>);
	static_assert(std::is_same_v<decltype(tensor[0][0]), const int &>);

	EXPECT_EQ(tensor[0][0], 1);
	EXPECT_EQ(tensor[0][1], 2);
	EXPECT_EQ(tensor[1][0], 3);
	EXPECT_EQ(tensor[1][1], 4);
}

TEST(Tensor, mdFlat) {
	Tensor<int, 2, 2> tensor = {1, 2, 3, 4};
	EXPECT_EQ(tensor[0][0], 1);
	EXPECT_EQ(tensor[0][1], 2);
	EXPECT_EQ(tensor[1][0], 3);
	EXPECT_EQ(tensor[1][1], 4);
}
