// Gemini 2.5-pro-experimental
#pragma once
#include <v/_/_>

#include <tuple>
#include <type_traits>

#define ___ ...

// --- Placeholder for UnknownTemplate ---
// Needs to be defined *outside* the _ namespace if used by public-facing
// TemplateOption definitions
namespace VOLTISO_NAMESPACE {
// Placeholder error type for when a TemplateOption is requested but not found.
template <class...> class UnknownTemplate {
	static_assert(
	  std::false_type::value, // Use std::false_type::value for better portability
	  "voltiso::UnknownTemplate should not be instantiated. "
	  "It indicates a required TemplateOption was not found in the Options "
	  "pack.");
};
} // namespace VOLTISO_NAMESPACE

// --- Implementation Namespace ---
// (Using _ directly as requested)
namespace VOLTISO_NAMESPACE::_ {

// --- Helper to Instantiate a template<class...> with types from a tuple ---
template <template <class ___> class Target, typename ArgsTuple>
struct InstantiateFromTuple;

template <template <class ___> class Target, typename ___ Args>
struct InstantiateFromTuple<Target, std::tuple<Args ___>> {
	using Result = Target<Args ___>;
};

template <template <class ___> class Target, typename ArgsTuple>
using InstantiateFromTuple_t =
  typename InstantiateFromTuple<Target, ArgsTuple>::Result;

// --- TemplateImplHelper ---
// Searches Pack... for QueryTemplate<Impl> and instantiates Impl<Args...>,
// otherwise instantiates QueryTemplate<UnknownTemplate>::Default<Args...>.
// QueryTemplate is the *kind* of option we're looking for, e.g.,
// option::ComputePolicy. It's expected that QueryTemplate takes one argument:
// the implementation template. E.g.: template<template<class...> class Impl>
// struct ComputePolicy {}; And options in the pack look like
// ComputePolicy<MySpecificImpl>

// Primary Template: Base case (Pack... is empty)
template <
  template <template <
    class ___> class> class QueryTemplate, // The Option Kind ID (e.g.,
                                           // option::ComputePolicy)
  typename ArgsTuple, // Arguments for Impl/Default (e.g., std::tuple<Final,
                      // Opts>)
  typename... Pack    // Options pack (empty here)
  >
struct TemplateImplHelper {
	// --- Convention ---
	// Assume the default implementation template is accessible as:
	// QueryTemplate<UnknownTemplate>::Default
	// And that 'Default' itself is the desired template<class...>
	// We need typename and template keywords because the base
	// QueryTemplate<UnknownTemplate> is dependent.
	template <class ___ As>
	using DefaultImpl =
	  typename QueryTemplate<UnknownTemplate>::template Default<As ___>;

	// Instantiate the default implementation with arguments from ArgsTuple
	using Result = InstantiateFromTuple_t<DefaultImpl, ArgsTuple>;

	// --- Optional Concept Check ---
	// static_assert(VOLTISO_NAMESPACE::concepts::HasDefaultTemplate<QueryTemplate<UnknownTemplate>>,
	//              "QueryTemplate<UnknownTemplate> must provide a ::template
	//              Default<Args...> member.");
};

// Partial Specialization: Recursive step (Pack... is not empty)
template <
  template <template <class ___> class> class QueryTemplate, typename ArgsTuple,
  typename Head,   // Current option being checked
  typename... Tail // Rest of the options pack
  >
struct TemplateImplHelper<QueryTemplate, ArgsTuple, Head, Tail...> {
private:
	// Recursively find the result in the tail, passing ArgsTuple along.
	using FallbackResult =
	  typename TemplateImplHelper<QueryTemplate, ArgsTuple, Tail...>::Result;

	// Nested helper to select between Head's Impl or the FallbackResult
	template <typename T, typename Fallback> // T will be Head
	struct get_param_or_fallback {
		using Result =
		  Fallback; // Default case: T doesn't match QueryTemplate<Impl>
	};

	// Specialization: T matches the QueryTemplate<Impl> pattern.
	template <
	  template <class...> class Impl, // The implementation template found inside
	                                  // Head
	  typename Fallback>
	struct get_param_or_fallback<QueryTemplate<Impl>, Fallback> {
		// Match found: Instantiate the specific Impl template using ArgsTuple.
		using Result = InstantiateFromTuple_t<Impl, ArgsTuple>;
	};

public:
	// Check 'Head' using the nested helper
	using Result = typename get_param_or_fallback<Head, FallbackResult>::Result;
};

} // namespace VOLTISO_NAMESPACE::_

#undef EXPAND
