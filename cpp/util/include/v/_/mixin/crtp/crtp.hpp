#pragma once
#include <v/_/_>

#include "option.hpp"

#include "v/apply"
#include "v/is/options"
#include "v/options"

#include <v/ON>
namespace V::mixin {

//

template <is::Options O> class Crtp {
public:
	template <is::Option... Os>
	using CustomTemplate = O::template GetTemplate<crtp::option::customTemplate, Os...>;
	using Final =
	  Apply<CustomTemplate, typename O::template Without<options::option::DefaultOptions>>;
};

//

} // namespace V::mixin
#include <v/OFF>
