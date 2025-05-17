#pragma once

#include "v/_/sink.hpp"

#include <utility>

namespace VOLTISO_NAMESPACE {

// Forward declaration
template <class Value> class Subject;

// !

template <class Value> class Subject : public Sink<Value> {
	using Base = Sink<Value>;
	using Sink = Sink<Value>;

public:
	template <class... Args>
	Subject(Args &&...args) : Base(std::forward<Args>(args)...) {}

	Sink &sink() { return *this; }
	const Sink &sink() const { return *this; }

	template <class U> Subject &operator=(U &&value) {
		if constexpr (requires(const Value &lhs, U &&rhs) { lhs == rhs; }) {
			if (this->_value == value) [[unlikely]] {
				return *this;
			}
		}
		this->_value = std::forward<U>(value);
		this->_notify();
		return *this;
	}

	Subject &operator=(const Value &value) { return this->operator= <>(value); }
	Subject &operator=(Value &&value) {
		return this->operator= <>(std::move(value));
	}
};

} // namespace VOLTISO_NAMESPACE
