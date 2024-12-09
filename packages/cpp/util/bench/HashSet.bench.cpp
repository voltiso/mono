#include <benchmark/benchmark.h>

#include <voltiso/HashSet>

#include <iostream>
#include <unordered_set>

static void BM_HashSet(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  HashSet<int> a;
  int value = 0;
  for (auto _ : state) {
    if (!a[value].exists) {
      a[value].insert();
    }
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}

static void BM_HashSet_set(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  HashSet<int> a;
  int value = 0;
  for (auto _ : state) {
    a[value].set();
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}

static void BM_HashSet_stdUnorderedSet(benchmark::State &state) {
  std::unordered_set<int> a;
  int value = 0;
  for (auto _ : state) {
    if (a.find(value) == a.end())
      a.insert(value);
    int x = *a.find(value);
    benchmark::DoNotOptimize(x);
    ++value;
  }
}

BENCHMARK(BM_HashSet);
BENCHMARK(BM_HashSet_set);
BENCHMARK(BM_HashSet_stdUnorderedSet);
