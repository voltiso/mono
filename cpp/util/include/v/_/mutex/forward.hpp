#pragma once
#include <v/_/_>

#include "v/is/option"

#include <v/ON>

namespace V {
class Mutex;
} // namespace V

namespace V::mutex {
template <is::Option... Os> class Custom;

template <is::Option... Os> struct Specializations {
	using Result = mutex::Custom<Os...>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace V::mutex

#include <v/OFF>
