#include "v/is/trivially-relocatable"

#include <array>
#include <memory>
#include <string>
#include <vector>

using namespace VOLTISO_NAMESPACE;

// Test fundamental types
static_assert(is::TriviallyRelocatable<int>);
static_assert(is::TriviallyRelocatable<double>);
static_assert(is::TriviallyRelocatable<bool>);
static_assert(is::TriviallyRelocatable<void *>);

// Test arrays
static_assert(is::TriviallyRelocatable<int[10]>);
static_assert(is::TriviallyRelocatable<std::array<int, 5>>);

// Test trivial struct
struct TrivialStruct {
	int x;
	double y;
};
static_assert(is::TriviallyRelocatable<TrivialStruct>);

// Test non-trivially relocatable types
static_assert(!is::TriviallyRelocatable<std::string>);
static_assert(!is::TriviallyRelocatable<std::vector<int>>);

// Test pointers and references
static_assert(is::TriviallyRelocatable<int *>);
static_assert(is::TriviallyRelocatable<int &>);
static_assert(is::TriviallyRelocatable<int &&>);

// Test const qualifiers
static_assert(is::TriviallyRelocatable<const int>);
static_assert(is::TriviallyRelocatable<volatile int>);

// Test smart pointers
static_assert(is::TriviallyRelocatable<std::unique_ptr<int>>);
static_assert(is::TriviallyRelocatable<std::shared_ptr<int>>);

// Test function pointers
static_assert(is::TriviallyRelocatable<void (*)(int)>);
static_assert(is::TriviallyRelocatable<int (*)(int)>);
static_assert(is::TriviallyRelocatable<int (*)(int, int)>);

// Test lambda
static_assert(
  is::TriviallyRelocatable<decltype([](int a, int b) { return a + b; })>);

// Test lambda with capture
static_assert(
  is::TriviallyRelocatable<decltype([a = 1](int b) { return a + b; })>);

// Test lambda with non-relocatable capture
struct NonRelocatable {
	int x;
	~NonRelocatable() {}
};
static_assert(
  !is::TriviallyRelocatable<decltype([a = NonRelocatable{1}]() { return a; })>);

// Test member function pointer
struct TestStruct {
	void member_function() {}
};
static_assert(is::TriviallyRelocatable<void (TestStruct::*)()>);
