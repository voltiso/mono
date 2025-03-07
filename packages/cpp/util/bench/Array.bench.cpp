#include <benchmark/benchmark.h>

#include <voltiso/Array>
#include <voltiso/Storage>
#include <voltiso/is_trivially_relocatable>
#include <voltiso/min>

#include <iostream>

namespace std {
ostream &operator<<(ostream &os, __int128_t x) {
  os << (int64_t)x; // wrong
  return os;
}
} // namespace std

static constexpr auto MEMORY = 4 * 1024 * 1024;

template <int SIZE, int MEMORY, class Count, int STARTING_INDEX = 0>
static void BM_Array(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  constexpr auto COUNT = min(MEMORY / sizeof(Count),
                             (size_t)std::numeric_limits<Count>::max() - 3);
  while (state.KeepRunningBatch(COUNT)) {
    // LOG(INFO) << "COUNT: " << COUNT;
    using Vec = Array<Count, COUNT>::template WithStartingIndex<STARTING_INDEX>;
    Vec vec = {};
    CHECK_EQ(vec[STARTING_INDEX], 0);
    for (Count i = STARTING_INDEX; i < (Count)(STARTING_INDEX + COUNT); ++i) {
      vec[i] = i;
      auto data = vec.items;
      static_assert(std::is_same_v<decltype(data), Count *>);
      benchmark::DoNotOptimize(data);
      benchmark::ClobberMemory();
    }
    Count sum = 0;
    for (auto &item : vec) {
      sum += item;
    }
    benchmark::DoNotOptimize(sum);
  }
}

template <int SIZE, int MEMORY, class Count>
static void BM_Array_stdArray(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  constexpr auto COUNT = min(MEMORY / sizeof(Count),
                             (size_t)std::numeric_limits<Count>::max() - 3);
  while (state.KeepRunningBatch(COUNT)) {
    std::array<Count, COUNT> vec = {};
    CHECK_EQ(vec[0], 0);
    for (Count i = 0; i < (Count)COUNT; ++i) {
      vec[i] = i;
      auto data = vec.data();
      static_assert(std::is_same_v<decltype(data), Count *>);
      benchmark::DoNotOptimize(data);
      benchmark::ClobberMemory();
    }
    Count sum = 0;
    for (auto &item : vec) {
      sum += item;
    }
    benchmark::DoNotOptimize(sum);
  }
}

BENCHMARK(BM_Array<1, MEMORY, size_t, 1>);

BENCHMARK(BM_Array<1, MEMORY, size_t>);
BENCHMARK(BM_Array_stdArray<1, MEMORY, size_t>);

BENCHMARK(BM_Array<1, MEMORY, int32_t>);
BENCHMARK(BM_Array_stdArray<1, MEMORY, int32_t>);

BENCHMARK(BM_Array<1, MEMORY, int16_t>);
BENCHMARK(BM_Array_stdArray<1, MEMORY, int16_t>);

BENCHMARK(BM_Array<1, MEMORY, int8_t>);
BENCHMARK(BM_Array_stdArray<1, MEMORY, int8_t>);

BENCHMARK(BM_Array<1, MEMORY, __int128_t>);
BENCHMARK(BM_Array_stdArray<1, MEMORY, __int128_t>);
