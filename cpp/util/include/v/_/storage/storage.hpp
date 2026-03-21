#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "options.hpp"

#include "v/is/relocatable"

#include <v/ON>
namespace V {

//

// To replace `std::aligned_storage`
// https://stackoverflow.com/a/71828512/1123898
// ⚠️ Remember to call `.destroy()` manually if you constructed something
// - Default is union-based - not necessarily trivially constructible/destructible
// - To use bytes-based storage, use `::NonUnion` (cannot constexpr-construct, but always trivially
// constructible/destructible)
template <class Item> class Storage : public storage::Custom<storage::option::Item<Item>> {
	using Base = storage::Custom<storage::option::Item<Item>>;
	using Self = Storage;
	RELOCATABLE_BODY_IF(is::relocatable<Item>)
	VOLTISO_INHERIT(Storage)
};

// !

namespace storage {
template <class Item> struct Specializations<option::Item<Item>> {
	using Result = Storage<Item>;
};
} // namespace storage

//

} // namespace V
#include <v/OFF>
