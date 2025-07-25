#include <gtest/gtest.h>

#include <v/pool>

using namespace VOLTISO_NAMESPACE;

namespace {

// Simple test struct
struct TestItem {
	int value;
	bool isValid;

	TestItem() : value(0), isValid(true) {}
	explicit TestItem(int v) : value(v), isValid(true) {}
};

class PoolTest : public ::testing::Test {
protected:
	Pool<TestItem> pool;
};

static_assert(!std::is_convertible_v<Pool<TestItem>::Accessor, int>);

TEST_F(PoolTest, ConstructionAndDestruction) {
	Pool<TestItem> testPool;
	// in debug mode, Pool destructor checks if all items are deallocated
}

TEST_F(PoolTest, AllocateAndDeallocate) {
	auto item = pool.insert();
	ASSERT_NE(&*item, nullptr);
	item.erase();
}

TEST_F(PoolTest, MultipleAllocations) {
	std::vector<decltype(pool)::Handle> items;
	const Size numItems = 100;

	// Allocate multiple items
	for (Size i = 0; i < numItems; ++i) {
		auto item = pool.insert();
		item->value = static_cast<int>(i);
		items.push_back(item);
	}

	// Verify values and deallocate
	for (Size i = 0; i < numItems; ++i) {
		EXPECT_EQ(items[i]->value, i);
		pool(items[i]).erase();
	}
	// in debug mode, Pool destructor checks if all items are deallocated
}

TEST_F(PoolTest, ReuseSlots) {
	auto item1 = pool.insert().handle;
	item1->value = 42;
	pool(item1).erase();

	auto item2 = pool.insert().handle;
	EXPECT_EQ(item2, item1) << "Pool should reuse deallocated slots";

	pool(item2).erase();
}

TEST_F(PoolTest, StressTest) {
	const Size iterations = 1000;
	std::vector<decltype(pool)::Handle> items;

	for (Size i = 0; i < iterations; ++i) {
		// Randomly allocate or deallocate
		if (items.empty() || (rand() % 100 < 90)) {
			// Allocate
			auto item = pool.insert().handle;
			ASSERT_NE(item, nullptr);
			item->value = static_cast<int>(i);
			items.push_back(item);
		} else {
			// Deallocate
			Size index = rand() % items.size();
			pool(items[index]).erase();
			items.erase(items.begin() + index);
		}
	}

	// Cleanup
	for (auto &item : items) {
		pool(item).erase();
	}
}

// ! problematic - bug-prone
// TEST(Pool, ref) {
// 	Pool<int&> pool;

// 	auto item = pool.insert();
// 	static_assert(std::is_same_v<decltype(item), decltype(pool::Handle)>);
// 	EXPECT_EQ(item, 0);

// 	item = 42;
// 	EXPECT_EQ(item, 42);
// }

} // anonymous namespace
