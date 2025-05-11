// Options.hpp
// Gemini 2.5-pro-experimental
#pragma once

#include "v/is/instantiated-from-same" // For kind checking in FilterOutKind

#include <cstddef>     // For size_t
#include <string_view> // For constexpr string comparison tie-breaker
#include <type_traits> // For std::conditional_t, std::is_same_v, std::enable_if_t

namespace VOLTISO_NAMESPACE {
// Forward declare Options - needed by OptionsFromTypeList
template <typename...> struct Options;
} // namespace VOLTISO_NAMESPACE

// Assume voltiso/_common includes necessary base definitions like
// voltiso::Option and that all option types define `static constexpr auto ORDER
// = ...;`

// --- Implementation Namespace ---
namespace VOLTISO_NAMESPACE::_ {

// --- Basic TypeList ---
template <typename...> struct TypeList {};

// --- Type Name Getter using Compiler Intrinsics (Non-Standard) ---
// Used for tie-breaking in sorting when ::ORDER values are equal.
template <typename T> struct TypeNameGetter {
	static constexpr std::string_view Get() {
#if defined(__clang__) || defined(__GNUC__)
		return __PRETTY_FUNCTION__;
#elif defined(_MSC_VER)
		return __FUNCSIG__;
#else
		// Warning: Tie-breaking might not be reliable on unsupported compilers.
		return "UnknownTypeName";
#endif
	}
};

// --- Comparison Metafunction (Uses ::ORDER and Tie-Breaker) ---
template <typename T1, typename T2> struct CompareLessWithTieBreaker {
private:
	static constexpr auto order1 = T1::ORDER; // Assumes T1::ORDER exists
	static constexpr auto order2 = T2::ORDER; // Assumes T2::ORDER exists
	static constexpr std::string_view name1 = TypeNameGetter<T1>::Get();
	static constexpr std::string_view name2 = TypeNameGetter<T2>::Get();

public:
	static constexpr bool value =
	  (order1 < order2) || ((order1 == order2) && (name1 < name2));
};

// --- Concatenate TypeLists ---
template <typename List1, typename List2> struct Concat;
template <typename... Ts1, typename... Ts2>
struct Concat<TypeList<Ts1...>, TypeList<Ts2...>> {
	using Result = TypeList<Ts1..., Ts2...>;
};
template <typename List1, typename List2>
using Concat_t = typename Concat<List1, List2>::Result;

// --- Merge Sort Implementation ---
template <
  typename List1, typename List2, template <typename, typename> class Compare>
struct Merge;
template <template <typename, typename> class Compare>
struct Merge<TypeList<>, TypeList<>, Compare> {
	using Result = TypeList<>;
};
template <typename... Ts2, template <typename, typename> class Compare>
struct Merge<TypeList<>, TypeList<Ts2...>, Compare> {
	using Result = TypeList<Ts2...>;
};
template <typename... Ts1, template <typename, typename> class Compare>
struct Merge<TypeList<Ts1...>, TypeList<>, Compare> {
	using Result = TypeList<Ts1...>;
};
template <
  typename H1, typename... T1, typename H2, typename... T2,
  template <typename, typename> class Compare>
struct Merge<TypeList<H1, T1...>, TypeList<H2, T2...>, Compare> {
private:
	static constexpr bool H1_is_less_or_equal = !Compare<H2, H1>::value;
	using FirstElement = typename std::conditional_t<H1_is_less_or_equal, H1, H2>;
	using RemainingList1 = typename std::conditional_t<
	  H1_is_less_or_equal, TypeList<T1...>, TypeList<H1, T1...>>;
	using RemainingList2 = typename std::conditional_t<
	  H1_is_less_or_equal, TypeList<H2, T2...>, TypeList<T2...>>;
	using MergedTail =
	  typename Merge<RemainingList1, RemainingList2, Compare>::Result;
	template <typename H, typename List> struct PrependT;
	template <typename H, typename... Ts> struct PrependT<H, TypeList<Ts...>> {
		using Result = TypeList<H, Ts...>;
	};

public:
	using Result = typename PrependT<FirstElement, MergedTail>::Result;
};

// --- Split Implementation ---
template <size_t N, typename List, typename Acc = TypeList<>, typename = void>
struct SplitN;
template <size_t N, typename H, typename... T, typename... Acc>
struct SplitN<N, TypeList<H, T...>, TypeList<Acc...>, std::enable_if_t<(N > 0)>>
    : SplitN<N - 1, TypeList<T...>, TypeList<Acc..., H>> {};
template <typename... T, typename... Acc>
struct SplitN<0, TypeList<T...>, TypeList<Acc...>, void> {
	using FirstHalf = TypeList<Acc...>;
	using SecondHalf = TypeList<T...>;
};
template <typename List> struct Split;
template <typename... Ts> struct Split<TypeList<Ts...>> {
private:
	static constexpr size_t N = sizeof...(Ts) / 2;
	using SplitResult = SplitN<N, TypeList<Ts...>>;

public:
	using FirstHalf = typename SplitResult::FirstHalf;
	using SecondHalf = typename SplitResult::SecondHalf;
};

// --- Sort Implementation ---
template <typename List, template <typename, typename> class Compare>
struct Sort;
template <template <typename, typename> class Compare>
struct Sort<TypeList<>, Compare> {
	using Result = TypeList<>;
};
template <typename T, template <typename, typename> class Compare>
struct Sort<TypeList<T>, Compare> {
	using Result = TypeList<T>;
};
template <
  typename T1, typename T2, typename... Rest,
  template <typename, typename> class Compare>
struct Sort<TypeList<T1, T2, Rest...>, Compare> {
private:
	using Splitter = Split<TypeList<T1, T2, Rest...>>;
	using SortedFirstHalf =
	  typename Sort<typename Splitter::FirstHalf, Compare>::Result;
	using SortedSecondHalf =
	  typename Sort<typename Splitter::SecondHalf, Compare>::Result;

public:
	using Result =
	  typename Merge<SortedFirstHalf, SortedSecondHalf, Compare>::Result;
};

// !

// --- FilterOutKind Helper (for Options::With) ---
template <typename OptionToFilterKindFor, typename ListToFilter>
struct FilterOutKind;
template <typename OptionToFilterKindFor>
struct FilterOutKind<OptionToFilterKindFor, TypeList<>> {
	using Result = TypeList<>;
};
template <typename OptionToFilterKindFor, typename Head, typename... Tail>
struct FilterOutKind<OptionToFilterKindFor, TypeList<Head, Tail...>> {
private:
	using FilteredTail =
	  typename FilterOutKind<OptionToFilterKindFor, TypeList<Tail...>>::Result;
	static constexpr bool is_same_kind =
	  is::InstantiatedFromSame<OptionToFilterKindFor, Head>;

public:
	using Result = typename std::conditional_t<
	  is_same_kind, FilteredTail, Concat_t<TypeList<Head>, FilteredTail>>;
};
template <typename OptionToFilterKindFor, typename ListToFilter>
using FilterOutKind_t =
  typename FilterOutKind<OptionToFilterKindFor, ListToFilter>::Result;

// --- Trait to check if two template template parameters refer to the same
// template name ---
template <template <class...> class T1, template <class...> class T2>
struct is_same_template_name : std::false_type {};
template <template <class...> class T>
struct is_same_template_name<T, T> : std::true_type {};

// !

// --- Predicate: IsOptionEqualToItsDefault ---
// Determines if an OptionInstance is set to its own default value.
// Assumes OptionInstance is one of TypeOption<Current, Default>,
// ValueOption<Current, Default>, TemplateOption<Current, Default>

// Concept to check for TypeOption-like members
template <typename T>
concept HasTypeOptionSignature = requires {
	typename T::StoredType;    // Checks for nested type 'StoredType'
	typename T::StoredDefault; // Checks for nested type 'StoredDefault'
};

// Concept to check for ValueOption-like members
template <typename T>
concept HasValueOptionSignature = requires {
	// Check if static members T::VALUE and T::DEFAULT exist and are comparable
	// This also implies they have compatible types for comparison.
	{ T::VALUE == T::DEFAULT } -> std::same_as<bool>;
};
template <typename OptionInstance>
inline constexpr bool IsOptionEqualToItsDefault_v = [] {
	if constexpr (HasTypeOptionSignature<OptionInstance>) {
		return std::is_same_v<
		  typename OptionInstance::StoredType,
		  typename OptionInstance::StoredDefault>;
	} else if constexpr (HasValueOptionSignature<OptionInstance>) {
		return (OptionInstance::VALUE == OptionInstance::DEFAULT);
	} else {
		// For now, if it doesn't match known signatures, consider it not default.
		// TemplateOptions are explicitly ignored for now as per your request.
		return false;
	}
}();

// !

// --- Helper: StripRedundantDefaultsInternal ---
// Removes options from a list if they are equal to their default values.
template <typename InputList> struct StripRedundantDefaultsInternal;

template <> // Base case: empty list
struct StripRedundantDefaultsInternal<TypeList<>> {
	using Result = TypeList<>;
};

template <typename HeadOption, typename... TailOptions> // Recursive step
struct StripRedundantDefaultsInternal<TypeList<HeadOption, TailOptions...>> {
private:
	using ProcessedTail =
	  typename StripRedundantDefaultsInternal<TypeList<TailOptions...>>::Result;
	static constexpr bool is_default = IsOptionEqualToItsDefault_v<HeadOption>;

public:
	using Result = typename std::conditional_t<
	  is_default,
	  ProcessedTail, // Discard HeadOption if it's default
	  Concat_t<TypeList<HeadOption>, ProcessedTail> // Keep HeadOption otherwise
	  >;
};
template <typename InputList>
using StripRedundantDefaultsInternal_t =
  typename StripRedundantDefaultsInternal<InputList>::Result;

// --- Helper: OptionsFromTypeList ---
template <typename TL> struct OptionsFromTypeList;
template <template <typename...> class TL, typename... FinalAs>
struct OptionsFromTypeList<TL<FinalAs...>> {
	using Type = VOLTISO_NAMESPACE::Options<FinalAs...>;
};

// --- Internal Helper for Options::With ---
template <typename CurrentSortedList, typename OptionsToAddList>
struct WithInternal;
template <typename CurrentSortedList>
struct WithInternal<CurrentSortedList, TypeList<>> { // Base case for With
	using ResultList =
	  StripRedundantDefaultsInternal_t<CurrentSortedList>; // Strip at the end
};
template <typename CurrentSortedList, typename NewOption, typename... RestToAdd>
struct WithInternal<
  CurrentSortedList,
  TypeList<NewOption, RestToAdd...>> { // Recursive step for With
private:
	using FilteredList = FilterOutKind_t<NewOption, CurrentSortedList>;
	using AppendedList = Concat_t<FilteredList, TypeList<NewOption>>;
	using NewSortedList =
	  typename Sort<AppendedList, CompareLessWithTieBreaker>::Result;

public:
	using ResultList =
	  typename WithInternal<NewSortedList, TypeList<RestToAdd...>>::ResultList;
};

// --- Internal Helper for Options::WithDefault ---
template <typename OptionToLookFor, typename ListToSearch>
struct CheckIfKindExists;
template <typename OptionToLookFor>
struct CheckIfKindExists<OptionToLookFor, TypeList<>> : std::false_type {};
template <
  typename OptionToLookFor, typename HeadOption, typename... TailOptions>
struct CheckIfKindExists<OptionToLookFor, TypeList<HeadOption, TailOptions...>>
    : std::conditional_t<
        is::InstantiatedFromSame<OptionToLookFor, HeadOption>, std::true_type,
        CheckIfKindExists<OptionToLookFor, TypeList<TailOptions...>>> {};

template <
  typename CurrentSortedListAsTypeList, typename DefaultOptionsToAddAsTypeList>
struct WithDefaultInternal;
template <typename CurrentSortedListAsTypeList>
struct WithDefaultInternal<
  CurrentSortedListAsTypeList, TypeList<>> { // Base case for WithDefault
	using ResultList =
	  StripRedundantDefaultsInternal_t<CurrentSortedListAsTypeList>; // Strip at
	                                                                 // the end
};
template <
  typename CurrentSortedListAsTypeList, typename HeadDefaultOption,
  typename... RestOfDefaultOptions>
struct WithDefaultInternal<
  CurrentSortedListAsTypeList,
  TypeList<HeadDefaultOption, RestOfDefaultOptions...>> { // Recursive step for
	                                                        // WithDefault
private:
	static constexpr bool kind_exists =
	  CheckIfKindExists<HeadDefaultOption, CurrentSortedListAsTypeList>::value;
	static constexpr bool head_is_its_own_default =
	  IsOptionEqualToItsDefault_v<HeadDefaultOption>;

	using ListAfterProcessingHead = typename std::conditional_t<
	  kind_exists || head_is_its_own_default, CurrentSortedListAsTypeList,
	  typename Sort<
	    Concat_t<CurrentSortedListAsTypeList, TypeList<HeadDefaultOption>>,
	    CompareLessWithTieBreaker>::Result>;

public:
	using ResultList = typename WithDefaultInternal<
	  ListAfterProcessingHead, TypeList<RestOfDefaultOptions...>>::ResultList;
};

// !

// --- Internal Helper for Options::With Overloading ---

// Primary template declaration (can be left undefined or provide a base case if
// needed)
template <typename CurrentOptionsListAsTypeList, typename... Args>
struct WithHelper;

// Specialization 1: Handles the parameter pack case (Args... is MoreOptions...)
template <typename... CurrentAs, typename... MoreOptions>
struct WithHelper<TypeList<CurrentAs...>, MoreOptions...> {
	// Delegate directly to WithInternal using the current options and the new
	// options pack
	using ResultList = typename WithInternal<
	  TypeList<CurrentAs...>,
	  TypeList<MoreOptions...> // The options to add/replace
	  >::ResultList;
	// Note: WithInternal already handles sorting and stripping defaults at the
	// end.
};

// Specialization 2: Handles the single Options<> argument case
template <
  typename... CurrentAs,
  typename... OtherAs> // Matches a single argument of type Options<OtherAs...>
struct WithHelper<TypeList<CurrentAs...>, Options<OtherAs...>> {
	// Delegate to WithInternal, combining the current options with the options
	// from the input Options<> type
	using ResultList = typename WithInternal<
	  TypeList<CurrentAs...>,
	  TypeList<OtherAs...> // Extract the pack from the input Options<>
	  >::ResultList;
	// Note: WithInternal already handles sorting and stripping defaults at the
	// end.
};

// !

// --- Internal Helper for Options::WithDefault Overloading ---

// Primary template declaration
template <typename CurrentOptionsListAsTypeList, typename... Args>
struct WithDefaultHelper;

// Specialization 1: Handles the parameter pack case (Args... is
// DefaultOptions...)
template <typename... CurrentAs, typename... DefaultOptions>
struct WithDefaultHelper<TypeList<CurrentAs...>, DefaultOptions...> {
	// Delegate directly to WithDefaultInternal using the current options and the
	// new default options pack
	using ResultList = typename WithDefaultInternal<
	  TypeList<CurrentAs...>,
	  TypeList<DefaultOptions...> // The default options to potentially add
	  >::ResultList;
	// Note: WithDefaultInternal handles checking existence, adding if missing &
	// not default, and stripping defaults at the end.
};

// Specialization 2: Handles the single Options<> argument case
template <
  typename... CurrentAs,
  typename... OtherDefaultOptions> // Matches a single argument of type
                                   // Options<OtherDefaultOptions...>
struct WithDefaultHelper<
  TypeList<CurrentAs...>, Options<OtherDefaultOptions...>> {
	// Delegate to WithDefaultInternal, combining the current options with the
	// options from the input Options<> type
	using ResultList = typename WithDefaultInternal<
	  TypeList<CurrentAs...>,
	  TypeList<OtherDefaultOptions...> // Extract the pack from the input
	                                   // Options<>
	  >::ResultList;
	// Note: WithDefaultInternal handles checking existence, adding if missing &
	// not default, and stripping defaults at the end.
};

} // namespace VOLTISO_NAMESPACE::_
