#pragma once
#include <v/_/_>

#include "conversion.hpp"
#include "iteration.hpp"
#include "std.hpp"

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor::_::mixin {

template <is::Options O> class All : public Conversion<O>, public Std<O>, public Iteration<O> {};

} // namespace VOLTISO_NAMESPACE::tensor::_::mixin

#include <v/OFF>
