#include <gtest/gtest.h>

#include <voltiso/Runner>

using namespace VOLTISO_NAMESPACE;

TEST(Runner, empty) {
  Runner runner;
  runner.loop();
}

TEST(Runner, immediate) {
  Runner runner;
  int x = 0;
  auto run = [&] { x = 123; };
  auto task = runner.post(std::move(run));
  EXPECT_EQ(x, 0);
  runner.loop();
  EXPECT_EQ(x, 123);
}

TEST(Runner, scheduled) {
  Runner runner;
  int x = 0;
  runner.post({.delay = std::chrono::milliseconds(10)}, [&] { x = 123; });
  EXPECT_EQ(x, 0);
  runner.loop();
  EXPECT_EQ(x, 123);
}
