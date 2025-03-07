#include "voltiso/is_derived_from_template"

namespace VOLTISO_NAMESPACE {

template <class X> struct TestBase {};
struct TestDerived : TestBase<int> {};
struct TestUnrelated {};
struct TestDerivedPrivate : private TestBase<int> {};

static_assert(is_derived_from_template<TestDerived, TestBase>);
static_assert(!is_derived_from_template<TestUnrelated, TestBase>);
static_assert(is_derived_from_template<TestDerivedPrivate, TestBase>);

//

// template <int n> struct TestValueBase {};
// struct TestValueDerived : TestValueBase<42> {};
// struct TestValueUnrelated {};
// struct TestValueDerivedPrivate : private TestValueBase<42> {};

// //

// static_assert(is_derived_from_template_value<TestValueDerived,
// TestValueBase>);

// static_assert(
//     !is_derived_from_template_value<TestValueUnrelated, TestValueBase>);

// static_assert(
//     is_derived_from_template_value<TestValueDerivedPrivate, TestValueBase>);

} // namespace VOLTISO_NAMESPACE
