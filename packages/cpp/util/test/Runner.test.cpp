#include <gtest/gtest.h>

#include <voltiso/Retainer>
#include <voltiso/Runner>
#include <voltiso/context>

using namespace VOLTISO_NAMESPACE;

TEST(Runner, empty) {
  Runner runner;
  runner.loop();
}

TEST(Runner, immediate) {
  Retainer retainer;
  auto retainerGuard = context::Guard(retainer);
  Runner runner;
  int x = 0;
  runner.post([&] { x = 123; });
  EXPECT_EQ(x, 0);
  runner.loop();
  EXPECT_EQ(x, 123);
}

TEST(Runner, immediate_cancel) {
  Retainer retainer;
  auto retainerGuard = context::Guard(retainer);
  Runner runner;
  int x = 0;
  auto task = runner.post([&] { x = 123; });
  EXPECT_EQ(x, 0);
  task->cancel();
  runner.loop();
  EXPECT_EQ(x, 0);
}

//

TEST(Runner, scheduled) {
  Retainer retainer;
  auto retainerGuard = context::Guard(retainer);
  Runner runner;
  int x = 0;
  runner.post({.delay = std::chrono::milliseconds(10)}, [&] { x = 123; });
  EXPECT_EQ(x, 0);
  runner.loop();
  EXPECT_EQ(x, 123);
}

TEST(Runner, scheduled_cancel) {
  Retainer retainer;
  auto retainerGuard = context::Guard(retainer);
  Runner runner;
  int x = 0;
  auto task =
      runner.post({.delay = std::chrono::milliseconds(10)}, [&] { x = 123; });
  EXPECT_EQ(x, 0);
  task->cancel();
  runner.loop();
  EXPECT_EQ(x, 0);
}
