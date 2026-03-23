#pragma once
#include <v/_/_>

#include "v/is/options"
#include "v/size"

namespace VOLTISO_NAMESPACE::arrayView {
template <class Options>
  requires is::Options<Options>
class Custom;

template <class Options>
  requires is::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::arrayView

// !

namespace VOLTISO_NAMESPACE {
template <class Item, Size numItems> class ArrayView;
} // namespace VOLTISO_NAMESPACE
