#pragma once
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
	  requires std::is_constructible_v<Value, Args...>
	INLINE Optional(Args &&...args) noexcept(
	  noexcept(_storage.construct(std::forward<Args>(args)...)))
	    : _isSome(true) {
		_storage.construct(std::forward<Args>(args)...);
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
