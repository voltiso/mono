#pragma once
#include <v/_/_>

#include "v/box"
#include "v/size"
#include "v/static-array"

#include <v/ON>
namespace V::tensor {

//

struct Extent : Box<Size> {
	using Box::Box;
	static const Extent dynamic;
};

inline constexpr Extent Extent::dynamic = Extent{-1};

// !

template <Extent... extentsPack> class Extents : public StaticArray<Extent, extentsPack...> {
	using Base = StaticArray<Extent, extentsPack...>;
	using Base::Base;
};

//

} // namespace V::tensor
#include <v/OFF>
