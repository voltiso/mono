#pragma once

#include "options-canonical.hpp"
#include "filter-out.hpp"

#include "v/is/instantiated-from-same"

#include <type_traits>

namespace VOLTISO_NAMESPACE::options::_ {

// --- With/WithIfMissing implementations ---

template <typename OptionToRemove>
struct _RemoveIfSameKindPredicate {
	template <typename Head>
	struct Apply
	    : std::bool_constant<VOLTISO_NAMESPACE::is::InstantiatedFromSame<OptionToRemove, Head>> {};
};

template <typename OptionToRemove, typename List>
using _RemoveKind_t =
  FilterOut_t<_RemoveIfSameKindPredicate<OptionToRemove>::template Apply, List>;

template <typename CurrentList, typename... NewOptions> struct _WithAdd;
template <typename CurrentList> struct _WithAdd<CurrentList> {
	using type = CurrentList;
};

template <typename CurrentList, typename HeadOption, typename... TailOptions>
struct _WithAdd<CurrentList, HeadOption, TailOptions...> {
	using Removed = _RemoveKind_t<HeadOption, CurrentList>;
	using Appended = typename Concat<Removed, TypeList<HeadOption>>::Result;
	using type = typename _WithAdd<Appended, TailOptions...>::type;
};

template <typename OptionToCheck, typename List> struct _ContainsKind;
template <typename OptionToCheck>
struct _ContainsKind<OptionToCheck, TypeList<>> : std::false_type {};

template <typename OptionToCheck, typename Head, typename... Tail>
struct _ContainsKind<OptionToCheck, TypeList<Head, Tail...>>
    : std::bool_constant<
        VOLTISO_NAMESPACE::is::InstantiatedFromSame<OptionToCheck, Head> ||
        _ContainsKind<OptionToCheck, TypeList<Tail...>>::value> {};

template <typename CurrentList, typename... DefaultOptions> struct _WithIfMissingAdd;
template <typename CurrentList>
struct _WithIfMissingAdd<CurrentList> {
	using type = CurrentList;
};

template <typename CurrentList, typename HeadDefault, typename... TailDefaults>
struct _WithIfMissingAdd<CurrentList, HeadDefault, TailDefaults...> {
private:
	using NextList = std::conditional_t<
	  _ContainsKind<HeadDefault, CurrentList>::value,
	  CurrentList,
	  typename Concat<CurrentList, TypeList<HeadDefault>>::Result>;

public:
	using type = typename _WithIfMissingAdd<NextList, TailDefaults...>::type;
};

template <typename CurrentList, typename MoreAsList> struct _WithFromArgsCanon;

template <typename... CurrentAs, typename... More>
struct _WithFromArgsCanon<TypeList<CurrentAs...>, TypeList<More...>> {
	using _Raw = typename _WithAdd<TypeList<CurrentAs...>, More...>::type;
	using type = typename MaybeCanonicalFromTypeList<_Raw>::type;
};

template <typename CurrentList, typename... Args> struct WithFromArgs;

template <typename... CurrentAs, typename... MoreOptions>
struct WithFromArgs<TypeList<CurrentAs...>, MoreOptions...>
    : _WithFromArgsCanon<TypeList<CurrentAs...>, TypeList<MoreOptions...>> {};

template <typename... CurrentAs, typename... OtherAs>
struct WithFromArgs<TypeList<CurrentAs...>, VOLTISO_NAMESPACE::Options<OtherAs...>>
    : _WithFromArgsCanon<TypeList<CurrentAs...>, TypeList<OtherAs...>> {};

template <typename CurrentList, typename DefaultsList> struct _WithIfMissingFromArgsCanon;

template <typename... CurrentAs, typename... Def>
struct _WithIfMissingFromArgsCanon<TypeList<CurrentAs...>, TypeList<Def...>> {
	using _Raw = typename _WithIfMissingAdd<TypeList<CurrentAs...>, Def...>::type;
	using type = typename MaybeCanonicalFromTypeList<_Raw>::type;
};

template <typename CurrentList, typename... Args> struct WithIfMissingFromArgs;

template <typename... CurrentAs, typename... DefaultOpts>
struct WithIfMissingFromArgs<TypeList<CurrentAs...>, DefaultOpts...>
    : _WithIfMissingFromArgsCanon<TypeList<CurrentAs...>, TypeList<DefaultOpts...>> {};

template <typename... CurrentAs, typename... OtherDefaultAs>
struct WithIfMissingFromArgs<TypeList<CurrentAs...>, VOLTISO_NAMESPACE::Options<OtherDefaultAs...>>
    : _WithIfMissingFromArgsCanon<TypeList<CurrentAs...>, TypeList<OtherDefaultAs...>> {};

} // namespace VOLTISO_NAMESPACE::options::_

