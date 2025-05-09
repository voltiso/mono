#pragma once
#include <v/_/_>

namespace VOLTISO_NAMESPACE::_::getTypeOption {
// Get type from parameter if it matches, or fallback type if not
template <template <class> class Option, class T, class Fallback>
struct get_param_type {
	using Result = Fallback;
};

template <template <class> class Option, class T, class Fallback>
struct get_param_type<Option, Option<T>, Fallback> {
	using Result = typename Option<T>::StoredType;
};

// Implementation helper
template <template <class> class TypeOption, class... Pack> struct TypeImpl {
	using Result = typename TypeOption<void>::StoredDefault;
};

// Specialization for non-empty tuples
template <template <class> class Option, class PackHead, class... PackTail>
struct TypeImpl<Option, PackHead, PackTail...> {
	using Result = typename get_param_type<
	  Option, PackHead, typename TypeImpl<Option, PackTail...>::Result>::Result;
};

} // namespace VOLTISO_NAMESPACE::_::getTypeOption
