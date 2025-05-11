#pragma once
#include <v/_/_>

namespace VOLTISO_NAMESPACE::maybe {
class None {};
static constexpr auto NONE = None{};
} // namespace VOLTISO_NAMESPACE::maybe

namespace VOLTISO_NAMESPACE {
template <class Value> class Maybe;
} // namespace VOLTISO_NAMESPACE
