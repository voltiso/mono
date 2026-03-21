#pragma once
#include <v/_/_>

#include "v/is/option"

#include <v/ON>

namespace V {
class Handle;
} // namespace V

namespace V::handle {
template <is::Option... Os> class Custom;

template <is::Option... Os> struct Specializations {
	using Result = Custom<Os...>;
};

template <is::Option... Os> using GetCustom = Specializations<Os...>::Result;
} // namespace V::handle

#include <v/OFF>
