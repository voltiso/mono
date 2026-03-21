#pragma once
#include <v/_/_>

#include "v/is/option"

#include <v/ON>

namespace VOLTISO_NAMESPACE::singleton {
template <is::Option... Options> class Custom;
} // namespace VOLTISO_NAMESPACE::singleton

//

// ! this works with Lazy singletons only
namespace VOLTISO_NAMESPACE {
template <class Item> class Singleton;
} // namespace VOLTISO_NAMESPACE

// ! instead, use `typedef` (we may be `friend` of `Item`)
// namespace VOLTISO_NAMESPACE {
// template <class Item> using Singleton = singleton::Custom<Options<option::Item<Item>>>;
// } // namespace VOLTISO_NAMESPACE

//

namespace VOLTISO_NAMESPACE::singleton {
template <is::Option... Os> struct Specializations {
	using Result = Custom<Os...>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;

} // namespace VOLTISO_NAMESPACE::singleton
#include <v/OFF>
