#pragma once
#include <v/_/_>

#include "v/_/ecs/entity.hpp"

#include <cstdint>
#include <limits>
#include <memory>
#include <tuple>
#include <typeindex>
#include <unordered_map>
#include <utility>
#include <vector>

#include <v/ON>

namespace V::_::ecs {
// Base class for type-erased component pools.
class PoolBase {
public:
	virtual ~PoolBase() = default;
	virtual void onDestroy(std::uint32_t id) noexcept = 0;
};

// Sparse-set component storage.
//
// Invariants:
// - `_dense[i]` is an entity id
// - `_data[i]` is the component value for entity `_dense[i]`
// - `_sparse[id]` is the index `i` into `_dense/_data`, or INVALID if absent
template <class Component> class Pool final : public PoolBase {
	static constexpr auto INVALID = std::numeric_limits<std::uint32_t>::max();

	// Packed list of entity ids that currently have this component.
	std::vector<std::uint32_t> _dense;
	// Component payloads in the same order as `_dense`.
	std::vector<Component> _data;
	// Entity id -> index into `_dense/_data` (or INVALID if entity doesn't have
	// it).
	std::vector<std::uint32_t> _sparse;

public:
	[[nodiscard]] auto dense() noexcept -> std::vector<std::uint32_t> & {
		return _dense;
	}
	[[nodiscard]] auto dense() const noexcept
	  -> const std::vector<std::uint32_t> & {
		return _dense;
	}

	[[nodiscard]] auto has(std::uint32_t id) const noexcept -> bool {
		return id < _sparse.size() && _sparse[id] != INVALID;
	}

	[[nodiscard]] auto get(std::uint32_t id) noexcept -> Component * {
		if (!has(id)) {
			return nullptr;
		}
		return &_data[_sparse[id]];
	}

	[[nodiscard]] auto get(std::uint32_t id) const noexcept -> const Component * {
		if (!has(id)) {
			return nullptr;
		}
		return &_data[_sparse[id]];
	}

	template <class... Args>
	auto emplace(std::uint32_t id, Args &&...args) -> Component & {
		if (id >= _sparse.size()) {
			_sparse.resize(id + 1, INVALID);
		}
		if (has(id)) {
			auto &slot = _data[_sparse[id]];
			slot = Component(std::forward<Args>(args)...);
			return slot;
		}

		_sparse[id] = static_cast<std::uint32_t>(_dense.size());
		_dense.push_back(id);
		_data.emplace_back(std::forward<Args>(args)...);
		return _data.back();
	}

	void remove(std::uint32_t id) noexcept {
		if (!has(id)) {
			return;
		}

		const auto index = _sparse[id];
		const auto lastId = _dense.back();

		// Swap-remove to keep `_dense/_data` packed.
		_dense[index] = lastId;
		_data[index] = std::move(_data.back());
		_sparse[lastId] = index;

		_dense.pop_back();
		_data.pop_back();
		_sparse[id] = INVALID;
	}

	void onDestroy(std::uint32_t id) noexcept override { remove(id); }
};
} // namespace V::_::ecs

namespace VOLTISO_NAMESPACE::ecs {
/**
 * Entity/component storage.
 *
 * Entities are (id,generation) pairs.
 * Components are stored in per-type sparse sets for fast add/remove/iterate.
 */
class World {
	// Generation of each entity id; incremented on destroy.
	std::vector<std::uint32_t> _generations;
	// Free-list of entity ids that can be reused by create().
	std::vector<std::uint32_t> _free;

	// Component type -> pool.
	// std::type_index is stable across translation units, unlike address-based
	// ids.
	std::unordered_map<std::type_index, std::unique_ptr<V::_::ecs::PoolBase>>
	  _pools;

	[[nodiscard]] auto
	isAlive(std::uint32_t id, std::uint32_t generation) const noexcept -> bool {
		return id < _generations.size() && _generations[id] == generation;
	}

	template <class Component>
	[[nodiscard]] auto pool() -> V::_::ecs::Pool<Component> & {
		const auto key = std::type_index(typeid(Component));
		auto it = _pools.find(key);
		if (it == _pools.end()) {
			auto inserted =
			  _pools.emplace(key, std::make_unique<V::_::ecs::Pool<Component>>());
			it = inserted.first;
		}
		return static_cast<V::_::ecs::Pool<Component> &>(*it->second);
	}

	template <class Component>
	[[nodiscard]] auto poolIfExists() noexcept -> V::_::ecs::Pool<Component> * {
		const auto key = std::type_index(typeid(Component));
		auto it = _pools.find(key);
		if (it == _pools.end()) {
			return nullptr;
		}
		return static_cast<V::_::ecs::Pool<Component> *>(it->second.get());
	}

	template <class Component>
	[[nodiscard]] auto poolIfExists() const noexcept
	  -> const V::_::ecs::Pool<Component> * {
		const auto key = std::type_index(typeid(Component));
		auto it = _pools.find(key);
		if (it == _pools.end()) {
			return nullptr;
		}
		return static_cast<const V::_::ecs::Pool<Component> *>(it->second.get());
	}

public:
	[[nodiscard]] auto create() noexcept -> Entity {
		std::uint32_t id;
		if (!_free.empty()) {
			id = _free.back();
			_free.pop_back();
		} else {
			id = static_cast<std::uint32_t>(_generations.size());
			_generations.push_back(0);
		}
		return Entity{id, _generations[id]};
	}

	void destroy(const Entity &entity) noexcept {
		if (!alive(entity)) {
			return;
		}
		for (auto &kv : _pools) {
			kv.second->onDestroy(entity.id);
		}
		++_generations[entity.id];
		_free.push_back(entity.id);
	}

	[[nodiscard]] auto alive(const Entity &entity) const noexcept -> bool {
		return isAlive(entity.id, entity.generation);
	}

	template <class Component, class... Args>
	auto emplace(const Entity &entity, Args &&...args) -> Component & {
		CHECK(alive(entity));
		return pool<Component>().emplace(entity.id, std::forward<Args>(args)...);
	}

	template <class Component> void remove(const Entity &entity) noexcept {
		auto *p = poolIfExists<Component>();
		if (!p) {
			return;
		}
		p->remove(entity.id);
	}

	template <class Component>
	[[nodiscard]] auto has(const Entity &entity) const noexcept -> bool {
		auto p = poolIfExists<Component>();
		return p && p->has(entity.id) && alive(entity);
	}

	template <class Component>
	[[nodiscard]] auto get(const Entity &entity) noexcept -> Component * {
		auto *p = poolIfExists<Component>();
		return (p && alive(entity)) ? p->get(entity.id) : nullptr;
	}

	template <class Component>
	[[nodiscard]] auto get(const Entity &entity) const noexcept
	  -> const Component * {
		auto p = poolIfExists<Component>();
		return (p && alive(entity)) ? p->get(entity.id) : nullptr;
	}

	template <class... Components, class Fn> void each(Fn &&fn) {
		static_assert(sizeof...(Components) > 0);
		// Drive iteration using the first component pool, then filter by the rest.
		using First = std::tuple_element_t<0, std::tuple<Components...>>;
		auto &firstPool = pool<First>();
		for (auto id : firstPool.dense()) {
			const auto generation = _generations[id];
			Entity entity{id, generation};
			if (!alive(entity)) {
				continue;
			}
			if (!(has<Components>(entity) && ...)) {
				continue;
			}
			fn(entity, (*get<Components>(entity))...);
		}
	}
};
} // namespace VOLTISO_NAMESPACE::ecs

#include <v/OFF>
