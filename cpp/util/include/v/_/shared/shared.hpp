#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"

#include "v/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
template <class Item>
class RELOCATABLE(Shared) : public shared::Custom<Options<option::Item<Item>>> {
	using Base = shared::Custom<Options<option::Item<Item>>>;
	using Base::Base;

public:
	using Base::operator=;
}; // class Shared
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
