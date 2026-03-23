#pragma once
#include <v/_/_>

#include "../config.hpp"

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor::_::mixin {

template <is::Options O> class Conversion {
	using _Config = Config<O>;
	using _Items = _Config::Items;

public:
	operator _Items &(this auto &self) noexcept { return self.items(); }
	operator _Items &&(this auto &&self) noexcept { return self.items(); }
	operator const _Items &(this const auto &self) noexcept { return self.items(); }
	operator const _Items &&(this const auto &&self) noexcept { return self.items(); }
};

} // namespace VOLTISO_NAMESPACE::tensor::_::mixin

#include <v/OFF>
