#pragma once

#include "../option.hpp"

#include <type_traits>

namespace VOLTISO_NAMESPACE::options::_ {

template <template <auto...> class ValueOption, typename... Opts> struct GetValueImpl;

template <template <auto...> class ValueOption> struct GetValueImpl<ValueOption> {
	template <template <auto> class> struct _AlwaysFalse : std::false_type {};

	static_assert(
	  _AlwaysFalse<ValueOption>::value, "Options::get: required value option kind not present.");

	static constexpr auto value = 0;
};

template <template <auto...> class ValueOption, typename... Inner, typename... Tail>
struct GetValueImpl<
  ValueOption, options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Tail...> {
	static constexpr auto value = GetValueImpl<ValueOption, Tail..., Inner...>::value;
};

template <template <auto...> class ValueOption, auto... V, typename... Tail>
struct GetValueImpl<ValueOption, ValueOption<V...>, Tail...> {
	static constexpr auto value = ValueOption<V...>::value;
};

template <template <auto...> class ValueOption, typename Head, typename... Tail>
struct GetValueImpl<ValueOption, Head, Tail...> {
	static constexpr auto value = GetValueImpl<ValueOption, Tail...>::value;
};

} // namespace VOLTISO_NAMESPACE::options::_
