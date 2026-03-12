#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"

#include "v/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
template <class Item> class Atomic : public atomic::Custom<Options<option::Item<Item>>> {
	using Base = atomic::Custom<Options<option::Item<Item>>>;
	using Base::Base;
};
} // namespace VOLTISO_NAMESPACE

namespace VOLTISO_NAMESPACE::atomic {
template <class Item> struct Specializations<Options<option::Item<Item>>> {
	using Result = Atomic<Item>;
};
} // namespace VOLTISO_NAMESPACE::atomic

#include <v/OFF>
