#include "voltiso/TypeParameter"
#include "voltiso/ValueParameter"
#include "voltiso/getParameter/Type"
#include "voltiso/getParameter/VALUE"

#include <tuple>
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
template <class T> struct ParamA : TypeParameter<T, void> {};
template <class T> struct ParamB : TypeParameter<T, int> {};
template <class T> struct ParamC : TypeParameter<T, char> {};

//
// Value parameter definitions
//
template <auto V> struct ParamD : ValueParameter<V, 42> {};
template <auto V> struct ParamE : ValueParameter<V, true> {};
template <auto V> struct ParamF : ValueParameter<V, false> {};

// Invalid parameters (not derived from TypeParameter/ValueParameter)
template <class T> struct InvalidTypeParam {};
template <auto V> struct InvalidValueParam {};

//
// Test cases for Type parameters
//

// Test finding first matching parameter
using Test1 = getParameter::Type<ParamB, std::tuple<ParamB<char>, ParamA<int>>>;
static_assert(std::is_same_v<Test1, char>);

// Test when parameter is not found
using Test2 = getParameter::Type<ParamC, std::tuple<ParamB<X>, ParamA<int>>>;
static_assert(
    std::is_same_v<Test2, char>); // Should use ParamC's default (char)

// Test with empty parameter pack
using Test3 = getParameter::Type<ParamA, std::tuple<>>;
static_assert(
    std::is_same_v<Test3, void>); // Should use ParamA's default (void)

// Test with multiple matching parameters (should use first match)
using Test4 =
    getParameter::Type<ParamB,
                       std::tuple<ParamA<double>, ParamB<X>, ParamB<Y>>>;
static_assert(std::is_same_v<Test4, X>);

// Test with different parameter types
using Test5 = getParameter::Type<ParamA, std::tuple<ParamB<int>, ParamC<char>>>;
static_assert(std::is_same_v<Test5, void>); // No ParamA found, use default

// Test with same type but different parameters
using Test6 =
    getParameter::Type<ParamA, std::tuple<ParamB<X>, ParamC<X>, ParamA<X>>>;
static_assert(std::is_same_v<Test6, X>);

//
// Test cases for Value parameters
//

// Test finding first matching parameter
static_assert(
    getParameter::VALUE<ParamD, std::tuple<ParamD<100>, ParamE<200>>> == 100);

// Test with multiple matching parameters (should use first match)
static_assert(
    getParameter::VALUE<ParamD, std::tuple<ParamE<1>, ParamD<2>, ParamD<3>>> ==
    2);

// Test with different parameter types (should use default value)
static_assert(
    getParameter::VALUE<ParamE, std::tuple<ParamD<0>, ParamF<false>>> == true);

// Test with multiple parameters of same type
static_assert(
    getParameter::VALUE<ParamD, std::tuple<ParamD<1>, ParamD<2>, ParamD<3>>> ==
    1);

// Test with boolean values
static_assert(getParameter::VALUE<ParamF, std::tuple<ParamF<false>>> == false);

// Test with negative values
static_assert(getParameter::VALUE<ParamD, std::tuple<ParamD<-42>>> == -42);

// Test with zero value
static_assert(getParameter::VALUE<ParamD, std::tuple<ParamD<0>>> == 0);

//
// Test cases for mixed Type and Value parameters
//

// Test finding both type and value parameters in the same pack
using MixedTest1 =
    getParameter::Type<ParamA, std::tuple<ParamD<42>, ParamA<X>, ParamE<true>>>;
static_assert(std::is_same_v<MixedTest1, X>);

static_assert(
    getParameter::VALUE<ParamD,
                        std::tuple<ParamA<X>, ParamD<42>, ParamB<int>>> == 42);

// Test with multiple parameters of each type
using MixedTest2 = getParameter::Type<
    ParamB, std::tuple<ParamA<X>, ParamD<1>, ParamB<Y>, ParamE<false>>>;
static_assert(std::is_same_v<MixedTest2, Y>);

static_assert(getParameter::VALUE<
                  ParamE, std::tuple<ParamB<X>, ParamE<true>, ParamC<char>>> ==
              true);

// Test with no matching parameters of either type
using MixedTest3 =
    getParameter::Type<ParamC,
                       std::tuple<ParamD<1>, ParamE<true>, ParamF<false>>>;
static_assert(std::is_same_v<MixedTest3, char>); // Should use ParamC's default

static_assert(
    getParameter::VALUE<ParamF, std::tuple<ParamA<X>, ParamB<Y>, ParamC<Z>>> ==
    false);
// Should use ParamF's default
