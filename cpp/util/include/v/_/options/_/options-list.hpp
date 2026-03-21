#pragma once

#include <v/_/_>

#include <v/is/option>

namespace VOLTISO_NAMESPACE {

template <is::Option...> struct Options;

namespace options {
namespace _ {

template <typename...> struct TypeList {};

template <typename List1, typename List2> struct Concat;
template <typename... Ts1, typename... Ts2>
struct Concat<TypeList<Ts1...>, TypeList<Ts2...>> {
	using Result = TypeList<Ts1..., Ts2...>;
};
template <typename List1, typename List2>
using Concat_t = typename Concat<List1, List2>::Result;

template <typename TL> struct OptionsFromTypeList;
template <typename... FinalAs>
struct OptionsFromTypeList<TypeList<FinalAs...>> {
	using Type = VOLTISO_NAMESPACE::Options<FinalAs...>;
};

} // namespace _
} // namespace options

} // namespace VOLTISO_NAMESPACE
