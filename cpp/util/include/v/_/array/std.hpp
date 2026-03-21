#pragma once
#include <v/_/_>

#include "forward.hpp" // IWYU pragma: export

#include "v/is/options"
#include "v/size"

#include <v/ON>
namespace std {

// !

template <V::is::Options Options>
struct tuple_size<V::array::Custom<Options>>
    : std::integral_constant<V::Size, V::array::Custom<Options>::EXTENT> {};

// !

} // namespace std
#include <v/OFF>
