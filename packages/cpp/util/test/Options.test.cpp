#include "voltiso/Options"
#include "voltiso/TypeOption"
#include "voltiso/ValueOption"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

//
// Test classes
//
struct X {};
struct Y {};
struct Z {};

//
// Type parameter definitions
//
template <class T> struct ParamA : TypeOption<T, void> {};
template <class T> struct ParamB : TypeOption<T, int> {};
template <class T> struct ParamC : TypeOption<T, char> {};

//
// Value parameter definitions
//
template <auto V> struct ParamD : ValueOption<V, 42> {};
template <auto V> struct ParamE : ValueOption<V, true> {};
template <auto V> struct ParamF : ValueOption<V, false> {};

// Invalid parameters (not derived from TypeParameter/ValueParameter)
template <class T> struct InvalidTypeParam {};
template <auto V> struct InvalidValueParam {};

//
// Test cases for Type parameters
//

// Test finding first matching parameter
using Test1 = Options<ParamB<char>, ParamA<int>>::Get<ParamB>;
static_assert(std::is_same_v<Test1, char>);

// Test when parameter is not found
using Test2 = Options<ParamB<X>, ParamA<int>>::Get<ParamC>;
static_assert(
    std::is_same_v<Test2, char>); // Should use ParamC's default (char)

// Test with empty parameter pack
using Test3 = Options<>::Get<ParamA>;
static_assert(
    std::is_same_v<Test3, void>); // Should use ParamA's default (void)

// Test with multiple matching parameters (should use first match)
using Test4 = Options<ParamA<double>, ParamB<X>, ParamB<Y>>::Get<ParamB>;
static_assert(std::is_same_v<Test4, X>);

// Test with different parameter types
using Test5 = Options<ParamB<int>, ParamC<char>>::Get<ParamA>;
static_assert(std::is_same_v<Test5, void>); // No ParamA found, use default

// Test with same type but different parameters
using Test6 = Options<ParamB<X>, ParamC<X>, ParamA<X>>::Get<ParamA>;
static_assert(std::is_same_v<Test6, X>);

//
// Test cases for Value parameters
//

// Test finding first matching parameter
static_assert(Options<ParamD<100>, ParamE<200>>::template GET<ParamD> == 100);

// Test with multiple matching parameters (should use first match)
static_assert(Options<ParamE<1>, ParamD<2>, ParamD<3>>::GET<ParamD> == 2);

// Test with different parameter types (should use default value)
static_assert(Options<ParamD<0>, ParamF<false>>::GET<ParamE> == true);

// Test with multiple parameters of same type
static_assert(Options<ParamD<1>, ParamD<2>, ParamD<3>>::GET<ParamD> == 1);

// Test with boolean values
static_assert(Options<ParamF<false>>::GET<ParamF> == false);

// Test with negative values
static_assert(Options<ParamD<-42>>::GET<ParamD> == -42);

// Test with zero value
static_assert(Options<ParamD<0>>::GET<ParamD> == 0);

//
// Test cases for mixed Type and Value parameters
//

// Test finding both type and value parameters in the same pack
using MixedTest1 = Options<ParamD<42>, ParamA<X>, ParamE<true>>::Get<ParamA>;
static_assert(std::is_same_v<MixedTest1, X>);

static_assert(Options<ParamA<X>, ParamD<42>, ParamB<int>>::GET<ParamD> == 42);

// Test with multiple parameters of each type
using MixedTest2 =
  Options<ParamA<X>, ParamD<1>, ParamB<Y>, ParamE<false>>::Get<ParamB>;
static_assert(std::is_same_v<MixedTest2, Y>);

static_assert(
  Options<ParamB<X>, ParamE<true>, ParamC<char>>::GET<ParamE> == true);

// Test with no matching parameters of either type
using MixedTest3 = Options<ParamD<1>, ParamE<true>, ParamF<false>>::Get<ParamC>;
static_assert(std::is_same_v<MixedTest3, char>); // Should use ParamC's default

static_assert(Options<ParamA<X>, ParamB<Y>, ParamC<Z>>::GET<ParamF> == false);
// Should use ParamF's default
