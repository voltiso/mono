#include <benchmark/benchmark.h>

#include <voltiso/HashMap>

#include <ext/pb_ds/assoc_container.hpp>

#include <iostream>
#include <unordered_map>

using namespace __gnu_pbds;

static void BM_HashMap(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  HashMap<int, int> a;
  int value = 0;
  for (auto _ : state) {
    a[value].maybeInsert() += 1;
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}

static void BM_HashMap_cc(benchmark::State &state) {
  cc_hash_table<int, int> a;
  int value = 0;
  for (auto _ : state) {
    a[value] += 1;
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}

static void BM_HashMap_gp(benchmark::State &state) {
  gp_hash_table<int, int> a;
  int value = 0;
  for (auto _ : state) {
    a[value] += 1;
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}

static void BM_HashMap_stdUnorderedMap(benchmark::State &state) {
  std::unordered_map<int, int> a;
  int value = 0;
  for (auto _ : state) {
    a[value] += 1;
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}

BENCHMARK(BM_HashMap);
BENCHMARK(BM_HashMap_cc);
BENCHMARK(BM_HashMap_gp);
BENCHMARK(BM_HashMap_stdUnorderedMap);
