#pragma once
#include "v/_/0-is-derived-from-template.hpp"
#include "v/_/0-object.forward.hpp"
#include <v/_/0-namespace.hpp>

namespace VOLTISO_NAMESPACE::is {
template <class T>
concept Object = is::DerivedFromTemplate<
  T, VOLTISO_NAMESPACE::Object>; // requires { T::IS_VOLTISO_OBJECT; };
} // namespace VOLTISO_NAMESPACE::is
