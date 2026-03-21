#pragma once
#include <v/_/_>

#include "custom.hpp"
#include "forward.hpp"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
class Mutex : public mutex::Custom<> {
	using Custom = mutex::Custom<>;
	using Custom::Custom;
};
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
