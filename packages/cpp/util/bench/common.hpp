#pragma once

#include "voltiso/allocator/Malloc"
#include "voltiso/context"

// order may be important
inline auto g_malloc = v::allocator::Malloc();
// auto g_malloc = v::singleton::instance<v::allocator::Malloc>();
inline auto g_mallocGuard = v::context::Guard(g_malloc);
