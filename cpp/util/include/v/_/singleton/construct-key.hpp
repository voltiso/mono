#pragma once
#include <v/_/_>

#include "v/concepts/options"

#include <v/ON>

namespace VOLTISO_NAMESPACE::singleton::_ {
template <concepts::Options Options> struct ConstructKeyToken_doNotUseThisDirectly {};
} // namespace VOLTISO_NAMESPACE::singleton::_

namespace VOLTISO_NAMESPACE::singleton {
template <concepts::Options Options> struct ConstructKey {
	constexpr ConstructKey(_::ConstructKeyToken_doNotUseThisDirectly<Options>) noexcept {};
};
} // namespace VOLTISO_NAMESPACE::singleton

#include <v/OFF>
