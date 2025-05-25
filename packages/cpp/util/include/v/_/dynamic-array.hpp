#pragma once
#include <v/_/_>

#include "v/_/dynamic-array.forward.hpp"

#include "v/_/array.forward.hpp"
#include "v/concepts/options"
#include "v/get/brands"
#include "v/get/num-items"
#include "v/get/num-slots"
#include "v/handle"
#include "v/is/trivially-relocatable"
#include "v/likelihood"
#include "v/object"
#include "v/option/allocator"
#include "v/option/in-place"
#include "v/option/in-place-only"
#include "v/option/input-options"
#include "v/option/item"
#include "v/option/trivially-relocatable"
#include "v/singleton"
#include "v/storage"
#include "v/tag/concat"
#include "v/tag/explicit-copy"

#include <bit>
#include <cstddef>
#include <cstring>
#include <initializer_list>
#include <type_traits>

#include <v/ON>

namespace VOLTISO_NAMESPACE::dynamicArray::_ {
template <class Options> struct Base_ : Object<Options> {
	using Base = Object<Options>;
	using Base::Base;
	using Base::operator=;
};

template <class Options>
  requires concepts::Options<Options>
struct DataMembersNoInPlace : Base_<Options> {
	using Base = Base_<Options>;
	using Base::Base;
	using Base::operator=;

	using Allocator = Options::template Get<option::Allocator>;

protected:
	typename Allocator::Handle allocation;

protected:
	std::size_t _numSlots = Options::template GET<option::IN_PLACE>;

public:
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr auto numSlots() const {
		return this->_numSlots;
	}
};

//

template <class Options>
  requires concepts::Options<Options>
struct DataMembersInPlaceBase : Base_<Options> {
	using Base = Base_<Options>;
	using Base::Base;
	using Base::operator=;

	using Allocator = Options::template Get<option::Allocator>;

	static_assert(
	  std::is_trivially_constructible_v<Storage<typename Allocator::Handle>>);
	static_assert(std::is_trivially_default_constructible_v<
	              Storage<typename Allocator::Handle>>);
};

//

template <class Options>
  requires concepts::Options<Options>
struct DataMembersInPlaceOnly : DataMembersInPlaceBase<Options> {
	using Base = DataMembersInPlaceBase<Options>;
	using Base::Base;
	using Base::operator=;

	using Item = Options::template Get<option::Item>;

protected:
	Array<Storage<Item>, Options::template GET<option::IN_PLACE_ONLY>>
	  inPlaceItems;

public:
	static constexpr size_t NUM_SLOTS =
	  Options::template GET<option::IN_PLACE_ONLY>;
};

//

template <class Options>
  requires concepts::Options<Options>
struct DataMembersInPlace : DataMembersInPlaceBase<Options> {
	using Base = DataMembersInPlaceBase<Options>;
	using Base::Base;
	using Base::operator=;

	using Allocator = Options::template Get<option::Allocator>;
	using Item = Options::template Get<option::Item>;

protected:
	union {
		Storage<typename Allocator::Handle> allocation;
		Array<Storage<Item>, Options::template GET<option::IN_PLACE>> inPlaceItems;
	};

protected:
	std::size_t _numSlots = Options::template GET<option::IN_PLACE>;

public:
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr auto numSlots() const {
		return this->_numSlots;
	}
};

template <class Options>
  requires concepts::Options<Options>
using DataMembers = std::conditional_t<
  (Options::template GET<option::IN_PLACE> > 0), DataMembersInPlace<Options>,
  std::conditional_t<
    (Options::template GET<option::IN_PLACE_ONLY> > 0),
    DataMembersInPlaceOnly<Options>, DataMembersNoInPlace<Options>>>;

template <class Options, bool IS_CONST> class Accessor {
private:
	using Custom = Custom<Options>;
	using Item = typename Custom::Item;
	using Handle = typename Custom::Handle;

private:
	typename Custom::Handle handle;
	const Custom &dynamicArray;

protected:
	friend Custom;
	Accessor(const Handle &handle, const Custom &dynamicArray)
	    : handle(handle), dynamicArray(dynamicArray) {}

public:
	const Item &item() const {
		GE(this->handle.value, 0);
		LT(this->handle.value, this->dynamicArray._numItems);
		return dynamicArray.slots()[this->handle.value].object();
	}
	const Item &operator*() const { return item(); }
	const Item *operator->() const { return &item(); }
	const Item *operator&() const { return &item(); }
	operator const Item &() const { return item(); }

	auto &operator=(const Item &other)
	  requires(!IS_CONST)
	{
		item() = other;
		return *this;
	}
};
} // namespace VOLTISO_NAMESPACE::dynamicArray::_

// !

namespace VOLTISO_NAMESPACE::dynamicArray {
template <class Options>
  requires concepts::Options<Options>
struct Specializations;
} // namespace VOLTISO_NAMESPACE::dynamicArray

namespace VOLTISO_NAMESPACE::dynamicArray::_ {
template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::dynamicArray::_

namespace VOLTISO_NAMESPACE::dynamicArray {
template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};

template <class Item> struct Specializations<Options<option::Item<Item>>> {
	using Result = DynamicArray<Item>;
};
} // namespace VOLTISO_NAMESPACE::dynamicArray

// !

namespace VOLTISO_NAMESPACE::dynamicArray {
template <class Options>
  requires concepts::Options<Options>
class Custom
    : public _::DataMembers<typename Options::template WithDefault<
        option::TRIVIALLY_RELOCATABLE<true>,
        option::CustomTemplate<_::GetCustom>, option::InputOptions<Options>>> {
private:
	using Base = _::DataMembers<typename Options::template WithDefault<
	  option::TRIVIALLY_RELOCATABLE<true>, option::CustomTemplate<_::GetCustom>,
	  option::InputOptions<Options>>>;

protected:
	using Self = Base::Self;

public:
	using Item = Options::template Get<VOLTISO_NAMESPACE::option::Item>;

	using Allocator = Options::template Get<VOLTISO_NAMESPACE::option::Allocator>;

	static constexpr auto IN_PLACE = Options::template GET<option::IN_PLACE>;

	static constexpr auto IN_PLACE_ONLY =
	  Options::template GET<option::IN_PLACE_ONLY>;

	using Accessor = _::Accessor<Options, false>;
	using ConstAccessor = _::Accessor<Options, true>;
	friend Accessor;
	friend ConstAccessor;

private:
	// template <class O> using SelfTemplate = Custom<O>;
	// using Final = Base::Final;

	static_assert(
	  is::TriviallyRelocatable<Item>,
	  "`Item` must be marked as trivially relocatable using "
	  "`is::TriviallyRelocatable<Item> = true`");

	static_assert(
	  Options::template GET<option::IN_PLACE> == 0 ||
	    Options::template GET<option::IN_PLACE_ONLY> == 0,
	  "Use either `IN_PLACE` or `IN_PLACE_ONLY`, not both");

	static constexpr size_t NUM_IN_PLACE_SLOTS =
	  Options::template GET<option::IN_PLACE> ||
	  Options::template GET<option::IN_PLACE_ONLY>;

public:
	// template <class Type>
	// using CustomHandle = Handle ::Brand_<Self>::template Type_<Type>;
	// using Handle = CustomHandle<std::size_t>;
	using Handle = Handle::WithBrand<Self>::template WithKind<std::size_t>;

	static_assert(std::is_same_v<typename Handle::Value, std::size_t>);

protected:
	std::size_t _numItems = 0;

public:
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr auto numItems() const noexcept {
		return this->_numItems;
	}

public:
	~Custom() {
		if constexpr (NUM_IN_PLACE_SLOTS == 0) {
			// speed-up usual 'non-empty' path
			if (this->_numSlots > 0) [[likely]] {
				auto memory =
				  static_cast<Storage<Item> *>(_allocator()(this->allocation));
				for (size_t i = 0; i < _numItems; ++i) [[likely]] {
					memory[i].object().~Item();
				}
				_allocator().freeBytes(this->allocation, _numBytes(this->_numSlots));
			}
		} else if constexpr (Options::template GET<option::IN_PLACE> > 0) {
			// speed-up 'in-place' path (e.g. for `HashTable`)
			if (this->_numSlots > Options::template GET<option::IN_PLACE>)
			  [[unlikely]] {
				auto memory =
				  static_cast<Storage<Item> *>(_allocator()(this->allocation.object()));
				// speed-up empty path
				for (size_t i = 0; i < _numItems; ++i) [[unlikely]] {
					memory[i].object().~Item();
				}
				_allocator().freeBytes(
				  this->allocation.object(), _numBytes(this->_numSlots));
			} else [[likely]] {
				// speed-up inplace path
				// speed-up empty path
				for (size_t i = 0; i < _numItems; ++i) [[unlikely]] {
					this->inPlaceItems[i].object().~Item();
				}
			}
		} else {
			static_assert(Options::template GET<option::IN_PLACE_ONLY> > 0);
			// DCHECK_LE(this->_numSlots, Options::template GET<option::IN_PLACE_ONLY,
			// Parameters>);
			auto memory = static_cast<Storage<Item> *>(this->inPlaceItems.items);
			for (size_t i = 0; i < _numItems; ++i) {
				memory[i].object().~Item();
			}
		}
	}

public:
	Custom() noexcept = default;

	// Explicitly delete copy constructor to prevent shallow copies.
	// Use .copy() for deep copies.
	Custom(const Custom &) = delete;

	// uber-explicit copy constructor (our invention)
	Custom(const Custom &&other) : Custom(tag::EXPLICIT_COPY, other) {}

	// Standard move constructor
	Custom(Custom &&other) noexcept
	    : Base(std::move(other)) /* Move base if it's movable */ {
		NE(this, &other); // forbid (for performance)
		this->_numItems = other._numItems;
		this->_numSlots = other._numSlots;
		// Steal resources from 'other'
		if constexpr (NUM_IN_PLACE_SLOTS == 0) {
			this->allocation = other.allocation;
		} else if constexpr (Options::template GET<option::IN_PLACE>() > 0) {
			if (other._numSlots > Options::template GET<option::IN_PLACE>())
			  [[unlikely]] {
				this->allocation.item() = other.allocation.item();
			} else [[likely]] {
				static_assert(is::TriviallyRelocatable<Item>);
				memcpy(
				  &this->inPlaceItems[0], &other.inPlaceItems[0],
				  sizeof(Item) * other._numItems);
			}
		} else if constexpr (Options::template GET<option::IN_PLACE_ONLY>() > 0) {
			static_assert(is::TriviallyRelocatable<Storage<Item>>);
			memcpy(
			  &this->inPlaceItems[0], &other.inPlaceItems[0],
			  sizeof(Item) * other._numItems);
		} else {
			static_assert(false);
		}
		other._numItems = 0;
		other._numSlots = 0;
	}

	Custom(std::initializer_list<Item> items) {
		setNumSlotsAtLeast(items.size());
		for (auto &item : items) {
			pushUnchecked(item);
		}
	}

public:
	// accept rvalue reference only if it's const (marked for copy)
	template <class Items>
	// requires(
	//   std::is_reference_v<Items> ||
	//   std::is_const_v<std::remove_reference_t<Items>>)
	[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto from(Items &&items) {
		static_assert(std::is_base_of_v<Custom<Options>, Self>);
		return Self{tag::EXPLICIT_COPY, std::forward<Items>(items)};
	}

	template <class SourceItem>
	[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
	from(const std::initializer_list<SourceItem> &items) {
		return Self{items};
	}

public:
	template <class... Args>
	[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
	concat(Args &&...args) {
		static_assert(std::is_base_of_v<Custom<Options>, Self>);
		return Self{tag::CONCAT, std::forward<Args>(args)...};
	}

protected:
	template <class... Args> Custom(tag::Concat, Args &&...args) {
		std::size_t totalItems = 0;

		// 1) Sum up extents of each arg
		(void)std::initializer_list<int>{(
		  [&] {
			  auto extent = get::extent(Slice{args});
			  NE(extent, Extent::UNBOUND);
			  totalItems += extent.value;
		  }(),
		  0)...};

		if constexpr (IN_PLACE_ONLY > 0) {
			LE(totalItems, IN_PLACE_ONLY);
		} else {
			setNumSlotsAtLeast(totalItems);
		}

		// 2) Push all items from each arg
		(void)std::initializer_list<int>{(
		  [&] {
			  auto slice = Slice{args};
			  auto extent = get::extent(slice);
			  NE(extent, Extent::UNBOUND);
			  for (std::size_t i = 0; i < extent.value; ++i) {
				  pushUnchecked(slice[i]);
			  }
		  }(),
		  0)...};

		EQ(this->_numItems, totalItems);
	}

public:
	template <class Items>
	constexpr Custom(tag::ExplicitCopy, const Items &items) {
		// ! better force container to provide numItems
		// if constexpr (requires { get::numItems(items); }) {
		setNumSlotsAtLeast(get::numItems(items));
		// }
		for (const auto &item : items) {
			pushUnchecked(item);
		}
	}

public:
	// assignment operator - linear-time, so we make it explicit this way:
	// `arr = otherArr.copy()`
	// `.copy()` casts to `const Other&&`
	// the `operator=` here accepts `const Other&&`
	template <class Other>
	  requires(!std::is_reference_v<Other>)
	decltype(auto) operator=(this auto &&self, const Other &&other) {
		NE(&self, &other); // forbid (for performance)
		auto memory = self.slots();
		for (size_t i = 0; i < self._numItems; ++i) {
			memory[i].object().~Item();
		}
		if (self._numSlots < other._numItems) [[unlikely]] {
			self.setNumSlotsAtLeast(other._numItems);
			memory = self.slots();
		}
		self._numItems = other._numItems;
		for (size_t i = 0; i < other._numItems; ++i) {
			new (memory + i) Item(other[i]);
		}
		return std::forward<decltype(self)>(self);
	}

	// prefer converting to `Slice` if possible
	template <class OtherItem, Extent EXTENT>
	decltype(auto) operator<<=(this auto &&self, Slice<OtherItem, EXTENT> other)
	  requires(!std::is_const_v<std::remove_reference_t<decltype(self)>>)
	{
		auto numNewItems = get::extent(other).value;
		self.setNumSlotsAtLeast(self._numItems + numNewItems);
		for (auto &item : other) {
			self.push(item);
		}
		return std::forward<decltype(self)>(self);
	}

	// if not, use regular collection interface
	template <class OtherItems>
	  requires requires(OtherItems items) {
		  { &items[0] } -> std::convertible_to<const Item *>;
	  }
	decltype(auto) operator<<=(this auto &&self, const OtherItems &other)
	  requires(!std::is_const_v<std::remove_reference_t<decltype(self)>>)
	{
		auto otherExtent = get::extent(other);
		NE(otherExtent, Extent::UNBOUND);
		self.setNumSlotsAtLeast(self._numItems + otherExtent.value);
		for (std::size_t i = 0; i < otherExtent.value; ++i) {
			self.push(other[i]);
		}
		return std::forward<decltype(self)>(self);
	}

	template <class OtherItem>
	  requires requires(OtherItem item) {
		  { &item } -> std::convertible_to<const Item *>;
	  }
	decltype(auto) operator<<=(this auto &&self, OtherItem &&other) {
		// self.setNumSlotsAtLeast(self._numItems + 1);
		self.maybeGrowAndPush(std::forward<OtherItem>(other));
		return std::forward<decltype(self)>(self);
	}

public:
	// `numItems` must be at least 1
	template <class... Args>
	static Self createWithNumItems(size_t numItems, Args &&...args) {
		return Self{CreateWithNumItemsTag{}, numItems, std::forward<Args>(args)...};
	}

private:
	struct CreateWithNumItemsTag {};
	template <class... Args>
	Custom(CreateWithNumItemsTag, std::size_t numItems, Args &&...args) {
		static_assert(!std::is_polymorphic_v<Self>);
		// auto &self = reinterpret_cast<Self &>(_self);

		this->_numItems = numItems;
		this->_numSlots = numItems;

		auto item = Item{std::forward<Args>(args)...};

		if constexpr (NUM_IN_PLACE_SLOTS == 0) {
			this->allocation = _allocator().allocateBytes(_numBytes(numItems));
		} else if constexpr (Options::template GET<option::IN_PLACE> > 0) {
			if (numItems > Options::template GET<option::IN_PLACE>) [[unlikely]] {
				this->allocation.object() =
				  _allocator().allocateBytes(_numBytes(numItems));
			}
		} else {
			static_assert(Options::template GET<option::IN_PLACE_ONLY> > 0);
			DCHECK_LE(numItems, IN_PLACE_ONLY);
		}

		auto memory = this->slots();

		for (size_t i = 0; i < numItems; ++i) {
			new (memory + i) Item(item);
		}
	}

	//

private:
	static auto &_allocator() {
		return Singleton<typename Self::Allocator>::instance();
	}

public:
	static const auto &allocator() { return _allocator(); }

	//

private:
	static constexpr auto _numBytes(size_t numSlots) {
		constexpr auto roundUp = alignof(std::max_align_t);
		static_assert(std::has_single_bit(roundUp));
		constexpr auto MASK = roundUp - 1;
		auto numBytes = numSlots * sizeof(Item);
		auto numBytesAligned = (numBytes + roundUp - 1) & ~MASK;
		return numBytesAligned;
	}

public:
	// std compatibility
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr std::size_t
	size() const noexcept {
		return _numItems;
	}

	// contiguous memory
	[[nodiscard]] VOLTISO_FORCE_INLINE Extent extent() const noexcept {
		return Extent(_numItems);
	}

	//

public:
	// `newNumSlots` must be at least `numItems`
	auto setNumSlots(std::size_t newNumSlots)
	  requires(IN_PLACE_ONLY == 0)
	{
		// LOG(INFO) << "setNumSlots " << newNumSlots;
		VOLTISO_GE(newNumSlots, _numItems);
		if constexpr (NUM_IN_PLACE_SLOTS == 0) {
			if (this->_numSlots > 0) [[likely]] {
				if (newNumSlots > 0) [[likely]] {
					this->allocation = _allocator().reallocateBytes(
					  this->allocation, _numBytes(this->_numSlots),
					  _numBytes(newNumSlots));
				} else [[unlikely]] {
					_allocator().freeBytes(this->allocation, _numBytes(this->_numSlots));
				}
			} else [[unlikely]] {
				if (newNumSlots > 0) [[likely]] {
					this->allocation = _allocator().allocateBytes(_numBytes(newNumSlots));
				} else [[unlikely]] {
					// noop
				}
			}
		} else if constexpr (Options::template GET<option::IN_PLACE> > 0) {
			if (this->_numSlots <= Options::template GET<option::IN_PLACE>)
			  [[likely]] {
				if (newNumSlots <= Options::template GET<option::IN_PLACE>) [[likely]] {
					// noop - stay in place
				} else [[unlikely]] {
					auto allocation =
					  _allocator().allocateBytes(newNumSlots * sizeof(Item));
					auto memory = _allocator()(allocation);
					::memcpy(memory, &this->inPlaceItems[0], sizeof(Item) * _numItems);
					this->allocation.object() = allocation;
				}
			} else [[unlikely]] {
				if (newNumSlots <= Options::template GET<option::IN_PLACE>) [[likely]] {
					auto oldData = this->allocation.object();
					LT(newNumSlots, this->_numSlots);
					::memcpy(
					  static_cast<void *>(&this->inPlaceItems), oldData,
					  sizeof(Item) * _numItems);
					_allocator().freeBytes(oldData, this->_numSlots * sizeof(Item));
				} else [[unlikely]] {
					this->allocation.object() = _allocator().reallocateBytes(
					  this->allocation.object(), this->_numSlots * sizeof(Item),
					  newNumSlots * sizeof(Item));
				}
			}
		} else {
			static_assert(IN_PLACE_ONLY > 0);
			LE(this->_numSlots, IN_PLACE_ONLY);
			LE(newNumSlots, IN_PLACE_ONLY);
			static_assert(false); // `setNumSlots` disabled in this case
		}
		(size_t &)this->_numSlots = newNumSlots;
	}

	// `numSlots` must be greater than zero
	Storage<Item> *slots() {
		if constexpr (NUM_IN_PLACE_SLOTS == 0) {
			// static_assert(std::is_base_of_v<
			//               Custom<Options>,
			//               std::remove_reference_t<decltype(self)>>);
			return std::bit_cast<Storage<Item> *>(this->allocation.value);
			// return static_cast<Storage<Item> *>(
			//     _allocator()(this->allocation.item()));
		} else if constexpr (Options::template GET<option::IN_PLACE> > 0) {
			if (this->_numSlots <= Options::template GET<option::IN_PLACE>)
			  [[likely]] {
				return this->inPlaceItems.items;
			} else [[unlikely]] {
				return std::bit_cast<Storage<Item> *>(this->allocation.object());
				// return static_cast<Storage<Item> *>(
				//     _allocator()(this->allocation));
			}
		} else {
			static_assert(Options::template GET<option::IN_PLACE_ONLY> > 0);
			// LE(this->_numSlots, getParameter::VALUE<option::IN_PLACE_ONLY,
			// Parameters>);
			return this->inPlaceItems.items;
		}
	}

	// const -> non-const
	const Storage<Item> *slots() const {
		return const_cast<Custom *>(this)->slots();
	}

	using Index = std::size_t;

	VOLTISO_FORCE_INLINE Item &operator[](const Index &i) {
		GE(i, 0);
		LT(i, _numItems);
		return slots()[i].object();
	}

	VOLTISO_FORCE_INLINE const Item &operator[](const Index &i) const {
		GE(i, 0);
		LT(i, _numItems);
		return slots()[i].object();
	}

	//

	VOLTISO_FORCE_INLINE Item &operator[](const Handle &handle) {
		GE(handle.value, 0);
		LT(handle.value, _numItems);
		return slots()[handle.value].object();
	}

	VOLTISO_FORCE_INLINE const Item &operator[](const Handle &handle) const {
		GE(handle.value, 0);
		LT(handle.value, _numItems);
		return slots()[handle.value].object();
	}

	//

	Accessor operator()(const Handle &handle) {
		LT(handle.value, _numItems);
		return {handle, *this};
	}

	ConstAccessor operator()(const Handle &handle) const {
		LT(handle.value, _numItems);
		return {handle, *this};
	}

	Accessor operator()(const Index &index) {
		GE(index, 0);
		LT(index, _numItems);
		static_assert(std::is_same_v<typename Handle::Value, std::size_t>);
		return {Handle{index}, *this};
	}

	ConstAccessor operator()(const Index &index) const {
		return {Handle(index), *this};
	}

	Item &first() { return (*this)[0]; }
	const Item &first() const { return (*this)[0]; }

	Item &last() { return (*this)[_numItems - 1]; }
	const Item &last() const { return (*this)[_numItems - 1]; }

	Handle push(Item &&item) { return pushUnchecked<>(std::move(item)); }
	Handle push(const Item &item) { return pushUnchecked<>(item); }

	// ! does not grow
	template <class... Args> Handle pushUnchecked(Args &&...args) {
		LE(get::numItems(*this), get::numSlots(*this));

		LT(_numItems, get::numSlots(*this));

		auto index = _numItems;
		++(size_t &)_numItems;

		if constexpr (requires { this->NUM_SLOTS; }) {
			LE(_numItems, this->NUM_SLOTS);
		}

		slots()[index].construct(std::forward<Args>(args)...);

		if constexpr (requires { this->NUM_SLOTS; }) {
			LE(_numItems, this->NUM_SLOTS);
		}

		auto handle = Handle(index);
		return handle;
	}

	Handle maybeGrowAndPush(Item &&item)
	  requires(IN_PLACE_ONLY == 0)
	{
		return maybeGrowAndPush<>(std::move(item));
	}
	Handle maybeGrowAndPush(const Item &item)
	  requires(IN_PLACE_ONLY == 0)
	{
		return maybeGrowAndPush<>(item);
	}

	template <class... Args>
	VOLTISO_FORCE_INLINE Handle maybeGrowAndPush(Args &&...args)
	  requires(IN_PLACE_ONLY == 0)
	{
		if constexpr (requires { this->_numSlots; }) {
			if (this->_numItems == this->_numSlots) [[unlikely]] {
				this->grow();
			}
		}
		return pushUnchecked<>(std::forward<Args>(args)...);
	}

	//
	void grow()
	  requires(IN_PLACE_ONLY == 0)
	{
		auto newNumSlots = this->_numSlots << 1;
		if constexpr (IN_PLACE == 0) {
			if (!newNumSlots) [[unlikely]] {
				newNumSlots = 1;
			}
		}
		// LOG(INFO) << "grow " << this->_numSlots << " " << newNumSlots;
		GT(newNumSlots, this->_numSlots);
		this->setNumSlots(newNumSlots);
	}

	void setNumSlotsAtLeast(size_t minNumSlots)
	  requires(IN_PLACE_ONLY == 0)
	{
		static_assert(IN_PLACE_ONLY == 0);
		// ! SLOW
		// TODO: don't loop, do it one-shot
		while (this->_numSlots < minNumSlots) [[unlikely]] {
			grow();
		}
	}

	// cannot perfect-forward
	template <class... Args>
	void setNumItems(std::size_t newNumItems, Args &&...args) {
		if (newNumItems < _numItems) {
			auto memory = slots();
			for (std::size_t i = _numItems; i < newNumItems; ++i) {
				memory[i].object().~Item();
			}
		} else if (newNumItems > _numItems) [[likely]] {
			if constexpr (IN_PLACE_ONLY == 0) {
				if (newNumItems > this->_numSlots) [[unlikely]] {
					setNumSlotsAtLeast(newNumItems);
				}
			} else {
				EQ(this->_numSlots, IN_PLACE_ONLY);
				LE(newNumItems, this->_numSlots);
			}
			auto memory = slots();
			if constexpr (std::is_copy_constructible_v<Item>) {
				auto item = Item{std::forward<Args>(args)...};
				for (std::size_t i = _numItems; i < newNumItems; ++i) {
					new (memory + i) Item(item);
				}
			} else {
				for (std::size_t i = _numItems; i < newNumItems; ++i) {
					new (memory + i) Item(args...); // no std::forward (values reused)
				}
			}
		}
		this->_numItems = newNumItems;
	}

	template <Likelihood LIKELIHOOD = Likelihood::UNKNOWN> void clear() {
		if constexpr (!std::is_trivially_destructible_v<Item>) {
			if constexpr (LIKELIHOOD == Likelihood::UNKNOWN) {
				if (_numItems != 0) {
					auto memory = slots();
					for (std::size_t i = 0; i < _numItems; ++i) {
						memory[i].object().~Item();
					}
				}
			} else if constexpr (LIKELIHOOD == Likelihood::LIKELY) {
				if (_numItems != 0) {
					auto memory = slots();
					for (std::size_t i = 0; i < _numItems; ++i) [[likely]] {
						memory[i].object().~Item();
					}
				}
			} else if constexpr (LIKELIHOOD == Likelihood::UNLIKELY) {
				if (_numItems != 0) [[unlikely]] {
					auto memory = slots();
					for (std::size_t i = 0; i < _numItems; ++i) [[unlikely]] {
						memory[i].object().~Item();
					}
				}
			} else {
				static_assert(false);
			}
		}
		this->_numItems = 0;
	}

	bool hasItems() const { return this->_numItems != 0; }

	VOLTISO_FORCE_INLINE constexpr auto pop() noexcept {
		static_assert(is::TriviallyRelocatable<Item>);
		GT(this->_numItems, 0);
		auto lastIndex = this->_numItems - 1;
		this->_numItems = lastIndex;
		return slots()[lastIndex].relocate(); // hoping for RVO
		// (*this)[lastIndex].~Item(); // ! do not call after relocate
	}

	/**
	 *  - Invalidates on resize
	 *  - Invalidates on relocation
	 */
	using Iterator = memory::Iterator<Item>;
	using ConstIterator = memory::Iterator<const Item>;

	// private:
	// Iterator _end; // cannot store pointer to self (we're relocatable)

	constexpr Iterator begin() noexcept {
		// DCHECK_GT(numItems, 0);
		return Iterator{std::addressof(slots()->object())};
	}
	constexpr Iterator end() noexcept {
		// DCHECK_GT(numItems, 0);
		return Iterator{std::addressof(slots()->object()) + this->_numItems};
	}

	constexpr ConstIterator begin() const noexcept {
		// DCHECK_GT(numItems, 0);
		return ConstIterator{std::addressof(slots()->object())};
	}
	constexpr ConstIterator end() const noexcept {
		// DCHECK_GT(numItems, 0);
		return ConstIterator{std::addressof(slots()->object()) + this->_numItems};
	}

public:
	// string_view is constant-time, so can be implicit
	constexpr operator ::std::string_view() const noexcept(
	  noexcept(::std::string_view(std::addressof(slots()->object()), _numItems)))
	  requires std::is_same_v<std::remove_const_t<Item>, char>
	{
		return ::std::string_view(std::addressof(slots()->object()), _numItems);
	}

	explicit constexpr operator ::std::string() const noexcept(
	  noexcept(::std::string(std::addressof(slots()->object()), _numItems)))
	  requires(std::is_same_v<std::remove_const_t<Item>, char>)
	{
		return std::string(std::addressof(slots()->object()), _numItems);
	}

	// ! note: these are bug-prone when used with strings - we may have no
	// ! null-terminator
	// public:
	// 	explicit operator Item *() noexcept {
	// 		return std::addressof(this->self().slots()->object());
	// 	}

	// 	explicit operator const Item *() const noexcept {
	// 		return std::addressof(this->self().slots()->object());
	// 	}

	// raw array conversion should be explicit (can loose size information)
	explicit operator RawArray<Item> &() noexcept { return slots(); }

	// raw array conversion should be explicit (can loose size information)
	explicit operator const RawArray<Item> &() const noexcept { return slots(); }

public:
	template <class Option> using With = Base::template With<Option>;
	template <class T> using WithItem = With<option::Item<T>>;
	template <class T> using WithAllocator = With<option::Allocator<T>>;
	template <std::size_t N> using WithInPlace = With<option::IN_PLACE<N>>;

	template <std::size_t N>
	using WithInPlaceOnly = With<option::IN_PLACE_ONLY<N>>;
}; // class Custom
} // namespace VOLTISO_NAMESPACE::dynamicArray

// !

namespace VOLTISO_NAMESPACE {
template <class Item>
class DynamicArray
    : public dynamicArray::Custom<
        Options<option::Item<Item>, option::Self<DynamicArray<Item>>>> {
	using Base = dynamicArray::Custom<
	  Options<option::Item<Item>, option::Self<DynamicArray<Item>>>>;

public:
	using Base::Base;
	using Base::operator=;

	template <class... Args>
	DynamicArray(Args &&...args) : Base(std::forward<Args>(args)...) {}
};

} // namespace VOLTISO_NAMESPACE

// !

namespace VOLTISO_NAMESPACE::dynamicArray {
// explicit copy
// if OtherItems is rvalue, it must be const (marked for copy)
template <class OtherItems>
// requires(
//   std::is_reference_v<OtherItems> ||
//   std::is_const_v<std::remove_reference_t<OtherItems>>)
[[nodiscard]] VOLTISO_FORCE_INLINE /*constexpr*/ auto
from(OtherItems &&otherItems) {
	using Item = std::remove_reference_t<decltype(*std::begin(otherItems))>;
	using OtherItemsClass = std::remove_reference_t<OtherItems>;
	using OtherBrands = get::Brands<OtherItemsClass>;
	using Result =
	  ::VOLTISO_NAMESPACE::DynamicArray<Item>::template WithDefault<OtherBrands>;
	return Result::from(std::forward<OtherItems>(otherItems));
}

template <class Item>
[[nodiscard]] VOLTISO_FORCE_INLINE /*constexpr*/ auto
from(std::initializer_list<Item> items) {
	using Result = ::VOLTISO_NAMESPACE::DynamicArray<Item>;
	return Result::from(items);
}
} // namespace VOLTISO_NAMESPACE::dynamicArray

#include <v/OFF>
