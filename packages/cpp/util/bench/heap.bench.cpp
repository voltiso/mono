#include <benchmark/benchmark.h>

#include <v/heap>

#include <queue>

using namespace VOLTISO_NAMESPACE;

const int SZ = 1000;

auto rands = []() {
	Array<int, SZ> a;
	for (int i = 0; i < SZ; ++i) {
		a[i] = rand();
	}
	return relocate(a);
}();

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
	while (state.KeepRunningBatch(SZ)) {
		auto offset = rand();
		for (int i = 0; i < SZ; ++i) {
			a.maybeGrowAndPush(rands[i]);
			sum += a.peek();
			if (rands[(i + offset) % SZ] % 2 == 0) {
				a.pop();
			}
		}
	}
	benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_Heap);

static void BM_Heap_stdPriorityQueue(benchmark::State &state) {
	using namespace VOLTISO_NAMESPACE;
	std::priority_queue<int> a;
	int sum = 0;
	while (state.KeepRunningBatch(SZ)) {
		auto offset = rand();
		for (int i = 0; i < SZ; ++i) {
			a.push(rands[i]);
			sum += a.top();
			if (rands[(i + offset) % SZ] % 2 == 0) {
				a.pop();
			}
		}
	}
	benchmark::DoNotOptimize(sum);
}
BENCHMARK(BM_Heap_stdPriorityQueue);
