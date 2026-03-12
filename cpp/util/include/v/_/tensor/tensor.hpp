#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"

#include "v/_/is/relocatable.hpp"
#include "v/option/extents"
#include "v/option/item"
#include "v/value-pack"

#include <v/ON>

namespace VOLTISO_NAMESPACE {

#pragma push_macro("BASE")
#define BASE tensor::Custom<Options<option::Item<Item>, option::Extents<ValuePack<ES...>>>>

template <class Item, auto... ES> class Tensor : public BASE {
	using Self = Tensor;
	RELOCATABLE_BODY_IF(is::relocatable<Item>)
	using Base = BASE;
	VOLTISO_INHERIT(Tensor);
};

// template <class Item, auto... ES>
//   requires is::relocatable<Item>
// class RELOCATABLE(Tensor<Item COMMA ES...>) : public BASE {
// 	using Self = Tensor;
// 	RELOCATABLE_BODY
// 	using Base = BASE;
// 	VOLTISO_INHERIT(Tensor);
// };

#pragma pop_macro("BASE")

template <class T, class... U, std::enable_if_t<std::conjunction_v<std::is_same<T, U>...>, int> = 0>
Tensor(T, U...) -> Tensor<std::type_identity_t<T>, 1 + (Size)sizeof...(U)>;

template <class T> Tensor(std::initializer_list<T> list) -> Tensor<T, list.size()>;

template <class T>
Tensor(std::initializer_list<std::initializer_list<T>> list)
  -> Tensor<T, list.size(), list.begin()->size()>;

template <class T>
Tensor(std::initializer_list<std::initializer_list<std::initializer_list<T>>> list)
  -> Tensor<T, list.size(), list.begin()->size(), list.begin()->begin()->size()>;

} // namespace VOLTISO_NAMESPACE

namespace VOLTISO_NAMESPACE::tensor {
template <class Item, auto... ES>
struct Specializations<Options<option::Item<Item>, option::Extents<ValuePack<ES...>>>> {
	using Result = Tensor<Item, ES...>;
};
} // namespace VOLTISO_NAMESPACE::tensor

#include <v/OFF>
