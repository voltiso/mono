
#include <gtest/gtest.h>

#include <v/brand/path>
#include <v/path>
#include <v/view>

using namespace v;

// TEST(Path, literal) {
// 	PathString<4> a = "abc";
// 	auto& b = "/home/user"_p;
// }

TEST(Path, concat) {
	// without null-termination, we have 10 chars
	auto &path = "/home/user"_p;
	EXPECT_EQ(path.NUM_ITEMS, 10);
	// auto subPath = path; // ! implicit O(n) copy not allowed
	// auto subPath = path.dynamic(); ! must explicitly say `.copy()`
	auto subPath = path.copy().dynamic();
	static_assert(std::is_same_v<
	              decltype(subPath),
	              v::dynamicString::Custom<v::Options<
	                v::option::Item<char>, v::brand::Path<>,
	                v::option::CustomTemplate<v::dynamicString::GetCustom>>>>);

	static_assert(is_path<decltype(subPath)>);

	subPath /= "a";

	EXPECT_EQ(subPath, "/home/user/a");
	EXPECT_EQ(subPath.numItems(), 12);

	// ! should not compile - implicit copy
	// auto wrong = subPath / "b"; // !

	auto newDynamic = std::move(subPath) / "b"; // ok
	EXPECT_EQ(newDynamic, "/home/user/a/b");
	EXPECT_EQ(newDynamic.numItems(), 14);

	auto newDynamic2 = decltype(newDynamic){newDynamic.copy()} / "c"; // ok
	EXPECT_EQ(newDynamic2, "/home/user/a/b/c");
	EXPECT_EQ(newDynamic2.numItems(), 16);

	auto newDynamic3 = newDynamic.copy() / "c"; // ok
	EXPECT_EQ(newDynamic3, "/home/user/a/b/c");
	EXPECT_EQ(newDynamic3.numItems(), 16);
}
