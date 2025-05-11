#include <benchmark/benchmark.h>

#include <v/hash-map>
#include <v/splay-map>

#include <ext/pb_ds/assoc_container.hpp>

#include <iostream>
#include <unordered_map>

using namespace __gnu_pbds;

static void BM_map_hash(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  HashMap<int, int> a;
  int value = 0;
  for (auto _ : state) {
		a(value).maybeInsert() += 1;
		int x = a[value];
		benchmark::DoNotOptimize(x);
    ++value;
  }
}
BENCHMARK(BM_map_hash);

// static void BM_map_hash_inPlace(benchmark::State &state) {
//   using namespace VOLTISO_NAMESPACE;
//   HashMap<int, int>::BUCKET_IN_PLACE_<1> a;
//   int value = 0;
//   for (auto _ : state) {
//     a[value].maybeInsert() += 1;
//     int x = a[value];
//     benchmark::DoNotOptimize(x);
//     ++value;
//   }
// }
// BENCHMARK(BM_map_hash_inPlace);

static void BM_map_hash_cc(benchmark::State &state) {
  cc_hash_table<int, int> a;
  int value = 0;
  for (auto _ : state) {
    a[value] += 1;
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}
BENCHMARK(BM_map_hash_cc);

static void BM_map_hash_gp(benchmark::State &state) {
  gp_hash_table<int, int> a;
  int value = 0;
  for (auto _ : state) {
    a[value] += 1;
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}
BENCHMARK(BM_map_hash_gp);

static void BM_map_hash_stdUnorderedMap(benchmark::State &state) {
  std::unordered_map<int, int> a;
  int value = 0;
  for (auto _ : state) {
    a[value] += 1;
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}
BENCHMARK(BM_map_hash_stdUnorderedMap);

//

static void BM_map_tree(benchmark::State &state) {
  // hack
  static bool once = true;
  if (once) {
    once = false;
    std::cout << std::endl;
  }

  using namespace VOLTISO_NAMESPACE;
  SplayMap<int, int> a;
  int key = 0;
  for (auto _ : state) {
		a(key).maybeInsert() += 1;
		int x = a[key];
    benchmark::DoNotOptimize(x);
    ++key;
  }
}
BENCHMARK(BM_map_tree);

static void BM_map_tree_pbdsRb(benchmark::State &state) {
  using MyTree = tree<int, int, std::less<int>, rb_tree_tag, null_node_update>;
  MyTree myTree;
  int value = 0;
  for (auto _ : state) {
    myTree[value] += 1;
    int x = myTree[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}
BENCHMARK(BM_map_tree_pbdsRb);

// ! segfault
// static void BM_SplayMap_pbdsSplay(benchmark::State &state) {
//   using MyTree = tree<int, int, std::less<int>, splay_tree_tag,
//   null_node_update
//                       //  tree_order_statistics_node_update
//                       >;
//   MyTree myTree;
//   int value = 0;
//   for (auto _ : state) {
//     myTree[value] += 1;
//     int x = myTree[value];
//     benchmark::DoNotOptimize(x);
//     ++value;
//   }
// }
// BENCHMARK(BM_SplayMap_pbdsSplay);

static void BM_map_tree_stdMap(benchmark::State &state) {
  std::map<int, int> a;
  int value = 0;
  for (auto _ : state) {
    a[value] += 1;
    int x = a[value];
    benchmark::DoNotOptimize(x);
    ++value;
  }
}
BENCHMARK(BM_map_tree_stdMap);
