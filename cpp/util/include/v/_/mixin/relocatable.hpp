#pragma once
#include <v/_/_>

#include "v/concepts/options"

#include <v/ON>

// !

namespace VOLTISO_NAMESPACE::mixin {

template <class Crtp> struct Relocatable {
	static_assert(
	  !concepts::Options<Crtp>,
	  "Relocatable mixin takes regular Crtp argument, not Options");

	using VOLTISO_RELOCATABLE_MARKER = Crtp;
};

} // namespace VOLTISO_NAMESPACE::mixin

#include <v/OFF>

// ! USAGE

// struct VOLTISO_RELOCATABLE(A) : v::mixin::Relocatable<A> {
// 	A(const A &) {}
// };
