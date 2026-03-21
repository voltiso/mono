#pragma once
#include <v/_/_>

#include "../config.hpp"

#include <v/ON>

namespace V::box::_::mixin {

template <is::Options O> class Comparable {
	using _Config = Config<O>;

	static consteval void _check() noexcept {
		static_assert(std::is_base_of_v<Comparable, typename V::mixin::Crtp<O>::Final>);
	}

public:
	constexpr auto operator<=>(this const auto &self, const decltype(self) &other) noexcept(
	  noexcept(self.value <=> other.value)) -> std::weak_ordering
	  requires _Config::comparable && requires { self.value <=> other.value; }
	{
		_check();
		return self.value <=> other.value;
	}
};

} // namespace V::box::_::mixin

#include <v/OFF>
