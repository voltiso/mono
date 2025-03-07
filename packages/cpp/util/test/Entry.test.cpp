#include "voltiso/Entry"

// #include "gtest/gtest.h"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_same_v<GetKey<Entry<int, char>>, int>);
static_assert(std::is_same_v<GetValue<Entry<int, char>>, char>);
