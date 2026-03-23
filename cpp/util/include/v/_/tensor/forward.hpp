#pragma once
#include <v/_/_>

// #include "v/_/is/relocatable.hpp"
#include "v/is/option"
// #include "v/options"
#include "v/size"

#include <v/ON>

namespace V::tensor {

template <is::Option... Os> class Custom;

// template <is::Option... Os>
//   requires is::relocatable<typename Options<Os...>::template Get<option::item>>
// class RELOCATABLE(Custom<Os...>);

template <is::Option... Os> struct Specializations {
	using Result = Custom<Os...>;
};

template <is::Option... Os> using GetCustom = typename Specializations<Os...>::Result;

} // namespace V::tensor

//

namespace V {

template <class Item, Size numItems> class Tensor;

// template <class Item, Size numItems>
//   requires is::relocatable<Item>
// class RELOCATABLE(Tensor<Item COMMA numItems>);

} // namespace V

#include <v/OFF>
