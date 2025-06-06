#include <benchmark/benchmark.h>

#include "v/any-function"

#include <functional>
#include <string>
#include <vector>

using namespace VOLTISO_NAMESPACE;

// Simple function to test function call overhead
int add(int a, int b) noexcept { return a + b; }

// Function with more complex return type
std::string concat(const std::string &a, const std::string &b) { return a + b; }

// For testing with function pointers
using AddFunctionPtr = int (*)(int, int);
using ConcatFunctionPtr =
  std::string (*)(const std::string &, const std::string &);

// Small lambda with capture
auto makeCaptureLambda(int capture_value) {
	return [capture_value](int x) noexcept { return x + capture_value; };
}

// Large capture lambda to test memory overhead
auto makeLargeCaptureLambda(const std::vector<int> &data) {
	return [data](int x) noexcept {
		int sum = 0;
		for (const auto &val : data) {
			sum += val * x;
		}
		return sum;
	};
}

//

static void BM_Function(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	std::vector<AnyFunction<int(int, int)>> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(&add);
	}

	unsigned int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i, i + 1);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function);

// Benchmark for simple function calls
static void BM_Function_raw(benchmark::State &state) {
	std::vector<AnyFunction<int(int, int)>> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(&add);
	}

	unsigned int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i, i + 1);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_raw);

static void BM_Function_stdFunction(benchmark::State &state) {
	std::vector<std::function<int(int, int)>> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(&add);
	}

	unsigned int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i, i + 1);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_stdFunction);

//

static void BM_Function_lambdaCapture(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	std::vector<AnyFunction<int(int)>> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(makeCaptureLambda(42));
	}

	unsigned int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_lambdaCapture);

// Benchmark for lambda with small captures
static void BM_Function_lambdaCapture_raw(benchmark::State &state) {
	std::vector<decltype(makeCaptureLambda(42))> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(makeCaptureLambda(42));
	}

	unsigned int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_lambdaCapture_raw);

static void BM_Function_lambdaCapture_stdFunction(benchmark::State &state) {
	std::vector<std::function<int(int)>> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(makeCaptureLambda(42));
	}

	unsigned int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_lambdaCapture_stdFunction);

//

static void BM_Function_lambdaCaptureLarge(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	std::vector<int> data(100, 1); // Vector with 100 elements
	std::vector<AnyFunction<int(int)>> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(makeLargeCaptureLambda(data));
	}

	int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_lambdaCaptureLarge);

static void BM_Function_lambdaCaptureLarge_raw(benchmark::State &state) {
	std::vector<int> data(100, 1); // Vector with 100 elements
	std::vector<decltype(makeLargeCaptureLambda(data))> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(makeLargeCaptureLambda(data));
	}

	int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_lambdaCaptureLarge_raw);

// Benchmark for lambda with large captures
static void
BM_Function_lambdaLargeCapture_stdFunction(benchmark::State &state) {
	std::vector<int> data(100, 1); // Vector with 100 elements
	std::vector<std::function<int(int)>> fns;
	fns.reserve(1000);
	for (int i = 0; i < 1000; i++) {
		fns.emplace_back(makeLargeCaptureLambda(data));
	}

	int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fns[i](i);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_lambdaLargeCapture_stdFunction);

//

static void BM_Function_creationDestruction(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			AnyFunction<int(int, int)> fn = &add;
			benchmark::DoNotOptimize(&fn);
		}
	}
}
BENCHMARK(BM_Function_creationDestruction);

static void
BM_Function_creationDestruction_stdFunction(benchmark::State &state) {
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			std::function<int(int, int)> fn = &add;
			benchmark::DoNotOptimize(fn);
		}
	}
}
BENCHMARK(BM_Function_creationDestruction_stdFunction);

// Complex object storage and invocation
struct ComplexObject {
	std::vector<int> data;

	ComplexObject(Size size) : data(size, 1) {}

	int compute(int x) const {
		int sum = 0;
		for (auto val : data) {
			sum += val * x;
		}
		return sum;
	}
};

static void BM_Function_complexObjectMethod(benchmark::State &state) {
	// hack
	static bool once = true;
	if (once) {
		once = false;
		std::cout << std::endl;
	}

	ComplexObject obj(50);
	AnyFunction<int(int)> fn = [&obj](int x) noexcept { return obj.compute(x); };
	int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fn(i);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_complexObjectMethod);

static void
BM_Function_complexObjectMethod_stdFunction(benchmark::State &state) {
	ComplexObject obj(50);
	std::function<int(int)> fn = [&obj](int x) noexcept {
		return obj.compute(x);
	};
	int result = 0;
	while (state.KeepRunningBatch(1000)) {
		for (int i = 0; i < 1000; ++i) {
			result += fn(i);
		}
		benchmark::DoNotOptimize(result);
	}
}
BENCHMARK(BM_Function_complexObjectMethod_stdFunction);
