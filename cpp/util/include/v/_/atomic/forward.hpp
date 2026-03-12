#pragma once
#include <v/_/_>

#include "v/concepts/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE::atomic {
template <concepts::Options Options> class Custom;
} // namespace VOLTISO_NAMESPACE::atomic

namespace VOLTISO_NAMESPACE::atomic {
template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};
} // namespace VOLTISO_NAMESPACE::atomic

namespace VOLTISO_NAMESPACE::atomic {
template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::atomic

#include <v/OFF>
