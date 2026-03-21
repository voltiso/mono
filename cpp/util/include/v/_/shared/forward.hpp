#pragma once
#include <v/_/_>

#include "v/is/options"
#include "v/option/item"
#include "v/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
template <class Item> class Shared;
} // namespace VOLTISO_NAMESPACE

namespace VOLTISO_NAMESPACE::shared {
template <class Options>
  requires is::Options<Options>
class RELOCATABLE(Custom);

template <class Options>
  requires is::Options<Options>
struct Specializations {
	using Result = shared::Custom<Options>;
};

template <class Item> struct Specializations<Options<option::Item<Item>>> {
	using Result = Shared<Item>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::shared

#include <v/OFF>
