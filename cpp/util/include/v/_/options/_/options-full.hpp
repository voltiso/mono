#pragma once

#include "options-list.hpp"

#include "../option.hpp"

#include "v/is/instantiated-from-same"
#include "v/is/option"
#include "v/is/options"

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

// First `options::option::defaultOptions<Options<Inner...>>` in the pack (order = left-to-right).
template <typename... As> struct _ExtractDefaultOptionsForCanonical;

template <> struct _ExtractDefaultOptionsForCanonical<> {
	static constexpr bool found = false;
	using Defaults = void; // unused when `found` is false (`CanonicalForPack` static_asserts first)
};

template <typename... Inner, typename... Tail>
struct _ExtractDefaultOptionsForCanonical<
  options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Tail...> {
	static constexpr bool found = true;
	using Defaults = VOLTISO_NAMESPACE::Options<Inner...>;
};

template <typename Head, typename... Tail>
struct _ExtractDefaultOptionsForCanonical<Head, Tail...>
    : _ExtractDefaultOptionsForCanonical<Tail...> {};

template <typename List> struct _StripDefaultOptionsMetaFromList;

template <> struct _StripDefaultOptionsMetaFromList<TypeList<>> {
	using type = TypeList<>;
};

template <typename... Inner, typename... Tail>
struct _StripDefaultOptionsMetaFromList<
  TypeList<options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Tail...>> {
	using type = typename _StripDefaultOptionsMetaFromList<TypeList<Tail...>>::type;
};

template <typename Head, typename... Tail>
struct _StripDefaultOptionsMetaFromList<TypeList<Head, Tail...>> {
private:
	using Rest = typename _StripDefaultOptionsMetaFromList<TypeList<Tail...>>::type;

public:
	using type = Concat_t<TypeList<Head>, Rest>;
};

template <typename O> struct _OptionsArity;
template <typename... Bs> struct _OptionsArity<VOLTISO_NAMESPACE::Options<Bs...>> {
	static constexpr std::size_t value = sizeof...(Bs);
};

template <bool EmptyInner, typename Defaults, typename CurrentList> struct CanonicalImplDispatch;

template <typename... CurrentAs>
struct CanonicalImplDispatch<true, VOLTISO_NAMESPACE::Options<>, TypeList<CurrentAs...>> {
private:
	using _Stripped = typename _StripDefaultOptionsMetaFromList<TypeList<CurrentAs...>>::type;
	using _Meta = options::option::defaultOptions<VOLTISO_NAMESPACE::Options<>>;
	using _Final = Concat_t<_Stripped, TypeList<_Meta>>;

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
	using _StrippedList = typename _StripDefaultOptionsMetaFromList<TypeList<CurrentAs...>>::type;

	template <typename DefaultOpt, typename StrippedList> struct _PickFromStripped;
	template <typename DefaultOpt, typename... S>
	struct _PickFromStripped<DefaultOpt, TypeList<S...>> {
		using type = typename PickOrDefault<DefaultOpt, S...>::type;
	};

	template <typename DefaultOpt>
	using _Selected =
	  typename _PickFromStripped<DefaultOpt, _StrippedList>::type;

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

template <is::Options O> struct MaybeCanonicalForOptionsPack;

template <typename... As>
struct MaybeCanonicalForOptionsPack<VOLTISO_NAMESPACE::Options<As...>> {
	using type = typename MaybeCanonicalFromTypeList<TypeList<As...>>::type;
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
