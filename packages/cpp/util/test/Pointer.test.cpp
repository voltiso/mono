#include <gtest/gtest.h>

#include <voltiso/Owned>
#include <voltiso/Pointer>
#include <voltiso/Shared>

using namespace VOLTISO_NAMESPACE;

struct TestObject final {
  static int numDestructorCalls;
  ~TestObject() { numDestructorCalls += 1; }
  // char data[1024];
};

int TestObject::numDestructorCalls = 0;

TEST(Pointer, owned) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Pointer<TestObject>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Owned<TestObject>::create());
    vec.emplace_back(Owned<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}

TEST(Pointer, owned_to_void) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Pointer<>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Owned<TestObject>::create());
    vec.emplace_back(Owned<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}

TEST(Pointer, shared_to_void) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Pointer<>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Shared<TestObject>::create());
    vec.emplace_back(Shared<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}
