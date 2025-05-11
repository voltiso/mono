#pragma once
#include "v/_/0-concepts-object.hpp"
#include "v/_/0-namespace.hpp" // IWYU pragma: keep

#include <type_traits>

namespace VOLTISO_NAMESPACE::is {

// Check if it's our type.
// Purpose: e.g. define global operators that do not conflict with other
// libraries.
template <class T>
static constexpr bool VoltisoType = concepts::Object<std::decay_t<T>>;
} // namespace VOLTISO_NAMESPACE::is
