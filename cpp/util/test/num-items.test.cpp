#include <gtest/gtest.h>

#include "v/get/num-items"

using namespace VOLTISO_NAMESPACE;

template <class T>
concept hasNumItems = requires { trait::numItems<T>; };

TEST(numItems, runtime) {
	struct S {
		int numItems() const noexcept { return 123; }
	};
	EXPECT_EQ(get::numItems(S{}), 123);
	static_assert(!hasNumItems<S>);
}

TEST(numItems, compileTime) {
	struct S {
		static constexpr int numItems() noexcept { return 123; }
	};
	EXPECT_EQ(trait::numItems<S>, 123);
	EXPECT_EQ(get::numItems(S{}), 123);
	static_assert(hasNumItems<S>);
}
