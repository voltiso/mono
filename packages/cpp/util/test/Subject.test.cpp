#include "voltiso/Subject"

#include <gtest/gtest.h>

using namespace VOLTISO_NAMESPACE;

TEST(Subject, Basic) {
  Subject<int> subject(42);
  int gotValue = 0;

  auto callback = [&](const int &value) {
    gotValue = value;
    //
  };
  static_assert(sizeof(std::function<void(const int &)>) == 8);
  subject.subscribe(std::move(callback));

  EXPECT_EQ(gotValue, 0); // not called yet
  subject = 1;
  EXPECT_EQ(gotValue, 1);
}
