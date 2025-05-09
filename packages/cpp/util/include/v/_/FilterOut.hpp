#pragma once

#include "./Options.hpp"
#include "v/is_instantiated_from_same"
#include "v/option/Self"

#include <type_traits> // For std::conditional_t, std::is_same_v, std::false_type

namespace VOLTISO_NAMESPACE::_ {

// --- Predicate to check if a type is option::Self ---
// Assumes option::Self is a template taking one argument (the type it holds).
template <typename T> struct IsOptionSelf : std::false_type {}; // Default case

template <typename HeldType> // Specialization for option::Self<HeldType>
struct IsOptionSelf<option::Self<HeldType>> : std::true_type {};

// --- Predicate Wrapper for Option Kind Check ---
// Wraps the is_instantiated_from_same check for a specific OptionKind template.
// This adapter is needed because FilterOut expects a template taking one type
// argument (Predicate<T>). Currently specialized for TypeOptions
// (template<class> class OptionKind).
template <template <class> class OptionKind> struct IsOptionKindPredicate {
	template <typename T_To_Check> // The type being checked in the list
	struct Apply : std::bool_constant<
	                 // Check if T_To_Check is an instantiation of OptionKind
	                 // We use OptionKind<void> as a representative instance for
	                 // the kind check. is_instantiated_from_same should handle
	                 // comparing OptionKind<void> with T_To_Check (which might be
	                 // OptionKind<SpecificType>).
	                 is_instantiated_from_same<OptionKind<void>, T_To_Check>> {};
};
// TODO: Add specializations or overloads for ValueOption (template<auto>)
// and TemplateOption (template<template<class...>>) kinds if needed later.

// --- FilterOut Metafunction ---
// Removes elements from a TypeList for which Predicate<Element>::value is true.

template <template <typename> class Predicate, typename ListToFilter>
struct FilterOut;

// Base case: empty list
template <template <typename> class Predicate>
struct FilterOut<Predicate, TypeList<>> {
	using Result = TypeList<>;
};

// Recursive step
template <template <typename> class Predicate, typename Head, typename... Tail>
struct FilterOut<Predicate, TypeList<Head, Tail...>> {
private:
	// Recursively filter the tail
	using FilteredTail = typename FilterOut<Predicate, TypeList<Tail...>>::Result;

	// Check if the predicate is true for the Head element
	// Uses the Apply nested template from the Predicate wrapper (e.g.,
	// IsOptionKindPredicate)
	static constexpr bool should_remove = Predicate<Head>::value;

public:
	// Keep Head only if the predicate is false
	using Result = typename std::conditional_t<
	  should_remove,
	  FilteredTail, // Discard Head if predicate is true
	  typename Concat<TypeList<Head>, FilteredTail>::Result // Keep Head otherwise
	                                                        // Assumes Concat is
	                                                        // available
	  >;
};

template <template <typename> class Predicate, typename ListToFilter>
using FilterOut_t = typename FilterOut<Predicate, ListToFilter>::Result;

} // namespace VOLTISO_NAMESPACE::_
