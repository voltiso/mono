#pragma once
#include <v/_/_>

#include "v/is/options"

namespace VOLTISO_NAMESPACE::ref {
template <class Options>
  requires is::Options<Options>
class Custom;

template <class Options>
  requires is::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::ref

// !

namespace VOLTISO_NAMESPACE {
template <class Target> class Ref;
} // namespace VOLTISO_NAMESPACE
