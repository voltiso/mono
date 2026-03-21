#pragma once
#include <v/_/_>

#include "v/type-only"

#include <v/ON>

namespace V {
struct Option {
	struct Tag : TypeOnly {};

	template <class TType, class OptionTag = void> struct Type;
	template <auto value> struct Value;
	template <template <class...> class TTemplate> struct Template;
};

template <class TType, class OptionTag> struct Option::Type : Option {
	// can't be just `Type` - to be able to define parameters with the same name
	using Type_ = TType;
	/// Carried through public inheritance so `Options::Without<SomeTag>` matches derived type options.
	/// (Parameter is not named `Tag` — that would collide with nested `Option::Tag` in unqualified lookup.)
	using option_tag = OptionTag;
};

template <auto v> struct Option::Value : Option {
	static constexpr auto value = v;
};

template <template <class...> class TTemplate> struct Option::Template : Option {
	template <class... Ts> using _Template = TTemplate<Ts...>;
};
} // namespace V

#include <v/OFF>
