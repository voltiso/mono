#include <gtest/gtest.h>

#include <v/Singleton>

using namespace VOLTISO_NAMESPACE;

TEST(Singleton, isEmpty) { static_assert(std::is_empty_v<Singleton<int>>); }
