#pragma once
#include <v/_/_>

#include "v/apply"
#include "v/is/options"
#include "v/mixin/crtp"

#include <v/ON>
namespace V::mixin {

//

template <is::Options O> class Builder {
	using _Crtp = mixin::Crtp<O>;

	template <is::Option... Os> using _CustomTemplate = _Crtp::template CustomTemplate<Os...>;
	// using _InputOptions = _Crtp::InputOptions;

public:
	template <class... MoreOptions>
	using With = Apply<
	  _CustomTemplate, typename O::template With<MoreOptions...>::template Without<
	                     crtp::option::CustomTemplate, crtp::option::InputOptions,
	                     crtp::option::Final, options::option::DefaultOptions>>;

	template <class... MoreOptions>
	using WithIfMissing = Apply<
	  _CustomTemplate, typename O::template WithIfMissing<MoreOptions...>::template Without<
	                     crtp::option::CustomTemplate, crtp::option::InputOptions,
	                     crtp::option::Final, options::option::DefaultOptions>>;
};

//

} // namespace V::mixin
#include <v/OFF>
