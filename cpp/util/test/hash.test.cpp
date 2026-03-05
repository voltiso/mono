#include <gtest/gtest.h>

#include "v/get/hash"

using namespace VOLTISO_NAMESPACE;

TEST(hash, plainTypes) {
	static_assert(has::hash<int>);
	static_assert(_::optional_hash(1) == 1);
	static_assert(get::hash(0) == 0);
	//
}

TEST(hash, enumClass) {
	enum class E {
		A,
		B,
		C,
	};
	static_assert(has::hash<E>);
	static_assert(get::hash(E::A) == 0);
	static_assert(get::hash(E::B) == 1);
	static_assert(get::hash(E::C) == 2);
}
