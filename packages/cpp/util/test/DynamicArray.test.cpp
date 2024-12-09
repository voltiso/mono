#include <gtest/gtest.h>

#include <voltiso/DynamicArray>

using namespace VOLTISO_NAMESPACE;

TEST(DynamicArray, defaultInitialized) {
  auto array = DynamicArray<int>::createWithNumItems(1);
  EXPECT_EQ(array[0], 0);
}

TEST(DynamicArray, valueInitialized) {
  auto array = DynamicArray<int>::createWithNumItems(1, 123);
  EXPECT_EQ(array[0], 123);
}

TEST(DynamicArray, initializerList) {
  DynamicArray<int> array = {1, 2};

  EXPECT_EQ(array.numItems, 2);
  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 2);
}

// TEST(DynamicArray, initializerList_movable) {
//   DynamicArray<std::unique_ptr<int>> array = {std::make_unique<int>(1),
//                                               std::make_unique<int>(2)};

//   EXPECT_EQ(array.numItems, 2);
//   EXPECT_EQ(*array[0], 1);
//   EXPECT_EQ(*array[1], 2);
// }

TEST(DynamicArray, assign) {
  auto array = DynamicArray<int>::createWithNumItems(3);
  array = DynamicArray<int>::createWithNumItems(2, 123);

  EXPECT_EQ(array.numItems, 2);
  EXPECT_EQ(array[0], 123);
  EXPECT_EQ(array[1], 123);
}

TEST(DynamicArray, initializerList_assign) {
  auto array = DynamicArray<int>::createWithNumItems(3);
  array = {1, 2, 3};

  EXPECT_EQ(array.numItems, 3);
  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 2);
  EXPECT_EQ(array[2], 3);

  array = {1, 2};
  EXPECT_EQ(array.numItems, 2);
  EXPECT_EQ(array[0], 1);
  EXPECT_EQ(array[1], 2);
}

int numConstructors = 0;
int numDestructors = 0;

struct S {
  int value;
  S(int value) : value(value) { ++numConstructors; }
  ~S() { ++numDestructors; }

  bool operator==(int other) const { return value == other; }
};

template <>
static constexpr auto VOLTISO_NAMESPACE::is_trivially_relocatable<S> = true;

TEST(DynamicArray, inPlace) {
  numConstructors = 0;
  numDestructors = 0;
  using MyArray = DynamicArray<S>::WithInPlace<5>;
  MyArray a;
  EXPECT_EQ(numConstructors, 0);
  EXPECT_EQ(numDestructors, 0);
  EXPECT_EQ(a.numItems, 0);
  EXPECT_EQ(a.numSlots, 5);
  a.push(1);
  EXPECT_EQ(a.numItems, 1);
  EXPECT_EQ(a.numSlots, 5);
  EXPECT_EQ(a[0], 1);
  EXPECT_EQ(numConstructors, 1);
  a.setNumSlots(6);
  EXPECT_EQ(a.numItems, 1);
  EXPECT_EQ(a.numSlots, 6);
  EXPECT_EQ(a[0], 1);
  EXPECT_EQ(numConstructors, 1);
  a.setNumSlots(2);
  EXPECT_EQ(a.numItems, 1);
  EXPECT_EQ(a.numSlots, 2);
  EXPECT_EQ(a[0], 1);
  EXPECT_EQ(numConstructors, 1);
}
