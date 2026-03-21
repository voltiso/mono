#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
template <class Item> class Atomic : public atomic::Custom<atomic::option::Item<Item>> {
	using Base = atomic::Custom<atomic::option::Item<Item>>;
	using Base::Base;
};
} // namespace VOLTISO_NAMESPACE

namespace VOLTISO_NAMESPACE::atomic {
template <class Item> struct Specializations<option::Item<Item>> {
	using Result = Atomic<Item>;
};
} // namespace VOLTISO_NAMESPACE::atomic

#include <v/OFF>
