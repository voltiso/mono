#include "voltiso/BitArray"
#include "voltiso/Storage"

#include "gtest/gtest.h"

#include <limits>

using namespace VOLTISO_NAMESPACE;

TEST(BitArray, uninitialized) {
  Storage<BitArray<30>> array;
  *(std::uintmax_t *)&array = std::numeric_limits<std::uintmax_t>::max();

  new (&array) BitArray<30>;
  EXPECT_EQ(array.item()[0], 1);
  EXPECT_EQ(array.item()[29], 1);
  EXPECT_EQ(array.item()[63], 1);
}

TEST(BitArray, defaultInitialized) {
  Storage<BitArray<30>> array;
  *(std::uintmax_t *)&array = std::numeric_limits<std::uintmax_t>::max();

  new (&array) BitArray<30>{};
  EXPECT_EQ(array.item()[0], 0);
  EXPECT_EQ(array.item()[29], 0);
}

TEST(BitArray, initializerList) {
  BitArray<128> array = {1, 1};

  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 1);
  EXPECT_EQ(array[2], 0);
  EXPECT_EQ(array[64], 0);
  EXPECT_EQ(array[127], 0);
}

TEST(BitArray, assignBit) {
  BitArray<128> array = {};

  array[0] = 0;
  array[1] = 0;
  array[2] = 1;
  array[64] = 1;
  array[127] = 1;

  EXPECT_EQ(array[0], 0);
  EXPECT_EQ(array[1], 0);
  EXPECT_EQ(array[2], 1);
  EXPECT_EQ(array[63], 0);
  EXPECT_EQ(array[64], 1);
  EXPECT_EQ(array[126], 0);
  EXPECT_EQ(array[127], 1);
}

TEST(BitArray, fill) {
  BitArray<128> array = {};

  for (std::size_t i = 0; i < 128; ++i) {
    EXPECT_EQ(array[i], 0);
  }

  array.fill(1);

  for (std::size_t i = 0; i < 128; ++i) {
    EXPECT_EQ(array[i], 1);
  }

  array.fill(0);

  for (std::size_t i = 0; i < 128; ++i) {
    EXPECT_EQ(array[i], 0);
  }
}

TEST(BitArray, fill_narrow) {
  BitArray<64 * 3> array = {};
  for (std::size_t i = 0; i < 64 * 3; ++i) {
    EXPECT_EQ(array[i], 0);
  }

  array.fill(1, 64 + 10, 64 * 2 - 10);
  array.fill(0, 64 + 20, 64 * 2 - 20);

  for (std::size_t i = 0; i < 64 + 10; ++i) {
    EXPECT_EQ(array[i], 0) << i;
  }
  for (std::size_t i = 64 + 10; i < 64 + 20; ++i) {
    EXPECT_EQ(array[i], 1) << i;
  }
  for (std::size_t i = 64 + 20; i < 64 * 2 - 20; ++i) {
    EXPECT_EQ(array[i], 0) << i;
  }
  for (std::size_t i = 64 * 2 - 20; i < 64 * 2 - 10; ++i) {
    EXPECT_EQ(array[i], 1) << i;
  }
  for (std::size_t i = 64 * 2 - 10; i < 64 * 3; ++i) {
    EXPECT_EQ(array[i], 0) << i;
  }
}

TEST(BitArray, fill_wide) {
  BitArray<64 * 3> array = {};

  array.fill(1, 10, 64 * 3 - 10);
  array.fill(0, 20, 64 * 3 - 20);

  for (std::size_t i = 0; i < 10; ++i) {
    EXPECT_EQ(array[i], 0);
  }
  for (std::size_t i = 10; i < 20; ++i) {
    EXPECT_EQ(array[i], 1);
  }
  for (std::size_t i = 20; i < 64 * 3 - 20; ++i) {
    EXPECT_EQ(array[i], 0);
  }
  for (std::size_t i = 64 * 3 - 20; i < 64 * 3 - 10; ++i) {
    EXPECT_EQ(array[i], 1);
  }
  for (std::size_t i = 64 * 3 - 10; i < 64 * 3; ++i) {
    EXPECT_EQ(array[i], 0);
  }
}
