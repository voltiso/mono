
#include <gtest/gtest.h>

#include <v/DynamicString>
#include <v/PathString>
#include <v/Slice>
#include <v/brand/Path>

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
}
