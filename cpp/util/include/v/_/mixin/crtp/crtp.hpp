#pragma once
#include <v/_/_>

#include "option.hpp"

#include "v/apply"
#include "v/is/options"
#include "v/mixin/options"

#include <v/ON>
namespace V::mixin {

//

template <is::Options O> class Crtp {
private:
	using _Options = mixin::Options_<O>::Options;

public:
	template <is::Option... Os>
	using CustomTemplate = _Options::template GetTemplate<crtp::option::CustomTemplate, Os...>;

	// Use `InputOptions` if provided, otherwise fall back to `O` parameter
	using InputOptions = _Options::template Get<crtp::option::InputOptions, O>;

	// use `option::Final` if present, otherwise use `CustomTemplate<InputOptions>`
	using Final = _Options::template Get<crtp::option::Final, Apply<CustomTemplate, InputOptions>>;
};

//

} // namespace V::mixin
#include <v/OFF>
