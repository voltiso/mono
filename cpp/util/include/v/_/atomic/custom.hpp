#pragma once
#include <v/_/_>

#include "_/get-base.hpp"
#include "forward.hpp"

#include <atomic>

#include <v/ON>

namespace V::atomic {

/** Hides operators from `std::atomic`, lock-free only */
template <is::Option... Os> class Custom : public _::GetBase<Os...> {
	using Base = _::GetBase<Os...>;
	using typename Base::Config;
	using Item = Config::Item;

	using Value = std::conditional_t<Config::enabled, std::atomic<Item>, Item>;

private:
	Value _value;

private:
	static_assert(std::atomic<Item>::is_always_lock_free);

	// Guarantee no random padding bytes will break compare_exchange
	static_assert(std::has_unique_object_representations_v<Item>);

	// Guarantee it's raw bytes
	static_assert(std::is_trivially_copyable_v<Item>);

public:
	INLINE constexpr Custom() noexcept = default;

	INLINE constexpr Custom(const Item &value) noexcept(std::is_nothrow_copy_constructible_v<Item>)
	    : _value(value) {}

	INLINE constexpr Custom(Item &&value) noexcept(std::is_nothrow_move_constructible_v<Item>)
	    : _value(std::move(value)) {}

	//

	INLINE Item load(std::memory_order order) const noexcept {
		if constexpr (Config::enabled) {
			return _value.load(order);
		} else {
			return _value;
		}
	}

	INLINE void store(Item desired, std::memory_order order) noexcept {
		if constexpr (Config::enabled) {
			_value.store(desired, order);
		} else {
			_value = desired;
		}
	}

	//

	INLINE Item fetchAdd(Item arg, std::memory_order order) noexcept {
		if constexpr (Config::enabled) {
			return _value.fetch_add(arg, order);
		} else {
			auto old = _value;
			_value += arg;
			return old;
		}
	}
	INLINE Item fetchSub(Item arg, std::memory_order order) noexcept {
		if constexpr (Config::enabled) {
			return _value.fetch_sub(arg, order);
		} else {
			auto old = _value;
			_value -= arg;
			return old;
		}
	}

	//

	INLINE Item fetchOr(Item arg, std::memory_order order) noexcept {
		if constexpr (Config::enabled) {
			return _value.fetch_or(arg, order);
		} else {
			auto old = _value;
			_value |= arg;
			return old;
		}
	}

	INLINE Item fetchAnd(Item arg, std::memory_order order) noexcept {
		if constexpr (Config::enabled) {
			return _value.fetch_and(arg, order);
		} else {
			auto old = _value;
			_value &= arg;
			return old;
		}
	}

	INLINE Item fetchXor(Item arg, std::memory_order order) noexcept {
		if constexpr (Config::enabled) {
			return _value.fetch_xor(arg, order);
		} else {
			auto old = _value;
			_value ^= arg;
			return old;
		}
	}

	// ---------------------------------------------------------------------------
	// enabled-only:
	// ---------------------------------------------------------------------------

	INLINE void wait(const Item &expected, std::memory_order order) noexcept
	  requires(Config::enabled)
	{
		_value.wait(expected, order);
	}

	INLINE void notifyOne() noexcept
	  requires(Config::enabled)
	{
		_value.notify_one();
	}

	INLINE void notifyAll() noexcept
	  requires(Config::enabled)
	{
		_value.notify_all();
	}

public:
	template <is::Option... More> using With = Base::template With<More...>;
	template <bool e> using Enabled = With<atomic::option::enabled<e>>;
}; // class Custom

} // namespace V::atomic

#include <v/OFF>
