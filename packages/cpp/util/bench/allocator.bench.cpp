#include <benchmark/benchmark.h>

#include <voltiso/Pool>
#include <voltiso/Singleton>
// #include <voltiso/allocator/Splay>

#include <cstddef>
#include <iostream>

//

// order may be important
// auto g_malloc = v::allocator::Malloc();
// auto g_mallocGuard = v::context::Guard(g_malloc);

//

static constexpr auto SIZE = 32;
using T = std::array<std::byte, SIZE>;
static_assert(sizeof(T) == SIZE);

static void BM_allocator_trivial_Pool(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  Pool<T> pool;
  for (auto _ : state) {
    auto handle = pool.insert().handle;
    benchmark::DoNotOptimize(handle);
    pool[handle].erase();
  }
}
BENCHMARK(BM_allocator_trivial_Pool);

// static void BM_allocator_trivial_Pool_dynamic(benchmark::State &state) {
//   using namespace VOLTISO_NAMESPACE;
//   pool::Virtual pool;
//   for (auto _ : state) {
//     auto handle = pool.insert();
//     benchmark::DoNotOptimize(pool[handle]);
//     pool[handle].erase();
//   }
// }

// static void BM_allocator_trivial_Splay(benchmark::State &state) {
//   using namespace VOLTISO_NAMESPACE;
//   // auto &splay = g_splay;
//   auto &splay = allocator::Splay::instance();
//   for (auto _ : state) {
//     auto handle = splay.allocateBytes(sizeof(T));
//     benchmark::DoNotOptimize(splay(handle));
//     splay.freeBytes(handle, sizeof(T));
//   }
// }
// BENCHMARK(BM_allocator_trivial_Splay);

static void BM_allocator_trivial_malloc(benchmark::State &state) {
  for (auto _ : state) {
    auto ptr = std::malloc(sizeof(T));
    benchmark::DoNotOptimize(ptr);
    std::free(ptr);
  }
}
BENCHMARK(BM_allocator_trivial_malloc);

static void BM_allocator_trivial_alignedAlloc(benchmark::State &state) {
  for (auto _ : state) {
    auto ptr = std::aligned_alloc(sizeof(T), sizeof(T));
    benchmark::DoNotOptimize(ptr);
    std::free(ptr);
  }
}
BENCHMARK(BM_allocator_trivial_alignedAlloc);

static void BM_allocator_trivial_new(benchmark::State &state) {
  for (auto _ : state) {
    auto ptr = new T;
    benchmark::DoNotOptimize(ptr);
    delete ptr;
  }
}
BENCHMARK(BM_allocator_trivial_new);

//

static auto num = 1024 * 10;

static void BM_allocator_simple_Pool(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  Pool<T> pool;
  for (int i = 0; i < num; i++) {
    auto handle = pool.insert().handle;
    benchmark::DoNotOptimize(handle);
  }
  auto prev = pool.insert().handle;
  for (auto _ : state) {
    auto handle = pool.insert().handle;
    benchmark::DoNotOptimize(handle);
    pool[prev].erase();
    prev = handle;
  }
}
BENCHMARK(BM_allocator_simple_Pool);

// static void BM_allocator_simple_Splay(benchmark::State &state) {
//   using namespace VOLTISO_NAMESPACE;
//   auto &splay = allocator::Splay::instance();
//   // auto &splay = g_splay;
//   for (int i = 0; i < num; i++) {
//     auto handle = splay.allocateBytes(sizeof(T));
//     benchmark::DoNotOptimize(splay(handle));
//   }
//   auto prev = splay.allocateBytes(sizeof(T));
//   for (auto _ : state) {
//     auto handle = splay.allocateBytes(sizeof(T));
//     benchmark::DoNotOptimize(splay(handle));
//     splay.freeBytes(prev, sizeof(T));
//     prev = handle;
//   }
// }
// BENCHMARK(BM_allocator_simple_Splay);

static void BM_allocator_simple_malloc(benchmark::State &state) {
  for (int i = 0; i < num; i++) {
    auto ptr = (T *)std::malloc(sizeof(T));
    benchmark::DoNotOptimize(*ptr);
  }
  auto prev = (T *)std::malloc(sizeof(T));
  for (auto _ : state) {
    auto ptr = (T *)std::malloc(sizeof(T));
    benchmark::DoNotOptimize(*ptr);
    std::free(prev);
    prev = ptr;
  }
}
BENCHMARK(BM_allocator_simple_malloc);

static void BM_allocator_simple_alignedAlloc(benchmark::State &state) {
  for (int i = 0; i < num; i++) {
    auto ptr = (T *)std::aligned_alloc(sizeof(T), sizeof(T));
    // auto ptr = (T *)std::aligned_alloc(sizeof(std::max_align_t), sizeof(T));
    benchmark::DoNotOptimize(ptr);
  }
  auto prev = (T *)std::malloc(sizeof(T));
  for (auto _ : state) {
    auto ptr = (T *)std::malloc(sizeof(T));
    benchmark::DoNotOptimize(*ptr);
    std::free(prev);
    prev = ptr;
  }
}
BENCHMARK(BM_allocator_simple_alignedAlloc);

static void BM_allocator_simple_new(benchmark::State &state) {
  for (int i = 0; i < num; i++) {
    auto ptr = new T;
    benchmark::DoNotOptimize(*ptr);
  }
  auto prev = new T;
  for (auto _ : state) {
    auto ptr = new T;
    benchmark::DoNotOptimize(*ptr);
    delete prev;
    prev = ptr;
  }
}
BENCHMARK(BM_allocator_simple_new);
