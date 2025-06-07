#pragma once
#include <v/_/_>

#include "v/concepts/options"

namespace VOLTISO_NAMESPACE::tensor {
template <class Options>
  requires concepts::Options<Options> // && std::is_final_v<Final>
class Custom;

template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::tensor

namespace VOLTISO_NAMESPACE {
template <class Item, auto... ES> class Tensor;
} // namespace VOLTISO_NAMESPACE
