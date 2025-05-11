#include <gtest/gtest.h>

#include <v/heap>

using namespace VOLTISO_NAMESPACE;

struct Base {
protected:
	int protectedValue = 0;

public:
	auto getValue(this auto &&self) { return self.protectedValue; }
};

struct Derived : Base {
	auto getValueDerived(this auto &&self) { return self.protectedValue; }
};

TEST(Asd, tempTest) {
	Derived d;
	EXPECT_EQ(d.getValue(), 0);
	EXPECT_EQ(d.getValueDerived(), 0);
}

TEST(Heap, initializerList) {
	Heap<int> a = {1, 7, 3};
	EXPECT_EQ(a.numItems(), 3);
	EXPECT_EQ(a.peek(), 7);
	EXPECT_EQ(a.pop(), 7);
	EXPECT_EQ(a.peek(), 3);
	EXPECT_EQ(a.pop(), 3);
	EXPECT_EQ(a.peek(), 1);

	EXPECT_EQ(a.numItems(), 1);

	a.maybeGrowAndPush(10);
	EXPECT_EQ(a.peek(), 10);
	EXPECT_EQ(a.pop(), 10);
	EXPECT_EQ(a.peek(), 1);

	a.maybeGrowAndPush(-1);

	EXPECT_EQ(a.peek(), 1);
	EXPECT_EQ(a.pop(), 1);
	EXPECT_EQ(a.peek(), -1);
	EXPECT_EQ(a.pop(), -1);
	EXPECT_EQ(a.numItems(), 0);
}

TEST(Heap, iterate) {
	Heap<int> a = {1, 2, 3};

	int sum = 0;
	for (auto &entry : a) {
		sum += entry;
	}
	EXPECT_EQ(sum, 6);
}
