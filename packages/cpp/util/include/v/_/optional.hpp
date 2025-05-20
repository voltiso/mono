#pragma once
#include <v/_/_>

namespace VOLTISO_NAMESPACE::optional {
class None {};
static constexpr auto NONE = None{};
} // namespace VOLTISO_NAMESPACE::optional

namespace VOLTISO_NAMESPACE {
template <class Value> class Optional;
} // namespace VOLTISO_NAMESPACE
