#include "v/is/relocatable"

#include <array>
#include <memory>
#include <string>
#include <vector>

using namespace VOLTISO_NAMESPACE;

// Test fundamental types
static_assert(is::relocatable<int>);
static_assert(is::relocatable<double>);
static_assert(is::relocatable<bool>);
static_assert(is::relocatable<void *>);

// Test arrays
static_assert(is::relocatable<int[10]>);
static_assert(is::relocatable<std::array<int, 5>>);

// Test trivial struct
struct TrivialStruct {
	int x;
	double y;
};
static_assert(is::relocatable<TrivialStruct>);

// libc++ marked these as trivially relocatable
static_assert(is::relocatable<std::string>);
static_assert(is::relocatable<std::vector<int>>);
static_assert(is::relocatable<std::unique_ptr<int>>);
static_assert(is::relocatable<std::shared_ptr<int>>);

struct NonTrivial {
	NonTrivial(const NonTrivial &) {};
};
static_assert(!is::relocatable<NonTrivial>);

// Test pointers and references
static_assert(is::relocatable<int *>);

// ! standard decided references are not trivially relocatable
// but for now we treat them as trivially relocatable
static_assert(is::relocatable<int &>);
static_assert(is::relocatable<int &&>);

// Test const qualifiers
static_assert(is::relocatable<const int>);
static_assert(is::relocatable<volatile int>);

// Test function pointers
static_assert(is::relocatable<void (*)(int)>);
static_assert(is::relocatable<int (*)(int)>);
static_assert(is::relocatable<int (*)(int, int)>);

// Test lambda
static_assert(is::relocatable<decltype([](int a, int b) { return a + b; })>);
// static_assert(std::__libcpp_is_trivially_relocatable<decltype([](int a, int
// b) { return a + b; })>());

// Test lambda with capture
static_assert(is::relocatable<decltype([a = 1](int b) { return a + b; })>);
// static_assert(std::__libcpp_is_trivially_relocatable<decltype([a = 1](int b)
// { return a + b; })>());

// Test lambda with non-relocatable capture
struct NonRelocatable {
	int x;
	~NonRelocatable() {}
};
static_assert(
  !is::relocatable<decltype([a = NonRelocatable{1}]() { return a; })>);
// static_assert(
//   !std::__libcpp_is_trivially_relocatable<decltype([a = NonRelocatable{1}]()
//   { return a; })>());

// ! libc++ does not agree on this, because it doesn't use clang's internal
// __is_trivially_relocatable
struct VOLTISO_RELOCATABLE(ForcedRelocatable) {
	VOLTISO_RELOCATABLE_BODY(ForcedRelocatable);

public:
	ForcedRelocatable() = default;
	ForcedRelocatable(const ForcedRelocatable &) {}
};
static_assert(is::relocatable<ForcedRelocatable>);
static_assert(!std::is_trivially_copyable_v<ForcedRelocatable>);
static_assert(
  is::relocatable<decltype([a = ForcedRelocatable{}]() { return a; })>);
// static_assert(
//   std::__libcpp_is_trivially_relocatable<decltype([a = ForcedRelocatable{}]()
//   {
// 	  return a;
//   })>()); // ! should pass

// Test member function pointer
struct TestStruct {
	void member_function() {}
};
static_assert(is::relocatable<void (TestStruct::*)()>);
