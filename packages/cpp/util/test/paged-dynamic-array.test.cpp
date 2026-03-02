#include <gtest/gtest.h>

#include "v/paged-dynamic-array"

using namespace VOLTISO_NAMESPACE;

TEST(PagedDynamicArray, push_pop) {
	PagedDynamicArray<int> array;
	EXPECT_EQ(array.numItems(), 0);

	array.maybeGrowAndPush(1);
	EXPECT_EQ(array.numItems(), 1);
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array.numPages(), 1);

	auto item = array.pop();
	static_assert(std::is_same_v<decltype(item), int>);
	EXPECT_EQ(item, 1);
	EXPECT_EQ(array.numItems(), 0);
	EXPECT_EQ(array.numPages(), 1);

	array.maybeShrink();
	EXPECT_EQ(array.numPages(), 0);
}

TEST(PagedDynamicArray, push_pop_across_page_boundary) {
	using SmallPagedArray = PagedDynamicArray<int>::WithPageSize<16>;
	static_assert(SmallPagedArray::NUM_ITEMS_PER_PAGE == 4);
	static_assert(SmallPagedArray::PAGE_SIZE == 16);

	SmallPagedArray array;
	EXPECT_EQ(array.numItems(), 0);
	EXPECT_EQ(array.numPages(), 0);

	// Fill first page
	for (int i = 0; i < 4; ++i) {
		array.maybeGrowAndPush(i);
	}
	EXPECT_EQ(array.numItems(), 4);
	EXPECT_EQ(array.numPages(), 1);

	// Cross into second page
	array.maybeGrowAndPush(4);
	EXPECT_EQ(array.numItems(), 5);
	EXPECT_EQ(array.numPages(), 2);

	for (int i = 0; i < 5; ++i) {
		EXPECT_EQ(array[i], i);
	}

	// Pop back across boundary
	EXPECT_EQ(array.pop(), 4);
	EXPECT_EQ(array.numItems(), 4);
	EXPECT_EQ(array.numPages(), 2); // page capacity remains until maybeShrink()

	// Push again into the new page slot
	array.maybeGrowAndPush(40);
	EXPECT_EQ(array.numItems(), 5);
	EXPECT_EQ(array[4], 40);

	EXPECT_EQ(array.pop(), 40);
	EXPECT_EQ(array.pop(), 3);
	EXPECT_EQ(array.pop(), 2);
	EXPECT_EQ(array.pop(), 1);
	EXPECT_EQ(array.pop(), 0);
	EXPECT_EQ(array.numItems(), 0);

	array.maybeShrink();
	EXPECT_EQ(array.numPages(), 0);
}

TEST(PagedDynamicArray, regular_copy_contract) {
	using SmallPagedArray = PagedDynamicArray<int>::WithPageSize<16>;
	static_assert(SmallPagedArray::NUM_ITEMS_PER_PAGE == 4);

	SmallPagedArray a;
	for (int i = 0; i < 5; ++i) {
		a.maybeGrowAndPush(i); // crosses page boundary (4 + 1)
	}
	EXPECT_EQ(a.numItems(), 5);
	EXPECT_EQ(a.numPages(), 2);

	// have to use explicit copy syntax
	static_assert(!std::is_copy_constructible_v<SmallPagedArray>);
	auto b = a.copy(); // explicit copy syntax
	static_assert(std::is_same_v<decltype(b), SmallPagedArray>);

	EXPECT_EQ(b.numItems(), a.numItems());
	EXPECT_EQ(b.numPages(), a.numPages());
	for (int i = 0; i < 5; ++i) {
		EXPECT_EQ(b[i], a[i]);
	}

	b.pop();
	// b.maybeShrink();
	b.maybeGrowAndPush(40);
	EXPECT_EQ(a[4], 4);
	EXPECT_EQ(b[4], 40);
}

TEST(PagedDynamicArray, cow_copy_basic_behavior) {
	using CowPagedArray =
	  PagedDynamicArray<int>::WithPageSize<32>::WithCopyOnWrite;

	static_assert(CowPagedArray::NUM_ITEMS_PER_PAGE == 5);

	CowPagedArray a;
	for (int i = 0; i < 5; ++i) {
		a.maybeGrowAndPush(i); // fills one page exactly
	}
	EXPECT_EQ(a.numPages(), 1);

	a.maybeGrowAndPush(5); // crosses into second page
	EXPECT_EQ(a.numPages(), 2);

	// have to use explicit copy syntax
	static_assert(!std::is_copy_constructible_v<CowPagedArray>);
	auto b = a.copy(); // explicit copy syntax
	static_assert(std::is_same_v<decltype(b), CowPagedArray>);

	// Same visible data after copy
	EXPECT_EQ(b.numItems(), a.numItems());
	EXPECT_EQ(b.numPages(), a.numPages());
	for (int i = 0; i < 6; ++i) {
		EXPECT_EQ(b[i], a[i]);
	}

	// Mutate copy tail; original should remain unchanged.
	EXPECT_EQ(b.pop(), 5);
	b.maybeGrowAndPush(40);

	EXPECT_EQ(a.numItems(), 6);
	EXPECT_EQ(a[5], 5);

	EXPECT_EQ(b.numItems(), 6);
	EXPECT_EQ(b[5], 40);
}
