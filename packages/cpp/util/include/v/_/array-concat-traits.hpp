// gemini 2.5 pro exp
#pragma once
#include <v/_/_>

#include "v/get/extent"

namespace VOLTISO_NAMESPACE::_::array {
consteval std::size_t sumExtents() { return 0; }

template <class T, class... Ts> constexpr auto sumExtents(T &&t, Ts &&...ts) {
	constexpr auto tExtent = get::EXTENT<T>;
	static_assert(tExtent != Extent::UNBOUND);
	static_assert(tExtent != Extent::DYNAMIC);
	return get::EXTENT<T>.value + sumExtents(std::forward<Ts>(ts)...);
}

} // namespace VOLTISO_NAMESPACE::_::array
