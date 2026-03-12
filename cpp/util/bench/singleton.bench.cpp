#include "_.hpp"

#include <v/singleton>

using namespace VOLTISO_NAMESPACE;

// ⚠️ With current design, it's impossible to leave members uninitialized if type is
// constexpr-constructible (for optimization)

// struct Trivial {
// 	int value;
// };
// static_assert(std::is_trivially_constructible_v<Trivial>);
// static_assert(concepts::ConstexprConstructible<Trivial>);
// static_assert(std::is_trivially_destructible_v<Trivial>);

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
template <class AccessFunc> static void run_bench_loop(benchmark::State &state, AccessFunc func) {
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
// NON-SINGLETON (fake)
// ---------------------------------------------------------

Constinit _fakeSingleton;
auto &getFakeSingleton() { return _fakeSingleton; }
static void BM_singleton_access_fakeSingleton(benchmark::State &state) {
	NEWLINE
	run_bench_loop(state, getFakeSingleton);
}
BENCHMARK(BM_singleton_access_fakeSingleton);

// ---------------------------------------------------------
// BASELINES
// ---------------------------------------------------------

template <class T> struct CrudeSingleton {
	static T &instance() {
		static thread_local T item;
		return item;
	}
};
template <class T> static void BM_singleton_access_crude(benchmark::State &state) {
	NEWLINE
	run_bench_loop(state, CrudeSingleton<T>::instance);
}

template <class T> struct CrudeSingletonMT {
	static T &instance() {
		static T item;
		return item;
	}
};
template <class T> static void BM_singleton_access_mt_crude(benchmark::State &state) {
	run_bench_loop(state, CrudeSingletonMT<T>::instance);
}

// ---------------------------------------------------------
// VOLTISO THREAD-LOCAL
// ---------------------------------------------------------
using namespace VOLTISO_NAMESPACE;

template <class T> static void BM_singleton_access(benchmark::State &state) {
	run_bench_loop(state, Singleton<T>::ThreadLocal::instance);
}

template <class T> static void BM_singleton_access_lazy(benchmark::State &state) {
	using Singleton = typename Singleton<T>::ThreadLocal::Lazy;
	Singleton::instance(); // Pre-init setup
	run_bench_loop(state, Singleton::instance);
}

template <class T> static void BM_singleton_access_lazy_slow(benchmark::State &state) {
	using Singleton = typename Singleton<T>::ThreadLocal::Lazy;
	run_bench_loop(state, Singleton::instance);
}

// ---------------------------------------------------------
// VOLTISO MULTI-THREADED
// ---------------------------------------------------------

template <class T> static void BM_singleton_access_mt(benchmark::State &state) {
	run_bench_loop(state, Singleton<T>::instance);
}

template <class T> static void BM_singleton_access_mt_lazy(benchmark::State &state) {
	using Singleton = typename Singleton<T>::Lazy::Concurrent;
	Singleton::instance(); // Pre-init setup
	if constexpr (requires { Singleton::instanceUnchecked(); }) {
		run_bench_loop(state, Singleton::instanceUnchecked);
	} else {
		run_bench_loop(state, Singleton::instance);
	}
	// #pragma clang diagnostic push
	// #pragma clang diagnostic ignored "-Wdeprecated-declarations" // because T can be
	// auto-initialized 	run_bench_loop(state, Singleton::instanceUnchecked); #pragma clang
	// diagnostic pop
}

template <class T> static void BM_singleton_access_mt_lazy_slow(benchmark::State &state) {
	using Singleton = typename Singleton<T>::Concurrent::Lazy;
	run_bench_loop(state, Singleton::instance);
}

// ---------------------------------------------------------
// REGISTRATION
// ---------------------------------------------------------

BENCHMARK_TEMPLATE(BM_singleton_access_crude, Constinit);
BENCHMARK_TEMPLATE(BM_singleton_access, Constinit);
BENCHMARK_TEMPLATE(BM_singleton_access_lazy, Constinit);
BENCHMARK_TEMPLATE(BM_singleton_access_lazy_slow, Constinit);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_crude, Constinit);
BENCHMARK_TEMPLATE(BM_singleton_access_mt, Constinit);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy, Constinit);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy_slow, Constinit);

BENCHMARK_TEMPLATE(BM_singleton_access_crude, Constructor);
// BENCHMARK_TEMPLATE(BM_singleton_access, Constructor);
BENCHMARK_TEMPLATE(BM_singleton_access_lazy, Constructor);
BENCHMARK_TEMPLATE(BM_singleton_access_lazy_slow, Constructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_crude, Constructor);
// BENCHMARK_TEMPLATE(BM_singleton_access_mt, Constructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy, Constructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy_slow, Constructor);

BENCHMARK_TEMPLATE(BM_singleton_access_crude, Destructor);
// BENCHMARK_TEMPLATE(BM_singleton_access, Destructor);
BENCHMARK_TEMPLATE(BM_singleton_access_lazy, Destructor);
BENCHMARK_TEMPLATE(BM_singleton_access_lazy_slow, Destructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_crude, Destructor);
// BENCHMARK_TEMPLATE(BM_singleton_access_mt, Destructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy, Destructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy_slow, Destructor);

BENCHMARK_TEMPLATE(BM_singleton_access_crude, ConstinitDestructor);
// BENCHMARK_TEMPLATE(BM_singleton_access, ConstinitDestructor);
BENCHMARK_TEMPLATE(BM_singleton_access_lazy, ConstinitDestructor);
BENCHMARK_TEMPLATE(BM_singleton_access_lazy_slow, ConstinitDestructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_crude, ConstinitDestructor);
// BENCHMARK_TEMPLATE(BM_singleton_access_mt, ConstinitDestructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy, ConstinitDestructor);
BENCHMARK_TEMPLATE(BM_singleton_access_mt_lazy_slow, ConstinitDestructor);
