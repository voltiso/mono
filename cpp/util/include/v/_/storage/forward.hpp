#pragma once
#include <v/_/_>

#include "v/is/option"

#include <v/ON>

namespace V::storage {

template <is::Option... Options> class Custom;

template <is::Option... Os> struct Specializations {
	using Result = Custom<Os...>;
};

template <is::Option... Os> using GetCustom = Specializations<Os...>::Result;

} // namespace V::storage

// !

namespace V {
template <class Item> class Storage;
} // namespace V

#include <v/OFF>
