// gemini 2.5 pro experimental
#pragma once

#include "v/_/Options.hpp"
#include "v/get/Options"

#include <concepts>    // For std::same_as
#include <type_traits> // For std::bool_constant, std::conditional_t, std::void_t

namespace VOLTISO_NAMESPACE::_ {

// --- Concept to check if a type is a Brand Option ---
template <typename T>
concept IsBrandOption = requires {
	{ T::IS_BRAND } -> std::same_as<const bool &>;
	requires T::IS_BRAND == true;
};

// --- FilterBrandsInternal Metafunction ---
template <typename InputList> struct FilterBrandsInternal;
template <> struct FilterBrandsInternal<TypeList<>> {
	using Result = TypeList<>;
};
template <typename Head, typename... Tail>
struct FilterBrandsInternal<TypeList<Head, Tail...>> {
private:
	using FilteredTail = typename FilterBrandsInternal<TypeList<Tail...>>::Result;
	static constexpr bool is_brand = IsBrandOption<Head>;

public:
	using Result = typename std::conditional_t<
	  is_brand, Concat_t<TypeList<Head>, FilteredTail>, FilteredTail>;
};
template <typename InputList>
using FilterBrandsInternal_t = typename FilterBrandsInternal<InputList>::Result;

// --- GetBrandsHelper ---
// Handles different input patterns for get::Brands

// Primary template: Handles the parameter pack case (Option1, Option2...)
template <typename... Args> struct GetBrandsHelper {
	// Filter the input pack directly
	using FilteredList = FilterBrandsInternal_t<TypeList<Args...>>;
	// Wrap the result in Options<>
	using Result = typename OptionsFromTypeList<FilteredList>::Type;
};

// Specialization 1: Handles a single argument that IS an Options<...> type
template <typename... As> // Matches Options<As...> as the single argument
struct GetBrandsHelper<Options<As...>> {
	// Filter the pack extracted from the input Options type
	using FilteredList = FilterBrandsInternal_t<TypeList<As...>>;
	// Wrap the result in Options<>
	using Result = typename OptionsFromTypeList<FilteredList>::Type;
};

// Specialization 2: Handles a single argument T that is NOT Options<...>
// We use SFINAE with std::void_t and a helper struct to ensure this
// specialization is only chosen when T is not Options<...> and T::Options
// exists or get::Options<T> resolves.
namespace detail {
template <typename T>
using get_options_result_t =
  typename get::Options<T>; // Use the public get::Options

template <typename T, typename = void>
struct is_options_type : std::false_type {};
template <typename... As>
struct is_options_type<Options<As...>, void> : std::true_type {};
} // namespace detail

template <typename T> // Matches a single argument T
  requires(!detail::is_options_type<T>::value)
struct GetBrandsHelper<T> {
private:
	// Get the underlying Options type using the updated get::Options utility
	using UnderlyingOptions =
	  typename get::Options<T>; // e.g., T::Options or Options<>
public:
	// Recursively call GetBrandsHelper with the extracted Options type
	// This will match the GetBrandsHelper<Options<As...>> specialization
	using Result = typename GetBrandsHelper<UnderlyingOptions>::Result;
};

} // namespace VOLTISO_NAMESPACE::_
