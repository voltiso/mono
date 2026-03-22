#pragma once
#include <v/_/_>

#include "v/option"

#include <v/ON>
namespace V::mixin::copy::option {

template <bool b> struct implicitCopy : Option::Value<b> {};

} // namespace V::mixin::copy::option
#include <v/OFF>
