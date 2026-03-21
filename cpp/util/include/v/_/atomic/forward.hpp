#pragma once
#include <v/_/_>

#include "v/is/option"

#include <v/ON>

namespace V::atomic {

template <is::Option... Os> class Custom;

template <is::Option... Os> struct Specializations {
	using Result = Custom<Os...>;
};

template <is::Option... Os> using GetCustom = Specializations<Os...>::Result;

} // namespace V::atomic

// !

namespace V {
template <class Item> class Atomic;
} // namespace V

#include <v/OFF>
