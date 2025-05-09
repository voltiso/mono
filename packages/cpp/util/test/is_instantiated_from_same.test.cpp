#include <gtest/gtest.h>

#include <v/is_instantiated_from_same>

// Standard library includes for testing different templates
#include <list>
#include <map>
#include <string>
#include <utility> // For std::pair
#include <vector>

// --- Dummy types for testing ---
// Template 1 (Type params only)
template <typename...> struct MyTemplate1 {};

// Template 2 (Type params only, different from Template 1)
template <typename...> struct MyTemplate2 {};

// Template 3 (Non-type params only, C++17)
// #if __cplusplus >= 201703L
template <auto...> struct AutoOnlyTemplate {};
// #endif

// Template 4 (Mixed type and non-type params)
template <typename T, int Size, bool Flag = false> struct MixedParamTemplate {};

// Non-template types
struct MyStruct {};
class MyClass {};

// --- Test Suite ---

// Test fixture class (optional, but good practice)
class IsInstantiatedFromSameTest : public ::testing::Test {};

// --- Test Cases for Type-Only Templates (Specialization 1) ---

TEST_F(IsInstantiatedFromSameTest, TypeOnly_SameTemplateDifferentArgs) {
	// Check standard library templates
	static_assert(
	  is_instantiated_from_same<std::vector<int>, std::vector<double>>,
	  "Vectors with different types");
	static_assert(
	  is_instantiated_from_same<std::list<int>, std::list<float>>,
	  "Lists with different types");
	static_assert(
	  is_instantiated_from_same<std::pair<int, double>, std::pair<char, MyClass>>,
	  "Pairs with different types");
	static_assert(
	  is_instantiated_from_same<
	    std::map<int, std::string>, std::map<MyStruct, double>>,
	  "Maps with different types");

	// Check custom templates
	static_assert(
	  is_instantiated_from_same<MyTemplate1<int>, MyTemplate1<float>>,
	  "MyTemplate1 with different types");
	static_assert(
	  is_instantiated_from_same<MyTemplate1<char, double>, MyTemplate1<int>>,
	  "MyTemplate1 with different arg counts");

	ASSERT_TRUE(
	  (is_instantiated_from_same<std::vector<int>, std::vector<double>>));
	ASSERT_TRUE(
	  (is_instantiated_from_same<MyTemplate1<int>, MyTemplate1<float, double>>));
}

TEST_F(IsInstantiatedFromSameTest, TypeOnly_SameTemplateSameArgs) {
	static_assert(
	  is_instantiated_from_same<std::vector<int>, std::vector<int>>,
	  "Vector with same type");
	static_assert(
	  is_instantiated_from_same<MyTemplate1<MyStruct>, MyTemplate1<MyStruct>>,
	  "MyTemplate1 with same type");
	ASSERT_TRUE((
	  is_instantiated_from_same<std::list<std::string>, std::list<std::string>>));
}

// --- Test Cases for Non-Type-Only Templates (Specialization 2, C++17) ---

#if __cplusplus >= 201703L
TEST_F(IsInstantiatedFromSameTest, AutoOnly_SameTemplateDifferentArgs) {
	static_assert(
	  is_instantiated_from_same<
	    AutoOnlyTemplate<1, 2, 3>, AutoOnlyTemplate<true, 'a'>>,
	  "AutoOnly with different args");
	static_assert(
	  is_instantiated_from_same<AutoOnlyTemplate<>, AutoOnlyTemplate<false, 100>>,
	  "AutoOnly comparing zero args vs multiple");

	ASSERT_TRUE((is_instantiated_from_same<
	             AutoOnlyTemplate<1, 2>, AutoOnlyTemplate<3, 4, 5>>));
}

TEST_F(IsInstantiatedFromSameTest, AutoOnly_SameTemplateSameArgs) {
	static_assert(
	  is_instantiated_from_same<
	    AutoOnlyTemplate<1, true>, AutoOnlyTemplate<1, true>>,
	  "AutoOnly with same args");
	static_assert(
	  is_instantiated_from_same<AutoOnlyTemplate<>, AutoOnlyTemplate<>>,
	  "AutoOnly with zero args");
	ASSERT_TRUE(
	  (is_instantiated_from_same<AutoOnlyTemplate<'x'>, AutoOnlyTemplate<'x'>>));
}
#endif // C++17 check

// --- Test Cases for Mixed Parameter Templates (Expected Failure) ---

TEST_F(IsInstantiatedFromSameTest, MixedParams_ExpectedFailure) {
	// These should be false because neither specialization matches mixed
	// parameters
	static_assert(
	  !is_instantiated_from_same<std::array<int, 5>, std::array<double, 10>>,
	  "std::array has mixed params");
	static_assert(
	  !is_instantiated_from_same<std::array<char, 1>, std::array<char, 1>>,
	  "std::array even with same args");
	static_assert(
	  !is_instantiated_from_same<
	    MixedParamTemplate<int, 10>, MixedParamTemplate<float, 20>>,
	  "MixedParamTemplate");
	static_assert(
	  !is_instantiated_from_same<
	    MixedParamTemplate<char, 5, true>, MixedParamTemplate<char, 5, true>>,
	  "MixedParamTemplate same args");

	ASSERT_FALSE(
	  (is_instantiated_from_same<std::array<int, 5>, std::array<double, 10>>));
	ASSERT_FALSE((is_instantiated_from_same<
	              MixedParamTemplate<int, 10>, MixedParamTemplate<float, 20>>));
}

// --- Test Cases for Different Kinds of Templates/Types ---

TEST_F(IsInstantiatedFromSameTest, DifferentTemplates) {
	// Type-only vs Type-only
	static_assert(
	  !is_instantiated_from_same<std::vector<int>, std::list<int>>,
	  "Vector vs List");
	static_assert(
	  !is_instantiated_from_same<MyTemplate1<int>, MyTemplate2<int>>,
	  "MyTemplate1 vs MyTemplate2");

#if __cplusplus >= 201703L
	// Type-only vs Auto-only
	static_assert(
	  !is_instantiated_from_same<std::vector<int>, AutoOnlyTemplate<0>>,
	  "Vector vs AutoOnly");
	static_assert(
	  !is_instantiated_from_same<AutoOnlyTemplate<0>, MyTemplate1<int>>,
	  "AutoOnly vs MyTemplate1");

	// Auto-only vs Mixed
	static_assert(
	  !is_instantiated_from_same<AutoOnlyTemplate<0>, MixedParamTemplate<int, 5>>,
	  "AutoOnly vs MixedParam");
	static_assert(
	  !is_instantiated_from_same<AutoOnlyTemplate<0>, std::array<int, 10>>,
	  "AutoOnly vs std::array");
#endif

	// Type-only vs Mixed
	static_assert(
	  !is_instantiated_from_same<std::vector<int>, MixedParamTemplate<int, 5>>,
	  "Vector vs MixedParam");
	static_assert(
	  !is_instantiated_from_same<MyTemplate1<double>, std::array<double, 10>>,
	  "MyTemplate1 vs std::array");

	ASSERT_FALSE((is_instantiated_from_same<std::vector<int>, std::list<int>>));
#if __cplusplus >= 201703L
	ASSERT_FALSE(
	  (is_instantiated_from_same<std::vector<int>, AutoOnlyTemplate<0>>));
#endif
	ASSERT_FALSE(
	  (is_instantiated_from_same<std::vector<int>, std::array<int, 5>>));
}

TEST_F(IsInstantiatedFromSameTest, NonTemplateTypes) {
	static_assert(!is_instantiated_from_same<int, float>, "int vs float");
	static_assert(
	  !is_instantiated_from_same<MyStruct, MyClass>, "MyStruct vs MyClass");
	static_assert(!is_instantiated_from_same<int, int>, "int vs int");
	ASSERT_FALSE((is_instantiated_from_same<double, char>));
}

TEST_F(IsInstantiatedFromSameTest, MixedTemplateAndNonTemplate) {
	// Type-only vs Non-template
	static_assert(
	  !is_instantiated_from_same<std::vector<int>, int>, "Vector vs int");
	static_assert(
	  !is_instantiated_from_same<float, std::list<float>>, "float vs List");

#if __cplusplus >= 201703L
	// Auto-only vs Non-template
	static_assert(
	  !is_instantiated_from_same<AutoOnlyTemplate<0>, int>, "AutoOnly vs int");
	static_assert(
	  !is_instantiated_from_same<float, AutoOnlyTemplate<>>, "float vs AutoOnly");
#endif

	// Mixed vs Non-template
	static_assert(
	  !is_instantiated_from_same<MixedParamTemplate<int, 1>, double>,
	  "MixedParam vs double");
	static_assert(
	  !is_instantiated_from_same<MyStruct, std::array<char, 1>>,
	  "MyStruct vs std::array");

	ASSERT_FALSE((is_instantiated_from_same<std::vector<int>, int>));
#if __cplusplus >= 201703L
	ASSERT_FALSE((is_instantiated_from_same<double, AutoOnlyTemplate<>>));
#endif
	ASSERT_FALSE((is_instantiated_from_same<MixedParamTemplate<int, 1>, double>));
}

// Optional: Add a main function if you are not linking with gtest_main
// int main(int argc, char **argv) {
//   ::testing::InitGoogleTest(&argc, argv);
//   return RUN_ALL_TESTS();
// }
