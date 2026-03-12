#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/concepts/options"
#include "v/empty"
#include "v/object"
#include "v/option/custom-template"
#include "v/option/enabled"
#include "v/option/input-options"

#include <atomic>
#include <mutex>

#include <v/ON>

namespace VOLTISO_NAMESPACE::mutex {

#pragma push_macro("OBJECT")
#define OBJECT                                                                                     \
	Object<typename Options::template WithDefault<                                                   \
	  option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>

/** A trivial mutex implementation that is trivially destructible. */
template <concepts::Options Options> class Custom : public OBJECT {
	using Object = OBJECT;
#pragma pop_macro("OBJECT")

	static constexpr bool _enabled = Options::template GET<option::enabled>;

	using Locked = std::conditional_t<_enabled, std::atomic_flag, Empty>;
	Locked _locked;

public:
	constexpr Custom() noexcept : _locked(ATOMIC_FLAG_INIT) {}

	constexpr Custom() noexcept
	  requires(!_enabled)
	= default;

private:
	Custom(const Custom &) = delete;
	Custom(Custom &&) = delete;
	Custom &operator=(const Custom &) = delete;
	Custom &operator=(Custom &&); // = delete; // ⚠️ Poison for is_trivially_copyable (false)

public:
	INLINE void lock() noexcept {
		while (_locked.test_and_set(std::memory_order_acquire)) [[unlikely]] {
			_locked.wait(true, std::memory_order_relaxed);
		}
	}

	INLINE void lock() noexcept
	  requires(!_enabled)
	{}

public:
	INLINE void unlock() noexcept {
		_locked.clear(std::memory_order_release);
		_locked.notify_one();
	}

	INLINE void unlock() noexcept
	  requires(!_enabled)
	{}

public:
	[[nodiscard]] INLINE auto guard() noexcept { return std::lock_guard(*this); }

public:
	template <bool enabled> using Enabled = Object::template With<option::enabled<enabled>>;
}; // class Custom

} // namespace VOLTISO_NAMESPACE::mutex

#include <v/OFF>
