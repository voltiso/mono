#include <gtest/gtest.h>

#include <v/scope>
#include <v/subject>

using namespace VOLTISO_NAMESPACE;

TEST(Subject, eager) {
	v::Scope scope;
	auto guard = scope.use();

	Subject<int> subject(42);
	int gotValue = 0;

	int numCallbacks = 0;
	subject.subscribe([&](const auto &value) {
		std::cout << "subject callback: " << value << std::endl;
		numCallbacks += 1;
		gotValue = value;
	});

	// ! current behavior: .subscribe calls immediately with first value
	EXPECT_EQ(gotValue, 42);
	// EXPECT_EQ(gotValue, 0); // not called yet

	EXPECT_EQ(numCallbacks, 1); // called immediately

	subject = 1;
	EXPECT_EQ(gotValue, 1);

	EXPECT_EQ(numCallbacks, 2); // called again
}

TEST(Subject, eagerCast) {
	v::Scope scope;
	auto guard = scope.use();

	Subject<int> subject(42);
	int gotValue = 0;

	int numCallbacks = 0;
	subject.subscribe([&]() {
		numCallbacks += 1;
		gotValue = subject.value();
	});

	// ! current behavior: .subscribe calls immediately with first value
	EXPECT_EQ(gotValue, 42);
	// EXPECT_EQ(gotValue, 0); // not called yet

	EXPECT_EQ(numCallbacks, 1); // called immediately

	subject = 1;
	EXPECT_EQ(gotValue, 1);
	EXPECT_EQ(numCallbacks, 2); // called again
}

TEST(Subject, map) {
	v::Scope scope;
	auto guard = scope.use();

	Subject<int> root(42);

	root = 2;

	int numEvaluations = 0;

	auto squared = root.map<double>([&](int value) {
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

	int numSquaredCallbacks = 0;
	std::cout << "---- squared.subscribe" << std::endl;
	squared.subscribe([&](const auto &value) {
		std::cout << "--------- squared subscription: " << value << std::endl;
		numSquaredCallbacks += 1;
		// from now on values will be pulled
		// (void)squared.value(); // ! eager-cast should auto-pull
	});
	EXPECT_EQ(numSquaredCallbacks, 1); // called immediately
	// note: evaluation happens here, because `squared` was dirty
	// this is to ensure the chain is not cold
	// note 2: .subscribe now auto-calls immediately!
	EXPECT_EQ(numEvaluations, 2);

	std::cout << "SET ROOT TO 5" << std::endl;
	root = 5; // triggers eval

	EXPECT_EQ(numEvaluations, 3);
	EXPECT_EQ(numSquaredCallbacks, 2);

	EXPECT_TRUE(!squared.isDirty());
}

//

TEST(Subject, mapToDefaultValue) {
	v::Scope scope;
	auto guard = scope.use();

	Subject<int> root(42);

	root = 3;

	int numEvaluations = 0;

	auto minus2 = root.map<int>([&](int value) {
		++numEvaluations;
		return value - 2;
	});

	EXPECT_EQ(numEvaluations, 0);

	root = 4; // no eval

	EXPECT_EQ(numEvaluations, 0);

	EXPECT_EQ(minus2.value(), 2);

	EXPECT_EQ(numEvaluations, 1);

	root = 2; // no eval

	EXPECT_EQ(numEvaluations, 1);

	int numMemoCallbacks = 0;
	std::cout << "---- squared.subscribe" << std::endl;
	minus2.subscribe([&](const auto &value) {
		std::cout << "--------- squared subscription: " << value << std::endl;
		numMemoCallbacks += 1;
		// from now on values will be pulled
		// (void)squared.value(); // ! eager-cast should auto-pull
	});
	EXPECT_EQ(numMemoCallbacks, 1); // called immediately
	// note: evaluation happens here, because `squared` was dirty
	// this is to ensure the chain is not cold
	// note 2: .subscribe now auto-calls immediately!
	EXPECT_EQ(numEvaluations, 2);
	EXPECT_EQ(minus2.value(), 0);

	std::cout << "SET ROOT TO 5" << std::endl;
	root = 5; // triggers eval

	EXPECT_EQ(numEvaluations, 3);
	EXPECT_EQ(numMemoCallbacks, 2);

	EXPECT_TRUE(!minus2.isDirty());
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

	EXPECT_TRUE(squaredPlusOne.isDirty());

	int numFinalCallbacks = 0;
	squaredPlusOne.subscribe([&]() noexcept {
		numFinalCallbacks += 1;
		// from now on values will be pulled
		// (void)squaredPlusOne.value(); // ! new behavior: .subscribe auto-pulls
		// std::cout << "squaredPlusOne subscription: " << squaredPlusOne.value()
		//           << std::endl;
	});
	// evaluation happens, because we need to pull value from the cold chain
	EXPECT_EQ(numEvaluations, 2);
	EXPECT_TRUE(!squaredPlusOne.isDirty());
	EXPECT_EQ(numFinalCallbacks, 1);

	// std::cout << "---------------------------" << std::endl;
	root = 5; // triggers eval

	EXPECT_EQ(numEvaluations, 3);

	EXPECT_TRUE(!squaredPlusOne.isDirty());

	EXPECT_EQ(squaredPlusOne.value(), 26.0);
	EXPECT_EQ(numFinalCallbacks, 2);
}
