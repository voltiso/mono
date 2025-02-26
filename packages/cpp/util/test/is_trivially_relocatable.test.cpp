#include "voltiso/is_trivially_relocatable"

#include <array>
#include <memory>
#include <string>
#include <vector>

using namespace VOLTISO_NAMESPACE;

// Test fundamental types
static_assert(is_trivially_relocatable<int>);
static_assert(is_trivially_relocatable<double>);
static_assert(is_trivially_relocatable<bool>);
static_assert(is_trivially_relocatable<void *>);

// Test arrays
static_assert(is_trivially_relocatable<int[10]>);
static_assert(is_trivially_relocatable<std::array<int, 5>>);

// Test trivial struct
struct TrivialStruct {
  int x;
  double y;
};
static_assert(is_trivially_relocatable<TrivialStruct>);

// Test non-trivially relocatable types
static_assert(!is_trivially_relocatable<std::string>);
static_assert(!is_trivially_relocatable<std::vector<int>>);

// Test pointers and references
static_assert(is_trivially_relocatable<int *>);
static_assert(is_trivially_relocatable<int &>);
static_assert(is_trivially_relocatable<int &&>);

// Test const qualifiers
static_assert(is_trivially_relocatable<const int>);
static_assert(is_trivially_relocatable<volatile int>);

// Test smart pointers
static_assert(is_trivially_relocatable<std::unique_ptr<int>>);
static_assert(is_trivially_relocatable<std::shared_ptr<int>>);

// Test function pointers
static_assert(is_trivially_relocatable<void (*)(int)>);
static_assert(is_trivially_relocatable<int (*)(int)>);
static_assert(is_trivially_relocatable<int (*)(int, int)>);

// Test lambda
static_assert(
    is_trivially_relocatable<decltype([](int a, int b) { return a + b; })>);

// Test lambda with capture
static_assert(
    is_trivially_relocatable<decltype([a = 1](int b) { return a + b; })>);

// Test lambda with non-relocatable capture
struct NonRelocatable {
  int x;
  ~NonRelocatable() {}
};
static_assert(!is_trivially_relocatable<decltype([a = NonRelocatable{1}]() {
  return a;
})>);

// Test member function pointer
struct TestStruct {
  void member_function() {}
};
static_assert(is_trivially_relocatable<void (TestStruct::*)()>);
