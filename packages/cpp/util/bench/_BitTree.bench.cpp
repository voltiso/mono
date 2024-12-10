#include <benchmark/benchmark.h>

#include <voltiso/BitTree>
#include <voltiso/is_trivially_relocatable>
#include <voltiso/min>
#include <voltiso/storage/Storage>

#include <iostream>

static constexpr auto MEMORY = 4 * 1024 * 1024;

static void BM_BitTree(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  constexpr size_t NUM_LEAFS = MEMORY * 8 / 2;
  constexpr size_t NUM_ITERATIONS = 1'000'000;

  while (state.KeepRunningBatch(NUM_ITERATIONS)) {
    auto bitTree = BitTree<bitTree::And, NUM_LEAFS>();
    for (size_t i = 0; i < NUM_ITERATIONS; ++i) {
      bitTree.set(i, i % 2);
      benchmark::DoNotOptimize(sum);
    }
  }
}

BENCHMARK(BM_BitTree);