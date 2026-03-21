#pragma once
#include <v/_/_>

#include "v/is/options"
#include "v/option"

#include <v/ON>
namespace V::options::option {

struct DefaultOptions : Option::Tag {};
template <is::Options O> struct defaultOptions : Option::Type<O, DefaultOptions> {};

} // namespace V::options::option
#include <v/OFF>
