#include <gtest/gtest.h>

#include "v/tribool"

using namespace VOLTISO_NAMESPACE;

static_assert(sizeof(Tribool) == 1);
static_assert(alignof(Tribool) == 1);
static_assert(std::is_trivially_copyable_v<Tribool>);
static_assert(std::is_trivially_default_constructible_v<Tribool>);
static_assert(std::is_trivially_destructible_v<Tribool>);
static_assert(std::is_trivially_move_constructible_v<Tribool>);
static_assert(std::is_trivially_move_assignable_v<Tribool>);
static_assert(std::is_trivially_copy_constructible_v<Tribool>);
static_assert(std::is_trivially_copy_assignable_v<Tribool>);

static_assert(Tribool::True);
static_assert(!Tribool::False);

static_assert(!std::is_constructible_v<Tribool, int>);
static_assert(!std::is_assignable_v<Tribool &, int>);

static_assert(std::is_constructible_v<Tribool, bool>);
static_assert(std::is_assignable_v<Tribool &, bool>);

static_assert(std::is_constructible_v<bool, Tribool>);
static_assert(
  !std::is_assignable_v<bool &, Tribool>); // ! explicit operator bool()

TEST(Tribool, doesNotDefaultInitialize) {
	uint8_t memory = 0xff;
	new (&memory) Tribool;
	EXPECT_EQ(memory, 0xff);
}

// ! unfortunately brace-initialization initializes to `False`
// ! for performance reasons
// TEST(Tribool, initializesToUnknown) {
// 	uint8_t memory = 0xff;
// 	new (&memory) Tribool{};
// 	EXPECT_EQ(memory, Tribool::Unknown);
// }
