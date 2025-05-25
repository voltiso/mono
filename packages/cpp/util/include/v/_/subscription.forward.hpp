#pragma once
#include <v/_/_>

#include "v/_/sink.forward.hpp"
#include "v/any-function"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
class Subscription; // untyped (lazy)
template <class Value> class EagerSubscription;
} // namespace VOLTISO_NAMESPACE

// ! callback types
namespace VOLTISO_NAMESPACE::subscription {
/** Any Callback */
using AnyCallback = anyFunction::Custom<>;

/** Untyped (lazy) */
using Callback = AnyFunction<void()>;

/** Typed (lazy) */
template <class Value>
using LazyCallback = AnyFunction<void(const V::Sink<Value> &sink)>;

/** Typed (eager) */
template <class Value>
using EagerCallback = AnyFunction<void(const Value &value)>;
} // namespace VOLTISO_NAMESPACE::subscription

#include <v/OFF>
