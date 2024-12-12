#pragma once
#include <voltiso/_>

#include "voltiso/Handle"
#include "voltiso/singleton"

#ifndef VOLTISO_DEBUG_MALLOC
#define VOLTISO_DEBUG_MALLOC VOLTISO_DEBUG
#endif

#if VOLTISO_DEBUG_MALLOC
namespace VOLTISO_NAMESPACE::allocator::malloc::_ {
struct Debug;
} // namespace VOLTISO_NAMESPACE::allocator::malloc::_
#endif

//

namespace VOLTISO_NAMESPACE::allocator::malloc {
struct Defaults {
  using Brand = void;
};

using DefaultOptions = Options<Defaults>;

//

template <class _Options> struct Build : public Object<_Options> {
private:
  using Self = Build;
  using Base = Object<_Options>;

protected:
  friend singleton::perThread;

#if VOLTISO_DEBUG_MALLOC
protected:
  _::Debug *_debug;
  Build();
  ~Build();
#else // #if !VOLTISO_DEBUG_MALLOC
protected:
  Build() = default;
#endif

public:
  static constexpr auto &get() { return singleton::perThread::get<Self>(); }

public:
  using Options = _Options;
  using Brand = Options::Brand;
  using Handle = Handle ::Brand_<Self>::template Type_<void *>;

  // `numBytes` must be greater than zero
  Handle allocateBytes(size_t numBytes);

public:
  // `numBytes` must be greater than zero
  // `alignment` must be greater than zero
  Handle allocateBytesAligned(size_t numBytes, size_t alignment);

  void freeBytes(const Handle &handle, size_t oldNumBytes);

  Handle reallocateBytes(const Handle &oldHandle, size_t oldNumBytes,
                         size_t newNumBytes);

  void *operator()(const Handle &handle);
};
} // namespace VOLTISO_NAMESPACE::allocator::malloc

VOLTISO_OBJECT_FINAL(allocator::malloc)

namespace VOLTISO_NAMESPACE::allocator {
using Malloc = malloc::Final<malloc::DefaultOptions>;
} // namespace VOLTISO_NAMESPACE::allocator
