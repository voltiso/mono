#pragma once
#include <v/_/_>

#include "forward.hpp"

#include "v/concepts/options"
#include "v/object"
#include "v/option/enabled"
#include "v/option/item"

#include <atomic>

#include <v/ON>

namespace VOLTISO_NAMESPACE::atomic {

#pragma push_macro("OBJECT")
#define OBJECT                                                                                     \
	Object<typename Options::template WithDefault<                                                   \
	  option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>

/** Hides operators from `std::atomic`, lock-free only */
template <concepts::Options Options> class Custom : public OBJECT {
	using Item = Options::template Get<option::Item>;
	using Object = OBJECT;
#pragma pop_macro("OBJECT")

	static constexpr bool _enabled = Options::template GET<option::enabled>;
	using Value = std::conditional_t<_enabled, std::atomic<Item>, Item>;

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
		if constexpr (_enabled) {
			return _value.load(order);
		} else {
			return _value;
		}
	}

	INLINE void store(Item desired, std::memory_order order) noexcept {
		if constexpr (_enabled) {
			_value.store(desired, order);
		} else {
			_value = desired;
		}
	}

	//

	INLINE Item fetchAdd(Item arg, std::memory_order order) noexcept {
		if constexpr (_enabled) {
			return _value.fetch_add(arg, order);
		} else {
			auto old = _value;
			_value += arg;
			return old;
		}
	}
	INLINE Item fetchSub(Item arg, std::memory_order order) noexcept {
		if constexpr (_enabled) {
			return _value.fetch_sub(arg, order);
		} else {
			auto old = _value;
			_value -= arg;
			return old;
		}
	}

	//

	INLINE Item fetchOr(Item arg, std::memory_order order) noexcept {
		if constexpr (_enabled) {
			return _value.fetch_or(arg, order);
		} else {
			auto old = _value;
			_value |= arg;
			return old;
		}
	}

	INLINE Item fetchAnd(Item arg, std::memory_order order) noexcept {
		if constexpr (_enabled) {
			return _value.fetch_and(arg, order);
		} else {
			auto old = _value;
			_value &= arg;
			return old;
		}
	}

	INLINE Item fetchXor(Item arg, std::memory_order order) noexcept {
		if constexpr (_enabled) {
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
	  requires(_enabled)
	{
		_value.wait(expected, order);
	}

	INLINE void notifyOne() noexcept
	  requires(_enabled)
	{
		_value.notify_one();
	}

	INLINE void notifyAll() noexcept
	  requires(_enabled)
	{
		_value.notify_all();
	}

public:
	template <bool enabled> using Enabled = Object::template With<option::enabled<enabled>>;
}; // class Custom

} // namespace VOLTISO_NAMESPACE::atomic

#include <v/OFF>
