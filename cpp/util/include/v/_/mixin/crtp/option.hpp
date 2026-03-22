#pragma once
#include <v/_/_>

// #include "v/is/option"
#include "v/option"
// #include "v/options"

#include <v/ON>
namespace V::mixin::crtp::option {

//

template <template <class...> class T> struct customTemplate : Option::Template<T> {};

//

} // namespace V::mixin::crtp::option
#include <v/OFF>
