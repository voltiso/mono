#pragma once
#include <v/_/_>

#include "v/concepts/options"

#include <cstddef>

namespace VOLTISO_NAMESPACE::array {
template <class Options>
  requires concepts::Options<Options> // && std::is_final_v<Final>
class Custom;

template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::array

namespace VOLTISO_NAMESPACE {
template <class Item, size_t NUM_ITEMS> class Array;
} // namespace VOLTISO_NAMESPACE
