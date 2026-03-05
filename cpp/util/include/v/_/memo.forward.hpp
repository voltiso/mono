#pragma once

#include <cstddef>
#include <limits>

namespace VOLTISO_NAMESPACE::memo {
using NumDeps = Size;
class MemoBase;
} // namespace VOLTISO_NAMESPACE::memo

namespace VOLTISO_NAMESPACE {
template <
  class Value,
  memo::NumDeps NUM_DEPS = std::numeric_limits<memo::NumDeps>::max()>
class Memo;
} // namespace VOLTISO_NAMESPACE
