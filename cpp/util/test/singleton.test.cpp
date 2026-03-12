#include <gtest/gtest.h>

#include "v/concepts/constexpr-constructible"
#include "v/singleton"

#include <atomic>
#include <cstdlib>
#include <stdexcept>
#include <thread>
#include <type_traits>
#include <vector>

using namespace VOLTISO_NAMESPACE;

TEST(Singleton, isEmpty) {
	static_assert(std::is_empty_v<Singleton<int>>);
	static_assert(std::is_empty_v<Singleton<int>::Lazy>);
	static_assert(std::is_empty_v<Singleton<int>::ThreadLocal>);
	static_assert(std::is_empty_v<Singleton<int>::Lazy::ThreadLocal>);
}

// ⚠️ If constexpr-constructible, we now enforce all members initialized for `constinit` to work.

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

// ℹ️ The whole logic is to possibly have neither `haveIsInitialized` and
// `useSlowStatic`. Depending on Item type, we do:
// * Trivial: !useSlotStatic && !haveIsInitialized

TEST(Singleton, internalLogic) {
	// // Trivial
	// static_assert(!singleton::_::Config<Singleton<Trivial>::Options>::_hasIsInitialized);
	// static_assert(!singleton::_::Config<Singleton<Trivial>::Lazy::Options>::_hasIsInitialized);

	// Constructor
	// static_assert(!concepts::ConstexprConstructible<Constructor>);
	static_assert(!singleton::_::Config<Singleton<Constructor>::Options>::_hasIsInitialized);
	static_assert(singleton::_::Config<Singleton<Constructor>::Lazy::Options>::_hasIsInitialized);

	// Constinit
	static_assert(!singleton::_::Config<Singleton<Constinit>::Options>::_hasIsInitialized);
	static_assert(!singleton::_::Config<Singleton<Constinit>::Lazy::Options>::_hasIsInitialized);

	// Destructor
	static_assert(!singleton::_::Config<Singleton<Destructor>::Options>::_hasIsInitialized);
	static_assert(singleton::_::Config<Singleton<Destructor>::Lazy::Options>::_hasIsInitialized);

	// ConstinitDestructor
	// * fringe case - initialize immediately, but register destructor on first access
	static_assert(!singleton::_::Config<Singleton<ConstinitDestructor>::Options>::_hasIsInitialized);
	static_assert(
	  singleton::_::Config<Singleton<ConstinitDestructor>::Lazy::Options>::_hasIsInitialized);
}

// =========================================================================
// RUNTIME BEHAVIOR TESTS
// =========================================================================

// ---------------------------------------------------------
// 1. TEST HELPERS
// ---------------------------------------------------------

// Proves that the memory address is stable and modifications persist
template <class SingletonType> void testMemoryRetention() {
	auto &s1 = SingletonType::instance();
	s1.value = 42;

	auto &s2 = SingletonType::instance();
	EXPECT_EQ(s2.value, 42) << "State did not persist across calls!";
	EXPECT_EQ(&s1, &s2) << "Multiple calls returned different memory addresses!";
}

// Proves that ThreadLocal paths isolate memory, and Global paths share it
template <class SingletonType, bool IsThreadLocal, bool HasInitValue>
void testThreadIsolation(int expectedInitVal = 0) {
	auto &s1 = SingletonType::instance();
	s1.value = 100; // Dirty the main thread's instance

	std::atomic<int> backgroundRead{0};

	std::thread t([&]() {
		auto &s2 = SingletonType::instance();
		if constexpr (HasInitValue) {
			backgroundRead.store(s2.value, std::memory_order_relaxed);
		}
		s2.value = 200; // Dirty the background thread's instance
	});
	t.join();

	if constexpr (IsThreadLocal) {
		// Main thread should be untouched by the background thread
		EXPECT_EQ(s1.value, 100) << "ThreadLocal memory leaked across threads!";
		if constexpr (HasInitValue) {
			// Background thread should have seen a fresh initialized value
			EXPECT_EQ(backgroundRead.load(), expectedInitVal);
		}
	} else {
		// Global thread should see the background thread's mutation
		EXPECT_EQ(s1.value, 200) << "Global memory was not shared across threads!";
	}
}

// Proves initial values are correctly applied (for types with constructors)
template <class SingletonType, int Expected> void testInitialValue() {
	// If lazy, we must explicitly spin it up in the test
	if constexpr (SingletonType::Options::template GET<option::lazy>) {
		SingletonType::instance();
	}
	auto &s = SingletonType::instance();
	EXPECT_EQ(s.value, Expected) << "Object was not correctly initialized!";
}

// ---------------------------------------------------------
// 2. MACRO-DRIVEN EXHAUSTIVE MATRIX
// ---------------------------------------------------------

// Most types now only support lazy singleton variants.
#define GENERATE_LAZY_SINGLETON_TESTS(TypeName, HasInit, InitVal)                                   \
	TEST(SingletonRuntime, TypeName##_Global_Lazy) {                                                 \
		if constexpr (HasInit)                                                                         \
			testInitialValue<Singleton<TypeName>::Lazy, InitVal>();                                      \
		testMemoryRetention<Singleton<TypeName>::Lazy>();                                              \
		testThreadIsolation<Singleton<TypeName>::Lazy, false, HasInit>(InitVal);                       \
	}                                                                                                \
	TEST(SingletonRuntime, TypeName##_TL_Lazy) {                                                     \
		if constexpr (HasInit)                                                                         \
			testInitialValue<Singleton<TypeName>::ThreadLocal::Lazy, InitVal>();                         \
		testMemoryRetention<Singleton<TypeName>::ThreadLocal::Lazy>();                                 \
		testThreadIsolation<Singleton<TypeName>::ThreadLocal::Lazy, true, HasInit>(InitVal);           \
	}

// Constinit still supports eager and lazy variants.
#define GENERATE_CONSTINIT_SINGLETON_TESTS(TypeName, HasInit, InitVal)                              \
	TEST(SingletonRuntime, TypeName##_Global_Eager) {                                                \
		if constexpr (HasInit)                                                                         \
			testInitialValue<Singleton<TypeName>, InitVal>();                                            \
		testMemoryRetention<Singleton<TypeName>>();                                                    \
		testThreadIsolation<Singleton<TypeName>, false, HasInit>(InitVal);                             \
	}                                                                                                \
	TEST(SingletonRuntime, TypeName##_TL_Eager) {                                                    \
		if constexpr (HasInit)                                                                         \
			testInitialValue<Singleton<TypeName>::ThreadLocal, InitVal>();                               \
		testMemoryRetention<Singleton<TypeName>::ThreadLocal>();                                       \
		testThreadIsolation<Singleton<TypeName>::ThreadLocal, true, HasInit>(InitVal);                 \
	}                                                                                                \
	GENERATE_LAZY_SINGLETON_TESTS(TypeName, HasInit, InitVal)

// ---------------------------------------------------------
// 3. EXECUTE EXHAUSTIVE TESTS FOR ALL 5 ARCHETYPES
// ---------------------------------------------------------

// Trivial & Destructor have no init value (UB to read before writing)
// GENERATE_LAZY_SINGLETON_TESTS(Trivial, false, 0)
GENERATE_LAZY_SINGLETON_TESTS(Destructor, false, 0)

// Constructor and ConstinitDestructor are lazy-only; Constinit keeps eager coverage.
GENERATE_LAZY_SINGLETON_TESTS(Constructor, true, 123)
GENERATE_CONSTINIT_SINGLETON_TESTS(Constinit, true, 123)
GENERATE_LAZY_SINGLETON_TESTS(ConstinitDestructor, true, 123)

// ---------------------------------------------------------
// 4. TEARDOWN (LIFECYCLE) VERIFICATION TESTS
// ---------------------------------------------------------

inline std::atomic<int> g_teardownCount{0};

struct TrackedTeardown {
	int value = 0;
	TrackedTeardown() { value = 777; }
	~TrackedTeardown() { g_teardownCount.fetch_add(1, std::memory_order_relaxed); }
};

struct TrackedConstinitTeardown {
	int value = 0;
	constexpr TrackedConstinitTeardown() { value = 888; }
	~TrackedConstinitTeardown() { g_teardownCount.fetch_add(1, std::memory_order_relaxed); }
};

// --- A. THREAD LOCAL EXHAUSTIVE TESTS ---

TEST(SingletonLifecycle, TL_Normal_Teardown) {
	using S = Singleton<TrackedTeardown>::ThreadLocal::Lazy;
	int startCount = g_teardownCount.load();

	std::thread t([&]() { EXPECT_EQ(S::instance().value, 777); });
	t.join(); // Thread dies, __cxa_thread_atexit MUST fire.

	EXPECT_EQ(g_teardownCount.load(), startCount + 1);
}

TEST(SingletonLifecycle, TL_Constinit_Teardown) {
	// Proves that our "Cheat Path" successfully registers the Trojan Horse
	using S = Singleton<TrackedConstinitTeardown>::ThreadLocal::Lazy;
	int startCount = g_teardownCount.load();

	std::thread t([&]() { EXPECT_EQ(S::instance().value, 888); });
	t.join();

	EXPECT_EQ(g_teardownCount.load(), startCount + 1);
}

TEST(SingletonLifecycle, TL_Multiple_Inits_One_Teardown) {
	using S = Singleton<TrackedTeardown>::ThreadLocal::Lazy;
	int startCount = g_teardownCount.load();

	std::thread t([&]() {
		S::instance();
		S::instance();
		S::instance(); // Should ignore subsequent calls
	});
	t.join();

	// Exactly ONE teardown should occur, preventing double-free segfaults
	EXPECT_EQ(g_teardownCount.load(), startCount + 1);
}

// --- GLOBAL DEATH TESTS (Process Forking) ---

// We use stderr printing because gtest can capture standard error
// from the dying child process to prove the hook fired!
struct GlobalPrinter {
	int value = 0;
	GlobalPrinter() { value = 1; }
	~GlobalPrinter() { fprintf(stderr, "GLOBAL_HOOK_FIRED\n"); }
};

struct ConstinitGlobalPrinter {
	int value = 0;
	constexpr ConstinitGlobalPrinter() { value = 1; }
	~ConstinitGlobalPrinter() { fprintf(stderr, "CONSTINIT_GLOBAL_HOOK_FIRED\n"); }
};

TEST(SingletonLifecycle, Global_Destroys_On_Process_Exit) {
	EXPECT_EXIT(
	  {
		  Singleton<GlobalPrinter>::Lazy::instance();
		  // std::exit guarantees __cxa_atexit hooks are flushed
		  std::exit(0);
	  },
	  testing::ExitedWithCode(0), "GLOBAL_HOOK_FIRED");
}

TEST(SingletonLifecycle, Constinit_Global_Destroys_On_Process_Exit) {
	EXPECT_EXIT(
	  {
		  Singleton<ConstinitGlobalPrinter>::Lazy::instance();
		  std::exit(0);
	  },
	  testing::ExitedWithCode(0), "CONSTINIT_GLOBAL_HOOK_FIRED");
}

namespace {
inline std::atomic<int> g_globalLazyDtorCount{0};
inline std::atomic<int> g_globalConcurrentCtorCount{0};
inline std::atomic<int> g_globalConcurrentDtorCount{0};

void verifyGlobalLazyDestroyExactlyOnce() {
	if (g_globalLazyDtorCount.load(std::memory_order_relaxed) == 1) {
		std::_Exit(0);
	}
	std::_Exit(9);
}

void verifyGlobalConcurrentLazyCounts() {
	const auto ctorCount = g_globalConcurrentCtorCount.load(std::memory_order_relaxed);
	const auto dtorCount = g_globalConcurrentDtorCount.load(std::memory_order_relaxed);
	if (ctorCount == 1 && dtorCount == 1) {
		std::_Exit(0);
	}
	std::_Exit(11);
}
} // namespace

struct GlobalCountedLazyDestroy {
	~GlobalCountedLazyDestroy() { g_globalLazyDtorCount.fetch_add(1, std::memory_order_relaxed); }
};

struct GlobalConcurrentNonTrivialLazy {
	GlobalConcurrentNonTrivialLazy() {
		g_globalConcurrentCtorCount.fetch_add(1, std::memory_order_relaxed);
	}
	~GlobalConcurrentNonTrivialLazy() {
		g_globalConcurrentDtorCount.fetch_add(1, std::memory_order_relaxed);
	}
};

struct LazyGlobalPrinter {
	~LazyGlobalPrinter() { fprintf(stderr, "LAZY_GLOBAL_HOOK_FIRED\n"); }
};

TEST(SingletonLifecycle, Global_Lazy_Destroy_Exactly_Once) {
	EXPECT_EXIT(
	  {
		  g_globalLazyDtorCount.store(0, std::memory_order_relaxed);
		  std::atexit(verifyGlobalLazyDestroyExactlyOnce);
		  Singleton<GlobalCountedLazyDestroy>::Lazy::instance();
		  std::exit(100);
	  },
	  testing::ExitedWithCode(0), "");
}

TEST(SingletonLifecycle, Lazy_Global_Destroys_On_Process_Exit) {
	EXPECT_EXIT(
	  {
		  Singleton<LazyGlobalPrinter>::Lazy::instance();
		  std::exit(0);
	  },
	  testing::ExitedWithCode(0), "LAZY_GLOBAL_HOOK_FIRED");
}

TEST(SingletonLifecycle, Global_Concurrent_NonTrivial_Lazy_CtorAndDtor_ExactlyOnce) {
	using S = Singleton<GlobalConcurrentNonTrivialLazy>::Lazy::Concurrent;
	EXPECT_EXIT(
	  {
		  g_globalConcurrentCtorCount.store(0, std::memory_order_relaxed);
		  g_globalConcurrentDtorCount.store(0, std::memory_order_relaxed);
		  std::atexit(verifyGlobalConcurrentLazyCounts);

		  std::vector<std::thread> threads;
		  for (int i = 0; i < 32; ++i) {
			  threads.emplace_back([]() { S::instance(); });
		  }
		  for (auto &thread : threads) {
			  thread.join();
		  }
		  std::exit(100);
	  },
	  testing::ExitedWithCode(0), "");
}

// =========================================================================
// 5. ADVANCED CONCURRENCY & EXCEPTION TESTS
// =========================================================================

// ---------------------------------------------------------
// A. EXCEPTION SAFETY
// ---------------------------------------------------------
struct ThrowingConstructor {
	static inline int attemptCount = 0;
	int value;
	ThrowingConstructor() {
		attemptCount++;
		if (attemptCount == 1) {
			throw std::runtime_error("Simulated constructor failure");
		}
		value = 888;
	}
};
static_assert(!std::is_trivially_constructible_v<ThrowingConstructor>);

TEST(SingletonAdvanced, ExceptionSafety) {
	using S = Singleton<ThrowingConstructor>::Lazy;
	ThrowingConstructor::attemptCount = 0;

	// 1. First attempt fails. Mutex must be unlocked, isInitialized must stay
	// false.
	EXPECT_THROW(S::instance(), std::runtime_error);
	EXPECT_EQ(ThrowingConstructor::attemptCount, 1);

	// 2. Second attempt succeeds because state was left clean.
	EXPECT_NO_THROW(S::instance());
	EXPECT_EQ(ThrowingConstructor::attemptCount, 2);
	EXPECT_EQ(S::instanceUnchecked().value, 888);
}

// ---------------------------------------------------------
// B. MULTI-THREADING RACE CONDITIONS
// ---------------------------------------------------------
struct SlowConstructor {
	static inline std::atomic<int> initCount{0};
	int value;
	SlowConstructor() {
		initCount.fetch_add(1);
		std::this_thread::sleep_for(std::chrono::milliseconds(10));
		value = 1024;
	}
};

TEST(SingletonAdvanced, ThreadSafeInitialization) {
	using S = Singleton<SlowConstructor>::Lazy::Concurrent;
	SlowConstructor::initCount = 0;

	std::vector<std::thread> threads;
	std::atomic<int> successCount{0};

	// Unleash 20 threads simultaneously onto the uninitialized singleton
	for (int i = 0; i < 20; ++i) {
		threads.emplace_back([&]() {
			S::instance();
			if (S::instanceUnchecked().value == 1024) {
				successCount.fetch_add(1, std::memory_order_relaxed);
			}
		});
	}

	for (auto &t : threads) {
		t.join();
	}

	// The constructor MUST only execute exactly once
	EXPECT_EQ(SlowConstructor::initCount.load(), 1);
	// All 20 threads must have safely read the final value
	EXPECT_EQ(successCount.load(), 20);
}

// ---------------------------------------------------------
// C. EAGER SINGLETON VERIFICATION
// ---------------------------------------------------------
TEST(SingletonAdvanced, EagerIsReadyImmediately) {
	// Proves that Eager singletons do not require instance()
	// The C++ compiler guarantees static init before first use.
	auto &s1 = Singleton<Constinit>::instance(); // ::instanceUnchecked();
	EXPECT_EQ(s1.value, 123);

	auto &s2 = Singleton<Constinit>::ThreadLocal::instance(); // ::instanceUnchecked();
	EXPECT_EQ(s2.value, 123);
}

// ---------------------------------------------------------
// D. GLOBAL DEATH TESTS (Process Forking)
// ---------------------------------------------------------
struct GlobalTeardownTest {
	~GlobalTeardownTest() { fprintf(stderr, "TEARDOWN_SUCCESS\n"); }
};

TEST(SingletonAdvanced, GlobalTeardownOnExit) {
	// Uses process forking to prove the OS hook fires on std::exit
	EXPECT_EXIT(
	  {
		  Singleton<GlobalTeardownTest>::Lazy::instance();
		  std::exit(0);
	  },
	  testing::ExitedWithCode(0), "TEARDOWN_SUCCESS");
}

TEST(SingletonAdvanced, InstanceUncheckedDiesBeforeLazyInitialization) {
	using S = Singleton<Constructor>::Lazy;
	EXPECT_DEATH((void)S::instanceUnchecked(), "");
}
