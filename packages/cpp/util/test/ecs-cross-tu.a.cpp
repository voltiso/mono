#include "_ecs-cross-tu-component.hpp"

#include "v/_/ecs/world.hpp"

namespace ecsCrossTu {
void addFromA(
  VOLTISO_NAMESPACE::ecs::World &world, VOLTISO_NAMESPACE::ecs::Entity e) {
	world.emplace<Component>(e, Component{123});
}
} // namespace ecsCrossTu
