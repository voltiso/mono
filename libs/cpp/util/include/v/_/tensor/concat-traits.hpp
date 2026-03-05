// gemini 2.5 pro exp
#pragma once
#include <v/_/_>

#include "v/get/num-items"
#include "v/size"

namespace VOLTISO_NAMESPACE::_::tensor {
consteval Size sumNumItems() { return 0; }

template <class T, class... Ts> consteval Size sumNumItems(T &&t, Ts &&...ts) {
	return get::NUM_ITEMS<T> + sumNumItems(std::forward<Ts>(ts)...);
}

} // namespace VOLTISO_NAMESPACE::_::tensor
