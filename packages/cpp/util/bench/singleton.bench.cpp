#include <benchmark/benchmark.h>

#include <v/singleton>

using namespace VOLTISO_NAMESPACE;

struct Trivial {
	int value;
};
static_assert(std::is_trivially_constructible_v<Trivial>);
static_assert(concepts::ConstexprConstructible<Trivial>);
static_assert(std::is_trivially_destructible_v<Trivial>);

struct Constructor {
	int value;
	Constructor() { value = 123; }
};
static_assert(!std::is_trivially_constructible_v<Constructor>);
static_assert(!concepts::ConstexprConstructible<Constructor>);
static_assert(std::is_trivially_destructible_v<Constructor>);

struct Constinit {
	int value = 123;
};
static_assert(!std::is_trivially_constructible_v<Constinit>);
static_assert(concepts::ConstexprConstructible<Constinit>);
static_assert(std::is_trivially_destructible_v<Constinit>);

struct Destructor {
	int value;
	~Destructor() { value = 456; }
};
static_assert(!std::is_trivially_constructible_v<Destructor>);
static_assert(!concepts::ConstexprConstructible<Destructor>);
static_assert(!std::is_trivially_destructible_v<Destructor>);

struct ConstinitDestructor {
	int value = 123;
	// constexpr destructor necessary for ConstexprConstructible concept to work:
	constexpr ~ConstinitDestructor() { value = 456; }
};
static_assert(!std::is_trivially_constructible_v<ConstinitDestructor>);
static_assert(concepts::ConstexprConstructible<ConstinitDestructor>);
static_assert(!std::is_trivially_destructible_v<ConstinitDestructor>);

// 1. THE HELPER
template <class AccessFunc>
static void run_bench_loop(benchmark::State &state, AccessFunc func) {
	for (auto _ : state) {
		benchmark::DoNotOptimize(func);
		auto &s = func();
		benchmark::DoNotOptimize(&s);
		auto value = s.value;
		benchmark::DoNotOptimize(value);
		benchmark::ClobberMemory();
	}
}

// ---------------------------------------------------------
// BASELINES
// ---------------------------------------------------------

Trivial _fakeSingleton;
auto &getFakeSingleton() { return _fakeSingleton; }
static void BM_singleton_access_fakeSingleton(benchmark::State &state) {
	run_bench_loop(state, getFakeSingleton);
}
BENCHMARK(BM_singleton_access_fakeSingleton);

template <class T> struct CrudeSingleton {
	static T &initialize() {
		static thread_local T item;
		return item;
	}
};
template <class T>
static void BM_singleton_access_crude(benchmark::State &state) {
	run_bench_loop(state, CrudeSingleton<T>::initialize);
}

template <class T> struct CrudeSingletonMT {
	static T &initialize() {
		static T item;
		return item;
	}
};
template <class T>
static void BM_singleton_access_mt_crude(benchmark::State &state) {
	run_bench_loop(state, CrudeSingletonMT<T>::initialize);
}

// ---------------------------------------------------------
// VOLTISO THREAD-LOCAL
// ---------------------------------------------------------
using namespace VOLTISO_NAMESPACE;

template <class T> static void BM_singleton_access(benchmark::State &state) {
	run_bench_loop(state, Singleton<T>::ThreadLocal::instance);
}

template <class T>
static void BM_singleton_access_lazy(benchmark::State &state) {
	using Singleton = typename Singleton<T>::ThreadLocal::Lazy;
	// add guard just to check if code compiles
	auto _guard = typename Singleton::Guard();
	Singleton::maybeInitialize(); // Pre-init setup
	run_bench_loop(state, Singleton::instance);
}

template <class T>
static void BM_singleton_access_lazy_slow(benchmark::State &state) {
	using Singleton = typename Singleton<T>::ThreadLocal::Lazy;
	// add guard just to check if code compiles
	auto _guard = typename Singleton::Guard();
	run_bench_loop(state, Singleton::maybeInitialize);
}

// ---------------------------------------------------------
// VOLTISO MULTI-THREADED
// ---------------------------------------------------------

template <class T> static void BM_singleton_access_mt(benchmark::State &state) {
	run_bench_loop(state, Singleton<T>::instance);
}

template <class T>
static void BM_singleton_access_mt_lazy(benchmark::State &state) {
	using Singleton = typename Singleton<T>::Lazy;
	// add guard just to check if code compiles
	auto _guard = typename Singleton::Guard();
	Singleton::maybeInitialize(); // Pre-init setup
	run_bench_loop(state, Singleton::instance);
}

template <class T>
static void BM_singleton_access_mt_lazy_slow(benchmark::State &state) {
	using Singleton = typename Singleton<T>::Lazy;
	// add guard just to check if code compiles
	auto _guard = typename Singleton::Guard();
	run_bench_loop(state, Singleton::maybeInitialize);

	// print separator
	static bool once = true;
	if (once) {
		once = false;
		std::cout << "-------------------------------------------------------------"
		             "-----------------------------------"
		          << std::endl;
	}
}

// ---------------------------------------------------------
// REGISTRATION
// ---------------------------------------------------------

#define REGISTER_SINGLETON_BENCHMARKS(T)                                       \
	BENCHMARK_TEMPLATE(BM_singleton_access_crude, T);                            \
	BENCHMARK_TEMPLATE(BM_singleton_access, T);                                  \
	BENCHMARK_TEMPLATE(BM_singleton_access_lazy, T);                             \
	BENCHMARK_TEMPLATE(BM_singleton_access_lazy_slow, T);                        \
	BENCHMARK_TEMPLATE(BM_singleton_access_mt_crude, T);                         \
	BENCHMARK_TEMPLATE(BM_singleton_access_mt, T);                               \
	BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy, T);                          \
	BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy_slow, T)

// using S = Storage<Trivial>::Constexpr;
// constinit S storage;
// static_assert(std::is_trivially_destructible_v<S>);

REGISTER_SINGLETON_BENCHMARKS(Trivial);
REGISTER_SINGLETON_BENCHMARKS(Constructor);
REGISTER_SINGLETON_BENCHMARKS(Constinit);
REGISTER_SINGLETON_BENCHMARKS(Destructor);
REGISTER_SINGLETON_BENCHMARKS(ConstinitDestructor);

#undef REGISTER_SINGLETON_BENCHMARKS
