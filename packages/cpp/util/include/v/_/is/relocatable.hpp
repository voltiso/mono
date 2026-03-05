#pragma once
#include <v/_/_>

// #include "v/_/string-from-type.hpp"
#include "v/is/complete"

namespace VOLTISO_NAMESPACE::is {

// ! clang-22: these don't work well yet
// ! `__builtin_is_cpp_trivially_relocatable` fine but impossible to tag types,
// parser does not work with `trivially_relocatable_if_eligible`
// ! __is_trivially_relocatable is deprecated, so better not. (it worked in pair
// with [[clang::trivial_abi]])
// !

namespace _ {
#if defined(__has_builtin)
	#if __has_builtin(__is_trivially_relocatable)
		#define VOLTISO_HAS_BUILTIN_IS_RELOCATABLE 1
	#else
		#define VOLTISO_HAS_BUILTIN_IS_RELOCATABLE 0
	#endif
#else
	#define VOLTISO_HAS_BUILTIN_IS_RELOCATABLE 0
#endif
#if defined(__clang__)
	#pragma clang diagnostic push
	#pragma clang diagnostic ignored "-Wdeprecated-builtins"
#endif
// ! can't use `__builtin_is_cpp_trivially_relocatable` - parser does not work
// with `trivially_relocatable_if_eligible` yet.
template <class T>
constexpr bool builtinRelocatable =
#if VOLTISO_HAS_BUILTIN_IS_RELOCATABLE
  __is_trivially_relocatable(T);
#else
  false;
#endif
#if defined(__clang__)
	#pragma clang diagnostic pop
#endif
} // namespace _

// !

namespace _ {
template <class T>
constexpr bool hasMarker = []() constexpr {
	if constexpr (requires { typename T::__trivially_relocatable; }) {
		return std::is_base_of_v<T, typename T::__trivially_relocatable>;
	}
	return false;
}();
} // namespace _

// !

template <class T>
static constexpr auto relocatable = []() constexpr {
	static_assert(is::complete<T>, "is::relocatable: type is not complete");

	const auto hasMarker = _::hasMarker<T>;
	const auto builtinRelocatable = _::builtinRelocatable<T>;

	if constexpr (
	  is::Object<T> && VOLTISO_HAS_BUILTIN_IS_RELOCATABLE &&
	  VOLTISO_ENABLE_TRIVIAL_ABI) {

		if constexpr (hasMarker) {
			static_assert(
			  builtinRelocatable,
			  "type is marked trivially relocatable, but compiler says otherwise "
			  "(use RELOCATABLE macro in class definition) - "
			  // << stringFromType<T>()
			);
		}
	}

	// currently never triggers, because we use the same marker as libc++
	if constexpr (is::Object<T> && requires {
		              std::__libcpp_is_trivially_relocatable<T>();
	              }) {
		if constexpr (hasMarker) {
			static_assert(
			  std::__libcpp_is_trivially_relocatable<T>(),
			  "type is marked trivially relocatable, but libc++ says otherwise ");
		}
	}

	if constexpr (hasMarker || builtinRelocatable) {
		return true;
	}

	// Fallback for compilers without trivial-relocatability support.
	// ! we return true for references (contrary to standard, we may want to
	// change this)
	return std::is_reference_v<T> ||
	       std::is_trivially_copyable_v<T>; // may be incomplete yet
}();

} // namespace VOLTISO_NAMESPACE::is
