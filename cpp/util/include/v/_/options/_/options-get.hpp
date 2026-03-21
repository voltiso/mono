#pragma once

#include "../option.hpp"
#include "options-common.hpp"
#include "options-list.hpp"

#include <type_traits>

namespace VOLTISO_NAMESPACE::options::_ {

template <template <class...> class T> constexpr bool _is_default_options_type_option_v = false;
template <>
inline constexpr bool _is_default_options_type_option_v<options::option::defaultOptions> = true;

template <template <class> class TypeOption>
using _TypeOptionKindRep = TypeOption<VOLTISO_NAMESPACE::Options<>>;

template <template <auto> class ValueOption> using _ValueOptionKindRep = ValueOption<false>;

template <class...> struct _DummyTypeTemplate {};

template <template <template <class...> class> class TemplateOption>
using _TemplateOptionKindRep = TemplateOption<_DummyTypeTemplate>;

template <template <class...> class TypeOption, class Fallback, typename... Opts>
struct GetTypeImpl;

template <template <class...> class TypeOption> struct _RequiredTypeOptionMissing {};

template <template <class...> class TypeOption, class Fallback>
struct GetTypeImpl<TypeOption, Fallback> {
	using type = Fallback;
};

template <template <class...> class TypeOption>
struct GetTypeImpl<TypeOption, options::_::MissingFallback> {
	static_assert(false, "Options::Get: option not present.");
};

// --- Search through `options::option::defaultOptions<>` (only meta Options knows about) ---

// `Get<options::option::defaultOptions>`: head is the meta (must beat generic `TypeOption<Us...>`).
template <class Fallback, typename... Inner, typename... Tail>
struct GetTypeImpl<
  options::option::defaultOptions, Fallback,
  options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Tail...> {
	using type = VOLTISO_NAMESPACE::Options<Inner...>;
};

template <template <class...> class TypeOption, class Fallback, typename... Inner, typename... Tail>
requires (!_is_default_options_type_option_v<TypeOption>)
struct GetTypeImpl<
  TypeOption, Fallback, options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>,
  Tail...> {
	using type = typename GetTypeImpl<TypeOption, Fallback, Tail..., Inner...>::type;
};

template <template <class...> class TypeOption, class Fallback, class... Us, typename... Tail>
requires (!_is_default_options_type_option_v<TypeOption>)
struct GetTypeImpl<TypeOption, Fallback, TypeOption<Us...>, Tail...> {
	using type = TypeOption<Us...>::Type_;
};

template <template <class...> class TypeOption, class Fallback, typename Head, typename... Tail>
struct GetTypeImpl<TypeOption, Fallback, Head, Tail...> {
	using type = typename GetTypeImpl<TypeOption, Fallback, Tail...>::type;
};

template <template <auto...> class ValueOption, typename... Opts> struct GetValueImpl;

template <template <auto...> class ValueOption> struct GetValueImpl<ValueOption> {
	template <template <auto> class> struct _AlwaysFalse : std::false_type {};

	static_assert(
	  _AlwaysFalse<ValueOption>::value, "Options::get: required value option kind not present.");

	static constexpr auto value = 0;
};

template <template <auto...> class ValueOption, typename... Inner, typename... Tail>
struct GetValueImpl<
  ValueOption, options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Tail...> {
	static constexpr auto value = GetValueImpl<ValueOption, Tail..., Inner...>::value;
};

template <template <auto...> class ValueOption, auto... V, typename... Tail>
struct GetValueImpl<ValueOption, ValueOption<V...>, Tail...> {
	static constexpr auto value = ValueOption<V...>::value;
};

template <template <auto...> class ValueOption, typename Head, typename... Tail>
struct GetValueImpl<ValueOption, Head, Tail...> {
	static constexpr auto value = GetValueImpl<ValueOption, Tail...>::value;
};

template <template <template <class...> class> class TemplateOption, class... Args>
struct GetTemplateImpl {
	template <typename... Opts> struct _WithOpts {
		template <typename...> struct _Scan;
		template <> struct _Scan<> {
			using type = void;
		};

		template <typename... Inner, typename... Tail>
		struct _Scan<options::option::defaultOptions<VOLTISO_NAMESPACE::Options<Inner...>>, Tail...> {
			using type = typename _Scan<Tail..., Inner...>::type;
		};

		template <typename Head, typename = void> struct _TryGetFromHead {
			static constexpr bool value = false;
			using type = void;
		};

		template <typename Head>
		struct _TryGetFromHead<Head, std::void_t<typename Head::template _Template<Args...>>> {
			static constexpr bool value = true;
			using type = typename Head::template _Template<Args...>;
		};

		template <typename Head, typename... Tail> struct _Scan<Head, Tail...> {
			using _Try = _TryGetFromHead<Head>;

			template <bool, typename, typename...> struct _Select;
			template <typename H, typename... Ts> struct _Select<true, H, Ts...> {
				using type = typename _TryGetFromHead<H>::type;
			};
			template <typename H, typename... Ts> struct _Select<false, H, Ts...> {
				using type = typename _Scan<Ts...>::type;
			};

			using type = typename _Select<_Try::value, Head, Tail...>::type;
		};

		using _Selected = typename _Scan<Opts...>::type;
		static_assert(
		  !std::is_same_v<_Selected, void>,
		  "Options::GetTemplate: required template option kind not present.");

		using type = _Selected;
	};
};

} // namespace VOLTISO_NAMESPACE::options::_
