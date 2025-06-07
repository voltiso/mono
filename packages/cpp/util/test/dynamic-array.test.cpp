#include <gtest/gtest.h>

#include <v/dynamic-array>

using namespace VOLTISO_NAMESPACE;

// test if `dynamicArray::Specializations` works
static_assert(
  std::is_same_v<DynamicArray<int>::WithItem<double>, DynamicArray<double>>);

static_assert(
  std::is_constructible_v<DynamicArray<int>, const DynamicArray<int> &&>);
static_assert(
  std::is_assignable_v<DynamicArray<int> &, const DynamicArray<int> &&>);

TEST(DynamicArray, defaultInitialized) {
	auto array = DynamicArray<int>::createWithNumItems(1);
	EXPECT_EQ(array[0], 0);
}

TEST(DynamicArray, valueInitialized) {
	auto array = DynamicArray<int>::createWithNumItems(1, 123);
	EXPECT_EQ(array[0], 123);
}

TEST(DynamicArray, initializerList) {
	DynamicArray<int> array = {1, 2};

	EXPECT_EQ(array.numItems(), 2);
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
}

TEST(DynamicArray, copy_construct) {
	auto array = DynamicArray<int>::createWithNumItems(3);
	auto array2 = array.copy();

	EXPECT_EQ(array.numItems(), 3);
	EXPECT_EQ(array2.numItems(), 3);
}

TEST(DynamicArray, copy) {
	auto array = DynamicArray<int>::createWithNumItems(3);
	auto array2 = DynamicArray<int>::createWithNumItems(2, 123);
	array = array2.copy();

	EXPECT_EQ(array.numItems(), 2);
	EXPECT_EQ(array[0], 123);
	EXPECT_EQ(array[1], 123);
}

TEST(DynamicArray, copy_const) {
	auto array = DynamicArray<int>::createWithNumItems(3);
	const auto array2 = DynamicArray<int>::createWithNumItems(2, 123);

	// array = array2; // ! should not compile
	array = array2.copy(); // ok

	EXPECT_EQ(array.numItems(), 2);
	EXPECT_EQ(array[0], 123);
	EXPECT_EQ(array[1], 123);
}

TEST(DynamicArray, move) {
	auto array = DynamicArray<int>::createWithNumItems(3);
	auto other = DynamicArray<int>::createWithNumItems(2, 123);
	array = std::move(other);

	EXPECT_EQ(array.numItems(), 2);
	EXPECT_EQ(array[0], 123);
	EXPECT_EQ(array[1], 123);
}

TEST(DynamicArray, initializerList_assign) {
	auto array = DynamicArray<int>::createWithNumItems(3);
	array = {1, 2, 3};

	EXPECT_EQ(array.numItems(), 3);
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 3);

	array = {1, 2};
	EXPECT_EQ(array.numItems(), 2);
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
}

int numConstructors = 0;
int numDestructors = 0;

struct S {
	int value;
	S(int value) : value(value) { ++numConstructors; }
	~S() { ++numDestructors; }

	bool operator==(int other) const { return value == other; }
};

template <>
constexpr auto VOLTISO_NAMESPACE::is::TriviallyRelocatable<S> = true;

TEST(DynamicArray, inPlace) {
	numConstructors = 0;
	numDestructors = 0;
	using MyArray = DynamicArray<S>::WithInPlace<5>;
	static_assert(MyArray::IN_PLACE == 5);
	MyArray a;
	EXPECT_EQ(numConstructors, 0);
	EXPECT_EQ(numDestructors, 0);
	EXPECT_EQ(a.numItems(), 0);
	EXPECT_EQ(a.numSlots(), 5);
	a.maybeGrowAndPush(1);
	EXPECT_EQ(a.numItems(), 1);
	EXPECT_EQ(a.numSlots(), 5);
	EXPECT_EQ(a[0], 1);
	EXPECT_EQ(a(0).item(), 1);
	EXPECT_EQ(numConstructors, 1);
	a.setNumSlots(6);
	EXPECT_EQ(a.numItems(), 1);
	EXPECT_EQ(a.numSlots(), 6);
	EXPECT_EQ(a[0], 1);
	EXPECT_EQ(a(0).item(), 1);
	EXPECT_EQ(numConstructors, 1);
	a.setNumSlots(2);
	EXPECT_EQ(a.numItems(), 1);
	EXPECT_EQ(a.numSlots(), 2);
	EXPECT_EQ(a[0], 1);
	EXPECT_EQ(a(0).item(), 1);
	EXPECT_EQ(numConstructors, 1);
}

TEST(DynamicArray, concatSimple) {
	auto a = DynamicArray<int>::from({1, 2, 3});
	auto b = DynamicArray<int>::from({4, 5, 6});

	a <<= b;
	EXPECT_EQ(a.numItems(), 6);
	EXPECT_EQ(a[0], 1);
	EXPECT_EQ(a[1], 2);
	EXPECT_EQ(a[2], 3);
	EXPECT_EQ(a[3], 4);
	EXPECT_EQ(a[4], 5);
	EXPECT_EQ(a[5], 6);
	EXPECT_EQ(b.numItems(), 3);
}

TEST(DynamicArray, concatMagic) {
	auto a = dynamicArray::from({1, 2, 3});
	auto b = dynamicArray::from({4, 5, 6});
	static_assert(std::is_same_v<decltype(a), DynamicArray<int>>);

	// auto c = a << b; // ! wrong
	auto c = a.copy() << b;
	EXPECT_EQ(c.numItems(), 6);
	EXPECT_EQ(c[0], 1);
	EXPECT_EQ(c[1], 2);
	EXPECT_EQ(c[2], 3);
	EXPECT_EQ(c[3], 4);
	EXPECT_EQ(c[4], 5);
	EXPECT_EQ(c[5], 6);
	EXPECT_EQ(a.numItems(), 3);
	EXPECT_EQ(b.numItems(), 3);
}
