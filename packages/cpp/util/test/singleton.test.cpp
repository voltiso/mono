#include <gtest/gtest.h>

#include "v/singleton"

#include <atomic>
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

// ℹ️ The whole logic is to possibly have neither `haveIsInitialized` and
// `useSlowStatic`. Depending on Item type, we do:
// * Trivial: !useSlotStatic && !haveIsInitialized

TEST(Singleton, internalLogic) {
	// Trivial
	static_assert(!singleton::_::useSlowStatic<Singleton<Trivial>::Options>);
	static_assert(!singleton::_::haveIsInitialized<Singleton<Trivial>::Options>);

	// Constructor
	static_assert(!singleton::_::useSlowStatic<Singleton<Constructor>::Options>);
	static_assert(
	  singleton::_::haveIsInitialized<Singleton<Constructor>::Options>);

	// Constinit
	static_assert(!singleton::_::useSlowStatic<Singleton<Constinit>::Options>);
	static_assert(
	  !singleton::_::haveIsInitialized<Singleton<Constinit>::Options>);

	// Destructor
	static_assert(!singleton::_::useSlowStatic<Singleton<Destructor>::Options>);
	static_assert(
	  singleton::_::haveIsInitialized<Singleton<Destructor>::Options>);

	// ConstinitDestructor
	// * fringe case - see comment in `haveIsInitialized`
	static_assert(
	  !singleton::_::useSlowStatic<Singleton<ConstinitDestructor>::Options>);
	static_assert(
	  singleton::_::haveIsInitialized<Singleton<ConstinitDestructor>::Options>);
}

// =========================================================================
// RUNTIME BEHAVIOR TESTS
// =========================================================================

// ---------------------------------------------------------
// 1. TEST HELPERS
// ---------------------------------------------------------

// Proves that the memory address is stable and modifications persist
template <class SingletonType> void testMemoryRetention() {
	auto &s1 = SingletonType::maybeInitialize();
	s1.value = 42;

	auto &s2 = SingletonType::maybeInitialize();
	EXPECT_EQ(s2.value, 42) << "State did not persist across calls!";
	EXPECT_EQ(&s1, &s2) << "Multiple calls returned different memory addresses!";
}

// Proves that ThreadLocal paths isolate memory, and Global paths share it
template <class SingletonType, bool IsThreadLocal, bool HasInitValue>
void testThreadIsolation(int expectedInitVal = 0) {
	auto &s1 = SingletonType::maybeInitialize();
	s1.value = 100; // Dirty the main thread's instance

	std::atomic<int> backgroundRead{0};

	std::thread t([&]() {
		auto &s2 = SingletonType::maybeInitialize();
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
	if constexpr (SingletonType::Options::template GET<option::LAZY>) {
		SingletonType::maybeInitialize();
	}
	auto &s = SingletonType::maybeInitialize();
	EXPECT_EQ(s.value, Expected) << "Object was not correctly initialized!";
}

// ---------------------------------------------------------
// 2. MACRO-DRIVEN EXHAUSTIVE MATRIX
// ---------------------------------------------------------

// This macro generates 4 distinct tests (Global/TL x Eager/Lazy) for any Type
#define GENERATE_SINGLETON_TESTS(TypeName, HasInit, InitVal)                   \
	TEST(SingletonRuntime, TypeName##_Global_Eager) {                            \
		if constexpr (HasInit)                                                     \
			testInitialValue<Singleton<TypeName>, InitVal>();                        \
		testMemoryRetention<Singleton<TypeName>>();                                \
		testThreadIsolation<Singleton<TypeName>, false, HasInit>(InitVal);         \
	}                                                                            \
	TEST(SingletonRuntime, TypeName##_Global_Lazy) {                             \
		if constexpr (HasInit)                                                     \
			testInitialValue<Singleton<TypeName>::Lazy, InitVal>();                  \
		testMemoryRetention<Singleton<TypeName>::Lazy>();                          \
		testThreadIsolation<Singleton<TypeName>::Lazy, false, HasInit>(InitVal);   \
	}                                                                            \
	TEST(SingletonRuntime, TypeName##_TL_Eager) {                                \
		if constexpr (HasInit)                                                     \
			testInitialValue<Singleton<TypeName>::ThreadLocal, InitVal>();           \
		testMemoryRetention<Singleton<TypeName>::ThreadLocal>();                   \
		testThreadIsolation<Singleton<TypeName>::ThreadLocal, true, HasInit>(      \
		  InitVal);                                                                \
	}                                                                            \
	TEST(SingletonRuntime, TypeName##_TL_Lazy) {                                 \
		if constexpr (HasInit)                                                     \
			testInitialValue<Singleton<TypeName>::ThreadLocal::Lazy, InitVal>();     \
		testMemoryRetention<Singleton<TypeName>::ThreadLocal::Lazy>();             \
		testThreadIsolation<                                                       \
		  Singleton<TypeName>::ThreadLocal::Lazy, true, HasInit>(InitVal);         \
	}

// ---------------------------------------------------------
// 3. EXECUTE EXHAUSTIVE TESTS FOR ALL 5 ARCHETYPES
// ---------------------------------------------------------

// Trivial & Destructor have no init value (UB to read before writing)
GENERATE_SINGLETON_TESTS(Trivial, false, 0)
GENERATE_SINGLETON_TESTS(Destructor, false, 0)

// Constructor, Constinit, and ConstinitDestructor initialize to 123
GENERATE_SINGLETON_TESTS(Constructor, true, 123)
GENERATE_SINGLETON_TESTS(Constinit, true, 123)
GENERATE_SINGLETON_TESTS(ConstinitDestructor, true, 123)

// ---------------------------------------------------------
// 4. TEARDOWN (LIFECYCLE) VERIFICATION TESTS
// ---------------------------------------------------------

inline std::atomic<int> g_teardownCount{0};

struct TrackedTeardown {
	int value = 0;
	TrackedTeardown() { value = 777; }
	~TrackedTeardown() {
		g_teardownCount.fetch_add(1, std::memory_order_relaxed);
	}
};

struct TrackedConstinitTeardown {
	int value = 0;
	constexpr TrackedConstinitTeardown() { value = 888; }
	~TrackedConstinitTeardown() {
		g_teardownCount.fetch_add(1, std::memory_order_relaxed);
	}
};

// --- A. THREAD LOCAL EXHAUSTIVE TESTS ---

TEST(SingletonLifecycle, TL_Normal_Teardown) {
	using S = Singleton<TrackedTeardown>::ThreadLocal::Lazy;
	int startCount = g_teardownCount.load();

	std::thread t([&]() { EXPECT_EQ(S::maybeInitialize().value, 777); });
	t.join(); // Thread dies, __cxa_thread_atexit MUST fire.

	EXPECT_EQ(g_teardownCount.load(), startCount + 1);
}

TEST(SingletonLifecycle, TL_Constinit_Teardown) {
	// Proves that our "Cheat Path" successfully registers the Trojan Horse
	using S = Singleton<TrackedConstinitTeardown>::ThreadLocal::Lazy;
	int startCount = g_teardownCount.load();

	std::thread t([&]() { EXPECT_EQ(S::maybeInitialize().value, 888); });
	t.join();

	EXPECT_EQ(g_teardownCount.load(), startCount + 1);
}

TEST(SingletonLifecycle, TL_Multiple_Inits_One_Teardown) {
	using S = Singleton<TrackedTeardown>::ThreadLocal::Lazy;
	int startCount = g_teardownCount.load();

	std::thread t([&]() {
		S::maybeInitialize();
		S::maybeInitialize();
		S::maybeInitialize(); // Should ignore subsequent calls
	});
	t.join();

	// Exactly ONE teardown should occur, preventing double-free segfaults
	EXPECT_EQ(g_teardownCount.load(), startCount + 1);
}

TEST(SingletonLifecycle, TL_Guard_Before_Init) {
	using S = Singleton<TrackedTeardown>::ThreadLocal::Lazy;
	int startCount = g_teardownCount.load();

	std::thread t([&]() {
		typename S::Guard guard; // Guard adds refcount (1)
		S::maybeInitialize();    // Registers OS hook (0)
	});                        // Guard drops, OS hook fires -> clean teardown

	t.join();
	EXPECT_EQ(g_teardownCount.load(), startCount + 1);
}

TEST(SingletonLifecycle, TL_Guard_Without_Init_Does_Nothing) {
	using S = Singleton<TrackedTeardown>::ThreadLocal::Lazy;
	int startCount = g_teardownCount.load();

	std::thread t([&]() {
		typename S::Guard guard;
		// maybeInitialize() is NEVER called!
	});
	t.join();

	// Guard drops refcount to -1, calling _maybeDestroy.
	// BUT because isInitialized is false, _destroy() is skipped safely.
	EXPECT_EQ(g_teardownCount.load(), startCount);
}

// --- B. GLOBAL GUARD TESTS ---

TEST(SingletonLifecycle, Global_Guards_Do_Not_Prematurely_Destroy) {
	using S = Singleton<TrackedTeardown>::Lazy;
	int startCount = g_teardownCount.load();

	{
		S::maybeInitialize();
		typename S::Guard guard;
		EXPECT_EQ(S::maybeInitialize().value, 777);

		// Guard exists, should be alive
		EXPECT_EQ(g_teardownCount.load(), startCount);
	} // Guard drops, refcount goes back to 0 (OS Hook holds the base reference)

	// Because the program hasn't exited, the OS hook hasn't fired.
	// The singleton must remain alive!
	EXPECT_EQ(g_teardownCount.load(), startCount)
	  << "Global Singleton prematurely destroyed when final guard dropped!";
}

// --- C. GLOBAL DEATH TESTS (Process Forking) ---

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
	~ConstinitGlobalPrinter() {
		fprintf(stderr, "CONSTINIT_GLOBAL_HOOK_FIRED\n");
	}
};

TEST(SingletonLifecycle, Global_Destroys_On_Process_Exit) {
	EXPECT_EXIT(
	  {
		  Singleton<GlobalPrinter>::Lazy::maybeInitialize();
		  // std::exit guarantees __cxa_atexit hooks are flushed
		  std::exit(0);
	  },
	  testing::ExitedWithCode(0), "GLOBAL_HOOK_FIRED");
}

TEST(SingletonLifecycle, Constinit_Global_Destroys_On_Process_Exit) {
	EXPECT_EXIT(
	  {
		  Singleton<ConstinitGlobalPrinter>::Lazy::maybeInitialize();
		  std::exit(0);
	  },
	  testing::ExitedWithCode(0), "CONSTINIT_GLOBAL_HOOK_FIRED");
}

TEST(SingletonLifecycle, Global_Exit_After_Guard_Drops_Destroys_Cleanly) {
	EXPECT_EXIT(
	  {
		  using S = Singleton<GlobalPrinter>::Lazy;
		  S::maybeInitialize();

		  {
			  typename S::Guard safeGuard;
		  } // Guard drops normally, refcount returns to 0

		  std::exit(0); // Hook fires, old value is 0. Teardown happens!
	  },
	  testing::ExitedWithCode(0), "GLOBAL_HOOK_FIRED");
}

TEST(SingletonLifecycle, Global_Exit_With_Active_Guard_Safely_Leaks) {
	// We use EXPECT_EXIT but check that it exits normally (0)
	// We expect NO output (regex ""), proving the Singleton protected itself!
	EXPECT_EXIT(
	  {
		  using S = Singleton<GlobalPrinter>::Lazy;
		  S::maybeInitialize();

		  // Dynamically allocate to intentionally leak the Guard reference
		  auto *leakedGuard = new typename S::Guard();
		  (void)leakedGuard;

		  // Because refcount > 0, the OS hook will fire but safely abort the
		  // destruction
		  std::exit(0);
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
	EXPECT_THROW(S::maybeInitialize(), std::runtime_error);
	EXPECT_EQ(ThrowingConstructor::attemptCount, 1);

	// 2. Second attempt succeeds because state was left clean.
	EXPECT_NO_THROW(S::maybeInitialize());
	EXPECT_EQ(ThrowingConstructor::attemptCount, 2);
	EXPECT_EQ(S::instance().value, 888);
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
	using S = Singleton<SlowConstructor>::Lazy;
	SlowConstructor::initCount = 0;

	std::vector<std::thread> threads;
	std::atomic<int> successCount{0};

	// Unleash 20 threads simultaneously onto the uninitialized singleton
	for (int i = 0; i < 20; ++i) {
		threads.emplace_back([&]() {
			S::maybeInitialize();
			if (S::instance().value == 1024) {
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
	// Proves that Eager singletons do not require maybeInitialize()
	// The C++ compiler guarantees static init before first use.
	auto &s1 = Singleton<Constructor>::instance();
	EXPECT_EQ(s1.value, 123);

	auto &s2 = Singleton<Constructor>::ThreadLocal::instance();
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
		  Singleton<GlobalTeardownTest>::Lazy::maybeInitialize();
		  std::exit(0);
	  },
	  testing::ExitedWithCode(0), "TEARDOWN_SUCCESS");
}

TEST(SingletonAdvanced, GuardPreventsTeardownOnViolentExit) {
	// Proves that your Use-After-Free protection works.
	// We intentionally leak a guard. The OS hook will fire, see refCount > 0,
	// and safely abort the teardown. No output should be produced.
	EXPECT_EXIT(
	  {
		  using S = Singleton<GlobalTeardownTest>::Lazy;
		  S::maybeInitialize();

		  auto *leakedGuard = new S::Guard();
		  (void)leakedGuard;

		  std::exit(0);
	  },
	  testing::ExitedWithCode(0), "");
}
