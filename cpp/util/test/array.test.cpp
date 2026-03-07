#include <gtest/gtest.h>

#include "v/array"
#include "v/is/relocatable"
#include "v/storage"
#include "v/view"

#include <array>
#include <string>
#include <type_traits>

#include <v/ON>

using namespace VOLTISO_NAMESPACE;

// !

static_assert(
  std::is_trivially_copyable_v<array::Custom<Options<option::Item<int>>>>);
static_assert(std::is_trivially_copyable_v<Array<int, 1>>);

static_assert(is::relocatable<array::Custom<Options<option::Item<int>>>>);
static_assert(is::relocatable<Array<int, 1>>);

struct NonRelocatable {
	NonRelocatable(const NonRelocatable &) {}
};
static_assert(!is::relocatable<NonRelocatable>);

static_assert(!is::relocatable<Array<NonRelocatable, 3>>);
static_assert(
  !is::relocatable<array::Custom<Options<option::Item<NonRelocatable>>>>);

// !

// ! note: our Array is not an aggregate type !
// there's too many cool stuff in it
// we don't want implicit linear-time copies, etc.
// - If you need an aggregate type, just use `std::array`
static_assert(!std::is_aggregate_v<Array<int, 3>>); // !
static_assert(std::is_aggregate_v<std::array<int, 3>>);

using Implicit = Array<int, 3>::WithImplicitCopy;

static_assert(std::is_trivially_copyable_v<Implicit>);
// WithImplicitCopy should restore regular copy/move ergonomics.
static_assert(std::is_constructible_v<Implicit, Implicit &>);
static_assert(std::is_constructible_v<Implicit, Implicit &&>);
static_assert(std::is_constructible_v<Implicit, const Implicit &>);
static_assert(std::is_constructible_v<Implicit, const Implicit &&>);
static_assert(std::is_assignable_v<Implicit &, Implicit>);
static_assert(std::is_assignable_v<Implicit &, Implicit &>);
static_assert(std::is_assignable_v<Implicit &, Implicit &&>);
static_assert(std::is_assignable_v<Implicit &, const Implicit &>);
static_assert(std::is_assignable_v<Implicit &, const Implicit &&>);

TEST(Array, uninitialized) {
	Storage<Array<int, 10>> array;
	*(int *)&array = 123;

	// No value-init here: underlying bytes remain untouched.
	new (&array) Array<int, 10>;
	EXPECT_EQ(((Array<int, 10> &)array)[0], 123);
}

TEST(Array, defaultInitialized) {
	Storage<Array<int, 10>> array;
	*(int *)&array = 123;

	// `{}` value-initializes the storage.
	new (&array) Array<int, 10>{};
	EXPECT_EQ(((Array<int, 10> &)array)[0], 0);
}

TEST(Array, initializerList) {
	Array<int, 3> array = {1, 2, 0};
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 0);
}

TEST(Array, deductionGuide) {
	auto array = Array{1, 2, 3};
	static_assert(std::is_same_v<decltype(array), Array<int, 3L>>);
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 3);
}

TEST(Array, deductionGuideStrings) {
	auto array = Array{"a", "b"};
	static_assert(std::is_same_v<decltype(array), Array<const char *, 2L>>);
	EXPECT_EQ(array[0], "a");
	EXPECT_EQ(array[1], "b");
}

TEST(Array, deductionGuideSingleString) {
	auto array = Array{"a"};
	static_assert(std::is_same_v<decltype(array), Array<const char *, 1L>>);
	EXPECT_EQ(array[0], "a");
}

TEST(Array, initializerList_deductionGuide) {
	Array array = {1, 2};
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
}

TEST(Array, from) {
	auto str = array::from("abc");
	static_assert(std::is_same_v<decltype(str), Array<char, 4>>);

	auto arr = array::from({1, 2, 3});
	static_assert(std::is_same_v<decltype(arr), Array<int, 3>>);

	auto arr2 = array::from({"a"});
	static_assert(std::is_same_v<decltype(arr2), Array<const char *, 1>>);
}

TEST(Array, deductionGuideStr) {
	Array array = {"a", "b"};
	static_assert(std::is_same_v<decltype(array), Array<const char *, 2L>>);

	Array arr = {"abc"};
	static_assert(std::is_same_v<decltype(arr), Array<const char *, 1L>>);
}

TEST(Array, sliceOfArrayDeductionGuide) {
	Array<int, 3> array = {1, 2, 3};
	static_assert(Array<int, 3>::NUM_ITEMS == 3);
	static_assert(Array<int, 3>::EXTENT == 3);
	auto slice = View{array};
	static_assert(std::is_same_v<decltype(slice), View<int, 3>>);
	EXPECT_EQ(slice[0], 1);
	EXPECT_EQ(slice[1], 2);
	EXPECT_EQ(slice[2], 3);
	EXPECT_EQ(slice, array);
}

TEST(Array, compareWithRaw) {
	Array<int, 3> array = {1, 2, 3};
	int raw[3] = {1, 2, 3};
	// Comparison routes through View interoperability.
	EXPECT_EQ((View<int, 3>(array)), (View<int, 3>(raw)));
	EXPECT_EQ(array, raw);
	EXPECT_EQ(raw, array);
}

TEST(Array, concat) {
	Array<int, 3> a = {1, 2, 3};
	auto b = Array{4, 5, 6};
	static_assert(std::is_same_v<decltype(b), Array<int, 3L>>);

	auto c = a << b;
	static_assert(std::is_same_v<decltype(c), Array<int, 6L>>);
	EXPECT_EQ(c[0], 1);
	EXPECT_EQ(c[1], 2);
	EXPECT_EQ(c[2], 3);
	EXPECT_EQ(c[3], 4);
	EXPECT_EQ(c[4], 5);
	EXPECT_EQ(c[5], 6);
	EXPECT_EQ(c, (Array<int, 6>{1, 2, 3, 4, 5, 6}));
}

TEST(Array, noImplicitCopy) {
	// Regular copy/move is intentionally disabled (linear-time operation).
	static_assert(!std::is_constructible_v<Array<int, 3>, Array<int, 3> &>);
	static_assert(!std::is_constructible_v<Array<int, 3>, Array<int, 3>>);

	Array<int, 3> array = {1, 2, 3};
	Array<int, 3> newArray = array.copy();
	EXPECT_EQ(newArray, array);

	Array<int, 3> anotherArray;
	static_assert(!std::is_assignable_v<Array<int, 3> &, Array<int, 3>>);
	anotherArray = array.copy();
	EXPECT_EQ(anotherArray, array);
}

TEST(Array, iterators) {
	Array<int, 3> array = {10, 20, 30};

	int sum = 0;
	for (const auto &val : array) {
		sum += val;
	}
	EXPECT_EQ(sum, 60);
	EXPECT_EQ(std::distance(array.begin(), array.end()), 3);
	EXPECT_TRUE(std::equal(array.begin(), array.end(), array.data()));
}

TEST(Array, stringConversions) {
	Array<char, 3> text = {'a', 'b', 'c'};
	// std::string_view conversion is implicit and constant-time.
	std::string_view sv = text;
	EXPECT_EQ(sv, "abc");
	EXPECT_EQ(sv.length(), 3);

	// std::string conversion performs allocation/copy, so explicit.
	std::string s = static_cast<std::string>(text);
	EXPECT_EQ(s, "abc");
	EXPECT_EQ(s.length(), 3);
}

TEST(Array, viewMemberFunction) {
	Array<int, 3> array = {1, 2, 3};
	auto v = array.view();
	EXPECT_EQ(v[0], 1);
	EXPECT_EQ(v[1], 2);
	EXPECT_EQ(v[2], 3);

	const Array<int, 3> constArray = {4, 5, 6};
	auto cv = constArray.view();
	EXPECT_EQ(cv[0], 4);
}

TEST(Array, runtimeExtentAndNumItems) {
	Array<int, 6> array = {1, 2, 3, 4, 5, 6};
	EXPECT_EQ(array.numItems(), 6);
	EXPECT_EQ(array.extent(), 6);
	auto s = array.strides();
	EXPECT_EQ(s[0], 1);
}

TEST(Array, explicitRawArrayConversion) {
	Array<int, 3> array = {7, 8, 9};
	// Explicit cast to avoid silently dropping semantic type info.
	auto &raw = static_cast<RawArray<int, 3> &>(array);
	EXPECT_EQ(raw[0], 7);
	EXPECT_EQ(raw[1], 8);
	EXPECT_EQ(raw[2], 9);

	raw[0] = 99;
	EXPECT_EQ(array[0], 99);
}

TEST(Array, customStartingIndex) {
	using Custom1Indexed = array::Custom<Options<
	  option::Item<int>, option::Extents<ValuePack<3>>,
	  option::startingIndex<1>>>;

	Custom1Indexed array = {10, 20, 30};
	EXPECT_EQ(array[1], 10);
	EXPECT_EQ(array[2], 20);
	EXPECT_EQ(array[3], 30);
}

#include <v/OFF>
