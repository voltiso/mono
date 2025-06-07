#pragma once
#include <v/_/_>

#include <v/ON>

namespace V {
template <class Target>
  requires(!std::is_reference_v<Target>)
class Copy;
} // namespace V

#include <v/OFF>
