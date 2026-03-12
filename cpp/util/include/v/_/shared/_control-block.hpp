#pragma once
#include <v/_/_>

#include "v/empty"
#include "v/pool"
#include "v/singleton"
#include "v/size"

#include <v/ON>

namespace VOLTISO_NAMESPACE::shared::_ {
template <class CanonicalItem, bool CUSTOM_POOL, Size ALIGN> struct alignas(ALIGN) ControlBlock {
	using Pool = Pool<ControlBlock>;

	CanonicalItem item;
	Size numReferences = 1;

	[[no_unique_address]] std::conditional_t<CUSTOM_POOL, Pool &, Empty> _pool;

	template <class... Args>
	  requires(!CUSTOM_POOL)
	ControlBlock(Args &&...args) : item(std::forward<Args>(args)...) {}

	template <class... Args>
	  requires CUSTOM_POOL
	ControlBlock(Pool &pool, Args &&...args) : item(std::forward<Args>(args)...), _pool(pool) {}

	auto &pool() {
		if constexpr (CUSTOM_POOL) {
			return _pool;
		} else {
			return Singleton<Pool>::ThreadLocal::Lazy::instance();
		}
	}

	void dereference() {
		if (--numReferences == 0) [[unlikely]] {
			using Handle = Pool::Handle;
			pool().erase(Handle(this));
		}
	}
}; // struct ControlBlock
} // namespace VOLTISO_NAMESPACE::shared::_

#include <v/OFF>
