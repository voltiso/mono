#pragma once
#include <v/_/_>

#include "_forward.hpp"
#include "custom.hpp"

#include "v/_/is/relocatable.hpp"
#include "v/option/extents"
#include "v/option/final"
#include "v/option/item"
#include "v/value-pack"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
#pragma push_macro("BASE")
#define BASE                                                                   \
	array::Custom<Options<                                                       \
	  option::Item<Item>, option::Extents<ValuePack<EXTENT>>,                    \
	  option::Final<Array<Item, EXTENT>>>>

template <class Item, auto EXTENT> class Array : public BASE {
	using Base = BASE;
	using Base::Base;
	VOLTISO_INHERIT_RVALUE_COPY(Array, Base);
};

template <class Item, auto EXTENT>
  requires is::relocatable<Item>
class RELOCATABLE(Array<Item COMMA EXTENT>) : public BASE {
	RELOCATABLE_BODY(Array<Item COMMA EXTENT>);

private:
	using Base = BASE;
	using Base::Base;
	VOLTISO_INHERIT_RVALUE_COPY(Array, Base);
};

#pragma pop_macro("BASE")

template <
  class T, class... U,
  std::enable_if_t<std::conjunction_v<std::is_same<T, U>...>, int> = 0>
Array(T, U...) -> Array<std::type_identity_t<T>, 1 + (Size)sizeof...(U)>;

template <class T>
Array(std::initializer_list<T> list) -> Array<T, list.size()>;
} // namespace VOLTISO_NAMESPACE

// !

namespace VOLTISO_NAMESPACE::array {
template <class Item, auto EXTENT>
struct Specializations<
  Options<option::Item<Item>, option::Extents<ValuePack<EXTENT>>>> {
	using Result = Array<Item, EXTENT>;
};
} // namespace VOLTISO_NAMESPACE::array

#include <v/OFF>
