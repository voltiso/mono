#pragma once
#include <v/_/_>

#include "v/box"
#include "v/size"
#include "v/static-array"

#include <v/ON>
namespace V::tensor {

//

struct Stride : Box<Size> {
	using Box::Box;
	static const Stride dynamic;
};

inline constexpr Stride Stride::dynamic = Stride{-1};

// !

template <Stride... stridesPack> class Strides : public StaticArray<Stride, stridesPack...> {
	using Base = StaticArray<Stride, stridesPack...>;
	using Base::Base;
};

//

} // namespace V::tensor
#include <v/OFF>
