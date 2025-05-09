#pragma once
#include <v/_/_>

#include "./Malloc.forward.hpp" // IWYU pragma: keep

#include "v/Handle"
#include "v/Object"
#include "v/Singleton"
#include "v/brand/Custom"
#include "v/option/CustomTemplate"

// #include "glog/logging.h"

#include <cstddef>
#include <cstdlib>

#ifndef VOLTISO_DEBUG_MALLOC
	#define VOLTISO_DEBUG_MALLOC VOLTISO_DEBUG
#endif

#if VOLTISO_DEBUG_MALLOC
namespace VOLTISO_NAMESPACE::allocator::malloc::_ {
struct Debug;
} // namespace VOLTISO_NAMESPACE::allocator::malloc::_
#endif

namespace VOLTISO_NAMESPACE::allocator::malloc {

template <class Options>
struct Custom
    : public Object<
        typename Options::template With<option::CustomTemplate<Custom>>> {
private:
	using Base =
	  Object<typename Options::template With<option::CustomTemplate<Custom>>>;

	using Self = Base::Self;

protected:
	// friend Singleton<Self>;
	// friend Singleton<Final>;

#if VOLTISO_DEBUG_MALLOC
protected:
	_::Debug *_debug;
	Custom();
	~Custom();
#else // #if !VOLTISO_DEBUG_MALLOC
protected:
	Custom() = default;
#endif

public:
	static constexpr auto &instance() {
		// std::cout << "Malloc::instance()" << std::endl;
		return Singleton<Self>::instance();
	}

public:
	using Brand = Options::template Get<brand::Custom>;
	using Handle = Handle::WithBrand<Self>::template WithKind<void *>;

	// `numBytes` must be greater than zero
	Handle allocateBytes(size_t numBytes);

public:
	// `numBytes` must be greater than zero
	// `alignment` must be greater than zero
	Handle allocateBytesAligned(size_t numBytes, size_t alignment);

	void freeBytes(const Handle &handle, size_t oldNumBytes);

	Handle reallocateBytes(
	  const Handle &oldHandle, size_t oldNumBytes, size_t newNumBytes);

	void *operator()(const Handle &handle);
};

} // namespace VOLTISO_NAMESPACE::allocator::malloc

// VOLTISO_OBJECT_FINAL(allocator::malloc)

namespace VOLTISO_NAMESPACE::allocator {
struct Malloc final : malloc::Custom<Options<>> {};
} // namespace VOLTISO_NAMESPACE::allocator
