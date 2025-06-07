#include <gtest/gtest.h>

#include "v/ref"

using namespace VOLTISO_NAMESPACE;

TEST(Ref, operators) {
	int a = 1;
	auto ref = Ref{a};
	ref <<= 1;
	EXPECT_EQ(ref, 2);
}
