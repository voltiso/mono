#include <gtest/gtest.h>

#include <benchmark/benchmark.h>

#include <v/context>

using namespace VOLTISO_NAMESPACE;

struct S {
  S() = default;
  S(const S &) = delete;
  S &operator=(const S &) = delete;
};

TEST(context, forbidRvalueReference) {
  int i = 123;
	auto guard1 = context::Guard(i);
	static_assert(std::is_same_v<decltype(guard1), context::Guard<int>>);

	auto guard2 = context::Guard(i);
	static_assert(std::is_same_v<decltype(guard2), context::Guard<int>>);

	// ! should not compile (rvalue reference)
	// auto guard3 = context::Guard(int()); // !!!

	// ! should not compile (rvalue reference)
	// auto guard4 = context::Guard<const int>(int()); // !!!
}

TEST(context, forbidRvalueReferenceCustomType) {
  S s;
  // auto guard = context::Guard(123); // should not compile
  // auto guard = context::Guard<const int>(123); // should not compile
	auto guard1 = context::Guard(s);
	static_assert(std::is_same_v<decltype(guard1), context::Guard<S>>);

	auto guard2 = context::Guard(s);
	static_assert(std::is_same_v<decltype(guard2), context::Guard<S>>);

	// ! should not compile (rvalue reference)
	// auto guard3 = context::Guard(S()); // !!!

	// ! should not compile (rvalue reference)
	// auto guard4 = context::Guard<const S>(S()); // !!!
}

TEST(context, constForbidden) {
	int i = 123;
	(void)i;
	// auto guard = context::Guard<const int>(i); // ! should not compile
}

TEST(context, volatileForbidden) {
	int i = 123;
	(void)i;
	// auto guard = context::Guard<volatile int>(i); // ! should not compile
}
