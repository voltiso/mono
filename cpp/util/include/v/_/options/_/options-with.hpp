#pragma once

#include "options-full.hpp"
#include "options-list.hpp"

#include "v/is/instantiated-from-same"

#include <type_traits>

namespace VOLTISO_NAMESPACE::options::_ {

// --- With/WithIfMissing implementations ---

template <typename OptionToRemove, typename List> struct _RemoveKind;

template <typename OptionToRemove>
struct _RemoveKind<OptionToRemove, TypeList<>> {
	using type = TypeList<>;
};

template <typename OptionToRemove, typename Head, typename... Tail>
struct _RemoveKind<OptionToRemove, TypeList<Head, Tail...>> {
private:
	using FilteredTail = typename _RemoveKind<OptionToRemove, TypeList<Tail...>>::type;

public:
	using type = std::conditional_t<
	  VOLTISO_NAMESPACE::is::InstantiatedFromSame<OptionToRemove, Head>,
	  FilteredTail,
	  typename Concat<TypeList<Head>, FilteredTail>::Result>;
};

template <typename CurrentList, typename... NewOptions> struct _WithAdd;
template <typename CurrentList> struct _WithAdd<CurrentList> {
	using type = CurrentList;
};

template <typename CurrentList, typename HeadOption, typename... TailOptions>
struct _WithAdd<CurrentList, HeadOption, TailOptions...> {
	using Removed = typename _RemoveKind<HeadOption, CurrentList>::type;
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

template <typename CurrentList, typename... Args> struct WithFromArgs;
template <typename... CurrentAs, typename... MoreOptions>
struct WithFromArgs<TypeList<CurrentAs...>, MoreOptions...> {
	using _Raw = typename _WithAdd<TypeList<CurrentAs...>, MoreOptions...>::type;
	using type = typename MaybeCanonicalFromTypeList<_Raw>::type;
};

template <typename... CurrentAs, typename... OtherAs>
struct WithFromArgs<TypeList<CurrentAs...>, VOLTISO_NAMESPACE::Options<OtherAs...>> {
	using _Raw = typename _WithAdd<TypeList<CurrentAs...>, OtherAs...>::type;
	using type = typename MaybeCanonicalFromTypeList<_Raw>::type;
};

template <typename CurrentList, typename... Args> struct WithIfMissingFromArgs;
template <typename... CurrentAs, typename... DefaultOpts>
struct WithIfMissingFromArgs<TypeList<CurrentAs...>, DefaultOpts...> {
	using _Raw = typename _WithIfMissingAdd<TypeList<CurrentAs...>, DefaultOpts...>::type;
	using type = typename MaybeCanonicalFromTypeList<_Raw>::type;
};

template <typename... CurrentAs, typename... OtherDefaultAs>
struct WithIfMissingFromArgs<TypeList<CurrentAs...>, VOLTISO_NAMESPACE::Options<OtherDefaultAs...>> {
	using _Raw =
	  typename _WithIfMissingAdd<TypeList<CurrentAs...>, OtherDefaultAs...>::type;
	using type = typename MaybeCanonicalFromTypeList<_Raw>::type;
};

} // namespace VOLTISO_NAMESPACE::options::_

