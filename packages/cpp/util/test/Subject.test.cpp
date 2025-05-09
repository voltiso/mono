#include "v/Subject"

#include <gtest/gtest.h>

using namespace VOLTISO_NAMESPACE;

TEST(Subject, Basic) {
  Retainer retainer;
  auto retainerGuard = context::Guard(retainer);

  Subject<int> subject(42);
  int gotValue = 0;

  subject.subscribe([&](auto &value) { gotValue = value; });

  EXPECT_EQ(gotValue, 0); // not called yet
  subject = 1;
  EXPECT_EQ(gotValue, 1);
}
