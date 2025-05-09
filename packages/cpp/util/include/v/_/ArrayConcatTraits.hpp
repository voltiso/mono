// gemini 2.5 pro exp
#pragma once
#include <v/_/_>

#include "v/get/EXTENT"

namespace VOLTISO_NAMESPACE::_::array {
consteval std::size_t sumExtents() { return 0; }

template <class T, class... Ts> constexpr auto sumExtents(T &&t, Ts &&...ts) {
	constexpr auto tExtent = get::EXTENT<T>;
	if constexpr (isStaticError(tExtent)) {
		return STATIC_ERROR;
	} else if constexpr (
	  tExtent == Extent::DYNAMIC || tExtent == Extent::UNBOUND) {
		return STATIC_ERROR;
	} else {
		return get::EXTENT<T>.value + sumExtents(std::forward<Ts>(ts)...);
	}
}

} // namespace VOLTISO_NAMESPACE::_::array
