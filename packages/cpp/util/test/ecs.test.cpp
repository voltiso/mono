#include <gtest/gtest.h>

#include "v/_/ecs/world.hpp"
#include "v/ecs/world"

using namespace VOLTISO_NAMESPACE;

namespace {
struct Position {
	int x;
	int y;
};

struct Velocity {
	int dx;
	int dy;
};
} // namespace

TEST(Ecs, createDestroy) {
	ecs::World world;
	auto e = world.create();
	EXPECT_TRUE(world.alive(e));

	world.destroy(e);
	EXPECT_FALSE(world.alive(e));
}

TEST(Ecs, addGetRemove) {
	ecs::World world;
	auto e = world.create();
	EXPECT_FALSE(world.has<Position>(e));

	world.emplace<Position>(e, Position{1, 2});
	EXPECT_TRUE(world.has<Position>(e));

	auto *p = world.get<Position>(e);
	ASSERT_NE(p, nullptr);
	EXPECT_EQ(p->x, 1);
	EXPECT_EQ(p->y, 2);

	world.remove<Position>(e);
	EXPECT_FALSE(world.has<Position>(e));
	EXPECT_EQ(world.get<Position>(e), nullptr);
}

TEST(Ecs, eachJoin) {
	ecs::World world;
	auto e1 = world.create();
	auto e2 = world.create();

	world.emplace<Position>(e1, Position{1, 2});
	world.emplace<Position>(e2, Position{3, 4});
	world.emplace<Velocity>(e2, Velocity{10, 20});

	int count = 0;
	world.each<Position, Velocity>([&](ecs::Entity, Position &p, Velocity &v) {
		++count;
		p.x += v.dx;
		p.y += v.dy;
	});

	EXPECT_EQ(count, 1);
	EXPECT_EQ(world.get<Position>(e1)->x, 1);
	EXPECT_EQ(world.get<Position>(e1)->y, 2);

	EXPECT_EQ(world.get<Position>(e2)->x, 13);
	EXPECT_EQ(world.get<Position>(e2)->y, 24);
}
