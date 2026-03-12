#pragma once
#include <v/_/_>

// #include "v/_/is/relocatable.hpp"
#include "v/concepts/options"
// #include "v/option/item"

#include <v/ON>

namespace VOLTISO_NAMESPACE::storage {
template <concepts::Options Options> class Custom;

// template <concepts::Options Options>
//   requires is::relocatable<typename Options::template Get<option::Item>>
// class RELOCATABLE(Custom<Options>);
} // namespace VOLTISO_NAMESPACE::storage

// !

namespace VOLTISO_NAMESPACE::storage {
template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};
} // namespace VOLTISO_NAMESPACE::storage

// !

namespace VOLTISO_NAMESPACE {
template <class Item> class Storage;
// template <class Item>
//   requires is::relocatable<Item>
// class RELOCATABLE(Storage<Item>);
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
