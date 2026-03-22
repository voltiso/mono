#pragma once
#include <v/_/_>

#include "option.hpp"

#include "v/is/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::mixin {

// const rvalue reference cast (super-explicit copy semantics)
template <is::Options O> class Copy {
private:
	static constexpr bool _implicitCopy = O::template get<copy::option::implicitCopy>;

public:
	// * We use our magic explicit copy semantics - constructing from `const
	// Final&& other` is a copy.
	// * Your code must respect constness of the rvalue reference!
	// it's not a temporary just because it's rvalue!
	template <class T>
	[[nodiscard]] INLINE constexpr decltype(auto) copy(this T &self) noexcept
	  requires(!_implicitCopy)
	{
		return static_cast<const T &&>(self);
	}
};

} // namespace VOLTISO_NAMESPACE::mixin
#include <v/OFF>
