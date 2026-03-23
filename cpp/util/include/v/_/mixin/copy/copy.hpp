#pragma once
#include <v/_/_>

#include "v/is/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::mixin {

// const rvalue reference cast (super-explicit copy semantics)
template <is::Options O> class Copy {
public:
	// * We use our magic explicit copy semantics
	//   constructing from `const Final&& other` is a copy.
	template <class T> [[nodiscard]] INLINE constexpr decltype(auto) copy(this T &self) noexcept {
		return static_cast<const T &&>(self);
	}
};

} // namespace VOLTISO_NAMESPACE::mixin
#include <v/OFF>
