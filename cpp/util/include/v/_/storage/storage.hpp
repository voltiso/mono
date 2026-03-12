#pragma once
#include <v/_/_>

#include "custom.hpp"

#include "v/is/relocatable"
#include "v/option/item"
#include "v/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
// To replace `std::aligned_storage`
// https://stackoverflow.com/a/71828512/1123898
// ⚠️ Remember to call `.destroy()` if you constructed something
// ⚠️ The `::Constexpr` version never zero-initializes, even with `= {}`
template <class Item> class Storage : public storage::Custom<Options<option::Item<Item>>> {
	using Self = Storage;
	RELOCATABLE_BODY_IF(is::relocatable<Item>)
	using Base = storage::Custom<Options<option::Item<Item>>>;
	VOLTISO_INHERIT(Storage)
};

// template <class Item>
//   requires is::relocatable<Item>
// class RELOCATABLE(Storage<Item>)
//     : public storage::Custom<Options<option::Item<Item>>> {
// 	RELOCATABLE_BODY(Storage<Item>);
// 	using Base = storage::Custom<Options<option::Item<Item>>>;
// 	VOLTISO_INHERIT(Storage);
// };
} // namespace VOLTISO_NAMESPACE

// !

namespace VOLTISO_NAMESPACE::storage {
template <class Item> struct Specializations<Options<option::Item<Item>>> {
	using Result = Storage<Item>;
};
} // namespace VOLTISO_NAMESPACE::storage

#include <v/OFF>
