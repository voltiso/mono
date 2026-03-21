#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"

#include <v/ON>
namespace V {

//

#pragma push_macro("CUSTOM")
#define CUSTOM box::Custom<box::option::Item<Item>>
template <class Item> class Box : public CUSTOM {
	using Base = CUSTOM;
#pragma pop_macro("CUSTOM")
	INHERIT(Box)
};

//

namespace box {
template <class Item> struct Specializations<box::option::Item<Item>> {
	using Result = Box<Item>;
};
} // namespace box

//

} // namespace V
#include <v/OFF>
