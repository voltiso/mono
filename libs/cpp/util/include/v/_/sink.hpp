#pragma once
#include <v/_/_>

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
	friend Subscription;
	HashSet<Subscription &> _subscriptions;
	// Size _numEagerSubscriptions = 0;

public:
	~Base() {
		for (auto &subscription : _subscriptions) {
			subscription._pSink = nullptr;
		}
	}

protected:
	// notify all subscriptions (note: the value may not be computed yet)
	INLINE constexpr void
	_notify() noexcept(noexcept(std::declval<Subscription>()._notify())) {
		for (auto &subscription : _subscriptions) {
			subscription._notify();
		}
	}

public:
	// this is if caller does not know our derived type
	// ! Have to be careful with casting here - Pool<SubscriptionBase> will be a
	// different pool
	// ! note: this will not be called on cold sink before first value is pulled
	template <class LazyCallback>
	[[nodiscard]] INLINE Owned<Subscription>
	createLazySubscription(this auto &self, LazyCallback &&listener);
}; // class Base
} // namespace VOLTISO_NAMESPACE::sink

//

// ! Sink implementation

namespace VOLTISO_NAMESPACE {
template <class TValue> class Sink : public sink::Base {
public:
	using Value = TValue;

private:
	using EagerSubscription = EagerSubscription<Value>;

protected:
	Value _value = Value{}; // ! initialized?

	// ! note - we may have to store _value as Storage<Value>
	// ! to comply with strict aliasing

public:
	[[nodiscard]] INLINE constexpr const Value &value() const noexcept {
		return this->_value;
	}

	// also expose `.operator()` mapping to `.value()`
	[[nodiscard]] INLINE constexpr const auto &operator()() const noexcept {
		return this->value();
	}

	// also allow implicit conversion to `Value`
	[[nodiscard]] INLINE constexpr operator const Value &() const noexcept {
		return this->value();
	}

public:
	// /** Allow uninitialized `value`? */
	// Sink() = default;

	template <class... Args>
	Sink(Args &&...args) : _value{std::forward<Args>(args)...} {}

public:
	// note: you can use `subscribe` instead, to automatically push subscription
	// to `v::Scope`
	template <class EagerCallback>
	[[nodiscard]] INLINE Owned<EagerSubscription>
	createSubscription(this auto &self, EagerCallback &&eagerCallback);

public:
	// subscribe to future updates (does not call the callback with current
	// value until it changes)
	template <class EagerCallback>
	void
	subscribe(this auto &self, EagerCallback &&eagerCallback) noexcept(false) {
		// std::cout << "sink: will retain subscription" << std::endl;
		context::get<Retainer>().retain(
		  self.createSubscription(std::forward<EagerCallback>(eagerCallback)));
	}

	template <class LazyCallback>
	void
	lazySubscribe(this auto &self, LazyCallback &&lazyCallback) noexcept(false) {
		// std::cout << "sink: will retain subscription" << std::endl;
		context::get<Retainer>().retain(
		  self.createLazySubscription(std::forward<LazyCallback>(lazyCallback)));
	}

protected:
	friend EagerSubscription;
	INLINE void
	_onNewEagerSubscription(EagerSubscription &eagerSubscription) noexcept(
	  noexcept(eagerSubscription._notify())) {
		// call the new subscription immediately with current value
		eagerSubscription._notify();
	}

public:
	// note: if you reference other sinks, the new memo will not be notified
	template <class R>
	[[nodiscard]] INLINE Memo<R, 1>
	map(this auto &self, AnyFunction<R(const Value &)> &&callback) {
		return Memo<R, 1>{
		  {self.sink()},
		  [&self, callback = std::move(callback)]() noexcept(
		    noexcept(callback(self.value()))) { return callback(self.value()); }};
	}
}; // class Sink
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
