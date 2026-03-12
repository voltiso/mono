#pragma once
#include <v/_/_>

#include "construct-key.hpp"

#include "v/any-mock"
#include "v/atomic"
#include "v/concepts/constexpr-constructible"
#include "v/concepts/options"
#include "v/mutex"
#include "v/option/concurrent"
#include "v/option/item"
#include "v/option/lazy"
#include "v/option/thread-local"
#include "v/storage"

#include <v/ON>

namespace VOLTISO_NAMESPACE::singleton::_ {
template <concepts::Options Options> struct Config {
	using Item = Options::template Get<option::Item>;
	static_assert(!std::is_reference_v<Item>);
	static_assert(!std::is_const_v<Item>);
	static_assert(!std::is_volatile_v<Item>);

	static constexpr bool _lazy = Options::template GET<option::lazy>;
	static constexpr bool _threadLocal = Options::template GET<option::threadLocal>;
	static constexpr bool _concurrent = Options::template GET<option::concurrent>;

	static constexpr bool _trivialConstinitItem =
	  (concepts::ConstexprConstructible<Item> ||
	   concepts::ConstexprConstructible<Item, _::ConstructKeyToken_doNotUseThisDirectly<Options>>) &&
	  std::is_trivially_destructible_v<Item>;

	// - If eager (non-lazy) - initialize immediately by definition
	// - If lazy, we still can initialize immediately if it's constexpr-constructible. But we're only
	//   doing this if item is trivially destructible - otherwise it's impossible to avoid TLS branch
	//   on access
	static constexpr bool _initializeImmediately = !_lazy || _trivialConstinitItem;

	// Since it's impossible to do the hack mentioned above, this is currrently equal to
	// `_initializeImmediately`.
	static constexpr bool _noopFirstAccess =
	  !_lazy || (_initializeImmediately && std::is_trivially_destructible_v<Item>);

	//

	static constexpr bool _hasIsInitialized = !_noopFirstAccess;
	using IsInitialized =
	  std::conditional_t<_hasIsInitialized, Atomic<bool>::Enabled<_concurrent>, AnyMock>;
	static_assert(
	  concepts::ConstexprConstructible<IsInitialized> &&
	  std::is_trivially_destructible_v<IsInitialized>);

	//

	static constexpr bool _hasMutex = _concurrent && _hasIsInitialized;

	using Mutex = Mutex::Enabled<Config::_hasMutex>;
	static_assert(concepts::ConstexprConstructible<Mutex> && std::is_trivially_destructible_v<Mutex>);

	//

	// - `Storage<Item>::NonUnion` needed for trivial destructor if Item is not trivially
	//   destructible.
	// - `Storage<Item>` needed for constinit
	// - Use constinit if Item is constexpr-constructible and we won't introduce TLS branch on access
	static constexpr bool _constinitStorage = _trivialConstinitItem;

	using Storage =
	  std::conditional_t<_constinitStorage, Storage<Item>, typename Storage<Item>::NonUnion>;
};
} // namespace VOLTISO_NAMESPACE::singleton::_

#include <v/OFF>
