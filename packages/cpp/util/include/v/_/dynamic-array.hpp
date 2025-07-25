#pragma once
#include <v/_/_>

#include "v/_/dynamic-array.forward.hpp"

#include "v/_/tensor.forward.hpp"
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
#include "v/options"
#include "v/storage"
#include "v/tag/concat"
#include "v/tag/copy"

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
	Size _numSlots = Options::template GET<option::IN_PLACE>;

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
	Tensor<Storage<Item>, Options::template GET<option::IN_PLACE_ONLY>>
	  inPlaceItems;

public:
	static constexpr Size NUM_SLOTS =
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
		Tensor<Storage<Item>, Options::template GET<option::IN_PLACE>> inPlaceItems;
	};

protected:
	Size _numSlots = Options::template GET<option::IN_PLACE>;

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

	static constexpr Size NUM_IN_PLACE_SLOTS =
	  Options::template GET<option::IN_PLACE> ||
	  Options::template GET<option::IN_PLACE_ONLY>;

public:
	// template <class Type>
	// using CustomHandle = Handle ::Brand_<Self>::template Type_<Type>;
	// using Handle = CustomHandle<Size>;
	using Handle = Handle::WithBrand<Self>::template WithKind<Size>;

	static_assert(std::is_same_v<typename Handle::Value, Size>);

protected:
	Size _numItems = 0;

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
				for (Size i = 0; i < _numItems; ++i) [[likely]] {
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
				for (Size i = 0; i < _numItems; ++i) [[unlikely]] {
					memory[i].object().~Item();
				}
				_allocator().freeBytes(
				  this->allocation.object(), _numBytes(this->_numSlots));
			} else [[likely]] {
				// speed-up inplace path
				// speed-up empty path
				for (Size i = 0; i < _numItems; ++i) [[unlikely]] {
					this->inPlaceItems[i].object().~Item();
				}
			}
		} else {
			static_assert(Options::template GET<option::IN_PLACE_ONLY> > 0);
			// DCHECK_LE(this->_numSlots, Options::template GET<option::IN_PLACE_ONLY,
			// Parameters>);
			auto memory = static_cast<Storage<Item> *>(this->inPlaceItems.items);
			for (Size i = 0; i < _numItems; ++i) {
				memory[i].object().~Item();
			}
		}
	}

public:
	Custom() noexcept = default;

	template <class TItems>
	explicit Custom(TItems &&items)
	    : Custom(tag::COPY, std::forward<TItems>(items)) {}

	// Explicitly delete copy constructor to prevent shallow copies.
	// Use .copy() for deep copies.
	Custom(const Custom &) = delete;

	// uber-explicit copy constructor (our invention)
	Custom(const Custom &&otherCopy) : Custom(tag::COPY, otherCopy) {}

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
		return Self{tag::COPY, std::forward<Items>(items)};
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
		Size totalItems = 0;

		// 1) Sum up extents of each arg
		(void)std::initializer_list<int>{(
		  [&] {
			  auto extent = get::extent(View{args});
			  NE(extent, extent::UNBOUND);
			  totalItems += extent;
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
			  auto slice = View{args};
			  auto extent = get::extent(slice);
			  NE(extent, extent::UNBOUND);
			  for (Size i = 0; i < extent; ++i) {
				  pushUnchecked(slice[i]);
			  }
		  }(),
		  0)...};

		EQ(this->_numItems, totalItems);
	}

public:
	template <class Items> constexpr Custom(tag::Copy, const Items &items) {
		// ! better force container to provide numItems
		// if constexpr (requires { get::numItems(items); }) {
		setNumSlotsAtLeast(get::numItems(items));
		// }
		for (const auto &item : items) {
			pushUnchecked(item);
		}
	}

public:
	// // implicit move
	// template <class OtherOptions>
	// Custom &operator=(Custom<OtherOptions> &&other) {
	// 	this->~Custom();
	// 	new (this) Custom(std::move(other));
	// 	return *this;
	// }

	// // super-explicit copy
	// decltype(auto) operator=(const Custom &&other) {
	// 	return this->operator= <>(other);
	// }

	auto &operator=(Custom &&other) {
		this->~Custom();
		new (this) Custom(std::move(other));
		return *this;
	}

	// super-explicit copy
	auto &operator=(const Custom &) = delete;
	template <class Self, class OtherOptions>
	decltype(auto) operator=(this Self &self, const Custom<OtherOptions> &&other)
	  requires(!std::is_const_v<Self>)
	{
		// const Other &other = otherCopy;
		NE(&self, &other); // forbid (for performance)
		auto memory = self.slots();
		for (Size i = 0; i < self._numItems; ++i) {
			memory[i].object().~Item();
		}
		if (self._numSlots < other._numItems) [[unlikely]] {
			self.setNumSlotsAtLeast(other._numItems);
			memory = self.slots();
		}
		self._numItems = other._numItems;
		for (Size i = 0; i < other._numItems; ++i) {
			new (memory + i) Item(other[i]);
		}
		return std::forward<decltype(self)>(self);
	}

	// prefer converting to `View` if possible
	template <class Self, class OtherItem, auto EXTENT>
	decltype(auto) operator<<=(this Self &self, View<OtherItem, EXTENT> other)
	  requires(!std::is_const_v<Self>)
	{
		auto numNewItems = get::extent(other);
		self.setNumSlotsAtLeast(self._numItems + numNewItems);
		for (auto &item : other) {
			self.push(item);
		}
		return std::forward<decltype(self)>(self);
	}

	// if not, use regular collection interface
	template <class Self, class OtherItems>
	  requires requires(OtherItems items) {
		  { &items[0] } -> std::convertible_to<const Item *>;
	  }
	decltype(auto) operator<<=(this Self &self, const OtherItems &other)
	  requires(!std::is_const_v<Self>)
	{
		auto otherExtent = get::extent(other);
		NE(otherExtent, extent::UNBOUND);
		self.setNumSlotsAtLeast(self._numItems + otherExtent);
		for (Size i = 0; i < otherExtent; ++i) {
			self.pushUnchecked(other[i]);
		}
		return std::forward<decltype(self)>(self);
	}

	template <class Self, class OtherItem>
	  requires requires(OtherItem item) {
		  { &item } -> std::convertible_to<const Item *>;
	  }
	decltype(auto) operator<<=(this Self &self, OtherItem &&other) {
		// self.setNumSlotsAtLeast(self._numItems + 1);
		self.maybeGrowAndPush(std::forward<OtherItem>(other));
		return std::forward<decltype(self)>(self);
	}

public:
	// `numItems` must be at least 1
	template <class... Args>
	static Self createWithNumItems(Size numItems, Args &&...args) {
		return Self{CreateWithNumItemsTag{}, numItems, std::forward<Args>(args)...};
	}

private:
	struct CreateWithNumItemsTag {};
	template <class... Args>
	Custom(CreateWithNumItemsTag, Size numItems, Args &&...args) {
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

		for (Size i = 0; i < numItems; ++i) {
			new (memory + i) Item(item);
		}
	}

	//

private:
	static auto &_allocator() { return Self::Allocator::instance(); }

public:
	static const auto &allocator() { return _allocator(); }

	//

private:
	static constexpr auto _numBytes(Size numSlots) {
		constexpr auto roundUp = alignof(std::max_align_t);
		static_assert(std::has_single_bit(roundUp));
		constexpr auto MASK = roundUp - 1;
		auto numBytes = numSlots * sizeof(Item);
		auto numBytesAligned = (numBytes + roundUp - 1) & ~MASK;
		return numBytesAligned;
	}

public:
	// std compatibility
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr Size size() const noexcept {
		return _numItems;
	}

	// contiguous memory
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr auto extent() const noexcept {
		return _numItems;
	}

	//

public:
	// `newNumSlots` must be at least `numItems`
	auto setNumSlots(Size newNumSlots)
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
		(Size &)this->_numSlots = newNumSlots;
	}

	// `numSlots` must be greater than zero
	INLINE Storage<Item> *slots() {
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
	INLINE const Storage<Item> *slots() const {
		return const_cast<Custom *>(this)->slots();
	}

	INLINE Item *items() { return std::bit_cast<Item *>(slots()); }
	INLINE const Item *items() const {
		return std::bit_cast<const Item *>(slots());
	}

	using Index = Size;

	VOLTISO_FORCE_INLINE Item &operator[](const Index &i) {
		GE(i, 0);
		LT(i, _numItems);
		return items()[i];
	}

	VOLTISO_FORCE_INLINE const Item &operator[](const Index &i) const {
		GE(i, 0);
		LT(i, _numItems);
		return items()[i];
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
		static_assert(std::is_same_v<typename Handle::Value, Size>);
		return {Handle{index}, *this};
	}

	ConstAccessor operator()(const Index &index) const {
		return {Handle(index), *this};
	}

	Item &first() { return (*this)[0]; }
	const Item &first() const { return (*this)[0]; }

	Item &last() { return (*this)[_numItems - 1]; }
	const Item &last() const { return (*this)[_numItems - 1]; }

	Handle pushUnchecked(Item &&item) { return pushUnchecked<>(std::move(item)); }
	Handle pushUnchecked(const Item &item) { return pushUnchecked<>(item); }

	// ! does not grow
	template <class... Args> Handle pushUnchecked(Args &&...args) {
		LE(get::numItems(*this), get::numSlots(*this));

		LT(_numItems, get::numSlots(*this));

		auto index = _numItems;
		++_numItems;

		if constexpr (requires { this->NUM_SLOTS; }) {
			LE(_numItems, this->NUM_SLOTS);
		}

		if constexpr (
		  std::is_trivially_constructible_v<Item> && sizeof...(Args) == 0) {
			// noop - memory not zeroed!
		} else {
			slots()[index].construct(std::forward<Args>(args)...);
		}

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

	void setNumSlotsAtLeast(Size minNumSlots)
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
	template <class... Args> void setNumItems(Size newNumItems, Args &&...args) {
		if (newNumItems < _numItems) {
			auto memory = slots();
			for (Size i = _numItems; i < newNumItems; ++i) {
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
			if constexpr (
			  std::is_trivially_constructible_v<Item> && sizeof...(Args) == 0) {
				// noop ! memory not zeroed!
			} else if constexpr (std::is_copy_constructible_v<Item>) {
				auto item = Item{std::forward<Args>(args)...};
				for (Size i = _numItems; i < newNumItems; ++i) {
					new (memory + i) Item(item);
				}
			} else {
				for (Size i = _numItems; i < newNumItems; ++i) {
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
					for (Size i = 0; i < _numItems; ++i) {
						memory[i].object().~Item();
					}
				}
			} else if constexpr (LIKELIHOOD == Likelihood::LIKELY) {
				if (_numItems != 0) {
					auto memory = slots();
					for (Size i = 0; i < _numItems; ++i) [[likely]] {
						memory[i].object().~Item();
					}
				}
			} else if constexpr (LIKELIHOOD == Likelihood::UNLIKELY) {
				if (_numItems != 0) [[unlikely]] {
					auto memory = slots();
					for (Size i = 0; i < _numItems; ++i) [[unlikely]] {
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

	// !

	[[nodiscard]] INLINE auto map(auto &&func) const {
		using Result = Base::template With<
		  option::Item<std::remove_cvref_t<decltype(func(items()[0]))>>>;
		auto result = Result{};
		result.setNumSlotsAtLeast(this->_numItems);
		for (Size i = 0; i < this->_numItems; ++i) {
			result.pushUnchecked(func(this->items()[i]));
		}
		return result;
	}

	// !

	[[nodiscard]] INLINE explicit operator std::vector<Item>() const {
		return std::vector<Item>(this->items(), this->items() + this->_numItems);
	}

	// !

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
	template <Size N> using WithInPlace = With<option::IN_PLACE<N>>;

	template <Size N> using WithInPlaceOnly = With<option::IN_PLACE_ONLY<N>>;
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
	// template <class... Args>
	//   requires(std::is_constructible_v<Base, Args...>)
	// explicit DynamicArray(Args &&...args) : Base(std::forward<Args>(args)...)
	// {}

	// uber-explicit copy
	template <class Other>
	DynamicArray(const Other &&other) : Base(std::forward<const Other>(other)) {}

	// DynamicArray(const DynamicArray &other) = delete;
	// DynamicArray(DynamicArray &&other) = default;

	// DynamicArray &operator=(const DynamicArray &other) = delete;
	// DynamicArray &operator=(DynamicArray &&other) = delete;
	// DynamicArray &operator=(const DynamicArray &&other) {}

	// using Base::operator=;
	template <class... Args>
	  requires(std::is_assignable_v<Base &, Args...>)
	decltype(auto) operator=(Args &&...args) {
		return Base::operator=(std::forward<Args>(args)...);
	}

}; // class DynamicArray

// Deduction for general lists like {1, 2, 3}
template <
  class T, class... U,
  std::enable_if_t<std::conjunction_v<std::is_same<T, U>...>, int> = 0>
DynamicArray(T, U...) -> DynamicArray<std::type_identity_t<T>>;

template <class T>
DynamicArray(std::initializer_list<T> list) -> DynamicArray<T>;

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
