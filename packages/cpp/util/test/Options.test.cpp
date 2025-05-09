#include <gtest/gtest.h>

// Core Voltiso headers needed for testing Options
#include "v/Options"        // The class under test
#include "v/TemplateOption" // Base for template options
#include "v/TypeOption"     // Base for type options
#include "v/ValueOption"    // Base for value options
#include "v/brand/Path"

// Specific option kinds used in tests
#include "v/_/Options.hpp" // Contains TypeList, CompareLessWithTieBreaker, etc.
#include "v/option/CustomTemplate"
#include "v/option/Item"

#include <iostream>    // For debug output
#include <type_traits> // For std::is_same_v

using namespace VOLTISO_NAMESPACE;

// --- Test Fixture Setup ---

// Dummy test classes/types
struct X {};
struct Y {};
struct Z {};
struct Arg1 {};
struct Arg2 {};
template <class...> struct TemplateA {}; // Used in append test

// --- Concrete Option Definitions for Testing ---
// Ensure these define ::ORDER and inherit appropriately

// Type parameter definitions (Assume ORDER = 100 for A, 200 for B, 300 for C)
template <class T> struct ParamA : TypeOption<T, void> {
	static constexpr auto ORDER = 100;
};
template <class T> struct ParamB : TypeOption<T, int> {
	static constexpr auto ORDER = 200;
};
template <class T> struct ParamC : TypeOption<T, char> {
	static constexpr auto ORDER = 300;
};

// Value parameter definitions (Assume ORDER = 400 for D, 500 for E, 600 for F)
template <auto V> struct ParamD : ValueOption<V, 42> {
	static constexpr auto ORDER = 400;
};
template <auto V> struct ParamE : ValueOption<V, true> {
	static constexpr auto ORDER = 500;
};
template <auto V> struct ParamF : ValueOption<V, false> {
	static constexpr auto ORDER = 600;
};

// Template parameter definitions (Assume ORDER = 700 for G, 800 for H, 900 for
// I) Test implementation templates
template <class... Args> struct ImplG {
	static constexpr int ID = 7;
};
template <class... Args> struct ImplH {
	static constexpr int ID = 8;
};
template <class... Args> struct ImplI {
	static constexpr int ID = 9;
};
template <class... Args> struct ImplG_Alt {
	static constexpr int ID = 777;
}; // For find-first/multiple-matches test

// Implementation templates for CustomTemplate test
template <class... Args> struct ImplAlpha {
	static constexpr int ID = 1001;
};
template <class... Args> struct ImplBeta {
	static constexpr int ID = 1002;
};

// Default implementation templates
template <class... Args> struct DefaultG {
	static constexpr int ID = 77;
};
template <class... Args> struct DefaultH {
	static constexpr int ID = 88;
};
template <class... Args> struct DefaultI {
	static constexpr int ID = 99;
};
// Option Kind definitions
template <template <class...> class T>
struct ParamG : TemplateOption<T, DefaultG> {
	static constexpr auto ORDER = 700;
};
template <template <class...> class T>
struct ParamH : TemplateOption<T, DefaultH> {
	static constexpr auto ORDER = 800;
};
template <template <class...> class T>
struct ParamI : TemplateOption<T, DefaultI> {
	static constexpr auto ORDER = 900;
};

// Assume option::Item and option::CustomTemplate also define ORDER
// These are illustrative examples; actual definitions should be in their
// respective headers. It's critical that the actual v/option/Item.hpp and
// v/option/CustomTemplate.hpp define these ::ORDER values for the tests to be
// accurate.
namespace VOLTISO_NAMESPACE::option {
// Example:
// template <typename T> struct Item : TypeOption<T, void> {
//   static constexpr auto ORDER = 150;
// };
// template <template<class...> class T>
// struct CustomTemplate : TemplateOption<T, UnknownTemplate> { // Assuming
// UnknownTemplate is the default
//   static constexpr auto ORDER = 50;
// };
}

// --- Test Suite ---

// --- NEW TEST CASE ---
TEST(OptionsWith, ReplaceExistingCustomTemplateOption) {
	using namespace VOLTISO_NAMESPACE; // Ensure namespace is active

	// --- Diagnostic Assert ---
	// Check if is_instantiated_from_same correctly identifies these as the same
	// kind. This is expected to be TRUE for the replacement logic to work. If
	// this fails, the is_instantiated_from_same trait needs a specialization for
	// templates taking template template parameters.
	static_assert(
	  is_instantiated_from_same<
	    option::CustomTemplate<ImplAlpha>, option::CustomTemplate<ImplBeta>>,
	  "DIAGNOSTIC: is_instantiated_from_same is not identifying two "
	  "CustomTemplate instantiations as the same kind.");

	// Start with Options containing CustomTemplate<ImplAlpha>
	// Assuming option::CustomTemplate and ImplAlpha/ImplBeta are defined as
	// previously discussed. Also assuming option::Item is defined and has an
	// ::ORDER for context. Example ORDERs: Item=150, CustomTemplate=50
	using InitialOptions = Options<
	  option::Item<int>, // To have another option for context
	  option::CustomTemplate<ImplAlpha>>;

	// Use With to add option::CustomTemplate<ImplBeta>.
	// This should replace option::CustomTemplate<ImplAlpha> because they are of
	// the same kind.
	using ResultOptions =
	  InitialOptions::template With<option::CustomTemplate<ImplBeta>>;

	// Expected: Item<int> should remain. CustomTemplate<ImplAlpha> should be
	// replaced by CustomTemplate<ImplBeta>. The final order depends on the
	// ::ORDER values. Assuming CustomTemplate::ORDER (e.g., 2000) > Item::ORDER
	// (e.g., 150)
	using ExpectedOptions =
	  Options<option::Item<int>, option::CustomTemplate<ImplBeta>>;
	// If Item::ORDER < CustomTemplate::ORDER, then:
	// using ExpectedOptions = Options<
	//   option::Item<int>,
	//   option::CustomTemplate<ImplBeta>
	// >;

	static_assert(
	  std::is_same_v<ResultOptions, ExpectedOptions>,
	  "With did not correctly replace an existing option::CustomTemplate kind. "
	  "Check ORDER values.");

	// Optional: Verify content using GetTemplate
	// This now assumes that ImplBeta (and the default for option::CustomTemplate)
	// expect a single argument, which we'll provide as ResultOptions itself.

	// Call GetTemplate, passing ResultOptions as the argument for ImplBeta
	using GottenImpl =
	  ResultOptions::template GetTemplate<option::CustomTemplate, ResultOptions>;

	// Now, GottenImpl should be equivalent to ImplBeta<ResultOptions>
	static_assert(
	  std::is_same_v<GottenImpl, ImplBeta<ResultOptions>>,
	  "Incorrect implementation retrieved after replacing CustomTemplate kind.");

	// Accessing ::ID should still work if ImplBeta<ResultOptions> defines it.
	static_assert(
	  GottenImpl::ID == 1002,
	  "Incorrect ID from retrieved implementation after replacement.");
}

// Test the tie-breaker comparison directly (useful for understanding sort
// order)
TEST(OptionsInternals, CheckTieBreakerComparison) {
	// Using option::Item as an example where ORDER might be the same
	using T1 = option::Item<double>;
	using T2 = option::Item<int>;

	// Check if ORDER values are indeed the same (adjust if they differ)
	// This assertion might fail if Item<double> and Item<int> have different
	// ORDERs or if option::Item does not define ORDER.
	ASSERT_EQ(T1::ORDER, T2::ORDER) << "This test assumes Item<double> and "
	                                   "Item<int> have the same ORDER value.";

	// constexpr std::string_view name1 = _::TypeNameGetter<T1>::Get();
	// constexpr std::string_view name2 = _::TypeNameGetter<T2>::Get();
	constexpr bool t1_less_than_t2 = _::CompareLessWithTieBreaker<T1, T2>::value;
	constexpr bool t2_less_than_t1 = _::CompareLessWithTieBreaker<T2, T1>::value;

	// Print info (optional, useful for debugging)
	std::cout << "\n--- Debug Tie-Breaker Info (Item<double> vs Item<int>) ---"
	          << std::endl;
	// std::cout << "  Name1: " << name1 << std::endl; // Can be very long
	// std::cout << "  Name2: " << name2 << std::endl;
	std::cout << "  CompareLess<double, int>::value: " << std::boolalpha
	          << t1_less_than_t2 << std::endl;
	std::cout << "  CompareLess<int, double>::value: " << std::boolalpha
	          << t2_less_than_t1 << std::endl;
	std::cout << "--- End Debug Tie-Breaker Info ---\n" << std::endl;

	// Assert the observed sort order (e.g., double before int based on names)
	// Adjust these based on the actual output of the comparison
	ASSERT_TRUE(t1_less_than_t2);
	ASSERT_FALSE(t2_less_than_t1);
	static_assert(
	  _::CompareLessWithTieBreaker<T1, T2>::value,
	  "Static Check Fail: Tie-breaker inconsistent (double < int)");
	static_assert(
	  !_::CompareLessWithTieBreaker<T2, T1>::value,
	  "Static Check Fail: Tie-breaker inconsistent (int < double)");
}

// --- Tests for Get (Type Options) ---
TEST(OptionsGet, FindFirst) {
	// Options are processed left-to-right by Get
	using Test = Options<ParamB<char>, ParamA<int>>::Get<ParamB>;
	static_assert(std::is_same_v<Test, char>);
}

TEST(OptionsGet, NotFound) {
	// ParamC not in list, should return ParamC's default (char)
	using Test = Options<ParamB<X>, ParamA<int>>::Get<ParamC>;
	static_assert(std::is_same_v<Test, char>);
}

TEST(OptionsGet, EmptyPack) {
	// No options, should return ParamA's default (void)
	using Test = Options<>::Get<ParamA>;
	static_assert(std::is_same_v<Test, void>);
}

TEST(OptionsGet, MultipleMatches) {
	// Finds the first ParamB
	using Test = Options<ParamA<double>, ParamB<X>, ParamB<Y>>::Get<ParamB>;
	static_assert(std::is_same_v<Test, X>);
}

TEST(OptionsGet, DifferentParams) {
	// No ParamA found, use default (void)
	using Test = Options<ParamB<int>, ParamC<char>>::Get<ParamA>;
	static_assert(std::is_same_v<Test, void>);
}

// --- Tests for GET (Value Options) ---
TEST(OptionsGET, FindFirst) {
	static_assert(Options<ParamD<100>, ParamE<200>>::template GET<ParamD> == 100);
}

TEST(OptionsGET, MultipleMatches) {
	// Finds the first ParamD
	static_assert(Options<ParamE<1>, ParamD<2>, ParamD<3>>::GET<ParamD> == 2);
}

TEST(OptionsGET, NotFound) {
	// ParamE not found, use default (true)
	static_assert(Options<ParamD<0>, ParamF<false>>::GET<ParamE> == true);
}

TEST(OptionsGET, Boolean) {
	static_assert(Options<ParamF<false>>::GET<ParamF> == false);
	static_assert(Options<ParamE<true>>::GET<ParamE> == true);
}

TEST(OptionsGET, Negative) {
	static_assert(Options<ParamD<-42>>::GET<ParamD> == -42);
}

TEST(OptionsGET, Zero) { static_assert(Options<ParamD<0>>::GET<ParamD> == 0); }

// --- Tests for GetTemplate ---
TEST(OptionsGetTemplate, FindFirst) {
	using Opts = Options<ParamH<ImplH>, ParamG<ImplG>>;
	// Get ParamH, pass Arg1. Finds ParamH<ImplH> -> instantiates ImplH<Arg1>.
	using Test = Opts::template GetTemplate<ParamH, Arg1>;
	static_assert(std::is_same_v<Test, ImplH<Arg1>>);
	static_assert(Test::ID == 8);
}

TEST(OptionsGetTemplate, NotFound) {
	using Opts = Options<ParamH<ImplH>, ParamA<int>>;
	// Get ParamG (not present), pass Arg1. Uses ParamG's default ->
	// DefaultG<Arg1>.
	using Test = Opts::template GetTemplate<ParamG, Arg1>;
	static_assert(std::is_same_v<Test, DefaultG<Arg1>>);
	static_assert(Test::ID == 77);
}

TEST(OptionsGetTemplate, EmptyPack) {
	using Opts = Options<>;
	// Get ParamH, pass Arg1, Arg2. Uses ParamH's default -> DefaultH<Arg1, Arg2>.
	using Test = Opts::template GetTemplate<ParamH, Arg1, Arg2>;
	static_assert(std::is_same_v<Test, DefaultH<Arg1, Arg2>>);
	static_assert(Test::ID == 88);
}

TEST(OptionsGetTemplate, MultipleMatches) {
	// Finds the first ParamG
	using Opts = Options<ParamG<ImplG>, ParamH<ImplH>, ParamG<ImplG_Alt>>;
	using Test = Opts::template GetTemplate<ParamG, Arg1>;
	static_assert(std::is_same_v<Test, ImplG<Arg1>>);
	static_assert(Test::ID == 7);
}

TEST(OptionsGetTemplate, DifferentArgs) {
	using Opts = Options<ParamG<ImplG>>;
	using TestA = Opts::template GetTemplate<ParamG>;       // -> ImplG<>
	using TestB = Opts::template GetTemplate<ParamG, Arg1>; // -> ImplG<Arg1>
	using TestC =
	  Opts::template GetTemplate<ParamG, Arg1, int, Arg2>; // -> ImplG<Arg1, int,
	                                                       // Arg2>
	static_assert(std::is_same_v<TestA, ImplG<>>);
	static_assert(std::is_same_v<TestB, ImplG<Arg1>>);
	static_assert(std::is_same_v<TestC, ImplG<Arg1, int, Arg2>>);
}

// --- Tests for Mixed Options ---
TEST(OptionsMixed, Getters) {
	using Opts = Options<
	  ParamD<100>,   // Value
	  ParamG<ImplG>, // Template
	  ParamA<X>,     // Type
	  ParamH<ImplH>, // Template
	  ParamB<Y>      // Type
	  >;

	// Get Type
	static_assert(std::is_same_v<Opts::template Get<ParamA>, X>);
	static_assert(std::is_same_v<Opts::template Get<ParamB>, Y>);
	static_assert(std::is_same_v<Opts::template Get<ParamC>, char>); // Default

	// GET Value
	static_assert(Opts::template GET<ParamD> == 100);
	static_assert(Opts::template GET<ParamE> == true); // Default

	// Get Template
	static_assert(
	  std::is_same_v<Opts::template GetTemplate<ParamG, Arg1>, ImplG<Arg1>>);
	static_assert(std::is_same_v<Opts::template GetTemplate<ParamH>, ImplH<>>);
	static_assert(std::is_same_v<
	              Opts::template GetTemplate<ParamI, Arg1, Arg2>,
	              DefaultI<Arg1, Arg2>>); // Default
}

// --- Tests for With (Add/Replace/Sort Logic) ---
TEST(OptionsWith, AddNew) {
	using A = Options<option::Item<int>>; // Assume Item::ORDER = 150
	// Add CustomTemplate (assume CustomTemplate::ORDER = 50)
	using B = A::With<option::CustomTemplate<TemplateA>>;

	// Expected: Sort puts CustomTemplate first, Item second (if
	// CustomTemplate::ORDER < Item::ORDER) This assertion needs to be verified
	// against actual ORDER values.
	using ExpectedB =
	  Options<option::Item<int>, option::CustomTemplate<TemplateA>>;
	// If Item::ORDER < CustomTemplate::ORDER, then:
	// using ExpectedB = Options<option::Item<int>,
	// option::CustomTemplate<TemplateA>>;
	static_assert(
	  std::is_same_v<B, ExpectedB>,
	  "With did not add and sort correctly. Check ORDER values.");
}

TEST(OptionsWith, ReplaceExistingTypeOptionKind) { // Renamed for clarity
	using A = Options<option::Item<int>>;
	// Add Item<double>. is_instantiated_from_same(Item<double>, Item<int>) is
	// true. FilterOutKind removes Item<int>. Append adds Item<double>. Sort
	// places Item<double>.
	using B = A::With<option::Item<double>>;

	// Expected: Only Item<double> remains
	using ExpectedB = Options<option::Item<double>>;
	static_assert(
	  std::is_same_v<B, ExpectedB>,
	  "With did not replace existing TypeOption kind");
}

TEST(OptionsWith, AddMultiple) {
	// Assuming Item::ORDER = 150, ParamD::ORDER = 400, ParamA::ORDER = 100
	using A = Options<option::Item<int>, ParamD<100>>;
	using B = A::With<ParamA<X>, ParamD<999>>;

	// Expected order: Item (-1000), ParamA (100), ParamD (400)
	using ExpectedB = Options<option::Item<int>, ParamA<X>, ParamD<999>>;
	static_assert(
	  std::is_same_v<B, ExpectedB>,
	  "With did not handle multiple additions/replacements correctly. Check "
	  "ORDER values.");
}

TEST(OptionsWith, AddMultipleToEmpty) {
	using A = Options<>;
	// Add ParamD<1>(400), ParamA<X>(100), ParamD<2>(400)
	using B = A::With<ParamD<1>, ParamA<X>, ParamD<2>>;

	// Expected order: ParamA (100), ParamD<2> (400) - ParamD<1> replaced by
	// ParamD<2>
	using ExpectedB = Options<ParamA<X>, ParamD<2>>;
	static_assert(
	  std::is_same_v<B, ExpectedB>,
	  "With did not handle multiple additions to empty correctly");
}

TEST(OptionsWith, CanonicalResult) {
	// Assuming ParamA::ORDER = 100, ParamD::ORDER = 400
	using Opts1 = Options<ParamA<X>>;
	using Opts2 = Options<ParamD<1>>;

	// Result1: Add ParamD<1> to Options<ParamA<X>> -> Options<ParamA<X>,
	// ParamD<1>>
	using Result1 = Opts1::With<ParamD<1>>;
	// Result2: Add ParamA<X> to Options<ParamD<1>> -> Options<ParamA<X>,
	// ParamD<1>>
	using Result2 = Opts2::With<ParamA<X>>;

	static_assert(
	  std::is_same_v<Result1, Result2>, "With did not produce canonical results");

	using Expected = Options<ParamA<X>, ParamD<1>>;
	static_assert(std::is_same_v<Result1, Expected>);
	static_assert(std::is_same_v<Result2, Expected>);
}

// !

// --- Tests for WithDefault ---
TEST(OptionsWithDefault, AddNewAndSkipExistingKinds) {
	using namespace VOLTISO_NAMESPACE;

	// Scenario 1: Add a new kind to existing options.
	// Initial: Item (ORDER -1000)
	// Default: ParamA (ORDER 100) - new kind
	using Initial1 = Options<option::Item<int>>;
	using Result1 = Initial1::template WithDefault<ParamA<char>>;
	// Expected: Item is added first due to its lower ORDER value.
	using Expected1 =
	  Options<option::Item<int>, ParamA<char>>; // Item(-1000), ParamA(100)
	static_assert(
	  std::is_same_v<Result1, Expected1>,
	  "WithDefault did not add a new kind correctly or sort. Check ORDER "
	  "values.");

	// Scenario 2: Attempt to add a default option whose kind already exists.
	// Initial: Item<int> (ORDER -1000)
	// Default: Item<double> (same kind as existing Item<int>)
	using Initial2 = Options<option::Item<int>>;
	using Result2 = Initial2::template WithDefault<option::Item<double>>;
	// Expected: No change, Item<double> should be skipped.
	using Expected2 = Options<option::Item<int>>;
	static_assert(
	  std::is_same_v<Result2, Expected2>,
	  "WithDefault incorrectly added or replaced an existing kind.");

	// Scenario 3: Add multiple default options - some new, some existing kinds.
	// Initial: Item<int> (ORDER -1000), ParamD (ORDER 400)
	// Defaults:
	//   ParamA<char>        (ORDER 100) - New kind
	//   option::Item<double> (ORDER -1000) - Existing kind (Item)
	//   ParamG<ImplG>       (ORDER 700) - New kind (TemplateOption)
	using Initial3 =
	  Options<option::Item<int>, ParamD<0>>; // Initial sort: Item, ParamD
	using Result3 = Initial3::template WithDefault<
	  ParamA<char>,         // Should be added
	  option::Item<double>, // Should be skipped
	  ParamG<ImplG>         // Should be added
	  >;

	// Expected order based on ORDER values: Item(-1000), ParamA(100),
	// ParamD(400), ParamG(700) Original Item<int> and ParamD are preserved.
	// ParamA<char> and ParamG<ImplG> are added.
	// option::Item<double> is skipped.
	using Expected3 = Options<
	  option::Item<int>, // -1000
	  ParamA<char>,      // 100
	  ParamD<0>,         // 400
	  ParamG<ImplG>      // 700
	  >;
	static_assert(
	  std::is_same_v<Result3, Expected3>,
	  "WithDefault did not handle multiple defaults correctly (add new, skip "
	  "existing, sort). Check ORDER values.");

	// Scenario 4: Adding defaults to an empty Options list.
	using Initial4 = Options<>;
	// Defaults: ParamD (ORDER 400), ParamA<char> (ORDER 100)
	using Result4 = Initial4::template WithDefault<ParamD<0>, ParamA<char>>;
	// Expected order: ParamA(100), ParamD(400)
	using Expected4 = Options<ParamA<char>, ParamD<0>>;
	static_assert(
	  std::is_same_v<Result4, Expected4>,
	  "WithDefault did not correctly add defaults to an empty list.");

	// Scenario 5: Adding multiple defaults of the same kind - only first
	// considered should be added (if kind missing).
	using Initial5 = Options<>;
	using Result5 = Initial5::template WithDefault<ParamA<char>, ParamA<X>>;
	// Expected: Only ParamA<char> is added, as its kind (ParamA) is then
	// considered present.
	using Expected5 = Options<ParamA<char>>;
	static_assert(
	  std::is_same_v<Result5, Expected5>,
	  "WithDefault did not handle multiple defaults of the same kind correctly "
	  "in one call.");
}

// !

TEST(InternalsDebug, IsBrandPathFalseDefault) {
	static_assert(
	  VOLTISO_NAMESPACE::_::IsOptionEqualToItsDefault_v<
	    VOLTISO_NAMESPACE::brand::Path<false>>,
	  "brand::Path<false> is NOT being recognized as default by "
	  "IsOptionEqualToItsDefault.");
	static_assert(
	  !VOLTISO_NAMESPACE::_::IsOptionEqualToItsDefault_v<
	    VOLTISO_NAMESPACE::brand::Path<true>>,
	  "brand::Path<true> IS being recognized as default by "
	  "IsOptionEqualToItsDefault (it shouldn't be).");
}
