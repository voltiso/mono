#include <gtest/gtest.h>

#include <voltiso/Owned>
#include <voltiso/Ref>
#include <voltiso/Shared>

using namespace VOLTISO_NAMESPACE;

struct TestObject final {
  static int numDestructorCalls;
  ~TestObject() { numDestructorCalls += 1; }
  // char data[1024];

  TestObject() = default;

  TestObject(const TestObject &) = delete;
  TestObject(TestObject &&) = delete;
  TestObject &operator=(const TestObject &) = delete;
  TestObject &operator=(TestObject &&) = delete;
};

int TestObject::numDestructorCalls = 0;

TEST(Ref, owned) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Ref<TestObject>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Owned<TestObject>::create());
    vec.emplace_back(Owned<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}

TEST(Ref, owned_to_void) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Ref<>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Owned<TestObject>::create());
    vec.emplace_back(Owned<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}

TEST(Ref, shared_to_void) {
  TestObject::numDestructorCalls = 0;

  {
    std::vector<Ref<>> vec;
    // std::vector<Owned<>> vec;
    vec.push_back(Shared<TestObject>::create());
    vec.emplace_back(Shared<TestObject>::create());
    EXPECT_EQ(TestObject::numDestructorCalls, 0);
  }

  EXPECT_EQ(TestObject::numDestructorCalls, 2);
}
