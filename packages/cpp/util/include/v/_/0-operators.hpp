#pragma once

#include "v/_/0-force-inline.hpp"
#include "v/_/0-is-voltiso-type.hpp"

#include <type_traits>
#include <utility>

#include <v/_/0-ON.hpp>

namespace VOLTISO_NAMESPACE {

// use rvalue A in-place if possible
// only if A provides member `operator<<=`, and does NOT provide member
// `operator<<`
template <class A, class B>
  requires(is::VoltisoType<A> && !std::is_reference_v<A> && !std::is_const_v<A>)
VOLTISO_FORCE_INLINE decltype(auto) operator<<(A &&a, B &&b)
  requires(
    requires { a <<= std::forward<B>(b); } &&
    !requires { a << std::forward<B>(b); })
{
	a <<= std::forward<B>(b);
	return std::forward<A>(a);
}

// copy A and use `A::operator<<=` if possible
// Only if there's no `A::operator<<`
template <class A, class B>
  requires(is::VoltisoType<A> && !std::is_reference_v<A> && std::is_const_v<A>)
VOLTISO_FORCE_INLINE A operator<<(A &&a, B &&b)
  requires(
    requires(std::remove_const_t<A> a) { a <<= std::forward<B>(b); } &&
    !requires(A a) { a.operator<<(std::forward<B>(b)); })
{
	// A aCopy = a;                           // ! this should not compile
	std::remove_const_t<A> aCopy = a.copy();
	aCopy <<= std::forward<B>(b); // call *MEMBER* `operator<<=`
	return aCopy;                 // we're hoping for nrvo here
}

// !

// ! `operator/`
//
// use rvalue A in-place if possible
// only if A provides member `operator/=`, and does NOT provide member
// `operator/`
template <class A, class B>
  requires(is::VoltisoType<A> && !std::is_reference_v<A> && !std::is_const_v<A>)
VOLTISO_FORCE_INLINE decltype(auto) operator/(A &&a, B &&b)
  requires(
    requires { a /= std::forward<B>(b); } &&
    !requires { a / std::forward<B>(b); })
// requires { a.operator/=(std::forward<B>(b)); } &&
// !requires { a.operator/(std::forward<B>(b)); })
{
	a /= std::forward<B>(b);
	// a.operator/=(std::forward<B>(b));
	return std::forward<A>(a);
}

// copy A and use `A::operator/=` if possible
// Only if there's no `A::operator/`
// only if A is const rvalue reference (result of `.copy()`)
template <class A, class B>
  requires(is::VoltisoType<A> && !std::is_reference_v<A> && std::is_const_v<A>)
VOLTISO_FORCE_INLINE A operator/(A &&a, B &&b)
  requires(
    requires(std::remove_const_t<A> a_) { a_ /= std::forward<B>(b); } &&
    // !requires(A a_) { a_ / std::forward<B>(b); })
    // requires(A a_) { a_.operator/=(std::forward<B>(b)); } &&
    !requires(A a_) { a_.operator/(std::forward<B>(b)); })
{
	std::remove_const_t<A> aCopy = a.copy();
	aCopy /= std::forward<B>(b);
	return aCopy; // we're hoping for nrvo here

	// ! wrong: returns temporary:
	// return A{a.copy()} / std::forward<B>(b); // hope for NRVO
}

} // namespace VOLTISO_NAMESPACE

// !

#include <v/_/0-OFF.hpp>
