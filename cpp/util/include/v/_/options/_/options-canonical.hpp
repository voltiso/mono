#pragma once

#include "options-defaults-meta.hpp"
#include "options-pick-or-default.hpp"

#include "v/is/option"

#include <type_traits>

namespace VOLTISO_NAMESPACE::options::_ {

template <typename... CurrentAs>
using _StrippedListForCanonical =
  typename _StripDefaultOptionsMetaFromList<TypeList<CurrentAs...>>::type;

template <bool EmptyInner, typename Defaults, typename CurrentList> struct CanonicalImplDispatch;

template <typename... CurrentAs>
struct CanonicalImplDispatch<true, VOLTISO_NAMESPACE::Options<>, TypeList<CurrentAs...>> {
private:
	using _Meta = options::option::defaultOptions<VOLTISO_NAMESPACE::Options<>>;
	using _Final = Concat_t<_StrippedListForCanonical<CurrentAs...>, TypeList<_Meta>>;

public:
	using type = typename OptionsFromTypeList<_Final>::Type;
};

template <typename... DefaultAs, typename... CurrentAs>
struct CanonicalImplDispatch<false, VOLTISO_NAMESPACE::Options<DefaultAs...>, TypeList<CurrentAs...>> {
	template <typename CurrentOpt>
	static constexpr bool _AcceptedOne = _IsAcceptedByDefaults<CurrentOpt, DefaultAs...>::value;

	static constexpr bool _Accepted = (_AcceptedOne<CurrentAs> && ...);

	static_assert(
	  _Accepted,
	  "Options::With / Options::WithIfMissing: provided option kind(s) are not present in "
	  "defaultOptions");

private:
	using _StrippedList = _StrippedListForCanonical<CurrentAs...>;

	template <typename DefaultOpt>
	using _Selected =
	  typename PickOrDefaultFromTypeList<DefaultOpt, _StrippedList>::type;

	template <typename DefaultOpt>
	using _KeptList = std::conditional_t<
	  std::is_same_v<_Selected<DefaultOpt>, DefaultOpt>, TypeList<>, TypeList<_Selected<DefaultOpt>>>;

	template <typename AccList, typename... RemainingLists> struct _FoldConcat;
	template <typename AccList> struct _FoldConcat<AccList> {
		using type = AccList;
	};
	template <typename AccList, typename LHead, typename... LTail>
	struct _FoldConcat<AccList, LHead, LTail...> {
		using type = typename _FoldConcat<typename Concat<AccList, LHead>::Result, LTail...>::type;
	};

	using Kept = typename _FoldConcat<TypeList<>, _KeptList<DefaultAs>...>::type;
	using _Meta = options::option::defaultOptions<VOLTISO_NAMESPACE::Options<DefaultAs...>>;
	using _Final = Concat_t<Kept, TypeList<_Meta>>;

public:
	using type = typename OptionsFromTypeList<_Final>::Type;
};

template <typename... CurrentAs> struct CanonicalForPack {
private:
	using _Ext = _ExtractDefaultOptionsForCanonical<CurrentAs...>;
	static_assert(
	  _Ext::found,
	  "Options::With / Options::WithIfMissing: pack must contain "
	  "options::option::defaultOptions<Options<...>> when canonicalizing.");

public:
	using type = typename CanonicalImplDispatch<
	  (_OptionsArity<typename _Ext::Defaults>::value == 0), typename _Ext::Defaults,
	  TypeList<CurrentAs...>>::type;
};

template <bool HasDefaultsMeta, typename... As> struct _MaybeCanonicalPack;

template <typename... As> struct _MaybeCanonicalPack<false, As...> {
	using type = typename OptionsFromTypeList<TypeList<As...>>::Type;
};

template <typename... As> struct _MaybeCanonicalPack<true, As...> {
	using type = typename CanonicalForPack<As...>::type;
};

template <typename List> struct MaybeCanonicalFromTypeList;

template <typename... As>
struct MaybeCanonicalFromTypeList<TypeList<As...>> {
	using type = typename _MaybeCanonicalPack<_ExtractDefaultOptionsForCanonical<As...>::found, As...>::
	  type;
};

template <is::Option... As>
consteval bool pack_is_canonical_options_v() {
	using _Ext = _ExtractDefaultOptionsForCanonical<As...>;
	if constexpr (!_Ext::found)
		return true;
	else {
		constexpr bool empty_inner = (_OptionsArity<typename _Ext::Defaults>::value == 0);
		using Canon = typename CanonicalImplDispatch<
		  empty_inner, typename _Ext::Defaults, TypeList<As...>>::type;
		return std::is_same_v<VOLTISO_NAMESPACE::Options<As...>, Canon>;
	}
}

} // namespace VOLTISO_NAMESPACE::options::_
