#include "_.hpp"

#include <v/hash-map>
#include <v/splay-map>

// ! `libstdc++` only
// #include <ext/pb_ds/assoc_container.hpp>
// using namespace __gnu_pbds;

static void BM_map_hash(benchmark::State &state) {
	SEPARATOR

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

// ! `libstdc++` only
// static void BM_map_hash_cc(benchmark::State &state) {
// 	cc_hash_table<int, int> a;
// 	int value = 0;
// 	for (auto _ : state) {
// 		a[value] += 1;
// 		int x = a[value];
// 		benchmark::DoNotOptimize(x);
// 		++value;
// 	}
// }
// BENCHMARK(BM_map_hash_cc);

// ! `libstdc++` only
// static void BM_map_hash_gp(benchmark::State &state) {
// 	gp_hash_table<int, int> a;
// 	int value = 0;
// 	for (auto _ : state) {
// 		a[value] += 1;
// 		int x = a[value];
// 		benchmark::DoNotOptimize(x);
// 		++value;
// 	}
// }
// BENCHMARK(BM_map_hash_gp);

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
	NEWLINE

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

// ! `libstdc++` only
// static void BM_map_tree_pbdsRb(benchmark::State &state) {
// 	using MyTree = tree<int, int, std::less<int>, rb_tree_tag,
// null_node_update>; 	MyTree myTree; 	int value = 0; 	for (auto _ : state) {
// 		myTree[value] += 1;
// 		int x = myTree[value];
// 		benchmark::DoNotOptimize(x);
// 		++value;
// 	}
// }
// BENCHMARK(BM_map_tree_pbdsRb);

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
