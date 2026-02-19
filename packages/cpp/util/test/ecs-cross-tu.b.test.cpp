#include <gtest/gtest.h>

#include "_ecs-cross-tu-component.hpp"

#include "v/_/ecs/world.hpp"

namespace ecsCrossTu {
void addFromA(
  VOLTISO_NAMESPACE::ecs::World &world, VOLTISO_NAMESPACE::ecs::Entity e);
}

using namespace VOLTISO_NAMESPACE;

TEST(Ecs, crossTranslationUnitComponentKey) {
	ecs::World world;
	auto e = world.create();

	ecsCrossTu::addFromA(world, e);
	ASSERT_NE(world.get<ecsCrossTu::Component>(e), nullptr);
	EXPECT_EQ(world.get<ecsCrossTu::Component>(e)->value, 123);
}
