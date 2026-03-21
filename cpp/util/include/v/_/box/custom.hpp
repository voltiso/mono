#pragma once
#include <v/_/_>

#include "_/get-base.hpp"
#include "forward.hpp"
#include "options.hpp"

#include "v/is/option"

#include <v/ON>
namespace V::box {

//

template <is::Option... Os> class Custom : public _::GetBase<Os...> {
	using Base = _::GetBase<Os...>;
	using typename Base::Config;
	using Item = Config::Item;

public:
	Item value;

	constexpr Custom() = default;
	constexpr Custom(const Item &value) : value(value) {}
	constexpr Custom(Item &&value) : value(std::move(value)) {}

	explicit(!Config::implicit) constexpr operator Item &() { return value; }
	explicit(!Config::implicit) constexpr operator const Item &() const { return value; }

	constexpr bool operator==(this const auto &self, const decltype(self) &other) {
		return self.value == other.value;
	}

	constexpr bool operator==(this const auto &self, const Item &other) {
		return self.value == other;
	}

public:
	template <is::Option... More> using With = Base::template With<More...>;
	using Comparable = With<option::comparable<true>>;
	using Arithmetic = With<option::arithmetic<true>>;
	using Bitwise = With<option::bitwise<true>>;
	using Logical = With<option::logical<true>>;
	using Implicit = With<option::implicit<true>>;
};

//

} // namespace V::box
#include <v/OFF>
