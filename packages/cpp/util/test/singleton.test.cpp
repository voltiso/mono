#include <gtest/gtest.h>

#include <v/singleton>
#include <v/thread-singleton>

using namespace VOLTISO_NAMESPACE;

TEST(Singleton, isEmpty) {
	static_assert(std::is_empty_v<Singleton<int>>);
	static_assert(std::is_empty_v<ThreadSingleton<int>>);
}
