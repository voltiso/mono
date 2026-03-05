#include <gtest/gtest.h>

#include <v/retainer>

using namespace VOLTISO_NAMESPACE;

namespace {

struct S {
	static int numConstructs;
	static int numDestructs;
	S() { numConstructs++; }
	~S() { numDestructs++; }
	S(const S &) = delete;
	S &operator=(const S &) = delete;
};

int S::numConstructs = 0;
int S::numDestructs = 0;

TEST(Retainer, basic) {
	S::numConstructs = 0;
	S::numDestructs = 0;
	{
		Retainer retainer;
		retainer.retain<S>();
		EXPECT_EQ(S::numConstructs, 1);
		EXPECT_EQ(S::numDestructs, 0);
	}
	EXPECT_EQ(S::numConstructs, 1);
	EXPECT_EQ(S::numDestructs, 1);
}

} // namespace
