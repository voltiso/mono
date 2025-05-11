#include <gtest/gtest.h>

#include "v/get/hash"

using namespace VOLTISO_NAMESPACE;

TEST(hash, plainTypes) {
	static_assert(has::hash<int>);
	static_assert(_::optional_hash(1) == 1);
	static_assert(get::hash(0) == 0);
	//
}
