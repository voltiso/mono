#pragma once
#include <type_traits>
#include <v/_/_>

#include "v/storage"

#include <v/ON>

namespace VOLTISO_NAMESPACE::optional {
class None {};
static constexpr auto NONE = None{};
} // namespace VOLTISO_NAMESPACE::optional

//

namespace VOLTISO_NAMESPACE {
template <class Value>
  requires(
    !requires { Value::Optional(); } && !requires { Value::NONE; } &&
    !std::is_constructible_v<Value, optional::None>)
class Optional {
	Storage<Value> _storage;
	bool _isSome = false;
	// [[no_unique_address]] optional::Extra<Value> _extra;

public:
	INLINE bool isSome() const noexcept { return _isSome; }

public:
	INLINE ~Optional() noexcept(noexcept(_storage.destroy())) {
		if (_isSome) {
			_storage.destroy();
		}
	}

public:
	INLINE Optional() = default;
	INLINE Optional(const optional::None &) noexcept : _isSome(false) {}

	template <class... Args>
	  requires(std::is_constructible_v<Value, Args...>)
	INLINE Optional(Args &&...args) noexcept(
	  noexcept(_storage.construct(std::forward<Args>(args)...)))
	    : _isSome(true) {
		_storage.construct(std::forward<Args>(args)...);
	}

	INLINE Optional(const Optional &) = delete;
	INLINE Optional &operator=(const Optional &) = delete;

	INLINE Optional(const Optional &other) noexcept(
	  std::is_nothrow_copy_constructible_v<Value>)
	  requires(std::is_copy_constructible_v<Value>)
	    : _isSome(other._isSome) {
		if (other._isSome) {
			_storage.construct(other.some());
		}
	}

	INLINE Optional(Optional &&other) noexcept(
	  std::is_nothrow_move_constructible_v<Value>)
	  requires(std::is_move_constructible_v<Value>)
	    : _isSome(other._isSome) {
		if (other._isSome) {
			_storage.construct(std::move(other.some()));
			other._storage.destroy();
			other._isSome = false;
		}
	}

	INLINE Optional &operator=(const Optional &other) noexcept(
	  std::is_nothrow_copy_assignable_v<Value>)
	  requires(std::is_copy_assignable_v<Value>)
	{
		if (_isSome) {
			if (other._isSome) {
				some() = other.some();
			} else {
				_storage.destroy();
				_isSome = false;
			}
		} else if (other._isSome) {
			_storage.construct(other.some());
			_isSome = true;
		}
	}

	INLINE Optional &
	operator=(Optional &&other) noexcept(std::is_nothrow_move_assignable_v<Value>)
	  requires(std::is_move_assignable_v<Value>)
	{
		if (_isSome) {
			if (other._isSome) {
				some() = std::move(other.some());
			} else {
				_storage.destroy();
				_isSome = false;
			}
		} else if (other._isSome) {
			_storage.construct(std::move(other.some()));
			_isSome = true;
			other._storage.destroy();
			other._isSome = false;
		}
		return *this;
	}

public:
	INLINE Value &some() {
		CHECK(_isSome);
		return _storage.object();
	}

	INLINE const Value &some() const {
		CHECK(_isSome);
		return _storage.object();
	}

	// ! danger
	// public:
	// 	INLINE explicit operator Value &() { return _storage.object(); }
	// 	INLINE explicit operator const Value &() const { return _storage.object();
	// }
};
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
