#pragma once

#include "v/_/sink.forward.hpp" // self

#include "v/_/memo.forward.hpp"
#include "v/_/subscription.hpp"

#include "v/any-function"
#include "v/context"
#include "v/hash-set"
#include "v/owned"
#include "v/retainer"

#include <v/ON>

// ! sink::Base

namespace VOLTISO_NAMESPACE::sink {
class Base {
protected:
	friend class subscription::Base;
	HashSet<subscription::Base &> _subscriptions;
	std::size_t _numEagerSubscriptions = 0;

public:
	~Base() {
		for (auto &subscription : _subscriptions) {
			subscription._pSink = nullptr;
		}
	}

protected:
	// notify all subscriptions (note: the value may not be computed yet)
	INLINE constexpr void _notify() noexcept {
		for (auto &subscription : _subscriptions) {
			subscription._notify();
		}
	}

public:
	// this is if caller does not know our derived type
	// ! Have to be careful with casting here - Pool<SubscriptionBase> will be a
	// different pool
	// ! note: this will not be called on cold sink before first value is pulled
	template <class Listener>
	[[nodiscard]] INLINE Owned<subscription::Base>
	createLazySubscription(Listener &&listener);
}; // class Base
} // namespace VOLTISO_NAMESPACE::sink

//

// ! Sink implementation

namespace VOLTISO_NAMESPACE {
template <class Value> class Sink : public sink::Base {
	using Subscription = Subscription<Value>;

protected:
	Value _value; // = T{};

	// ! note - we may have to store _value as Storage<Value>
	// ! to comply with strict aliasing

public:
	INLINE constexpr const Value &value() const noexcept { return this->_value; }

public:
	template <class... Args>
	Sink(Args &&...args) : _value(std::forward<Args>(args)...) {}

public:
	// note: you can use `subscribe` instead, to automatically push subscription
	// to `v::Scope`
	template <class Listener>
	[[nodiscard]] INLINE Owned<Subscription>
	createSubscription(Listener &&listener);

public:
	// subscribe to future updates (does not call the callback with current
	// value until it changes)
	template <class Callback>
	void subscribe(this auto &self, Callback &&callback) {
		// std::cout << "sink: will retain subscription" << std::endl;
		context::get<Retainer>().retain(
		  self.createSubscription(std::forward<Callback>(callback)));
	}

	// public:
	// 	// immediately call the callback, and subscribe to future updates
	// 	template <class Callback> void getAndSubscribe(Callback &&callback) {
	// 		auto subscription =
	// createSubscription(std::forward<Callback>(callback));
	// 		subscription->update(this->value());
	// 		context::get<Retainer>().retain(std::move(subscription));
	// 	}

public:
	// note: if you reference other sinks, the new memo will not be notified
	template <class R>
	[[nodiscard]] INLINE Memo<R, 1>
	map(this auto &self, AnyFunction<R(const Value &)> &&callback) {
		return Memo<R, 1>{
		  {self.sink()}, [&self, callback = std::move(callback)]() noexcept {
			  return callback(self.value());
		  }};
	}
}; // class Sink
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
