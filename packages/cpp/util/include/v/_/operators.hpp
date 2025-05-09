#pragma once
#include <v/_/_>

#include "v/is_voltiso_type"

#include <type_traits>
#include <utility>

namespace VOLTISO_NAMESPACE {

// use rvalue A in-place if possible
// only if A provides member `operator<<=`, and does NOT provide member
// `operator<<`
template <class A, class B>
  requires(is_voltiso_type<A> && !std::is_reference_v<A> && !std::is_const_v<A>)
VOLTISO_FORCE_INLINE decltype(auto) operator<<(A &&a, B &&b)
  requires(
    requires { a.operator<<=(std::forward<B>(b)); } &&
    !requires { a.operator<<(std::forward<B>(b)); })
{
	a.operator<<=(std::forward<B>(b));
	return std::forward<A>(a);
}

// copy A and use `A::operator<<=` if possible
// Only if there's no `A::operator<<`
template <class A, class B>
  requires(is_voltiso_type<A>)
VOLTISO_FORCE_INLINE A operator<<(const A &a, B &&b)
  requires(
    requires(A a) { a.operator<<=(std::forward<B>(b)); } &&
    !requires(A a) { a.operator<<(std::forward<B>(b)); })
{
	// A aCopy = a;                           // ! this should not compile
	A aCopy = a.copy();
	aCopy.operator<<=(std::forward<B>(b)); // call *MEMBER* `operator<<=`
	return aCopy;                          // we're hoping for nrvo here
	// ! note: one-liner  below makes little sense,
	// ! standard does not guarantee rvo, because it's not prvalue
	// static_assert(std::is_same_v<decltype(A{a.copy()}), A>);
	// static_assert(std::is_same_v<
	//               decltype(A{a.copy()}.operator<<=(std::forward<B>(b))), A
	//               &&>);
	// return A{a.copy()}.operator<<=(std::forward<B>(b)); // rvo hopefully
}

} // namespace VOLTISO_NAMESPACE
