#include <benchmark/benchmark.h>

#include <voltiso/DynamicArray>
#include <voltiso/Storage>
#include <voltiso/is_trivially_relocatable>

#include <iostream>

using namespace VOLTISO_NAMESPACE;

// static_assert(std::is_trivially_move_constructible_v<std::unique_ptr<int>>);

// static constexpr auto Size = 1;

// using T = std::aligned_storage_t<Size, Size>;
template <int SIZE> struct Trivial {
  Trivial(int x) {
    data[0] = x;
    // for (auto &element : data) {
    //   element = (x += 1);
    // }
    // data[0] = data[Size - 1];
  }
  uint8_t data[SIZE];
};
static_assert(sizeof(Trivial<123>) == 123);

static_assert(std::is_trivially_copyable_v<Trivial<123>>);
static_assert(is_trivially_relocatable<Trivial<123>>);

static constexpr auto MEMORY = 4 * 1024 * 1024;

template <int SIZE> void BM_DynamicArray(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using T = Trivial<SIZE>;
  int count = MEMORY / sizeof(T);
  while (state.KeepRunningBatch(count)) {
    auto array = DynamicArray<T>();
    for (int i = 0; i < count; ++i) {
      array.push(i);
      auto data = array.slots();
      benchmark::DoNotOptimize(data);
      benchmark::ClobberMemory();
    }
  }
}
template <int N> struct Identity {
  static constexpr auto value = N;
};

template <int SIZE> void BM_DynamicArray_stdVector(benchmark::State &state) {
  using T = Trivial<SIZE>;
  int count = MEMORY / sizeof(T);
  while (state.KeepRunningBatch(count)) {
    auto array = std::vector<T>();
    for (int i = 0; i < count; ++i) {
      array.emplace_back(i);
      auto data = array.data();
      static_assert(std::is_same_v<decltype(data), T *>);
      benchmark::DoNotOptimize(data);
      benchmark::ClobberMemory();
    }
  }
}

//

void BM_DynamicArray_resize(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  using T = Trivial<1>;
  int count = MEMORY / sizeof(T);
  while (state.KeepRunningBatch(count)) {
    auto array = DynamicArray<T>();
    array.setNumItems(count, 123);
    auto data = &array[0].item();
    benchmark::DoNotOptimize(data);
    benchmark::ClobberMemory();
  }
}

void BM_DynamicArray_resize_stdVector(benchmark::State &state) {
  using T = Trivial<1>;
  auto count = MEMORY / sizeof(T);
  while (state.KeepRunningBatch(count)) {
    auto vector = std::vector<T>();
    vector.resize(count, 123);
    auto data = &vector.back();
    benchmark::DoNotOptimize(data);
    benchmark::ClobberMemory();
  }
}

//

int numConstructorCalls = 0;
int numDestructorCalls = 0;

template <int SIZE> struct TriviallyRelocatable {
  ~TriviallyRelocatable() { ++numDestructorCalls; }

  TriviallyRelocatable() { data[0] = 123; }

  TriviallyRelocatable(int x) {
    ++numConstructorCalls;
    data[0] = x;
    // for (auto &element : data) {
    //   element = (x += 1);
    // }
    // data[0] = data[Size - 1];
  }

  TriviallyRelocatable(const TriviallyRelocatable &other) = delete;

  TriviallyRelocatable(TriviallyRelocatable &&other) {
    ++numConstructorCalls;
    // ::memcpy(data, other.data, Size);
    // ::memset(other.data, 0, Size);
  }

  TriviallyRelocatable &operator=(const TriviallyRelocatable &other) = delete;
  TriviallyRelocatable &operator=(TriviallyRelocatable &&other) = delete;

  uint8_t data[SIZE];
};

template <int SIZE>
constexpr auto is_trivially_relocatable<TriviallyRelocatable<SIZE>> = true;

static_assert(sizeof(TriviallyRelocatable<123>) == 123);
static_assert(sizeof(Storage<TriviallyRelocatable<123>>) == 123);

static_assert(!std::is_trivially_destructible_v<TriviallyRelocatable<123>>);
static_assert(
    !std::is_trivially_copy_constructible_v<TriviallyRelocatable<123>>);
static_assert(
    !std::is_trivially_move_constructible_v<TriviallyRelocatable<123>>);

static_assert(is_trivially_relocatable<TriviallyRelocatable<123>>);

//

void BM_DynamicArray_resize_nonTrivial(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using T = TriviallyRelocatable<1>;
  int count = MEMORY / sizeof(T);
  while (state.KeepRunningBatch(1)) {
    auto array = DynamicArray<T>();
    array.setNumItems(count);
    auto data = &array[0].item();
    benchmark::DoNotOptimize(data);
    benchmark::ClobberMemory();
  }
}

void BM_DynamicArray_resize_nonTrivial_stdVector(benchmark::State &state) {
  using T = TriviallyRelocatable<1>;
  auto count = MEMORY / sizeof(T);
  while (state.KeepRunningBatch(1)) {
    auto vector = std::vector<T>();
    vector.resize(count);
    auto data = vector.data();
    benchmark::DoNotOptimize(data);
    benchmark::ClobberMemory();
  }
}

//

template <int SIZE>
static void BM_DynamicArray_nonTrivial(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  using T = TriviallyRelocatable<SIZE>;
  int count = MEMORY / sizeof(T);
  numConstructorCalls = 0;
  numDestructorCalls = 0;

  while (state.KeepRunningBatch(count)) {
    auto array = DynamicArray<T>();
    int x = 1;
    for (int i = 0; i < count; ++i) {
      x = (x * x * 7 + x * 3 + 13) % 71;
      array.push(x);
      auto data = array.slots();
      benchmark::DoNotOptimize(data);
      benchmark::ClobberMemory();
    }
    auto sum = 0;
    for (auto &element : array) {
      sum += element.data[0];
    }
    benchmark::DoNotOptimize(sum);
  }

  CHECK_EQ(numConstructorCalls, numDestructorCalls);
}

//

template <int SIZE>
void BM_DynamicArray_nonTrivial_stdVector(benchmark::State &state) {
  using namespace VOLTISO_NAMESPACE;
  using T = TriviallyRelocatable<SIZE>;
  int count = MEMORY / sizeof(T);
  numConstructorCalls = 0;
  numDestructorCalls = 0;

  while (state.KeepRunningBatch(count)) {
    auto vector = std::vector<T>();
    int x = 1;
    for (int i = 0; i < count; ++i) {
      x = (x * x * 7 + x * 3 + 13) % 71;
      vector.emplace_back(x);
      auto data = vector.data();
      benchmark::DoNotOptimize(data);
      benchmark::ClobberMemory();
    }
    auto sum = 0;
    for (auto &element : vector) {
      sum += element.data[0];
    }
    benchmark::DoNotOptimize(sum);
  }

  CHECK_EQ(numConstructorCalls, numDestructorCalls);
}

//

BENCHMARK(BM_DynamicArray_resize);
BENCHMARK(BM_DynamicArray_resize_stdVector);

BENCHMARK(BM_DynamicArray_resize_nonTrivial);
BENCHMARK(BM_DynamicArray_resize_nonTrivial_stdVector);

// //

BENCHMARK(BM_DynamicArray<1>);
BENCHMARK(BM_DynamicArray_stdVector<1>);

BENCHMARK(BM_DynamicArray<16>);
BENCHMARK(BM_DynamicArray_stdVector<16>);

BENCHMARK(BM_DynamicArray<1024>);
BENCHMARK(BM_DynamicArray_stdVector<1024>);

// //

BENCHMARK(BM_DynamicArray_nonTrivial<1>);
BENCHMARK(BM_DynamicArray_nonTrivial_stdVector<1>);

BENCHMARK(BM_DynamicArray_nonTrivial<16>);
BENCHMARK(BM_DynamicArray_nonTrivial_stdVector<16>);

BENCHMARK(BM_DynamicArray_nonTrivial<1024>);
BENCHMARK(BM_DynamicArray_nonTrivial_stdVector<1024>);
