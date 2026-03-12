#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"

#include "v/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
class Mutex : public mutex::Custom<V::Options<>> {
	using Custom = mutex::Custom<V::Options<>>;
	using Custom::Custom;
};
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
