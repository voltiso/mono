#pragma once
#include <v/_/_>

#include "v/is/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::mixin {

// const rvalue reference cast (super-explicit copy semantics)
template <is::Options O> class Move {
public:
	template <class T> [[nodiscard]] INLINE constexpr decltype(auto) move(this T &self) noexcept {
		return static_cast<T &&>(self);
	}
};

} // namespace VOLTISO_NAMESPACE::mixin
#include <v/OFF>
