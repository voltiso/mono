#pragma once
#include <v/_/_>

#include "../config.hpp"

#include "v/is/options"
#include "v/memory/iterator"

#include <v/ON>

namespace V::tensor::_::mixin {

template <is::Options O> class Iteration {
	using _Config = Config<O>;
	using _Item = _Config::Item;

public:
	[[nodiscard]] INLINE constexpr auto begin(this auto &self) noexcept {
		return memory::Iterator<_Item>{self.items()};
	}

	[[nodiscard]] INLINE constexpr auto begin(this const auto &self) noexcept {
		return memory::Iterator<const _Item>{self.items()};
	}

	//

	[[nodiscard]] INLINE constexpr auto end(this auto &self) noexcept {
		return memory::Iterator<_Item>{self.items() + self.numItems()};
	}

	[[nodiscard]] INLINE constexpr auto end(this const auto &self) noexcept {
		return memory::Iterator<const _Item>{self.items() + self.numItems()};
	}
};

} // namespace V::tensor::_::mixin

#include <v/OFF>
