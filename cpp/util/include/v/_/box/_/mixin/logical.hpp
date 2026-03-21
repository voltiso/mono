#pragma once
#include <v/_/_>

#include "../config.hpp"

#include "v/is/options"

#include <v/ON>

namespace V::box::_::mixin {

template <is::Options O> class Logical {
	using _Config = Config<O>;

	static consteval void _check() noexcept {
		static_assert(std::is_base_of_v<Logical, typename V::mixin::Crtp<O>::Final>);
	}

	template <class T> static constexpr decltype(auto) _get_val(T &&x) noexcept {
		using X = std::remove_cvref_t<T>;
		if constexpr (std::is_base_of_v<Logical, X>) {
			return std::forward<T>(x).value;
		} else {
			return std::forward<T>(x);
		}
	}

public:
	constexpr auto operator!(this auto &&self) noexcept(noexcept(!self.value))
	  -> decltype(!self.value)
	  requires _Config::logical && requires { !self.value; }
	{
		_check();
		return !self.value;
	}

#define V_BOX_MIXIN_LOGICAL_OP(OP)                                                                 \
	template <class Lhs, class Rhs>                                                                  \
	friend constexpr auto operator OP(Lhs &&lhs, Rhs &&rhs)                                          \
	  ->decltype(auto)                                                                               \
	  requires _Config::logical &&                                                                   \
	           (std::is_base_of_v<Logical, std::remove_cvref_t<Lhs>> ||                              \
	            std::is_base_of_v<Logical, std::remove_cvref_t<Rhs>>) &&                             \
	           (std::is_same_v<std::remove_cvref_t<Lhs>, std::remove_cvref_t<Rhs>> ||                \
	            !std::is_base_of_v<Logical, std::remove_cvref_t<Lhs>> ||                             \
	            !std::is_base_of_v<Logical, std::remove_cvref_t<Rhs>>) &&                            \
	           requires { _get_val(std::forward<Lhs>(lhs)) OP _get_val(std::forward<Rhs>(rhs)); }    \
	{                                                                                                \
		_check();                                                                                      \
		return _get_val(std::forward<Lhs>(lhs)) OP _get_val(std::forward<Rhs>(rhs));                   \
	}

	V_BOX_MIXIN_LOGICAL_OP(&&)
	V_BOX_MIXIN_LOGICAL_OP(||)

#undef V_BOX_MIXIN_LOGICAL_OP
};

} // namespace V::box::_::mixin

#include <v/OFF>
