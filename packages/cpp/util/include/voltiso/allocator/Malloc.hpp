#pragma once

#include "Malloc.forward.hpp"

#include "voltiso/Handle"
#include "voltiso/Object"
#include "voltiso/Singleton"
#include "voltiso/getParameter/Type"
#include "voltiso/parameter"

#include <iostream>

#include "glog/logging.h"

#include <cstddef>
#include <cstdlib>

#ifndef VOLTISO_DEBUG_MALLOC
#define VOLTISO_DEBUG_MALLOC 1
#endif

#if VOLTISO_DEBUG_MALLOC
namespace VOLTISO_NAMESPACE::allocator::malloc::_ {
struct Debug;
} // namespace VOLTISO_NAMESPACE::allocator::malloc::_
#endif

namespace VOLTISO_NAMESPACE::allocator::malloc {

template <class Final, class Parameters = std::tuple<>>
struct Custom : public Object<Final> {
private:
  using Base = Object<Final>;
  using Self = Custom;

protected:
  // friend singleton;
  // friend singleton::perThread;

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
    std::cout << "Malloc::instance()" << std::endl;
    return Singleton<Self>::instance();
    // return singleton::perThread::instance<Self>();
  }

public:
  using Brand = getParameter::Type<parameter::Brand, Parameters>;
  using Handle = Handle::WithBrand<Self>::template WithType<void *>;

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

// VOLTISO_OBJECT_FINAL(allocator::malloc)

namespace VOLTISO_NAMESPACE::allocator {
struct Malloc : malloc::Custom<Malloc> {};
} // namespace VOLTISO_NAMESPACE::allocator
