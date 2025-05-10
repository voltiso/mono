#include <benchmark/benchmark.h>

#include <v/HashSet>
#include <v/Owned>
#include <v/SplaySet>

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
	const int numElements = 1000;
	DynamicArray<int> array;
	for (int i = 0; i < numElements; ++i) {
		array.maybeGrowAndPush(i);
	}
	HashSet<int> set;
	while (state.KeepRunningBatch(numElements)) {
		auto offset = rand();
		for (int idx = 0; idx < numElements; ++idx) {
			if (array[(idx + offset) % numElements] % 2 == 0) {
				// Add
				set(array[idx]).maybeInsert();
			} else {
				// Remove
				set(array[idx]).maybeErase();
			}
		}
	}
	auto sum = 0;
	for (auto &item : set) {
		sum += item;
	}
	benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_HashSet);

static void BM_HashSet_stdUnorderedSet(benchmark::State &state) {
	using namespace VOLTISO_NAMESPACE;
	const int numElements = 1000;
	DynamicArray<int> array;
	for (int i = 0; i < numElements; ++i) {
		array.maybeGrowAndPush(i);
	}
	std::unordered_set<int> set;
	while (state.KeepRunningBatch(numElements)) {
		auto offset = rand();
		for (int idx = 0; idx < numElements; ++idx) {
			if (array[(idx + offset) % numElements] % 2 == 0) {
				// Add
				if (set.find(array[idx]) == set.end()) {
					set.insert(array[idx]);
				}
			} else {
				// Remove
				auto it = set.find(array[idx]);
				if (it != set.end()) {
					set.erase(it);
				}
			}
		}
	}
	auto sum = 0;
	for (auto &item : set) {
		sum += item;
	}
	benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_HashSet_stdUnorderedSet);

static void BM_HashSet_Owned(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  const int numElements = 1000;
  DynamicArray<Owned<int>> array;
  for (int i = 0; i < numElements; ++i) {
		array.maybeGrowAndPush(Owned<int>::create(i));
	}
	HashSet<Owned<int>::Weak> set;
	while (state.KeepRunningBatch(numElements)) {
		auto offset = rand();
		for (int idx = 0; idx < numElements; ++idx) {
			if (array[(idx + offset) % numElements] % 2 == 0) {
				// Add
				set(array[idx]).maybeInsert();
			} else {
				// Remove
				set(array[idx]).maybeErase();
			}
		}
	}
	auto sum = 0;
	for (auto &item : set) {
		sum += item;
	}
	benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_HashSet_Owned);

// !

static void BM_SplaySet_Owned(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  const int numElements = 1000;
  DynamicArray<Owned<int>> array;
  for (int i = 0; i < numElements; ++i) {
		array.maybeGrowAndPush(Owned<int>::create(rand()));
	}
	SplaySet<Owned<int>::Weak> set;
	while (state.KeepRunningBatch(numElements)) {
		auto offset = rand();
		for (int idx = 0; idx < numElements; ++idx) {
			if (array[(idx + offset) % numElements] % 2 == 0) {
				// Add
				set(array[idx]).maybeInsert();
			} else {
				// Remove
				set(array[idx]).maybeErase();
			}
		}
	}
	auto sum = 0;
	for (auto &item : set) {
		sum += item;
	}
	benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_SplaySet_Owned);
