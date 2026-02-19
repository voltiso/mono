#pragma once
#include <v/_/_>

#include <cstdint>

#include <v/ON>

namespace VOLTISO_NAMESPACE::ecs {
/**
 * Opaque handle to an entity in a World.
 *
 * `id` can be reused after destroy; `generation` increments on destroy to make
 * stale handles detectable.
 */
struct Entity {
	/** Dense integer identifier (may be reused). */
	std::uint32_t id;

	/** Generation counter to detect stale/reused entity ids. */
	std::uint32_t generation;

	auto operator<=>(const Entity &) const = default;

	/** Packed `generation:id` key, useful for hashing. */
	[[nodiscard]] constexpr auto hash() const noexcept -> std::uint64_t {
		return (static_cast<std::uint64_t>(generation) << 32) |
		       static_cast<std::uint64_t>(id);
	}
};
} // namespace VOLTISO_NAMESPACE::ecs

#include <v/OFF>
