#include "v/mutex"

using namespace VOLTISO_NAMESPACE;

static_assert(!std::is_trivially_constructible_v<Mutex>);
static_assert(std::is_trivially_destructible_v<Mutex>);
static_assert(!std::is_trivially_copyable_v<Mutex>);
static_assert(!std::is_trivially_copy_constructible_v<Mutex>);
static_assert(!std::is_trivially_move_constructible_v<Mutex>);
static_assert(!std::is_assignable_v<Mutex, Mutex>);
static_assert(!std::is_move_assignable_v<Mutex>);
