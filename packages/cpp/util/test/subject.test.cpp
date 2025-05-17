#include <gtest/gtest.h>

#include <v/scope>
#include <v/subject>

using namespace VOLTISO_NAMESPACE;

TEST(Subject, basic) {
	v::Scope scope;
	auto guard = scope.use();

	Subject<int> subject(42);
	int gotValue = 0;

	subject.subscribe([&]() noexcept { gotValue = subject.value(); });

	EXPECT_EQ(gotValue, 0); // not called yet
	subject = 1;
	EXPECT_EQ(gotValue, 1);
}

TEST(Subject, map) {
	v::Scope scope;
	auto guard = scope.use();

	Subject<int> root(42);

	root = 2;

	int numEvaluations = 0;

	auto squared = root.map<double>([&](int value) noexcept {
		++numEvaluations;
		return 1.0 * value * value;
	});

	EXPECT_EQ(numEvaluations, 0);

	root = 3; // no eval

	EXPECT_EQ(numEvaluations, 0);

	EXPECT_EQ(squared.value(), 9.0);

	EXPECT_EQ(numEvaluations, 1);

	root = 4; // no eval

	EXPECT_EQ(numEvaluations, 1);

	squared.subscribe([&]() noexcept {
		// from now on values will be pulled
		(void)squared.value();
	});
	// note: evaluation happens here, because `squared` was dirty
	// this is to ensure the chain is not cold
	EXPECT_EQ(numEvaluations, 2);

	root = 5; // triggers eval

	EXPECT_EQ(numEvaluations, 3);

	EXPECT_TRUE(!squared.isDirty());
}

//

TEST(Subject, lazyChain) {
	v::Scope scope;
	auto guard = scope.use();

	Subject<int> root(42);

	root = 2;

	int numEvaluations = 0;

	auto squared = root.map<double>([&](int value) noexcept {
		++numEvaluations;
		// std::cout << "compute squared " << 1.0 * value * value << std::endl;
		return 1.0 * value * value;
	});

	auto squaredPlusOne = squared.map<double>([&](double value) noexcept {
		// std::cout << "compute squaredPlusOne " << value + 1.0 << std::endl;
		return value + 1.0;
	});

	EXPECT_EQ(numEvaluations, 0);

	root = 3; // no eval

	EXPECT_EQ(numEvaluations, 0);

	EXPECT_EQ(squaredPlusOne.value(), 10.0);

	EXPECT_EQ(numEvaluations, 1);

	root = 4; // no eval

	EXPECT_EQ(numEvaluations, 1);

	// std::cout << "!!!!!!!!!!!!!!!!! squaredPlusOne.subscribe" << std::endl;

	squaredPlusOne.subscribe([&]() noexcept {
		// from now on values will be pulled
		(void)squaredPlusOne.value();
		// std::cout << "squaredPlusOne subscription: " << squaredPlusOne.value()
		//           << std::endl;
	});
	// evaluation happens, because we need to pull value from the cold chain
	EXPECT_EQ(numEvaluations, 2);
	EXPECT_TRUE(!squaredPlusOne.isDirty());

	// std::cout << "---------------------------" << std::endl;
	root = 5; // triggers eval

	EXPECT_EQ(numEvaluations, 3);

	EXPECT_TRUE(!squaredPlusOne.isDirty());

	EXPECT_EQ(squaredPlusOne.value(), 26.0);
}
