#pragma once
#include <v/_/_>

namespace VOLTISO_NAMESPACE::_::getValueOption {

// Get value from parameter if it matches, or fallback value if not
template <template <auto> class Option, class T, auto Fallback>
struct get_param_value {
	static constexpr auto RESULT = Fallback;
};

template <template <auto> class Option, auto V, auto Fallback>
struct get_param_value<Option, Option<V>, Fallback> {
	static constexpr auto RESULT = Option<V>::VALUE;
};

// Implementation helper
template <template <auto> class Option, class... Tuple> struct ValueImpl {
	static constexpr auto RESULT = Option<0>::DEFAULT;
};

// Specialization for non-empty tuples
template <template <auto> class Option, class Head, class... Tail>
struct ValueImpl<Option, Head, Tail...> {
	static constexpr auto RESULT =
	  get_param_value<Option, Head, ValueImpl<Option, Tail...>::RESULT>::RESULT;
};
} // namespace VOLTISO_NAMESPACE::_::getValueOption
