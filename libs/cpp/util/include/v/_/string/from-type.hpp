#pragma once
#include <v/_/_>

#include "v/_/const-string-view.forward.hpp"

namespace VOLTISO_NAMESPACE::string {

template <class T> [[nodiscard]] constexpr auto from() noexcept {
	return ConstStringView(__PRETTY_FUNCTION__);
} // stringFromType

} // namespace VOLTISO_NAMESPACE::string
