#pragma once
#include <v/_/_>

#include "_/get-base.hpp"
#include "forward.hpp"
#include "null.hpp"
#include "options.hpp"

#include "v/get/hash"
#include "v/is/option"

#include <limits>
#include <ostream>
#include <type_traits>

#include <v/ON>

namespace VOLTISO_NAMESPACE::handle {

template <is::Option... Os> class Custom : public _::GetBase<Os...> {
	using Base = _::GetBase<Os...>;
	using Self = Custom;
	RELOCATABLE_BODY
	using typename Base::Config;

public:
	using Value = Config::Value;
	using Brand = Config::Brand;

public:
	Value value;

public:
	// ! ---------------------------------------------------------------------------------------------
	// ! Construct
	// ! ---------------------------------------------------------------------------------------------
	constexpr Custom() noexcept = default;

	consteval Custom(Null) noexcept {
		if constexpr (std::is_pointer_v<Value>) {
			value = nullptr;
		} else {
			value = std::numeric_limits<Value>::max();
		}
	}

	// from value
	explicit constexpr Custom(const Value &value) noexcept(noexcept(Value(value))) : value(value) {}

	// from other integral handle of same brand, same sign, <= size
	template <class Other>
	  requires(
	    is::instantiatedFrom<Other, Custom> && std::is_same_v<Brand, typename Other::Brand> &&
	    std::is_integral_v<Value> && std::is_integral_v<typename Other::Value> &&
	    std::is_signed_v<Value> == std::is_signed_v<typename Other::Value> &&
	    sizeof(Value) >= sizeof(typename Other::Value))
	constexpr Custom(const Other &other) noexcept(noexcept(Value(other.value)))
	    : value(other.value) {}

	// ! ---------------------------------------------------------------------------------------------

	explicit constexpr operator const Value &() const noexcept { return value; }

	// pointer upcast
	template <class Dst>
	  requires(std::is_convertible_v<Value, Dst *>)
	explicit constexpr operator Dst *() const noexcept {
		return value;
	}

	constexpr auto operator<=>(const Custom &other) const noexcept { return value <=> other.value; }
	constexpr bool operator==(const Custom &other) const noexcept { return value == other.value; }

	constexpr decltype(auto) hash() const noexcept(noexcept(get::hash(value))) {
		return get::hash(value);
	}

	explicit constexpr operator bool() const noexcept { return *this != null; }

	constexpr decltype(auto) operator*() const noexcept(noexcept(*value))
	  requires(std::is_pointer_v<Value> && !std::is_void_v<std::remove_pointer_t<Value>>)
	{
		return *value;
	}

	constexpr decltype(auto) operator->() const noexcept
	  requires(std::is_pointer_v<Value> && !std::is_void_v<std::remove_pointer_t<Value>>)
	{
		return value;
	}

public:
	template <is::Option... More> using With = Base::template With<More...>;
	template <class V> using WithValue = With<option::Value<V>>;
	template <class B> using WithBrand = With<option::Brand<B>>;
}; // class Custom

template <is::Options Options>
inline std::ostream &operator<<(std::ostream &os, const Custom<Options> &handle) {
	if (handle == handle::null) [[unlikely]] {
		return os << "Handle::null";
	}
	return os << "Handle(" << handle.value << ")";
} // operator<<

} // namespace VOLTISO_NAMESPACE::handle

#include <v/OFF>
