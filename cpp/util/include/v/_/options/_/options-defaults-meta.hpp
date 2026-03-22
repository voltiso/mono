#pragma once

#include "options-list.hpp"

#include "../option.hpp"

namespace VOLTISO_NAMESPACE::options::_ {

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

} // namespace VOLTISO_NAMESPACE::options::_
