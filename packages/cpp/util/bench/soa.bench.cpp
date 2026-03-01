#include <benchmark/benchmark.h>

#include "v/soa" // Your beautiful utility

#include <vector>

using namespace VOLTISO_NAMESPACE;

constexpr size_t NUM_ITEMS =
  1024 * 1024; // Large enough to stress the CPU cache
constexpr float DT = 0.016f;

// ========================================================================
// 1. Array of Structs (AoS) - The Object-Oriented Way
// ========================================================================

struct AosItem {
	float vx, vy, vz;
	float px, py, pz;
	float qw, qx, qy, qz;

	// The Cache Polluters! (Never accessed in our math loop)
	float transform_matrix[16];
	char name[32];
};

static void BM_soa_AoS(benchmark::State &state) {
	std::vector<AosItem> items(NUM_ITEMS);

	for (auto _ : state) {
		for (size_t i = 0; i < NUM_ITEMS; ++i) {
			items[i].px += items[i].vx * DT;
			items[i].py += items[i].vy * DT;
			items[i].pz += items[i].vz * DT;
		}
		benchmark::DoNotOptimize(items);
	}
}
BENCHMARK(BM_soa_AoS);

// ========================================================================
// 2. Manual Structure of Arrays (Manual SoA) - The Tedious Way
// ========================================================================

struct ManualSoa {
	std::array<float, NUM_ITEMS> vx, vy, vz;
	std::array<float, NUM_ITEMS> px, py, pz;
	std::array<float, NUM_ITEMS> qw, qx, qy, qz;

	std::array<float, NUM_ITEMS * 16> transform_matrix;
	std::array<char, NUM_ITEMS * 32> name;
};

static void BM_soa_ManualSoA(benchmark::State &state) {
	auto storage = std::make_unique<ManualSoa>();

	for (auto _ : state) {
		// The compiler will heavily auto-vectorize these contiguous loops
		for (size_t i = 0; i < NUM_ITEMS; ++i) {
			storage->px[i] += storage->vx[i] * DT;
			storage->py[i] += storage->vy[i] * DT;
			storage->pz[i] += storage->vz[i] * DT;
		}
		benchmark::DoNotOptimize(storage);
	}
}
BENCHMARK(BM_soa_ManualSoA);

// ========================================================================
// 3. Our Utility (Util SoA) - The Masterpiece
// ========================================================================

#define POSITION_FIELDS(X) X(float, x) X(float, y) X(float, z)
VOLTISO_SOA_STRUCT(Position, POSITION_FIELDS)

#define ORIENTATION_FIELDS(X) X(float, w) X(float, x) X(float, y) X(float, z)
VOLTISO_SOA_STRUCT(Orientation, ORIENTATION_FIELDS)

#define VELOCITY_FIELDS(X)                                                     \
	X(float, x)                                                                  \
	X(float, y)                                                                  \
	X(float, z)
VOLTISO_SOA_STRUCT(Velocity, VELOCITY_FIELDS)

#define POSE_FIELDS(X)                                                         \
	X(soa::Flatten<Position>, position)                                          \
	X(soa::Flatten<Orientation>, orientation)
VOLTISO_SOA_STRUCT(Pose, POSE_FIELDS)

using TransformMatrix = std::array<float, 16>;
using NameString = std::array<char, 32>;
#define MYITEM_FIELDS(X)                                                       \
	X(soa::Flatten<Velocity>, velocity)                                          \
	X(soa::Flatten<Pose>, pose)                                                  \
	X(TransformMatrix, transform_matrix)                                         \
	X(NameString, name)
VOLTISO_SOA_STRUCT(MyItem, MYITEM_FIELDS)

static void BM_soa(benchmark::State &state) {
	auto storage = std::make_unique<soa::Array<MyItem, NUM_ITEMS>>();

	for (auto _ : state) {
		for (size_t i = 0; i < NUM_ITEMS; ++i) {
			// Look at how beautiful this syntax is!
			auto item = storage->get(i);
			item.pose.position.x += item.velocity.x * DT;
			item.pose.position.y += item.velocity.y * DT;
			item.pose.position.z += item.velocity.z * DT;
		}
		benchmark::DoNotOptimize(storage);
	}
}
BENCHMARK(BM_soa);
