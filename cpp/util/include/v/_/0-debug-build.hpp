#pragma once
#include <v/_/0-namespace.hpp>

namespace VOLTISO_NAMESPACE {
#ifdef NDEBUG
inline constexpr bool IS_DEBUG_BUILD = false;
#else
inline constexpr bool IS_DEBUG_BUILD = true;
#endif
} // namespace VOLTISO_NAMESPACE
