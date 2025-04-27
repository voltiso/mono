#include <benchmark/benchmark.h>

#include <voltiso/Heap>

#include <queue>

static void BM_Heap(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  Heap<int> a;
  int sum = 0;
  for (auto _ : state) {
    a.push(rand());
    sum += a.peek();
    if (rand() % 2 == 0) {
      a.pop();
    }
  }
  benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_Heap);

static void BM_Heap_stdPriorityQueue(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  std::priority_queue<int> a;
  int sum = 0;
  for (auto _ : state) {
    a.push(rand());
    sum += a.top();
    if (rand() % 2 == 0) {
      a.pop();
    }
  }
  benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_Heap_stdPriorityQueue);
