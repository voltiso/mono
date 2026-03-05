#pragma once
#include <v/_/_>

#include "v/_/const-string-view.forward.hpp"

namespace VOLTISO_NAMESPACE {

template <class T> [[nodiscard]] constexpr auto stringFromType() noexcept {
	return ConstStringView(__PRETTY_FUNCTION__);
} // stringFromType

} // namespace VOLTISO_NAMESPACE
