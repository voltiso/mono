#pragma once
#include <v/_/_>

#include "custom.hpp"

#include <v/ON>
namespace V {

//

class Handle : public handle::Custom<> {
	using Base = handle::Custom<>;
	using Self = Handle;
	RELOCATABLE_BODY

public:
	using Base::Base;
}; // class Handle

//

} // namespace V
#include <v/OFF>
