#pragma once
#include <v/_/_>

#include "../../option.hpp"

#include "v/_/mixin/crtp/crtp.hpp"
#include "v/is/options"

#include <memory>
#include <string>
#include <string_view>
#include <type_traits>

#include <v/ON>

namespace VOLTISO_NAMESPACE::tensor::_::mixin {

namespace _ {
/// std interop
template <is::Options O> class StdEnabled {
private:
	using _Final = V::mixin::Crtp<O>::Final;

public:
	// -------------------------------------------------------------------------
	// STL-shaped names (interop); canonical API is `numItems()` / `items()`.
	// -------------------------------------------------------------------------
	[[nodiscard]] constexpr auto size(this const auto &self) noexcept {
		static_assert(noexcept(self.numItems()));
		return self.numItems();
	}

	[[nodiscard]] constexpr bool empty(this const auto &self) noexcept { return self.size() == 0; }

	[[nodiscard]] constexpr auto data(this auto &self) noexcept {
		static_assert(noexcept(self.items()));
		return std::addressof(self.items()[0]);
	}

	[[nodiscard]] constexpr decltype(auto) front(this auto &self) noexcept {
		return (self.items()[0]);
	}

	[[nodiscard]] constexpr decltype(auto) back(this auto &self) noexcept {
		return (self.items()[self.numItems() - 1]);
	}

	[[nodiscard]] constexpr operator ::std::string_view(this const auto &self) noexcept
	  requires std::is_same_v<std::remove_const_t<typename _Final::Item>, char>
	{
		return {self.data(), static_cast<std::size_t>(self.size())};
	}

	// ⚠️ O(n) copy (explicit) ⚠️
	[[nodiscard]] explicit constexpr operator ::std::string(this const auto &self)
	  requires(std::is_same_v<std::remove_const_t<typename _Final::Item>, char>)
	{
		return {self.data(), static_cast<std::size_t>(self.size())};
	}
};

template <is::Options O, bool WithStd> class MaybeStd;
template <is::Options O> class MaybeStd<O, true> : public StdEnabled<O> {};
template <is::Options O> class MaybeStd<O, false> {};

} // namespace _

/// enable std interop if `mixin::array::option::std`
template <is::Options O> class Std : public _::MaybeStd<O, O::template get<option::std>> {};

} // namespace VOLTISO_NAMESPACE::tensor::_::mixin

#include <v/OFF>
