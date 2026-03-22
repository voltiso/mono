#pragma once

#include "../option.hpp"
#include "options-list.hpp"

#include "v/is/instantiated-from-same"

#include <type_traits>

namespace VOLTISO_NAMESPACE::options::_ {

// Pick first option matching `DefaultOpt`'s kind; at `defaultOptions<Options<Inner...>>` search
// Tail... before Inner... (explicit after meta wins).
template <typename DefaultOpt, typename... CurrentOpts> struct PickOrDefault;

template <typename DefaultOpt> struct PickOrDefault<DefaultOpt> {
	using type = DefaultOpt;
};

template <typename DefaultOpt, typename... Inner, typename... Tail>
struct PickOrDefault<
  DefaultOpt, options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Tail...> {
	using type = typename PickOrDefault<DefaultOpt, Tail..., Inner...>::type;
};

template <typename DefaultOpt, typename Head, typename... Tail>
struct PickOrDefault<DefaultOpt, Head, Tail...> {
	using type = std::conditional_t<
	  VOLTISO_NAMESPACE::is::InstantiatedFromSame<DefaultOpt, Head>, Head,
	  typename PickOrDefault<DefaultOpt, Tail...>::type>;
};

template <typename A, typename... Defaults>
struct _IsAcceptedByDefaults
    : std::bool_constant<(VOLTISO_NAMESPACE::is::InstantiatedFromSame<A, Defaults> || ...)> {};

template <typename... Inner, typename... Defaults>
struct _IsAcceptedByDefaults<
  options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Defaults...>
    : std::true_type {};

template <typename DefaultOpt, typename StrippedList> struct PickOrDefaultFromTypeList;

template <typename DefaultOpt, typename... S>
struct PickOrDefaultFromTypeList<DefaultOpt, TypeList<S...>> {
	using type = typename PickOrDefault<DefaultOpt, S...>::type;
};

} // namespace VOLTISO_NAMESPACE::options::_
