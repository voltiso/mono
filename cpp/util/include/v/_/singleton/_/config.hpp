#pragma once
#include <v/_/_>

#include "../options.hpp"

#include "v/any-mock"
#include "v/atomic"
#include "v/is/constexpr-constructible"
#include "v/is/options"
#include "v/mutex"
#include "v/storage"

#include <v/ON>

namespace VOLTISO_NAMESPACE::singleton::_ {
template <is::Options O> class Config {
	using _Options = V::mixin::Options_<O>::Options;

public:
	using Item = _Options::template Get<option::Item>;
	static_assert(!std::is_reference_v<Item>);
	static_assert(!std::is_const_v<Item>);
	static_assert(!std::is_volatile_v<Item>);

	static constexpr bool lazy = _Options::template get<option::lazy>;
	static constexpr bool threadLocal = _Options::template get<option::threadLocal>;
	static constexpr bool concurrent = _Options::template get<option::concurrent>;

	struct ConstructKey {
	private:
		friend Config;
		constexpr ConstructKey() noexcept = default;
	};

	static constexpr bool trivialConstinitItem =
	  (is::constexprConstructible<Item> || is::constexprConstructible<Item, ConstructKey{}>) &&
	  std::is_trivially_destructible_v<Item>;

	// - If eager (non-lazy) - initialize immediately by definition
	// - If lazy, we still can initialize immediately if it's constexpr-constructible. But we're only
	//   doing this if item is trivially destructible - otherwise it's impossible to avoid TLS branch
	//   on access
	static constexpr bool initializeImmediately = !lazy || trivialConstinitItem;

	// Since it's impossible to do the hack mentioned above, this is currrently equal to
	// `_initializeImmediately`.
	static constexpr bool noopFirstAccess =
	  !lazy || (initializeImmediately && std::is_trivially_destructible_v<Item>);

	//

	static constexpr bool hasIsInitialized = !noopFirstAccess;
	using IsInitialized =
	  std::conditional_t<hasIsInitialized, Atomic<bool>::Enabled<concurrent>, AnyMock>;
	static_assert(
	  is::constexprConstructible<IsInitialized> && std::is_trivially_destructible_v<IsInitialized>);

	//

	static constexpr bool hasMutex = concurrent && hasIsInitialized;

	using Mutex = Mutex::Enabled<Config::hasMutex>;
	static_assert(is::constexprConstructible<Mutex> && std::is_trivially_destructible_v<Mutex>);

	//

	// - `Storage<Item>::NonUnion` needed for trivial destructor if Item is not trivially
	//   destructible.
	// - `Storage<Item>` needed for constinit
	// - Use constinit if Item is constexpr-constructible and we won't introduce TLS branch on access
	static constexpr bool constinitStorage = trivialConstinitItem;

	using Storage =
	  std::conditional_t<constinitStorage, Storage<Item>, typename Storage<Item>::NonUnion>;
};
} // namespace VOLTISO_NAMESPACE::singleton::_

#include <v/OFF>
