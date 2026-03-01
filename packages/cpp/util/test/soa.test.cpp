#include <cstddef> // for offsetof
#include <gtest/gtest.h>

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

static_assert(std::is_same_v<decltype(PositionView::x), float &>);
static_assert(std::is_same_v<decltype(MyItemView::velocity), Velocity &>);
static_assert(std::is_same_v<decltype(PoseView::orientation), Orientation &>);

static_assert(std::is_same_v<decltype(PoseView::position), PositionView>);
static_assert(std::is_same_v<decltype(MyItemView::pose), PoseView>);

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
	soa::Array<MyItem, 100> storage;

	auto item = storage.get(5);

	item.velocity.x = 100.0f;
	item.pose.position.y = 250.0f;
	item.pose.orientation.w = 1.0f;

	auto item_check = storage.get(5);
	EXPECT_FLOAT_EQ(item_check.velocity.x, 100.0f);
	EXPECT_FLOAT_EQ(item_check.pose.position.y, 250.0f);
	EXPECT_FLOAT_EQ(item_check.pose.orientation.w, 1.0f);

	// --- Memory Layout Verification (The SoA Proof) ---
	auto item0 = storage.get(0);

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

// --- Omit Flatten Test Setup ---
#define NOT_FLATTENED_ITEM_FIELDS(X)                                           \
	X(Position, standard_position)                                               \
	X(float, scalar)
VOLTISO_SOA_STRUCT(NotFlattenedItem, NOT_FLATTENED_ITEM_FIELDS)

TEST(SoaBackend, OmitFlattenKeepsAoS) {
	// 1. Compile-Time Proof: The View uses a raw reference, NOT a PositionView
	static_assert(std::is_same_v<
	              decltype(NotFlattenedItemView::standard_position), Position &>);

	// 2. Compile-Time Proof: The metaprogramming did NOT break apart Position
	static_assert(
	  std::is_same_v<
	    soa::Layout<NotFlattenedItem>::Fields, std::tuple<Position, float>>);

	// 3. Runtime Proof: Memory offsets
	soa::Array<NotFlattenedItem, 100> storage;
	auto item0 = storage.get(0);
	auto item1 = storage.get(1);

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
