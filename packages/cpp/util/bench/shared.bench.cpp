#include <benchmark/benchmark.h>

#include "v/shared"

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

	explicit LargeObject(Size size = 100, const std::string &n = "test")
	    : data(size, 1), name(n) {}

	int sum() const {
		int result = 0;
		for (auto val : data) {
			result += val;
		}
		return result;
	}
};

// Benchmark access performance for Shared
static void BM_Shared_access(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	std::vector<Shared<SmallObject>> sharedObjects;
	sharedObjects.reserve(1000);
	for (int i = 0; i < 1000; ++i) {
		sharedObjects.push_back(Shared<SmallObject>::create(42));
	}

	int result = 0;

	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += sharedObjects[i]->getValue();
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Shared_access);

// Benchmark access performance for std::shared_ptr
static void BM_Shared_access_sharedPtr(benchmark::State &state) {
	std::vector<std::shared_ptr<SmallObject>> ptrObjects;
	ptrObjects.reserve(1000);
	for (int i = 0; i < 1000; ++i) {
		ptrObjects.push_back(std::make_shared<SmallObject>(42));
	}

	int result = 0;

	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += ptrObjects[i]->getValue();
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Shared_access_sharedPtr);

// Benchmark copy performance for Shared
static void BM_Shared_copy(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	while (state.KeepRunningBatch(1000)) {
		std::vector<Shared<SmallObject>> sources;
		sources.reserve(2);
		sources.push_back(Shared<SmallObject>::create(42));
		sources.push_back(Shared<SmallObject>::create(24));

		for (int i = 0; i < 1000; ++i) {
			Shared<SmallObject> dst =
			  sources[i % 2]; // Alternate between two different sources
			benchmark::DoNotOptimize(dst->value);
		}
	}
}
BENCHMARK(BM_Shared_copy);

// Benchmark copy performance for std::shared_ptr
static void BM_Shared_copy_sharedPtr(benchmark::State &state) {
	while (state.KeepRunningBatch(1000)) {
		std::vector<std::shared_ptr<SmallObject>> sources;
		sources.reserve(2);
		sources.push_back(std::make_shared<SmallObject>(42));
		sources.push_back(std::make_shared<SmallObject>(24));

		for (int i = 0; i < 1000; ++i) {
			std::shared_ptr<SmallObject> dst =
			  sources[i % 2]; // Alternate between two different sources
			benchmark::DoNotOptimize(dst->value);
		}
	}
}
BENCHMARK(BM_Shared_copy_sharedPtr);

// Benchmark reference counting performance for Shared
static void BM_Shared_refCount(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	while (state.KeepRunningBatch(1000)) {
		std::vector<Shared<SmallObject>> copies;
		copies.reserve(100);

		auto original = Shared<SmallObject>::create(42);

		for (int i = 0; i < 100; ++i) {
			copies.push_back(original); // Increment ref count
		}

		benchmark::DoNotOptimize(copies);
		// Vector destruction will decrement ref counts
	}
}
BENCHMARK(BM_Shared_refCount);

// Benchmark reference counting performance for std::shared_ptr
static void BM_Shared_refCount_sharedPtr(benchmark::State &state) {
	while (state.KeepRunningBatch(1000)) {
		std::vector<std::shared_ptr<SmallObject>> copies;
		copies.reserve(100);

		auto original = std::make_shared<SmallObject>(42);

		for (int i = 0; i < 100; ++i) {
			copies.push_back(original); // Increment ref count
		}

		benchmark::DoNotOptimize(copies);
		// Vector destruction will decrement ref counts
	}
}
BENCHMARK(BM_Shared_refCount_sharedPtr);

// Benchmark large object method calls with Shared
static void BM_Shared_largeObjectMethod(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	Shared<LargeObject> shared = Shared<LargeObject>::create(10, "benchmark");
	int result = 0;

	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += shared->sum();
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Shared_largeObjectMethod);

// Benchmark large object method calls with std::shared_ptr
static void BM_Shared_largeObjectMethod_sharedPtr(benchmark::State &state) {
	std::shared_ptr<LargeObject> ptr =
	  std::make_shared<LargeObject>(10, "benchmark");
	int result = 0;

	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += ptr->sum();
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Shared_largeObjectMethod_sharedPtr);
