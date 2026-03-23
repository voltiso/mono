#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/is/options"
#include "v/size"

#include <v/ON>

namespace std {

template <V::is::Options Options>
struct tuple_size<V::tensor::Custom<Options>>
    : std::integral_constant<V::Size, V::tensor::Custom<Options>::EXTENT> {};

} // namespace std

#include <v/OFF>
