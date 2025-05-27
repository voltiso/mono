#include <gtest/gtest.h>

#include <v/context>
#include <v/retainer>
#include <v/runner>

using namespace VOLTISO_NAMESPACE;

TEST(Runner, empty) {
	Runner runner;
	runner.processAllTasksSync();
}

TEST(Runner, immediate) {
	Retainer retainer;
	auto retainerGuard = context::Guard(retainer);
	Runner runner;
	int x = 0;
	runner.post([&] { x = 123; });
	EXPECT_EQ(x, 0);
	runner.processAllTasksSync();
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
	runner.processAllTasksSync();
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
	runner.processAllTasksSync();
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
	runner.processAllTasksSync();
	EXPECT_EQ(x, 0);
}
