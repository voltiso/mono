#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"
#include "option.hpp"

#include "v/_/is/relocatable.hpp"

#include <v/ON>

namespace V::tensor::_ {
template <class Item, Size numItems>
using BaseCustom = Custom<tensor::option::item<Item>, option::numItems<numItems>>;
} // namespace V::tensor::_

// !

namespace V {

template <class Item, Size numItems> class Tensor : public tensor::_::BaseCustom<Item, numItems> {
	using Base = tensor::_::BaseCustom<Item, numItems>;
	VOLTISO_INHERIT(Tensor);
};

template <class Item, Size numItems>
  requires is::relocatable<Item>
class RELOCATABLE(Tensor<Item COMMA numItems>) : public tensor::_::BaseCustom<Item, numItems> {
	using Base = tensor::_::BaseCustom<Item, numItems>;
	using Self = Tensor;
	RELOCATABLE_BODY
	VOLTISO_INHERIT(Tensor);
};

//

template <class T, class... Us>
  requires std::conjunction_v<std::is_same<T, Us>...>
Tensor(T, Us...) -> Tensor<std::type_identity_t<T>, 1 + (Size)sizeof...(Us)>;

template <class T> Tensor(std::initializer_list<T> list) -> Tensor<T, list.size()>;
} // namespace V

// !

namespace V::tensor {
template <class Item, Size numItems>
struct Specializations<option::item<Item>, option::numItems<numItems>> {
	using Result = Tensor<Item, numItems>;
};
} // namespace V::tensor

#include <v/OFF>
