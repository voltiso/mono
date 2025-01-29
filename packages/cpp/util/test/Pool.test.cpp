#include "voltiso/Pool"

#include "gtest/gtest.h"

using namespace VOLTISO_NAMESPACE;

TEST(Pool, simple) {
  static_assert(sizeof(Pool<int>) == 32);

	// ! todo
}
