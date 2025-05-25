#pragma once
#include <v/_/_>

#include "v/_/subscription.forward.hpp"

#include "v/_/memo.forward.hpp"
#include "v/_/sink.forward.hpp"

#include <type_traits>

#include <v/ON>

// ! SubscriptionBase

namespace VOLTISO_NAMESPACE {
class Subscription {
public:
	using Callback = subscription::Callback;

protected:
	friend class V::sink::Base;
	sink::Base *_pSink = nullptr;
	Callback _callback;

public:
	static_assert(is::TriviallyRelocatable<decltype(_pSink)>);
	static_assert(is::TriviallyRelocatable<decltype(_callback)>);
	static constexpr bool IS_TRIVIALLY_RELOCATABLE = true;

public:
	INLINE ~Subscription() noexcept; // circular dep

public:
	template <class TSink>
	  requires(std::is_base_of_v<sink::Base, TSink>)
	INLINE Subscription(
	  TSink &sink, Callback &&callback) /* throws OOM */; // circular dep

	// Non-copyable
	Subscription(const Subscription &) = delete;
	Subscription &operator=(const Subscription &) = delete;

	// Movable
	constexpr INLINE Subscription(Subscription &&other) noexcept
	    : _pSink(other._pSink), _callback(std::move(other._callback)) {
		other._pSink = nullptr;
	}

protected:
	template <class Value> friend class Sink;
	template <class Value, memo::NumDeps> friend class Memo;
	INLINE void _notify() noexcept(noexcept(_callback())) { _callback(); }
}; // class Base
} // namespace VOLTISO_NAMESPACE

// ! Subscription implementation

namespace VOLTISO_NAMESPACE {
template <class Value> class EagerSubscription : public Subscription {
	using Base = Subscription;
	using AnyCallback = subscription::AnyCallback;
	using EagerCallback = subscription::EagerCallback<Value>;
	// using Callback = subscription::Callback;

	// store locally (alternatively, we could store in AnyFunction's
	// closure, which would cause AnyFunction not to be in-place)
	AnyCallback _anyCallback;

public:
	static_assert(is::TriviallyRelocatable<decltype(_anyCallback)>);
	static constexpr bool IS_TRIVIALLY_RELOCATABLE =
	  Base::IS_TRIVIALLY_RELOCATABLE;

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
	template <class TSink>
	  requires(std::is_base_of_v<Sink, TSink>)
	INLINE
	EagerSubscription(TSink &sink, EagerCallback &&eagerCallback) /* throws OOM */
	    : Base(
	        sink,
	        // ! better store callback locally
	        [this] {
		        auto &value = static_cast<TSink *>(_pSink)->value();
		        // std::cout << "CALL EAGER CALLBACK " << value << std::endl;
		        this->_anyCallback.as<EagerCallback>()(value);
	        }
	        // ! otherwise AnyFunction would not be in-place
	        // [this, callback = std::move(callback)] {
	        //   callback(this->value());
	        // }
	        ),
	      _anyCallback(std::move(eagerCallback)) {
		sink._onNewEagerSubscription(*this);
	}

	template <class TSink>
	  requires(std::is_base_of_v<Sink, TSink>)
	INLINE EagerSubscription(TSink &sink, Callback &&callback) /* throws OOM*/
	    : Base(
	        sink,
	        [this] {
		        // ! we have to call .value() to make it eager
		        (void)static_cast<TSink *>(_pSink)->value();
		        this->_anyCallback.as<Callback>()();
	        }),
	      _anyCallback(std::move(callback)) {
		sink._onNewEagerSubscription(*this);
	}
}; // class Subscription
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
