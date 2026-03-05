#pragma once
#include <v/_/_>

#include "v/_/allocator/malloc.forward.hpp"
#include "v/type-option"

namespace VOLTISO_NAMESPACE::option {
template <class T> struct Allocator : TypeOption<T, allocator::Malloc> {};
} // namespace VOLTISO_NAMESPACE::option
