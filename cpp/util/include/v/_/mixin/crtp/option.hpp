#pragma once
#include <v/_/_>

#include "v/is/option"
#include "v/option"
#include "v/options"

#include <v/ON>
namespace V::mixin::crtp::option {

//

template <template <class...> class _CustomTemplate>
struct CustomTemplate : Option::Template<_CustomTemplate> {};

template <is::Option... Os> struct InputOptions : Option::Type<GetOptions<Os...>> {};

template <class _Final> struct Final : Option::Type<_Final> {};

//

} // namespace V::mixin::crtp::option
#include <v/OFF>
