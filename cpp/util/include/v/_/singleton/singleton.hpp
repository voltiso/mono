#pragma once
#include <v/_/_>

#include "custom.hpp"

#include "v/option/item"
#include "v/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
template <class Item> class Singleton : public singleton::Custom<Options<option::Item<Item>>> {
	using Custom = singleton::Custom<Options<option::Item<Item>>>;
	using Custom::Custom;
}; // class Singleton
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
