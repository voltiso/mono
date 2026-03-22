#pragma once

#include "../option.hpp"

#include <type_traits>

namespace VOLTISO_NAMESPACE::options::_ {

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
