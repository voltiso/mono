#include <gtest/gtest.h>

#include "v/is/relocatable"
#include "v/storage"
#include "v/tensor"
#include "v/view"

#include <type_traits>

#include <v/ON>

using namespace VOLTISO_NAMESPACE;

// !

class RELOCATABLE(AbiTest) : public Tensor<int, 1> {};

// ! should fail
// struct NonRelocatable {
// 	NonRelocatable(const NonRelocatable &) = delete;
// };
// class RELOCATABLE(AbiTest2) : public Tensor<NonRelocatable, 1> {};

// !

static_assert(
  std::is_trivially_copyable_v<tensor::Custom<Options<option::Item<int>>>>);
static_assert(std::is_trivially_copyable_v<Tensor<int, 1>>);

static_assert(is::relocatable<tensor::Custom<Options<option::Item<int>>>>);
static_assert(is::relocatable<Tensor<int, 1>>);

struct NonRelocatable {
	NonRelocatable(const NonRelocatable &) {}
	~NonRelocatable() {}
};
static_assert(!is::relocatable<NonRelocatable>);

static_assert(!is::relocatable<Tensor<NonRelocatable, 3>>);
static_assert(
  !is::relocatable<tensor::Custom<Options<option::Item<NonRelocatable>>>>);

// !

static_assert(
  std::is_trivially_copyable_v<tensor::Custom<Options<option::Item<int>>>>);

static_assert(std::is_trivially_copyable_v<v::_::tensor::CustomNNR<v::Options<
                v::option::Item<int>, v::option::Extents<v::ValuePack<3>>,
                v::option::implicitCopy<true>>>>);

static_assert(std::is_trivially_copyable_v<Tensor<int, 1>>);

static_assert(is::_::builtinRelocatable<
              V::_::tensor::CustomNNR<Options<option::Item<int>>>>);

static_assert(
  is::_::builtinRelocatable<tensor::Custom<Options<option::Item<int>>>>);
static_assert(is::_::builtinRelocatable<Tensor<int, 1>>);
static_assert(is::relocatable<Tensor<int, 1>>);

// ! note: our Tensor is not an aggregate type !
// there's too many cool stuff in it
// we don't want implicit linear-time copies, etc.
// - If you need an aggregate type, just use `std::array`
static_assert(std::is_aggregate_v<std::array<int, 3>>);
static_assert(!std::is_aggregate_v<Tensor<int, 3>>);

// !

using Implicit = Tensor<int, 3>::WithImplicitCopy;

static_assert(std::is_trivially_copyable_v<Implicit>);

// void test() {
// 	Implicit a;
// 	Implicit b = a;
// 	Implicit c = std::move(a);
// 	(void)c;
// 	b = a;
// 	b = std::move(a);
// }

static_assert(std::is_constructible_v<Implicit, Implicit &>);
static_assert(std::is_constructible_v<Implicit, Implicit &&>);
static_assert(std::is_constructible_v<Implicit, const Implicit &>);
static_assert(std::is_constructible_v<Implicit, const Implicit &&>);

static_assert(std::is_assignable_v<Implicit &, Implicit>);
static_assert(std::is_assignable_v<Implicit &, Implicit &>);
static_assert(std::is_assignable_v<Implicit &, Implicit &&>);
static_assert(std::is_assignable_v<Implicit &, const Implicit &>);
static_assert(std::is_assignable_v<Implicit &, const Implicit &&>);

// !

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

TEST(Tensor, noImplicitCopy) {
	static_assert(!std::is_constructible_v<Tensor<int, 3>, Tensor<int, 3> &>);
	static_assert(!std::is_constructible_v<Tensor<int, 3>, Tensor<int, 3>>);
	Tensor<int, 3> tensor = {1, 2, 3};
	// Tensor<int, 3> copy = tensor; // wrong (linear time)
	// Tensor<int, 3> copy = std::move(tensor);  // wrong (linear time)
	// Tensor<int, 3> newTensor = tensor.move(); // wrong (linear time)
	Tensor<int, 3> newTensor = tensor.copy(); // ok (linear time)
	EXPECT_EQ(newTensor, tensor);
	EXPECT_EQ(newTensor[0], tensor[0]);
	EXPECT_EQ(newTensor[1], tensor[1]);
	EXPECT_EQ(newTensor[2], tensor[2]);

	// assignment operator
	Tensor<int, 3> anotherTensor;
	static_assert(!std::is_assignable_v<Tensor<int, 3> &, Tensor<int, 3>>);
	// anotherTensor = tensor;
	anotherTensor = tensor.copy();
	EXPECT_EQ(anotherTensor, tensor);
	EXPECT_EQ(anotherTensor[0], tensor[0]);
	EXPECT_EQ(anotherTensor[1], tensor[1]);
	EXPECT_EQ(anotherTensor[2], tensor[2]);
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

// ! NEW TESTS BEFORE REFACTOR AND DYNAMIC TENSORS

TEST(Tensor, iterators) {
	Tensor<int, 3> tensor = {10, 20, 30};

	// Test range-based for loop
	int sum = 0;
	for (const auto &val : tensor) {
		sum += val;
	}
	EXPECT_EQ(sum, 60);

	// Test standard algorithm compatibility
	EXPECT_EQ(std::distance(tensor.begin(), tensor.end()), 3);
	EXPECT_TRUE(std::equal(tensor.begin(), tensor.end(), tensor.data()));
}

TEST(Tensor, stringConversions) {
	Tensor<char, 3> text = {'a', 'b', 'c'};

	// Implicit conversion to std::string_view
	std::string_view sv = text;
	EXPECT_EQ(sv, "abc");
	EXPECT_EQ(sv.length(), 3);

	// Explicit conversion to std::string
	std::string s = static_cast<std::string>(text);
	EXPECT_EQ(s, "abc");
	EXPECT_EQ(s.length(), 3);
}

TEST(Tensor, viewMemberFunction) {
	Tensor<int, 3> tensor = {1, 2, 3};

	// Non-const view
	auto v = tensor.view();
	EXPECT_EQ(v[0], 1);
	EXPECT_EQ(v[1], 2);
	EXPECT_EQ(v[2], 3);

	// Const view
	const Tensor<int, 3> constTensor = {4, 5, 6};
	auto cv = constTensor.view();
	EXPECT_EQ(cv[0], 4);
}

TEST(Tensor, runtimeStridesAndNumItems) {
	Tensor<int, 2, 3> tensor = {1, 2, 3, 4, 5, 6};

	EXPECT_EQ(tensor.numItems(), 6);
	EXPECT_EQ(tensor.extent(), 2); // Base::EXTENT returns the first dimension

	auto s = tensor.strides();
	// For a 2x3 row-major tensor:
	// Stride of dim 0 (rows) should be 3
	// Stride of dim 1 (cols) should be 1
	EXPECT_EQ(s[0], 3);
	EXPECT_EQ(s[1], 1);

	Tensor<int, 2, 3, 4> tensor3D;
	auto s3 = tensor3D.strides();
	EXPECT_EQ(s3[0], 12); // 3 * 4
	EXPECT_EQ(s3[1], 4);
	EXPECT_EQ(s3[2], 1);
}

TEST(Tensor, explicitRawArrayConversion) {
	Tensor<int, 3> tensor = {7, 8, 9};

	// Explicit cast to underlying raw array reference
	auto &raw = static_cast<RawArray<int, 3> &>(tensor);
	EXPECT_EQ(raw[0], 7);
	EXPECT_EQ(raw[1], 8);
	EXPECT_EQ(raw[2], 9);

	// Ensure modifying the raw array modifies the tensor
	raw[0] = 99;
	EXPECT_EQ(tensor[0], 99);
}

TEST(Tensor, customStartingIndex) {
	using Custom1Indexed = tensor::Custom<Options<
	  option::Item<int>, option::Extents<ValuePack<3>>,
	  option::startingIndex<1> // Adjust this to match your exact option type name
	  >>;

	Custom1Indexed tensor = {10, 20, 30};
	EXPECT_EQ(tensor[1], 10);
	EXPECT_EQ(tensor[2], 20);
	EXPECT_EQ(tensor[3], 30);
}

// ! DYNAMIC

// TEST(Tensor, initializerList_dynamic) {
// 	Tensor<int, extent::DYNAMIC> array = {1, 2, 3};
// 	EXPECT_EQ(array.extent(), 3);
// 	EXPECT_EQ(array[0], 1);
// 	EXPECT_EQ(array[1], 2);
// 	EXPECT_EQ(array[2], 3);
// }

#include <v/OFF>
