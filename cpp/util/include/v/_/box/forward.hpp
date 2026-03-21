#pragma once
#include <v/_/_>

#include "v/is/option"

#include <v/ON>

namespace V::box {
template <is::Option... Os> class Custom;

template <is::Option... Os> struct Specializations {
	using Result = Custom<Os...>;
};

template <is::Option... Os> using GetCustom = Specializations<Os...>::Result;
} // namespace V::box

namespace V {
template <class Item> class Box;
} // namespace V

#include <v/OFF>
