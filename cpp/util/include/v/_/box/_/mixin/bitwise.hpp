#pragma once
#include <v/_/_>

#include "../config.hpp"

#include "v/trait/copy-cvref"

#include <v/ON>

namespace V::box::_::mixin {

template <is::Options O> class Bitwise {
	using _Config = Config<O>;

	static consteval void _check() noexcept {
		static_assert(std::is_base_of_v<Bitwise, typename V::mixin::Crtp<O>::Final>);
	}

	template <class T> static constexpr decltype(auto) _get_val(T &&x) noexcept {
		using X = std::remove_cvref_t<T>;
		if constexpr (std::is_base_of_v<Bitwise, X>) {
			return std::forward<T>(x).value;
		} else {
			return std::forward<T>(x);
		}
	}

	template <class Lhs, class Rhs>
	using _ResultBox = std::conditional_t<
	  std::is_base_of_v<Bitwise, std::remove_cvref_t<Lhs>>, std::remove_cvref_t<Lhs>,
	  std::remove_cvref_t<Rhs>>;

public:
	constexpr auto operator~(this auto &&self) noexcept(noexcept(~self.value))
	  -> std::remove_cvref_t<decltype(self)>
	  requires _Config::bitwise && requires { ~self.value; }
	{
		_check();
		return std::remove_cvref_t<decltype(self)>{~self.value};
	}

#define V_BOX_MIXIN_BITWISE_OP(OP_ASSIGN, OP)                                                      \
	template <class Other>                                                                           \
	constexpr auto operator OP_ASSIGN(this auto &self, Other &&other) noexcept(                      \
	  noexcept(self.value OP_ASSIGN static_cast<trait::copyCvref<Other &&, typename _Config::Item>>( \
	    std::forward<Other>(other))))                                                                \
	  ->decltype(self)                                                                               \
	  requires _Config::bitwise &&                                                                   \
	           (!std::is_base_of_v<Bitwise, std::remove_cvref_t<Other>> ||                           \
	            std::is_same_v<std::remove_cvref_t<decltype(self)>, std::remove_cvref_t<Other>>) &&  \
	           requires {                                                                            \
		           self                                                                                \
		             .value OP_ASSIGN static_cast<trait::copyCvref<Other &&, typename _Config::Item>>( \
		               std::forward<Other>(other));                                                    \
	           }                                                                                     \
	{                                                                                                \
		_check();                                                                                      \
		self.value OP_ASSIGN static_cast<trait::copyCvref<Other &&, typename _Config::Item>>(          \
		  std::forward<Other>(other));                                                                 \
		return self;                                                                                   \
	}                                                                                                \
                                                                                                   \
	template <class Lhs, class Rhs>                                                                  \
	friend constexpr auto operator OP(Lhs &&lhs, Rhs &&rhs)                                          \
	  ->decltype(auto)                                                                               \
	  requires _Config::bitwise &&                                                                   \
	           (std::is_base_of_v<Bitwise, std::remove_cvref_t<Lhs>> ||                              \
	            std::is_base_of_v<Bitwise, std::remove_cvref_t<Rhs>>) &&                             \
	           (std::is_same_v<std::remove_cvref_t<Lhs>, std::remove_cvref_t<Rhs>> ||                \
	            !std::is_base_of_v<Bitwise, std::remove_cvref_t<Lhs>> ||                             \
	            !std::is_base_of_v<Bitwise, std::remove_cvref_t<Rhs>>) &&                            \
	           requires {                                                                            \
		           _ResultBox<Lhs, Rhs>{_get_val(std::forward<Lhs>(lhs))                               \
		                                  OP _get_val(std::forward<Rhs>(rhs))};                        \
	           }                                                                                     \
	{                                                                                                \
		_check();                                                                                      \
		return _ResultBox<Lhs, Rhs>{_get_val(std::forward<Lhs>(lhs))                                   \
		                              OP _get_val(std::forward<Rhs>(rhs))};                            \
	}

	V_BOX_MIXIN_BITWISE_OP(&=, &)
	V_BOX_MIXIN_BITWISE_OP(|=, |)
	V_BOX_MIXIN_BITWISE_OP(^=, ^)
	V_BOX_MIXIN_BITWISE_OP(<<=, <<)
	V_BOX_MIXIN_BITWISE_OP(>>=, >>)

#undef V_BOX_MIXIN_BITWISE_OP
};

} // namespace V::box::_::mixin

#include <v/OFF>
