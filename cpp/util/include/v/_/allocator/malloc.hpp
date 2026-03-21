#pragma once
#include <v/_/_>

#include "malloc.forward.hpp" // IWYU pragma: keep

#include "v/brand/custom"
#include "v/handle"
#include "v/object"
#include "v/option/custom-template"
#include "v/option/input-options"
#include "v/singleton"

#if VOLTISO_DEBUG_MALLOC
	#include "v/option/lazy"
#endif

#include <v/ON>

#ifndef VOLTISO_DEBUG_MALLOC
	#define VOLTISO_DEBUG_MALLOC VOLTISO_DEBUG
#endif

#if VOLTISO_DEBUG_MALLOC
namespace VOLTISO_NAMESPACE::allocator::malloc::_ {
struct Debug;
} // namespace VOLTISO_NAMESPACE::allocator::malloc::_
#endif

namespace VOLTISO_NAMESPACE::allocator::malloc {

#pragma push_macro("OBJECT")
#define OBJECT                                                                                     \
	Object<typename Options::template WithDefault<                                                   \
	  option::CustomTemplate<Custom>, option::InputOptions<Options>>>

template <is::Options Options> struct RELOCATABLE(Custom) : public OBJECT {
	using Self = Custom;
	RELOCATABLE_BODY
	using Base = OBJECT;
#pragma pop_macro("OBJECT")

protected:
	using Final = Base::Final;
#if VOLTISO_DEBUG_MALLOC
	using SingletonOptions = V::Options<option::Item<Final>, option::lazy<true>>;
#else
	using SingletonOptions = V::Options<option::Item<Final>>;
#endif
	using Singleton = V::singleton::GetCustom<SingletonOptions>;
	using ConstructKey = singleton::ConstructKey<SingletonOptions>;

#if VOLTISO_DEBUG_MALLOC
protected:
	_::Debug *_debug;
	~Custom();
#endif

public:
	// ⚠️ Do not use this directly. It can only be instantiated as a singleton. Use `::instance()`
	// instead.
	constexpr Custom(ConstructKey) noexcept;

public:
	static constexpr auto &instance() noexcept { return Singleton::instance(); }

public:
	using Brand = Options::template Get<brand::Custom>;
	using Handle = Handle::WithBrand<Final>::template WithKind<void *>;

	// `numBytes` must be greater than zero
	Handle allocateBytes(Size numBytes);

public:
	// `numBytes` must be greater than zero
	// `alignment` must be greater than zero
	Handle allocateBytesAligned(Size numBytes, Size alignment);

	void freeBytes(const Handle &handle, Size oldNumBytes);

	Handle reallocateBytes(const Handle &oldHandle, Size oldNumBytes, Size newNumBytes);

	void *operator()(const Handle &handle);
};

} // namespace VOLTISO_NAMESPACE::allocator::malloc

// VOLTISO_OBJECT_FINAL(allocator::malloc)

namespace VOLTISO_NAMESPACE::allocator {
#pragma push_macro("CUSTOM")
#define CUSTOM malloc::Custom<V::Options<option::Final<Malloc>>>
struct RELOCATABLE(Malloc) final : CUSTOM {
	using Custom = CUSTOM;
#pragma pop_macro("CUSTOM")
	using Self = Malloc;
	RELOCATABLE_BODY

public:
	// ⚠️ Do not use this directly. It can only be instantiated as a singleton. Use `::instance()`
	// instead.
	constexpr Malloc(ConstructKey key) : Custom(key) {}
};
} // namespace VOLTISO_NAMESPACE::allocator

#include <v/OFF>
