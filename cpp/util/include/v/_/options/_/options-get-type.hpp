#pragma once

#include "../option.hpp"
#include "options-common.hpp"

namespace VOLTISO_NAMESPACE::options::_ {

template <template <class...> class T> constexpr bool _is_default_options_type_option_v = false;
template <>
inline constexpr bool _is_default_options_type_option_v<options::option::defaultOptions> = true;

template <template <class...> class TypeOption, class Fallback, typename... Opts>
struct GetTypeImpl;

template <template <class...> class TypeOption, class Fallback>
struct GetTypeImpl<TypeOption, Fallback> {
	using type = Fallback;
};

template <template <class...> class TypeOption>
struct GetTypeImpl<TypeOption, options::_::MissingFallback> {
	static_assert(false, "Options::Get: option not present.");
};

// --- Search through `options::option::defaultOptions<>` (only meta Options knows about) ---

// `Get<options::option::defaultOptions>`: head is the meta (must beat generic `TypeOption<Us...>`).
template <class Fallback, typename... Inner, typename... Tail>
struct GetTypeImpl<
  options::option::defaultOptions, Fallback,
  options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Tail...> {
	using type = VOLTISO_NAMESPACE::Options<Inner...>;
};

template <template <class...> class TypeOption, class Fallback, typename... Inner, typename... Tail>
requires (!_is_default_options_type_option_v<TypeOption>)
struct GetTypeImpl<
  TypeOption, Fallback, options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>,
  Tail...> {
	using type = typename GetTypeImpl<TypeOption, Fallback, Tail..., Inner...>::type;
};

template <template <class...> class TypeOption, class Fallback, class... Us, typename... Tail>
requires (!_is_default_options_type_option_v<TypeOption>)
struct GetTypeImpl<TypeOption, Fallback, TypeOption<Us...>, Tail...> {
	using type = TypeOption<Us...>::Type_;
};

template <template <class...> class TypeOption, class Fallback, typename Head, typename... Tail>
struct GetTypeImpl<TypeOption, Fallback, Head, Tail...> {
	using type = typename GetTypeImpl<TypeOption, Fallback, Tail...>::type;
};

} // namespace VOLTISO_NAMESPACE::options::_
