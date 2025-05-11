#pragma once

namespace VOLTISO_NAMESPACE::concepts {
template <class T>
concept Object = requires { T::IS_VOLTISO_OBJECT; };
} // namespace VOLTISO_NAMESPACE::concepts
