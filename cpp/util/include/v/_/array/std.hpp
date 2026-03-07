#pragma once
#include <v/_/_>

#include "_forward.hpp" // IWYU pragma: export

#include "v/concepts/options"
#include "v/size"

#include <v/ON>
namespace std {

// !

template <V::concepts::Options Options>
struct tuple_size<V::array::Custom<Options>>
    : std::integral_constant<V::Size, V::array::Custom<Options>::EXTENT> {};

// !

} // namespace std
#include <v/OFF>
