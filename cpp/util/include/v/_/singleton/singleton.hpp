#pragma once
#include <v/_/_>

#include "custom.hpp"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
template <class Item> class Singleton : public singleton::Custom<singleton::option::Item<Item>> {
	using Custom = singleton::Custom<singleton::option::Item<Item>>;
	using Custom::Custom;
}; // class Singleton
} // namespace VOLTISO_NAMESPACE

// !

namespace VOLTISO_NAMESPACE::singleton {
template <class Item> struct Specializations<option::Item<Item>> {
	using Result = Singleton<Item>;
};
} // namespace VOLTISO_NAMESPACE::singleton

#include <v/OFF>
