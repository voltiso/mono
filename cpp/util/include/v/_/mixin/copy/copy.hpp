#pragma once
#include <v/_/_>

#include "v/is/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::mixin {

// const rvalue reference cast (super-explicit copy semantics)
template <is::Options O> class Copy {
public:
	// * We use our magic explicit copy semantics - constructing from `const
	// Final&& other` is a copy.
	// * Your code must respect constness of the rvalue reference!
	// it's not a temporary just because it's rvalue!
	template <class T>
	[[nodiscard]] INLINE constexpr decltype(auto) copy(this T &self) noexcept
	// requires(std::is_constructible_v<T, const T &&>)
	{
		return static_cast<const T &&>(self);
	}
};

} // namespace VOLTISO_NAMESPACE::mixin
#include <v/OFF>
