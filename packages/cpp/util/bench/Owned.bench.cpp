#include "v/Owned"

#include <benchmark/benchmark.h>

#include <memory>
#include <string>
#include <vector>

using namespace VOLTISO_NAMESPACE;

// A small test object for benchmarking
struct SmallObject final {
  int value[4];

  explicit SmallObject(int v = 0) {
    for (int i = 0; i < 4; ++i) {
      value[i] = v;
    }
  }
  int getValue() const { return value[0]; }
};

// A large test object with more memory overhead
struct LargeObject final {
  std::vector<int> data;
  std::string name;

  explicit LargeObject(size_t size = 100, const std::string &n = "test")
      : data(size, 1), name(n) {}

  int sum() const {
    int result = 0;
    for (auto val : data)
      result += val;
    return result;
  }
};

//
// Benchmark access performance for Owned
static void BM_Owned_access(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  std::vector<Owned<SmallObject>> ownedObjects;
  ownedObjects.reserve(1000);
  for (int i = 0; i < 1000; ++i) {
    ownedObjects.push_back(Owned<SmallObject>::create(42));
  }

  int result = 0;

  while (state.KeepRunningBatch(1000)) {
    for (int i = 0; i < 1000; ++i) {
      result += ownedObjects[i]->getValue();
    }
    benchmark::DoNotOptimize(result);
  }
}
BENCHMARK(BM_Owned_access);

// Benchmark access performance for std::unique_ptr
static void BM_Owned_access_uniquePtr(benchmark::State &state) {
  std::vector<std::unique_ptr<SmallObject>> ptrObjects;
  ptrObjects.reserve(1000);
  for (int i = 0; i < 1000; ++i) {
    ptrObjects.push_back(std::make_unique<SmallObject>(42));
  }

  int result = 0;

  while (state.KeepRunningBatch(1000)) {
    for (int i = 0; i < 1000; ++i) {
      result += ptrObjects[i]->getValue();
    }
    benchmark::DoNotOptimize(result);
  }
}
BENCHMARK(BM_Owned_access_uniquePtr);

//

// Benchmark move semantics for Owned
static void BM_Owned_move(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  while (state.KeepRunningBatch(1000)) {
    Owned<SmallObject> src = Owned<SmallObject>::create(42);

    for (int i = 0; i < 1000; ++i) {
      Owned<SmallObject> dst = std::move(src);
      benchmark::DoNotOptimize(dst->value);
    }

    benchmark::DoNotOptimize(src);
  }
}
BENCHMARK(BM_Owned_move);

// Benchmark move semantics for std::unique_ptr
static void BM_Owned_move_uniquePtr(benchmark::State &state) {
  while (state.KeepRunningBatch(1000)) {
    std::unique_ptr<SmallObject> src = std::make_unique<SmallObject>(42);

    for (int i = 0; i < 1000; ++i) {
      std::unique_ptr<SmallObject> dst = std::move(src);
      benchmark::DoNotOptimize(dst->value);
    }

    benchmark::DoNotOptimize(src);
  }
}
BENCHMARK(BM_Owned_move_uniquePtr);

//

// Benchmark large object method calls with Owned
static void BM_Owned_largeObjectMethod(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  Owned<LargeObject> owned = Owned<LargeObject>::create(10, "benchmark");
  int result = 0;
  while (state.KeepRunningBatch(1000)) {
    for (int i = 0; i < 1000; ++i) {
      result += owned->sum();
    }
    benchmark::DoNotOptimize(result);
  }
}
BENCHMARK(BM_Owned_largeObjectMethod);

// Benchmark large object method calls with std::unique_ptr
static void BM_Owned_largeObjectMethod_uniquePtr(benchmark::State &state) {
  std::unique_ptr<LargeObject> ptr =
      std::make_unique<LargeObject>(10, "benchmark");
  int result = 0;

  while (state.KeepRunningBatch(1000)) {
    for (int i = 0; i < 1000; ++i) {
      result += ptr->sum();
    }
    benchmark::DoNotOptimize(result);
  }
}
BENCHMARK(BM_Owned_largeObjectMethod_uniquePtr);

//

// Benchmark array of objects with Owned
static void BM_Owned_array(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  const int count = 1000;
  while (state.KeepRunningBatch(count)) {
    std::vector<Owned<SmallObject>> objects;
    // objects.reserve(count);

    for (int i = 0; i < count; ++i) {
      objects.push_back(Owned<SmallObject>::create(i));
    }

    int sum = 0;
    for (const auto &owned : objects) {
      sum += owned->getValue();
    }

    benchmark::DoNotOptimize(sum);
    benchmark::DoNotOptimize(objects);
  }
}
BENCHMARK(BM_Owned_array);

// Benchmark array of objects with std::unique_ptr
static void BM_Owned_array_uniquePtr(benchmark::State &state) {
  const int count = 1000;

  while (state.KeepRunningBatch(count)) {
    std::vector<std::unique_ptr<SmallObject>> objects;
    // objects.reserve(count);

    for (int i = 0; i < count; ++i) {
      objects.push_back(std::make_unique<SmallObject>(i));
    }

    int sum = 0;
    for (const auto &ptr : objects) {
      sum += ptr->getValue();
    }

    benchmark::DoNotOptimize(sum);
    benchmark::DoNotOptimize(objects);
  }
}
BENCHMARK(BM_Owned_array_uniquePtr);
