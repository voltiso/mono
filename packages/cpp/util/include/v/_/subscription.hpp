#pragma once

#include "v/_/subscription.forward.hpp"

#include "v/_/sink.forward.hpp"

#include <v/ON>

// ! SubscriptionBase

namespace VOLTISO_NAMESPACE::subscription {
class Base {
protected:
	friend class sink::Base;
	sink::Base *_pSink = nullptr;
	Callback _callback;
	static_assert(is::TriviallyRelocatable<decltype(_pSink)>);
	static_assert(is::TriviallyRelocatable<decltype(_callback)>);

public:
	INLINE ~Base() noexcept; // circular dep

public:
	INLINE
	Base(sink::Base &sink, Callback &&callback) /** throws OOM */; // circular dep

	// Non-copyable
	Base(const Base &) = delete;
	Base &operator=(const Base &) = delete;

	// Movable
	constexpr INLINE Base(Base &&other) noexcept
	    : _pSink(other._pSink), _callback(std::move(other._callback)) {
		other._pSink = nullptr;
	}

protected:
	INLINE void _notify() noexcept { _callback(); }
}; // class Base
} // namespace VOLTISO_NAMESPACE::subscription

// ! Subscription implementation

namespace VOLTISO_NAMESPACE {
template <class Value> class Subscription : public subscription::Base {
	using Base = subscription::Base;
	using Callback = subscription::Callback;

public:
	using Sink = Sink<Value>;

private:
	[[nodiscard]] INLINE constexpr auto &_sink() const noexcept {
		CHECK(this->_pSink);
		return reinterpret_cast<V::Sink<Value> &>(*this->_pSink);
	}

public:
	[[nodiscard]] INLINE auto &value() const noexcept {
		CHECK(this->_pSink);
		return _sink().value();
	}

public:
	INLINE Subscription(Sink &sink, Callback &&callback) /** throws OOM */
	    : Base(sink, std::move(callback)) {
		// std::cout << "create typed subscription" << std::endl;
	}

	// ~Subscription() noexcept {
	// 	std::cout << "destroy typed subscription -------------------" <<
	// std::endl;
	// }
}; // class Subscription
} // namespace VOLTISO_NAMESPACE

//

namespace VOLTISO_NAMESPACE {
template <> constexpr auto is::TriviallyRelocatable<subscription::Base> = true;
} // namespace VOLTISO_NAMESPACE

//

namespace VOLTISO_NAMESPACE {
template <class Value>
constexpr auto is::TriviallyRelocatable<Subscription<Value>> = true;
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
