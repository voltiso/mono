#include <gtest/gtest.h>

#include "v/paged-dynamic-array"
#include "v/soa"

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

	static_assert(CowPagedArray::NUM_ITEMS_PER_PAGE == 6);

	CowPagedArray a;
	for (int i = 0; i < 6; ++i) {
		a.maybeGrowAndPush(i); // fills one page exactly
	}
	EXPECT_EQ(a.numPages(), 1);

	a.maybeGrowAndPush(6); // crosses into second page
	EXPECT_EQ(a.numPages(), 2);

	// have to use explicit copy syntax
	static_assert(!std::is_copy_constructible_v<CowPagedArray>);
	auto b = a.copy(); // explicit copy syntax
	static_assert(std::is_same_v<decltype(b), CowPagedArray>);

	// Same visible data after copy
	EXPECT_EQ(b.numItems(), a.numItems());
	EXPECT_EQ(b.numPages(), a.numPages());
	for (int i = 0; i < 7; ++i) {
		EXPECT_EQ(b[i], a[i]);
	}

	// Mutate copy tail; original should remain unchanged.
	EXPECT_EQ(b.pop(), 6);
	b.maybeGrowAndPush(40);

	EXPECT_EQ(a.numItems(), 7);
	EXPECT_EQ(a[6], 6);

	EXPECT_EQ(b.numItems(), 7);
	EXPECT_EQ(b[6], 40);
}

// Destructor probe for non-SOA (normal) PagedDynamicArray: verifies that
// item destructors are called on array destruction and when popped items
// go out of scope. Type must be non-trivially-copyable so WRAP_IN_STORAGE
// is used and slot.destroy()/relocate() paths are exercised.
namespace {
struct PagedDestructorProbe {
	static int numDestructorCalls;
	int value = 0;
	PagedDestructorProbe() = default;
	explicit PagedDestructorProbe(int v) : value(v) {}
	~PagedDestructorProbe() { ++numDestructorCalls; }
	PagedDestructorProbe(const PagedDestructorProbe &) = delete;
	PagedDestructorProbe(PagedDestructorProbe &&) = delete;
	PagedDestructorProbe &operator=(const PagedDestructorProbe &) = delete;
	PagedDestructorProbe &operator=(PagedDestructorProbe &&) = delete;
};
int PagedDestructorProbe::numDestructorCalls = 0;
} // namespace
template <>
constexpr auto
  VOLTISO_NAMESPACE::is::TriviallyRelocatable<PagedDestructorProbe> = true;

TEST(PagedDynamicArray, destructors_called_on_destroy) {
	using SmallPagedArray =
	  PagedDynamicArray<PagedDestructorProbe>::WithPageSize<8>;
	PagedDestructorProbe::numDestructorCalls = 0;

	static_assert(SmallPagedArray::NUM_ITEMS_PER_PAGE == 2);

	{
		SmallPagedArray array;
		array.maybeGrowAndPush();
		array.maybeGrowAndPush(1);
		array.maybeGrowAndPush(2);
		EXPECT_EQ(array.numPages(), 2);
		EXPECT_EQ(array.numItems(), 3);
		EXPECT_EQ(PagedDestructorProbe::numDestructorCalls, 0);
	}
	// Array destruction runs destructors for the 3 stored items
	EXPECT_EQ(PagedDestructorProbe::numDestructorCalls, 3);
}

// ========================================================================
// SOA TESTS FOR PAGED DYNAMIC ARRAY
// - Reuses the Position/Pose/MyItem macros from soa.test.cpp style
// - Verifies mixed initialized / uninitialized fields
// - Verifies nested struct constructors via default member initializers
// - Exercises both normal and copy-on-write paged arrays with soa::Array
// ========================================================================

#define POSITION_FIELDS(X)                                                     \
	X(float, x)                                                                  \
	X(float, y, 42.0f)                                                           \
	X(float, z)
VOLTISO_SOA_STRUCT(Position, POSITION_FIELDS)

struct Orientation {
	float w, x, y, z;
};

struct Velocity {
	float x, y, z;
};

// Helper to verify that nested struct default member initializers /
// constructors are invoked when items are default-constructed through
// the SoA paged array.
struct HalfInit {
	float uninit;
	float init{77.0f};
};

#define POSE_FIELDS(X)                                                         \
	X(soa::Flatten<Position>, position)                                          \
	X(Orientation, orientation, 1.0f, 0.0f, 0.0f, 0.0f)                          \
	X(HalfInit, half)
VOLTISO_SOA_STRUCT(Pose, POSE_FIELDS)

#define MYITEM_FIELDS(X)                                                       \
	X(Velocity, velocity)                                                        \
	X(soa::Flatten<Pose>, pose)
VOLTISO_SOA_STRUCT(MyItem, MYITEM_FIELDS)

TEST(PagedDynamicArray, soa) {
	using MyArray =
	  PagedDynamicArray<MyItem>::WithPageSize<128>::WithTensor<SoaArray>;
	using MyCowArray = PagedDynamicArray<MyItem>::WithPageSize<128>::WithTensor<
	  SoaArray>::WithCopyOnWrite;

	static_assert(MyArray::NUM_ITEMS_PER_PAGE == 2);

	// Normal (non-COW) SoA paged array: mixed initialized / uninitialized fields.
	{
		MyArray array;
		array.maybeGrowAndPush(); // default-constructed MyItem through paged array

		ASSERT_EQ(array.numItems(), 1);
		auto &item = array[0];

		// Field with explicit initializer in macro.
		EXPECT_FLOAT_EQ(item.pose.position.y, 42.0f);
		// Struct with default member initializer inside a SoA field.
		EXPECT_FLOAT_EQ(item.pose.half.init, 77.0f);

		// Fields without explicit initializers should not all match the init
		// sentinels.
		EXPECT_NE(item.pose.position.x, 42.0f);
		EXPECT_NE(item.pose.position.z, 42.0f);
		EXPECT_NE(item.pose.half.uninit, 77.0f);
	}

	// Copy-on-write SoA paged array: same initialization behavior and
	// independence.
	{
		MyCowArray a;
		a.maybeGrowAndPush(); // default-initialized item

		MyItem custom{};
		custom.pose.position.y = 10.0f;
		custom.pose.half.uninit = 5.0f;
		a.maybeGrowAndPush(custom);

		ASSERT_EQ(a.numItems(), 2);

		auto b = a.copy();
		ASSERT_EQ(b.numItems(), 2);

		// Copy preserves initialized values.
		EXPECT_FLOAT_EQ(b[0].pose.position.y, 42.0f);
		EXPECT_FLOAT_EQ(b[0].pose.half.init, 77.0f);
		EXPECT_FLOAT_EQ(b[1].pose.position.y, custom.pose.position.y);
		EXPECT_FLOAT_EQ(b[1].pose.half.uninit, custom.pose.half.uninit);

		// Mutate copy tail; original remains unchanged (COW behavior).
		auto popped = b.pop();
		EXPECT_FLOAT_EQ(popped.pose.position.y, custom.pose.position.y);
		EXPECT_EQ(b.numItems(), 1);

		MyItem replacement{};
		replacement.pose.position.y = 99.0f;
		b.maybeGrowAndPush(replacement);

		EXPECT_EQ(a.numItems(), 2);
		EXPECT_FLOAT_EQ(a[1].pose.position.y, custom.pose.position.y);

		EXPECT_EQ(b.numItems(), 2);
		EXPECT_FLOAT_EQ(b[1].pose.position.y, replacement.pose.position.y);
	}
}
