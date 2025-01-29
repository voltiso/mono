#include <gtest/gtest.h>

#include <benchmark/benchmark.h>

#include <voltiso/context>

using namespace VOLTISO_NAMESPACE;

TEST(context, runWith) {
  EXPECT_THROW(context::get<int>(), std::runtime_error);

  // EXPECT_EXIT(
  //     {
  //       auto value = context::get<int>();
  //       benchmark::DoNotOptimize(value);
  //     },
  //     testing::KilledBySignal(SIGSEGV), ".*");

  // EXPECT_EXIT(context::get<int>(), ::testing::KilledBySignal(SIGSEGV), ".*");

  auto numInvocations = 0;
  context::runWith<int>(123, [&]() {
    EXPECT_EQ(context::get<int>(), 123);
    numInvocations += 1;
  });

  EXPECT_EQ(numInvocations, 1);

  // EXPECT_THROW(context::get<int>(), std::runtime_error);

  // EXPECT_EXIT(
  //     {
  //       auto value = context::get<int>();
  //       benchmark::DoNotOptimize(value);
  //     },
  //     testing::KilledBySignal(SIGSEGV), ".*");
}
