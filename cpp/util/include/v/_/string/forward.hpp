#pragma once
#include <v/_/_>

#include "v/is/options"
#include "v/size"

namespace VOLTISO_NAMESPACE::string {
template <class Options>
  requires is::Options<Options>
class Custom;
} // namespace VOLTISO_NAMESPACE::string

//

namespace VOLTISO_NAMESPACE {
template <Size NUM_CHARS> class String;
} // namespace VOLTISO_NAMESPACE
