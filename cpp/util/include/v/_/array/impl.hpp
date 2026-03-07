#pragma once
#include <v/_/_>

#include "_forward.hpp"

#include "v/_/view.forward.hpp"
#include "v/concepts/options"
#include "v/get/extent"
#include "v/get/num-items"
#include "v/handle"
#include "v/memory/iterator"
#include "v/object"
#include "v/option/custom-template"
#include "v/option/extents"
#include "v/option/implicit-copy"
#include "v/option/input-options"
#include "v/option/item"
#include "v/option/starting-index"
#include "v/raw-array"
#include "v/size"
#include "v/tag/concat"
#include "v/tag/copy"
#include "v/tag/copy-consteval"
#include "v/value-pack"

#include <algorithm>
#include <array>
#include <cstring>
#include <initializer_list>
#include <string>
#include <string_view>
#include <tuple>
#include <type_traits>
#include <utility>

#include <v/ON>

namespace VOLTISO_NAMESPACE::array::_ {
consteval Size sumNumItems() { return 0; }

template <class T, class... Ts> consteval Size sumNumItems(T &&, Ts &&...ts) {
	return get::NUM_ITEMS<T> + sumNumItems(std::forward<Ts>(ts)...);
}

// !

template <concepts::Options Options>
class Impl : public Object<typename Options::template WithDefault<
               option::CustomTemplate<V::array::GetCustom>,
               option::InputOptions<Options>>> {
protected:
	using Object = Object<typename Options::template WithDefault<
	  option::CustomTemplate<V::array::GetCustom>,
	  option::InputOptions<Options>>>;
	using Object::Object;

public:
	using Item = Options::template Get<option::Item>;
	using Extents = Options::template Get<option::Extents>;
	static constexpr auto EXTENT = [] {
		constexpr auto extentsTuple = Extents::tuple();
		if constexpr (std::tuple_size_v<decltype(extentsTuple)> == 0) {
			// Keep parity with Tensor's default (single-item when no extent is set).
			return 1;
		} else {
			static_assert(
			  std::tuple_size_v<decltype(extentsTuple)> == 1,
			  "Array supports exactly one extent");
			return std::get<0>(extentsTuple);
		}
	}();
	static constexpr auto EXTENTS = std::array<Size, 1>{EXTENT};
	static constexpr auto NUM_ITEMS = EXTENT;

	static_assert(
	  EXTENT >= 0, "Array requires static extent (dynamic extent unsupported)");

public:
	// ⚠️ All data members here
	RawArray<Item, NUM_ITEMS> items;

protected:
	using Final = Object::Final;

public:
	static constexpr auto STARTING_INDEX =
	  Options::template GET<option::startingIndex>;

	static_assert(
	  !std::is_const_v<Item>,
	  "const Item does not make sense, just use `const Array<Item, N>`");
	static_assert(!std::is_same_v<Item, void>, "Item type must be specified");

	template <class Kind>
	using CustomHandle = Handle::WithBrand<Final>::template WithKind<Kind>;

	using Handle = CustomHandle<
	  std::conditional_t<(STARTING_INDEX < 0), std::make_signed<Size>, Size>>;

public:
	constexpr auto extent() const noexcept { return EXTENT; }
	constexpr auto numItems() const noexcept { return NUM_ITEMS; }
	constexpr auto strides() const noexcept { return std::array<Size, 1>{1}; }

public:
	Impl() = default;

public:
	// Allow regular copy only when explicitly enabled via option::implicitCopy.
	Impl(const Impl &other)
	  requires(Object::Options::template GET<option::implicitCopy>)
	= default;

protected:
	// Keep defaulted special members for trivial ABI / relocatability behavior.
	Impl(const Impl &) = default;
	Impl &operator=(const Impl &) = default;
	Impl(Impl &&) = delete;
	Impl &operator=(Impl &&) = delete;

public:
	Impl(Impl &&other)
	  requires(Object::Options::template GET<option::implicitCopy>)
	= default;

	Impl &operator=(Impl &&other)
	  requires(Object::Options::template GET<option::implicitCopy>)
	= default;

public:
	// `other` is typically `copy()` result: linear-time copy is explicit.
	template <class Other>
	  requires(Other::EXTENT == EXTENT)
	constexpr Impl(const Other &&other) {
		if constexpr (std::is_trivially_copyable_v<Item>) {
			std::memcpy(this, &other, sizeof(Impl));
		} else {
			std::copy(other.items, other.items + Other::NUM_ITEMS, this->items);
		}
	}

	template <class Other>
	  requires(Other::EXTENT == EXTENT)
	constexpr Final &operator=(const Other &&other) {
		if constexpr (std::is_trivially_copyable_v<Item>) {
			std::memcpy(this, &other, sizeof(Impl));
		} else {
			std::copy(other.items, other.items + Other::NUM_ITEMS, this->items);
		}
		return Object::final();
	}

	INLINE constexpr Impl(std::initializer_list<Item> list) noexcept {
		EQ(list.size(), NUM_ITEMS);
		std::copy(list.begin(), list.end(), this->items);
	}

	template <class Arg> static INLINE constexpr auto from(Arg &&arg) {
		return Final{tag::COPY, std::forward<Arg>(arg)};
	}

	template <class... Args> static INLINE constexpr auto concat(Args &&...args) {
		return Final{tag::CONCAT, std::forward<Args>(args)...};
	}

public:
	template <class TSource> constexpr Impl(tag::Copy, const TSource &source) {
		// Compile-time shape compatibility check.
		static_assert(TSource::NUM_ITEMS == NUM_ITEMS);
		std::copy(source.items, source.items + NUM_ITEMS, this->items);
	}

	constexpr Impl(tag::Copy, RawArray<const Item, NUM_ITEMS> &items) {
		std::copy(items, items + NUM_ITEMS, this->items);
	}

	template <Size N>
	  requires(N >= NUM_ITEMS)
	consteval Impl(tag::CopyConsteval, const Item (&items)[N]) {
		// Accept N >= NUM_ITEMS to support null-terminated string literals.
		std::copy(items, items + NUM_ITEMS, this->items);
	}

public:
	template <
	  class InferredHandle,
	  std::enable_if_t<std::is_same_v<typename InferredHandle::Brand, Final>> * =
	    nullptr>
	const Item &operator[](const InferredHandle &handle) const {
		GE(handle.value, STARTING_INDEX);
		LT(
		  handle.value - STARTING_INDEX,
		  (std::make_signed_t<decltype(NUM_ITEMS)>)NUM_ITEMS);
		return this->items[handle.value - STARTING_INDEX];
	}

	template <
	  class InferredHandle,
	  std::enable_if_t<std::is_same_v<typename InferredHandle::Brand, Final>> * =
	    nullptr>
	Item &operator[](const InferredHandle &handle) {
		return const_cast<Item &>(const_cast<const Impl &>(*this)[handle]);
	}

	template <class Index, class = std::enable_if_t<std::is_integral_v<Index>>>
	const Item &operator[](const Index &index) const {
		return (*this)[CustomHandle<Index>(index)];
	}

	template <class Index, class = std::enable_if_t<std::is_integral_v<Index>>>
	Item &operator[](const Index &index) {
		return (*this)[CustomHandle<Index>(index)];
	}

	constexpr bool operator==(const Impl &other) const {
		return std::equal(this->items, this->items + NUM_ITEMS, other.items);
	}

	// Explicit: conversion loses semantic type information.
	explicit operator RawArray<Item, NUM_ITEMS> &() noexcept {
		return this->items;
	}
	explicit operator const RawArray<Item, NUM_ITEMS> &() const noexcept {
		return this->items;
	}

	// string_view is constant-time, so implicit is fine.
	constexpr operator ::std::string_view() const
	  requires std::is_same_v<std::remove_const_t<Item>, char>
	{
		return ::std::string_view(this->items, NUM_ITEMS);
	}

	explicit constexpr operator ::std::string() noexcept(
	  noexcept(std::string(this->items, this->items + NUM_ITEMS)))
	  requires(std::is_same_v<std::remove_const_t<Item>, char>)
	{
		return std::string(this->items, this->items + NUM_ITEMS);
	}

	constexpr operator View<Item, NUM_ITEMS>() {
		return View<Item, NUM_ITEMS>{this->items};
	}

	constexpr operator View<const Item, NUM_ITEMS>() const {
		return View<const Item, NUM_ITEMS>{this->items};
	}

	[[nodiscard]] constexpr auto view() noexcept {
		return View<Item, NUM_ITEMS>{*this};
	}
	[[nodiscard]] constexpr auto view() const noexcept {
		return View<const Item, NUM_ITEMS>{*this};
	}

	using Iterator = memory::Iterator<Item>;
	using ConstIterator = memory::Iterator<const Item>;

	// Iterator validity follows underlying storage relocation rules.
	Iterator begin() { return Iterator{this->items}; }
	Iterator end() { return Iterator{this->items + NUM_ITEMS}; }
	ConstIterator begin() const { return ConstIterator{this->items}; }
	ConstIterator end() const { return ConstIterator{this->items + NUM_ITEMS}; }

	constexpr Size size() const noexcept { return NUM_ITEMS; }
	[[nodiscard]] constexpr auto data() const noexcept { return this->items; }

public:
	// Concat for statically-sized sources only.
	template <class Other>
	  requires(
	    get::EXTENT<Other> != V::extent::DYNAMIC &&
	    get::EXTENT<Other> != V::extent::UNBOUND)
	constexpr auto operator<<(this auto &&self, Other &&other) {
		constexpr Size NEW_NUM_ITEMS = NUM_ITEMS + get::NUM_ITEMS<Other>;
		using Result =
		  Final::template With<option::Extents<ValuePack<NEW_NUM_ITEMS>>>;
		EQ(array::_::sumNumItems(self, other), NEW_NUM_ITEMS);
		return Result::concat(
		  std::forward<decltype(self)>(self), std::forward<Other>(other));
	}

private:
	template <class... Slices> constexpr Impl(tag::Concat, Slices &&...slices) {
		constexpr auto sumResult = array::_::sumNumItems(slices...);
		if constexpr (!is::staticError(sumResult)) {
			static_assert(NUM_ITEMS == sumResult);
		}
		Size currentOffset = 0;
		(void)std::initializer_list<int>{
		  (processSlice(currentOffset, std::forward<Slices>(slices)), 0)...};
	}

	template <class SliceT>
	constexpr void processSlice(Size &currentOffset, SliceT &&slice) {
		// Skip tags used by object construction APIs.
		if constexpr (std::is_same_v<std::decay_t<SliceT>, tag::Copy>) {
			return;
		} else {
			auto sliceInstance = View(slice);
			using SliceInstanceType = decltype(sliceInstance);
			using SourceItemType = typename SliceInstanceType::Item;
			static_assert(
			  std::is_convertible_v<SourceItemType, Item>,
			  "Item type of a source slice is not convertible to Array item type.");
			static_assert(
			  sliceInstance.extent() == get::EXTENT<SliceT>,
			  "Slice extent mismatch.");
			for (Size i = 0; i < sliceInstance.extent(); ++i) {
				this->items[currentOffset + i] = sliceInstance.items[i];
			}
			currentOffset += sliceInstance.extent();
		}
	}

public:
	template <class Extents>
	using WithExtents = Object::template With<option::Extents<Extents>>;
	using WithImplicitCopy = Object::template With<option::implicitCopy<true>>;
}; // class Impl
} // namespace VOLTISO_NAMESPACE::array::_

#include <v/OFF>
