#pragma once
#include <v/_/_>

#include "_/get-base.hpp"
#include "forward.hpp"

#include "v/empty"

#include <atomic>
#include <mutex>

#include <v/ON>

namespace VOLTISO_NAMESPACE::mutex {

/** A trivial mutex implementation that is trivially destructible. */
template <is::Option... Os> class Custom : public _::GetBase<Os...> {
	using Base = _::GetBase<Os...>;
	using typename Base::Config;

	using Locked = std::conditional_t<Config::enabled, std::atomic_flag, Empty>;
	Locked _locked;

public:
	constexpr Custom() noexcept : _locked(ATOMIC_FLAG_INIT) {}

	constexpr Custom() noexcept
	  requires(!Config::enabled)
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
	  requires(!Config::enabled)
	{}

public:
	INLINE void unlock() noexcept {
		_locked.clear(std::memory_order_release);
		_locked.notify_one();
	}

	INLINE void unlock() noexcept
	  requires(!Config::enabled)
	{}

public:
	[[nodiscard]] INLINE auto guard() noexcept { return std::lock_guard(*this); }

public:
	template <is::Option... More> using With = Base::template With<More...>;
	template <bool e> using Enabled = With<option::enabled<e>>;
}; // class Custom

} // namespace VOLTISO_NAMESPACE::mutex

#include <v/OFF>
