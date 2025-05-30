#include <gtest/gtest.h>

#include <type_traits>
#include <v/any-function>
#include <v/is/trivially-relocatable>

#include <string>

using namespace VOLTISO_NAMESPACE;

static_assert(sizeof(AnyFunction<int(int)>) == sizeof(void *) * 3);
static_assert(is::TriviallyRelocatable<AnyFunction<int(int)>>);

TEST(AnyFunction, moveSemantics) {
	v::AnyFunction<void()> test = [] {};
}

TEST(AnyFunction, Basic) {
	AnyFunction<int(int)> f = [](int x) { return x * 2; };
	EXPECT_EQ(f(5), 10);

	AnyFunction<int(int, int)> add = [](int a, int b) { return a + b; };
	EXPECT_EQ(add(3, 4), 7);
}

TEST(AnyFunction, MoveOnly) {
	AnyFunction<std::string(std::string)> concat = [](std::string s) {
		return s + " world";
	};

	EXPECT_EQ(concat("hello"), "hello world");

	// Test move constructor
	auto concat2 = std::move(concat);
	EXPECT_EQ(concat2("hello"), "hello world");
}

int count = 0;
TEST(AnyFunction, ComplexTypes) {
	static int numConstructorCalls;
	static int numDestructorCalls;

	numConstructorCalls = 0;
	numDestructorCalls = 0;

	count = 0;

	struct Counter {
		int operator()() const { return ++count; }

		int data[123];

		Counter() { numConstructorCalls += 1; }
		Counter(const Counter &) { numConstructorCalls += 1; }
		Counter &operator=(const Counter &) = delete;
		~Counter() { numDestructorCalls += 1; }
	};

	{
		AnyFunction<int()> counter = Counter{};
		EXPECT_EQ(counter(), 1);
		EXPECT_EQ(counter(), 2);
	}

	EXPECT_EQ(numConstructorCalls, 2);
	EXPECT_EQ(numDestructorCalls, 2);
}

TEST(AnyFunction, Capture) {
	int multiplier = 3;
	AnyFunction<int(int)> multiply = [multiplier](int x) {
		return x * multiplier;
	};
	EXPECT_EQ(multiply(4), 12);

	std::string prefix = "test_";
	AnyFunction<std::string(std::string)> prefixer = [prefix](std::string s) {
		return prefix + s;
	};
	EXPECT_EQ(prefixer("value"), "test_value");
}

TEST(AnyFunction, CaptureBig) {
	std::vector<int> data = {1, 2, 3, 4, 5};
	AnyFunction<int(int)> sum = [data](int index) { return data[index]; };
	EXPECT_EQ(sum(2), 3);
}

TEST(AnyFunction, GetCustom) {
	using A = AnyFunction<int(int)>::With<option::NOEXCEPT<false>>;
	static_assert(std::is_same_v<A, AnyFunction<int(int)>>);
}

TEST(AnyFunction, Noexcept) {
	// test constructor - all 4 noexcept combinations
	static_assert(!std::is_constructible_v<
	              AnyFunction<void(int)>::Noexcept, decltype([](int x) {})>);

	AnyFunction<void(int)> f1 = [](int x) {}; // ok
	static_assert(!noexcept(f1(1)));

	AnyFunction<void(int)> f2 = [](int x) noexcept {}; // ok
	static_assert(!noexcept(f2(1)));

	AnyFunction<void(int)>::Noexcept f3 = [](int x) noexcept {}; // ok
	static_assert(noexcept(f3(1)));
}

TEST(AnyFunction, Mutable) {
	static_assert(!std::is_constructible_v<
	              AnyFunction<void()>, decltype([]() mutable noexcept {})>);
	// AnyFunction<void()> f1 = []() mutable noexcept {}; // ! should not compile
	const AnyFunction<void()>::Mutable f3 = []() mutable {}; // ok
	static_assert(!std::is_invocable_v<decltype(f3)>);
}

TEST(AnyFunction, Optional) {
	using F = AnyFunction<void()>;

	static_assert(!std::is_default_constructible_v<F>);
	static_assert(std::is_default_constructible_v<F::Optional>);

	// static_assert(!std::is_copy_constructible_v<F>);
	// static_assert(std::is_copy_constructible_v<F::Optional>);

	static_assert(std::is_move_constructible_v<F>);
}

//

TEST(AnyFunction, Proxy) {
	struct S {
		S() = default;
		S(const S &) = delete;
		S &operator=(const S &) = delete;

		int numCalls = 0;
		void operator()() { numCalls += 1; }
	};
	S s;

	s();
	EXPECT_EQ(s.numCalls, 1);

	static_assert(std::is_constructible_v<AnyFunction<void()>, S *>);
	static_assert(!std::is_constructible_v<AnyFunction<void()>, const S *>);

	// note: AnyFunction is not mutable, S is mutable `operator()`
	//  - it is ok - proxy mode
	AnyFunction<void()> f = &s;
	f();
	EXPECT_EQ(s.numCalls, 2);

	f = &s;
	f();
	EXPECT_EQ(s.numCalls, 3);

	// also `operator=`
	static_assert(std::is_assignable_v<AnyFunction<void()>, S *>);
	static_assert(!std::is_assignable_v<AnyFunction<void()>, const S *>);
}
