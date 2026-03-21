#pragma once
#include <v/_/_>

#include <v/ON>

namespace V::handle {
struct Null {
	constexpr Null() noexcept = default;
	constexpr Null(std::nullptr_t) noexcept {};
};

inline std::ostream &operator<<(std::ostream &os, const Null &) {
	return os << "handle::null";
} // operator<<

inline constexpr auto null = Null{};
} // namespace V::handle

#include <v/OFF>
