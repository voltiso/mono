#pragma once

#include "options-list.hpp"

#include "v/is/instantiated-from"

#include <type_traits>

namespace VOLTISO_NAMESPACE::options::_ {

template <typename T> struct IsOptionFinal : std::false_type {};

template <template <class...> class OptionKind> struct IsOptionKindPredicate {
	template <typename T_To_Check>
	struct Apply : std::bool_constant<is::instantiatedFrom<T_To_Check, OptionKind>> {};
};

/// True if `Opt` exposes `option_tag` (from `Option::Type<_, Tag>`) and it equals `TagToMatch`.
template <class Opt, class TagToMatch, class = void> struct OptionHasTag : std::false_type {};

template <class Opt, class TagToMatch>
struct OptionHasTag<Opt, TagToMatch, std::void_t<typename Opt::option_tag>>
    : std::bool_constant<std::is_same_v<typename Opt::option_tag, TagToMatch>> {};

template <class... OptionTags> struct IsOptionTagAnyOfPredicate {
	template <typename T_To_Check>
	struct Apply : std::bool_constant<(OptionHasTag<T_To_Check, OptionTags>::value || ...)> {};
};

template <template <class...> class... OptionKinds> struct IsOptionKindAnyOfPredicate {
	template <typename T_To_Check>
	struct Apply : std::bool_constant<(is::instantiatedFrom<T_To_Check, OptionKinds> || ...)> {};
};

template <template <typename> class Predicate, typename ListToFilter> struct FilterOut;

template <template <typename> class Predicate> struct FilterOut<Predicate, TypeList<>> {
	using Result = TypeList<>;
};

template <template <typename> class Predicate, typename Head, typename... Tail>
struct FilterOut<Predicate, TypeList<Head, Tail...>> {
private:
	using FilteredTail = typename FilterOut<Predicate, TypeList<Tail...>>::Result;
	static constexpr bool should_remove = Predicate<Head>::value;

public:
	using Result = typename std::conditional_t<
	  should_remove, FilteredTail, typename Concat<TypeList<Head>, FilteredTail>::Result>;
};

template <template <typename> class Predicate, typename ListToFilter>
using FilterOut_t = typename FilterOut<Predicate, ListToFilter>::Result;

} // namespace VOLTISO_NAMESPACE::options::_
