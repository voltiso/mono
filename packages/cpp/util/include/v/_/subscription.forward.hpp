#pragma once

#include "v/any-function"

namespace VOLTISO_NAMESPACE {
template <class Value> class Subscription;
} // namespace VOLTISO_NAMESPACE

namespace VOLTISO_NAMESPACE::subscription {
class Base;
template <class Value> class Subscription;
using Callback = AnyFunction<void()>;
// template <class Value> using Callback = AnyFunction<void(const Value &)>;
} // namespace VOLTISO_NAMESPACE::subscription
