#pragma once

#include <v/_/_>

#include "_/filter-out.hpp"
#include "_/options-common.hpp"
#include "_/options-get-template.hpp"
#include "_/options-get-type.hpp"
#include "_/options-get-value.hpp"
#include "_/options-list.hpp"
#include "_/options-with.hpp"

#include "v/is/option"
#include "v/is/option-tag"

#include <v/ON>

namespace V {

template <is::Option... As> struct Options {
	static_assert(
	  options::_::pack_is_canonical_options_v<As...>(),
	  "Options<...> must be canonical; use GetOptions<...>.");

public:
	// --- Get Type option (fail if missing unless fallback provided) ---
	template <template <class...> class TypeOption, class Fallback = options::_::MissingFallback>
	using Get = typename options::_::GetTypeImpl<TypeOption, Fallback, As...>::type;

	// --- Get Value option (fail if missing; searches `defaultOptions<>` meta payload) ---
	template <template <auto...> class ValueOption>
	static constexpr auto get = options::_::GetValueImpl<ValueOption, As...>::value;

	// --- Get Template option ---
	template <template <template <class...> class> class TemplateOption, class... Args>
	using GetTemplate =
	  typename options::_::GetTemplateImpl<TemplateOption, Args...>::template _WithOpts<As...>::type;

	// --- With: override existing kinds (no sorting, ORDER-free) ---
	template <is::Option... Os>
	using With = typename options::_::WithFromArgs<options::_::TypeList<As...>, Os...>::type;

	// --- WithIfMissing: ignore existing kinds, add only missing ones ---
	template <is::Option... Os>
	using WithIfMissing =
	  typename options::_::WithIfMissingFromArgs<options::_::TypeList<As...>, Os...>::type;

	// --- Without: remove options whose `option_tag` matches any of the given `Option::Tag` types ---
	template <is::OptionTag... OptionTags>
	using Without = typename options::_::MaybeCanonicalFromTypeList<options::_::FilterOut_t<
	  options::_::IsOptionTagAnyOfPredicate<OptionTags...>::template Apply,
	  options::_::TypeList<As...>>>::type;
};

// !

template <is::Option... As>
using GetOptions =
  typename options::_::MaybeCanonicalFromTypeList<options::_::TypeList<As...>>::type;

} // namespace V

#include <v/OFF>
