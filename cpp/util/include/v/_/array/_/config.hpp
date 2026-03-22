#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/handle"
#include "v/is/options"
#include "v/mixin/copy"
#include "v/raw-array"

#include <v/ON>
namespace V::array::_ {

template <is::Options O> class Config {
	using _Final = V::mixin::Crtp<O>::Final;

public:
	using Item = O::template Get<option::Item>;
	static constexpr auto numItems = O::template get<option::numItems>;
	static_assert(numItems > 0, "numItems must be greater than 0");

	static constexpr bool implicitCopy = O::template get<mixin::copy::option::implicitCopy>;

	static constexpr auto startingIndex = 0; // todo - nd-offsets instead?

	static_assert(!std::is_same_v<Item, void>, "Item type must be specified");
	static_assert(
	  !std::is_const_v<Item>, "const Item does not make sense, just use `const Array<Item, N>`");

	using Items = RawArray<Item, numItems>;
	// static constexpr auto _startingIndex = Options::template get<option::startingIndex>;

	template <class Value> using CustomHandle = Handle::WithBrand<_Final>::template WithValue<Value>;
	using Handle = CustomHandle<Size>;
	// CustomHandle<std::conditional_t<(_startingIndex < 0), std::make_signed<Size>, Size>>;
};

} // namespace V::array::_
#include <v/OFF>
