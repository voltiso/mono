#pragma once
#include <v/_/_>

#include "v/concepts/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
class Mutex;
} // namespace VOLTISO_NAMESPACE

namespace VOLTISO_NAMESPACE::mutex {
template <concepts::Options Options> class Custom;

template <concepts::Options Options> struct Specializations {
	using Result = mutex::Custom<Options>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::mutex

#include <v/OFF>
