#include <cstddef> // for offsetof
#include <cstdlib> // for malloc, free
#include <cstring> // for memset, memcpy
#include <gtest/gtest.h>
#include <type_traits>

#include "v/soa"

// Import the namespace so our tests have clean access to soa::Flatten, etc.
using namespace VOLTISO_NAMESPACE;

// ========================================================================
// USER DATA DEFINITIONS
// ========================================================================

#define POSITION_FIELDS(X)                                                     \
	X(float, x)                                                                  \
	X(float, y)                                                                  \
	X(float, z)
VOLTISO_SOA_STRUCT(Position, POSITION_FIELDS)

static_assert(std::is_trivially_copyable_v<Position>);
static_assert(std::is_trivially_constructible_v<Position>);

struct Orientation {
	float w, x, y, z;
};

struct Velocity {
	float x, y, z;
};

#define POSE_FIELDS(X)                                                         \
	X(soa::Flatten<Position>, position)                                          \
	X(Orientation, orientation)
VOLTISO_SOA_STRUCT(Pose, POSE_FIELDS)

#define MYITEM_FIELDS(X)                                                       \
	X(Velocity, velocity)                                                        \
	X(soa::Flatten<Pose>, pose)
VOLTISO_SOA_STRUCT(MyItem, MYITEM_FIELDS)

static_assert(std::is_trivially_copyable_v<MyItem>);
static_assert(std::is_trivially_constructible_v<MyItem>);

#define SIMPLE_ITEM_FIELDS(X) X(int, value)
VOLTISO_SOA_STRUCT(SimpleItem, SIMPLE_ITEM_FIELDS)

// ========================================================================
// COMPILE-TIME TESTS
// ========================================================================

static_assert(sizeof(Position) == 3 * sizeof(float));

struct FakePose1 {
	soa::Flatten<Position> position;
	Orientation orientation;
};
static_assert(sizeof(Pose) == sizeof(FakePose1));

struct FakePose2 {
	Position position;
	Orientation orientation;
};
static_assert(sizeof(Pose) == sizeof(FakePose2));

static_assert(std::is_same_v<decltype(MyItem::velocity), Velocity>);
static_assert(std::is_same_v<decltype(MyItem::pose), soa::Flatten<Pose>>);

static_assert(
  std::is_same_v<decltype(PositionView::x), float &VOLTISO_RESTRICT>);

static_assert(
  std::is_same_v<decltype(MyItemView::velocity), Velocity & VOLTISO_RESTRICT>);

static_assert(std::is_same_v<
              decltype(PoseView::orientation), Orientation & VOLTISO_RESTRICT>);

static_assert(std::is_same_v<decltype(PoseView::position), PositionView>);
static_assert(std::is_same_v<decltype(MyItemView::pose), PoseView>);

// ConstView: scalar fields are const refs
static_assert(std::is_same_v<
              decltype(PositionConstView::x), const float &VOLTISO_RESTRICT>);
static_assert(
  std::is_same_v<
    decltype(MyItemConstView::velocity), const Velocity & VOLTISO_RESTRICT>);
static_assert(std::is_same_v<
              decltype(PoseConstView::orientation),
              const Orientation & VOLTISO_RESTRICT>);
// ConstView: nested flattened views preserve constness
static_assert(
  std::is_same_v<decltype(PoseConstView::position), PositionConstView>);
static_assert(std::is_same_v<decltype(MyItemConstView::pose), PoseConstView>);
// Nested: MyItemConstView -> pose -> position -> x is const float&
static_assert(std::is_same_v<
              decltype(std::declval<MyItemConstView>().pose.position),
              PositionConstView>);
static_assert(std::is_same_v<
              decltype(std::declval<MyItemConstView>().pose.position.x),
              const float &VOLTISO_RESTRICT>);
// ConstView forbids assignment through references
static_assert(
  !std::is_assignable_v<decltype(std::declval<PositionConstView>().x), float>);
static_assert(!std::is_assignable_v<
              decltype(std::declval<MyItemConstView>().velocity.x), float>);

static_assert(std::is_same_v<
              soa::Layout<Position>::Fields, std::tuple<float, float, float>>);
static_assert(std::is_same_v<
              soa::Layout<Pose>::Fields,
              std::tuple<soa::Flatten<Position>, Orientation>>);
static_assert(
  std::is_same_v<
    soa::Layout<MyItem>::Fields, std::tuple<Velocity, soa::Flatten<Pose>>>);

// ========================================================================
// RUNTIME TESTS
// ========================================================================

TEST(SoaMacros, RuntimeLayoutAndSizes) {
	EXPECT_EQ(sizeof(Position), 3 * sizeof(float));
	EXPECT_EQ(sizeof(Orientation), 4 * sizeof(float));
	EXPECT_EQ(sizeof(Velocity), 3 * sizeof(float));

	EXPECT_EQ(offsetof(Position, x), 0);
	EXPECT_EQ(offsetof(Position, y), sizeof(float));
	EXPECT_EQ(offsetof(Position, z), 2 * sizeof(float));

	EXPECT_EQ(sizeof(PositionView), 3 * sizeof(void *));
	EXPECT_EQ(sizeof(PoseView), 4 * sizeof(void *));
}

TEST(SoaMacros, ViewMutationBehavior) {
	Velocity raw_vel{1.0f, 2.0f, 3.0f};
	float raw_px = 0.0f, raw_py = 0.0f, raw_pz = 0.0f;
	Orientation raw_ori{0.0f, 0.0f, 0.0f, 1.0f};

	PositionView pos_view{raw_px, raw_py, raw_pz};
	PoseView pose_view{pos_view, raw_ori};
	MyItemView item_view{raw_vel, pose_view};

	item_view.velocity.x = 42.0f;
	item_view.pose.position.y = 99.0f;
	item_view.pose.orientation.w = 0.5f;

	EXPECT_FLOAT_EQ(raw_vel.x, 42.0f);
	EXPECT_FLOAT_EQ(raw_py, 99.0f);
	EXPECT_FLOAT_EQ(raw_ori.w, 0.5f);
}

TEST(SoaBackend, VerifiesFlatStorageMath) {
	using ExpectedFlatTuple =
	  std::tuple<Velocity, float, float, float, Orientation>;

	// Notice the namespace updated to _ here instead of detail
	using GeneratedFlatTuple =
	  typename soa::_::FlattenTuple<typename soa::Layout<MyItem>::Fields>::Type;

	static_assert(std::is_same_v<GeneratedFlatTuple, ExpectedFlatTuple>);
}

TEST(SoaBackend, FullIntegration) {
	SoaArray<MyItem, 100> storage;

	auto item = storage(5);

	item.velocity.x = 100.0f;
	item.pose.position.y = 250.0f;
	item.pose.orientation.w = 1.0f;

	auto item_check = storage(5);
	EXPECT_FLOAT_EQ(item_check.velocity.x, 100.0f);
	EXPECT_FLOAT_EQ(item_check.pose.position.y, 250.0f);
	EXPECT_FLOAT_EQ(item_check.pose.orientation.w, 1.0f);

	// --- Memory Layout Verification (The SoA Proof) ---
	auto item0 = storage(0);

	// 1. Prove contiguous SIMD arrays (Stride is exactly 1 element, not 1 large
	// struct) Pointer arithmetic returns the number of elements between addresses
	EXPECT_EQ(&item_check.velocity - &item0.velocity, 5);
	EXPECT_EQ(&item_check.pose.position.y - &item0.pose.position.y, 5);
	EXPECT_EQ(&item_check.pose.orientation - &item0.pose.orientation, 5);

	// 2. Prove that fields are completely separated in memory (Not AoS)
	// If this was AoS, the memory distance between x and y would be exactly 1
	// float. In SoA, they are in completely separate std::arrays of 100 elements,
	// so their physical distance in memory MUST be at least 100 floats.
	std::ptrdiff_t distance_x_y =
	  std::abs(&item0.pose.position.y - &item0.pose.position.x);
	EXPECT_GE(distance_x_y, 100);
}

TEST(SoaBackend, AssignmentFromStructValue) {
	SoaArray<SimpleItem, 10> mySoaArray;

	mySoaArray(5) = SimpleItem{123};

	auto item_check = mySoaArray(5);
	EXPECT_EQ(item_check.value, 123);
}

TEST(SoaBackend, AssignmentViewToView) {
	SoaArray<SimpleItem, 10> arr;
	arr(2) = SimpleItem{100};
	arr(7) = SimpleItem{0};

	SimpleItemView view2 = arr(2);
	SimpleItemView view7 = arr(7);
	EXPECT_EQ(view7.value, 0);

	view7 = view2;
	EXPECT_EQ(arr(7).value, 100);
	EXPECT_EQ(arr(2).value, 100);
}

TEST(SoaBackend, AssignmentConstViewToView) {
	SoaArray<SimpleItem, 10> arr;
	arr(3) = SimpleItem{42};

	SoaArray<SimpleItem, 10> const &carr = arr;
	SimpleItemConstView src = carr(3);
	SimpleItemView dst = arr(0);
	dst = src;
	EXPECT_EQ(arr(0).value, 42);
}

TEST(SoaBackend, AssignmentViewToViewNested) {
	SoaArray<MyItem, 20> storage;
	storage(0).velocity = {1.0f, 2.0f, 3.0f};
	storage(0).pose.position.x = 10.0f;
	storage(0).pose.position.y = 20.0f;
	storage(0).pose.position.z = 30.0f;
	storage(0).pose.orientation = {0.5f, 0.5f, 0.5f, 0.5f};

	MyItemView dst = storage(5);
	dst = storage(0);

	EXPECT_FLOAT_EQ(storage(5).velocity.x, 1.0f);
	EXPECT_FLOAT_EQ(storage(5).velocity.y, 2.0f);
	EXPECT_FLOAT_EQ(storage(5).velocity.z, 3.0f);
	EXPECT_FLOAT_EQ(storage(5).pose.position.x, 10.0f);
	EXPECT_FLOAT_EQ(storage(5).pose.position.y, 20.0f);
	EXPECT_FLOAT_EQ(storage(5).pose.position.z, 30.0f);
	EXPECT_FLOAT_EQ(storage(5).pose.orientation.w, 0.5f);
}

TEST(SoaBackend, ConstViewReturnsCorrectType) {
	SoaArray<MyItem, 100> storage;
	storage(5).velocity.x = 42.0f;
	storage(5).pose.position.y = 99.0f;

	SoaArray<MyItem, 100> const &const_storage = storage;

	// operator() on const Array returns ConstView
	auto const_item = const_storage(5);
	static_assert(std::is_same_v<decltype(const_item), MyItemConstView>);

	// Can read through ConstView
	EXPECT_FLOAT_EQ(const_item.velocity.x, 42.0f);
	EXPECT_FLOAT_EQ(const_item.pose.position.y, 99.0f);
}

TEST(SoaBackend, ConstViewNestedConstness) {
	SoaArray<MyItem, 100> storage;
	storage(3).pose.orientation.w = 0.5f;
	storage(3).pose.position.z = -1.0f;

	SoaArray<MyItem, 100> const &const_storage = storage;
	auto const_item = const_storage(3);

	// Nested ConstView: pose is PoseConstView, pose.position is PositionConstView
	auto const &pose = const_item.pose;
	auto const &position = pose.position;
	EXPECT_FLOAT_EQ(pose.orientation.w, 0.5f);
	EXPECT_FLOAT_EQ(position.z, -1.0f);

	// Type of nested access
	static_assert(std::is_same_v<decltype(const_item.pose), PoseConstView>);
	static_assert(
	  std::is_same_v<decltype(const_item.pose.position), PositionConstView>);
}

// --- Omit Flatten Test Setup ---
#define NOT_FLATTENED_ITEM_FIELDS(X)                                           \
	X(Position, standard_position)                                               \
	X(float, scalar)
VOLTISO_SOA_STRUCT(NotFlattenedItem, NOT_FLATTENED_ITEM_FIELDS)

TEST(SoaBackend, OmitFlattenKeepsAoS) {
	// 1. Compile-Time Proof: The View uses a raw reference, NOT a PositionView
	static_assert(std::is_same_v<
	              decltype(NotFlattenedItemView::standard_position),
	              Position & VOLTISO_RESTRICT>);
	static_assert(std::is_same_v<
	              decltype(NotFlattenedItemConstView::standard_position),
	              Position const & VOLTISO_RESTRICT>);

	// 2. Compile-Time Proof: The metaprogramming did NOT break apart Position
	static_assert(
	  std::is_same_v<
	    soa::Layout<NotFlattenedItem>::Fields, std::tuple<Position, float>>);

	// 3. Runtime Proof: Memory offsets
	SoaArray<NotFlattenedItem, 100> storage;
	auto item0 = storage(0);
	auto item1 = storage(1);

	// Because it was NOT flattened, standard_position is AoS.
	// This means x and y are sitting right next to each other in memory.
	// Pointer arithmetic distance between adjacent floats should be exactly 1.
	std::ptrdiff_t distance_x_y =
	  &item0.standard_position.y - &item0.standard_position.x;
	EXPECT_EQ(distance_x_y, 1);

	// The distance between item0's Position and item1's Position should be
	// exactly 1 Position struct.
	std::ptrdiff_t distance_items =
	  &item1.standard_position - &item0.standard_position;
	EXPECT_EQ(distance_items, 1);
}

// ========================================================================
// INIT ARGS MACRO TESTS (X(Type, Name) vs X(Type, Name, args...))
// ========================================================================

struct Vec2 {
	float x, y;
};

// Plain struct: one field has default init, one is left uninitialized
struct HalfInit {
	float uninit;
	float init{77.0f};
};

#define INIT_ARGS_BASIC_FIELDS(X)                                              \
	X(float, a)                                                                  \
	X(float, b, 42.0f)                                                           \
	X(int, count, 0)                                                             \
	X(Vec2, center, 1.0f, 2.0f)
VOLTISO_SOA_STRUCT(InitArgsBasic, INIT_ARGS_BASIC_FIELDS)

#define UNINIT_TEST_FIELDS(X)                                                  \
	X(float, raw_uninit)                                                         \
	X(HalfInit, half)
VOLTISO_SOA_STRUCT(UninitTestItem, UNINIT_TEST_FIELDS)

TEST(SoaInitArgs, BasicMacroCompilesAndWorks) {
	// Struct compiles with mix of fields: no init (a), with init (b, count)
	// and with 2-arg init (center)
	InitArgsBasic def{};
	EXPECT_FLOAT_EQ(def.b, 42.0f);
	EXPECT_EQ(def.count, 0);
	EXPECT_FLOAT_EQ(def.center.x, 1.0f);
	EXPECT_FLOAT_EQ(def.center.y, 2.0f);

	// SoA Array works
	SoaArray<InitArgsBasic, 10> storage;
	auto item = storage(3);
	item.b = 1.5f;
	item.count = 7;
	item.center.x = 10.0f;
	auto check = storage(3);
	EXPECT_FLOAT_EQ(check.b, 1.5f);
	EXPECT_EQ(check.count, 7);
	EXPECT_FLOAT_EQ(check.center.x, 10.0f);
}

TEST(SoaInitArgs, UninitializedFieldsNotZeroedAndHalfInitConstructed) {
	// Fill memory with pattern, then placement-new the Array.
	// HalfInit::init must get 77.0f (constructor/default member init called).
	// Uninitialized fields must retain the pattern when the runtime doesn't
	// zero-init (e.g. without -ftrivial-auto-var-init). Otherwise we at least
	// verify init is selective (uninit != 77.0f).
	using ArrayT = SoaArray<UninitTestItem, 10>;
	void *ptr = std::malloc(sizeof(ArrayT));
	ASSERT_NE(ptr, nullptr);
	std::memset(ptr, 0xCD, sizeof(ArrayT));

	auto *pArr = new (ptr) ArrayT();
	auto &arr = *pArr;

	// HalfInit::init has default member init - constructor/default init was
	// called
	EXPECT_FLOAT_EQ(arr(0).half.init, 77.0f);
	EXPECT_FLOAT_EQ(arr(5).half.init, 77.0f);

	// raw_uninit and half.uninit: no init. If runtime doesn't zero-init, they
	// retain 0xCD pattern. Otherwise they may be 0; we at least verify we're not
	// uniformly applying 77.0f.
	auto check_raw = [](float const &f) {
		uint32_t bits;
		std::memcpy(&bits, &f, sizeof(float));
		return bits == 0xCDCDCDCDu;
	};
	auto not_init_value = [](float const &f) { return f != 77.0f; };
	if (check_raw(arr(0).raw_uninit)) {
		EXPECT_TRUE(check_raw(arr(0).half.uninit));
		EXPECT_TRUE(check_raw(arr(7).raw_uninit));
		EXPECT_TRUE(check_raw(arr(7).half.uninit));
	} else {
		// Build uses zero-init; at least verify we're not applying 77.0f to uninit
		EXPECT_TRUE(not_init_value(arr(0).raw_uninit));
		EXPECT_TRUE(not_init_value(arr(0).half.uninit));
	}
	arr.~ArrayT();
	std::free(ptr);
}
