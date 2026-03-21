#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"
#include "options.hpp"

#include "v/_/is/relocatable.hpp"

#include <v/ON>

namespace V {
#pragma push_macro("BASE")
#define BASE array::Custom<array::option::Item<Item>, array::option::numItems<numItems>>

template <class Item, Size numItems> class Array : public BASE {
	using Base = BASE;
	VOLTISO_INHERIT(Array);
};

template <class Item, Size numItems>
  requires is::relocatable<Item>
class RELOCATABLE(Array<Item COMMA numItems>) : public BASE {
	using Self = Array;
	RELOCATABLE_BODY
	using Base = BASE;
	VOLTISO_INHERIT(Array);
};

#pragma pop_macro("BASE")

template <class T, class... Us>
  requires std::conjunction_v<std::is_same<T, Us>...>
Array(T, Us...) -> Array<std::type_identity_t<T>, 1 + (Size)sizeof...(Us)>;

template <class T> Array(std::initializer_list<T> list) -> Array<T, list.size()>;
} // namespace V

// !

namespace V::array {
template <class Item, Size numItems>
struct Specializations<option::Item<Item>, option::numItems<numItems>> {
	using Result = Array<Item, numItems>;
};
} // namespace V::array

#include <v/OFF>
