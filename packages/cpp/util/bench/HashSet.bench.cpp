#include <benchmark/benchmark.h>

#include <voltiso/HashSet>
#include <voltiso/Owned>
#include <voltiso/SplaySet>

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
BENCHMARK(BM_HashSet);

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
BENCHMARK(BM_HashSet_set);

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
BENCHMARK(BM_HashSet_stdUnorderedSet);

static void BM_HashSet_Owned(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  const int numElements = 1000;
  DynamicArray<Owned<int>> array;
  for (int i = 0; i < numElements; ++i) {
    array.push(Owned<int>::create(i));
  }
  HashSet<Owned<int>::Weak> set;
  // const int numOperations = 1000000;
  // while (state.KeepRunningBatch(numOperations)) {
  for (auto _ : state) {
    auto idx = rand() % array.numItems;
    if (rand() % 2 == 0) {
      // Add
      set[*array[idx]].maybeInsert();
    } else {
      // Remove
      set[*array[idx]].maybeErase();
    }
  }
  auto sum = 0;
  for (auto &item : set) {
    sum += item;
  }
  benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_HashSet_Owned);

static void BM_SplaySet_Owned(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  const int numElements = 1000;
  DynamicArray<Owned<int>> array;
  for (int i = 0; i < numElements; ++i) {
    array.push(Owned<int>::create(i));
  }
  SplaySet<Owned<int>::Weak> set;
  // const int numOperations = 1000000;
  // while (state.KeepRunningBatch(numOperations)) {
  for (auto _ : state) {
    auto idx = rand() % array.numItems;
    if (rand() % 2 == 0) {
      // Add
      set[*array[idx]].maybeInsert();
    } else {
      // Remove
      set[*array[idx]].maybeErase();
    }
  }
  auto sum = 0;
  for (auto &item : set) {
    sum += item;
  }
  benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_SplaySet_Owned);
