#pragma once
#include <v/_/_>

#include "v/_/array.forward.hpp"

#include "v/_/array-concat-traits.hpp"

#include "v/_/dynamic-array.forward.hpp"
#include "v/concepts/options"
#include "v/handle"
#include "v/is/trivially-relocatable"
#include "v/memory/Iterator"
#include "v/object"
#include "v/option/item"
#include "v/option/num-items"
#include "v/option/starting-index"
#include "v/raw-array"
#include "v/slice"
#include "v/tag/concat"
#include "v/tag/explicit-copy"
#include "v/tag/explicit-copy-consteval"

#include <cstddef>
#include <type_traits>

#include <v/ON>

// ! forward declarations
namespace VOLTISO_NAMESPACE::array {
template <class Options>
  requires concepts::Options<Options> // && std::is_final_v<Final>
class Custom;

template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};

template <class... Args> using GetCustom = Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::array

namespace VOLTISO_NAMESPACE {
template <class Item, size_t NUM_ITEMS> class Array;
} // namespace VOLTISO_NAMESPACE

// !

namespace VOLTISO_NAMESPACE::array {
template <class Item, std::size_t NUM_ITEMS>
struct Specializations<Options<
  option::Item<Item>, option::NUM_ITEMS<NUM_ITEMS>,
  option::CustomTemplate<GetCustom>>> {
	using Result = Array<Item, NUM_ITEMS>;
};

} // namespace VOLTISO_NAMESPACE::array

// !

namespace VOLTISO_NAMESPACE::array {
template <class Options>
  requires concepts::Options<Options> // && std::is_final_v<Final>
class Custom : public Object<typename Options ::template WithDefault<
                 option::CustomTemplate<GetCustom>>> {
	using Base = Object<
	  typename Options ::template WithDefault<option::CustomTemplate<GetCustom>>>;
	using Base::Base;

protected:
	using Self = Base::Self;

public:
	using Item = Options::template Get<option::Item>;

	static_assert(
	  !std::is_const_v<Item>,
	  "const Item does not make sense, just use `const Array<Item>`");

	static constexpr auto NUM_ITEMS =
	  Options::template GET<VOLTISO_NAMESPACE::option::NUM_ITEMS>;

	static constexpr auto EXTENT = NUM_ITEMS;

	static constexpr auto STARTING_INDEX =
	  Options::template GET<option::STARTING_INDEX>;

	// Make sure required parameters are set
	static_assert(!std::is_same_v<Item, void>, "Item type must be specified");
	// static_assert(NUM_ITEMS > 0, "Array size must be greater than 0");

	template <class Kind>
	using CustomHandle = Handle::WithBrand<Self>::template WithKind<Kind>;

	using Handle = CustomHandle<
	  std::conditional_t<(STARTING_INDEX < 0), std::make_signed<size_t>, size_t>>;

	// Item items[NUM_ITEMS];
	RawArray<Item, NUM_ITEMS> items; // = {};

public:
	Custom() = default;

	// ! linear-time assign - deleted
	// use `.copy()` instead to make copies
	Custom(const Custom &) = delete;
	Custom(Custom &&) = delete;
	Custom &operator=(const Custom &) = delete;

	// // `other` is the result of `.copy()` - user wants linear-time copy
	// Custom(const Custom &&other) {
	// 	std::copy(other.items, other.items + NUM_ITEMS, items);
	// }

	// `other` is the result of `.copy()` - user wants linear-time copy
	template <class Other>
	  requires(!std::is_reference_v<Other> && Other::NUM_ITEMS == NUM_ITEMS)
	Custom(const Other &&other) {
		std::copy(other.items, other.items + Other::NUM_ITEMS, items);
	}

	VOLTISO_FORCE_INLINE constexpr Custom(
	  std::initializer_list<Item> list) noexcept {
		EQ(list.size(), NUM_ITEMS);
		std::copy(list.begin(), list.end(), items);
	}

	// explicit linear time copy
	// must not use consteval version
	// [[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
	// from(const Item (&items)[NUM_ITEMS]) {
	// 	return Self{tag::EXPLICIT_COPY, items};
	// }

	template <class Arg>
	static VOLTISO_FORCE_INLINE constexpr auto from(Arg &&arg) {
		return Self{tag::EXPLICIT_COPY, std::forward<Arg>(arg)};
	}

	template <class... Args>
	static VOLTISO_FORCE_INLINE constexpr auto concat(Args &&...args) {
		return Self{tag::CONCAT, std::forward<Args>(args)...};
	}

protected:
	// friend from;
	// `consteval` for `operator""_s`
	constexpr Custom(tag::ExplicitCopy, const Item (&items)[NUM_ITEMS]) {
		std::copy(items, items + NUM_ITEMS, this->items);
	}

protected:
	// friend from;
	// `consteval` for `operator""_s`
	// we accept any N>NUM_ITEMS, and copy the first NUM_ITEMS
	// usually N will be NUM_ITEMS+1 for null-terminated strings
	template <std::size_t N>
	  requires(N >= NUM_ITEMS)
	consteval Custom(tag::ExplicitCopyConsteval, const Item (&items)[N]) {
		std::copy(items, items + NUM_ITEMS, this->items);
	}

public:
	VOLTISO_FORCE_INLINE auto dynamic() const && -> auto {
		return dynamicArray::from(this->self());
	}

public:
	template <
	  class InferredHandle,
	  std::enable_if_t<std::is_same_v<typename InferredHandle::Brand, Self>> * =
	    nullptr>
	const Item &operator[](const InferredHandle &handle) const {
		GE(handle.value, STARTING_INDEX);
		LT(
		  handle.value - STARTING_INDEX,
		  (std::make_signed_t<decltype(NUM_ITEMS)>)NUM_ITEMS);
		return items[handle.value - STARTING_INDEX];
	}

	// non-const -> const
	template <
	  class InferredHandle,
	  std::enable_if_t<std::is_same_v<typename InferredHandle::Brand, Self>> * =
	    nullptr>
	Item &operator[](const InferredHandle &handle) {
		return const_cast<Item &>(const_cast<const Custom &>(*this)[handle]);
	}

	// Automatic deduction does not work when assigning raw value, since the above
	// methods are templated, and creating handle from a raw value is ambiguous
	// (we can create a larger handle from a smaller value), se below we
	// explicitly define `operator[]` for raw values

	template <class Index, class = std::enable_if_t<std::is_integral_v<Index>>>
	const Item &operator[](const Index &index) const {
		return (*this)[CustomHandle<Index>(index)];
	}

	template <class Index, class = std::enable_if_t<std::is_integral_v<Index>>>
	Item &operator[](const Index &index) {
		return (*this)[CustomHandle<Index>(index)];
	}

	// comparisons
	constexpr bool operator==(const Custom &other) const {
		return NUM_ITEMS == other.NUM_ITEMS &&
		       std::equal(items, items + NUM_ITEMS, other.items);
	}

	// raw array conversion should be explicit (can loose size information)
	explicit operator RawArray<Item, NUM_ITEMS> &() { return items; }

	// raw array conversion should be explicit (can loose size information)
	explicit operator const RawArray<Item, NUM_ITEMS> &() const { return items; }

	// string_view is constant-time, so can be implicit
	constexpr operator ::std::string_view() const
	  requires std::is_same_v<Item, char>
	{
		return ::std::string_view(items, NUM_ITEMS);
	}

	explicit constexpr operator ::std::string() noexcept(
	  noexcept(std::string(items, items + NUM_ITEMS)))
	  requires(std::is_same_v<std::decay_t<Item>, char>)
	{
		return std::string(items, items + NUM_ITEMS);
	}

	// constant-time - can be implicit
	constexpr operator Slice<Item, NUM_ITEMS>()
	// requires(NUM_ITEMS > 0)
	{
		return Slice<Item, NUM_ITEMS>(items);
	}

	constexpr operator Slice<const Item, NUM_ITEMS>() const
	// requires(NUM_ITEMS > 0)
	{
		return Slice<const Item, NUM_ITEMS>(items);
	}

	/**
	 *  - Invalidates on relocation
	 */
	using Iterator = memory::Iterator<Item>;
	using ConstIterator = memory::Iterator<const Item>;

	Iterator begin() { return Iterator{items}; }
	Iterator end() { return Iterator{items + NUM_ITEMS}; }

	ConstIterator begin() const { return ConstIterator{items}; }
	ConstIterator end() const { return ConstIterator{items + NUM_ITEMS}; }

	// for std
	constexpr std::size_t size() const noexcept { return NUM_ITEMS; }

public:
	// ! should we delegate to Slice::operator<< ?
	// concat known size
	template <class Other>
	  requires( // Check extent of Other directly, not its decayed type if decay loses extent info
	    get::EXTENT<Other> != Extent::DYNAMIC &&
	    get::EXTENT<Other> != Extent::UNBOUND)
	auto operator<<(this auto &&self, Other &&other) { // Allow rvalue this
		// Use get::EXTENT<Other> to ensure we get extent of e.g. const char (&)[N]
		// not const char* if the latter would have an UNBOUND extent.
		constexpr auto NEW_NUM_ITEMS = NUM_ITEMS + get::EXTENT<Other>.value;
		using Result = Self::template With<option::NUM_ITEMS<NEW_NUM_ITEMS>>;
		static_assert(_::array::sumExtents(self, other) == NEW_NUM_ITEMS);
		return Result::concat(
		  std::forward<decltype(self)>(self), std::forward<Other>(other));
	}

private:
	// The implemented constexpr constructor for concatenation
	template <class... Slices>
	constexpr Custom(tag::Concat, Slices &&...slices)
	// requires(NUM_ITEMS == _::array::sumExtents(slices...))
	// : items{}
	{
		constexpr auto sumResult = _::array::sumExtents(slices...);
		if constexpr (!is::staticError(sumResult)) {
			static_assert(NUM_ITEMS == sumResult);
		}
		std::size_t current_offset = 0;

		// Process each source array (skip the tag)
		(void)std::initializer_list<int>{
		  (processSlice(current_offset, std::forward<Slices>(slices)), 0)...};
	}

private:
	// Helper function to process a single slice
	template <class SliceT>
	constexpr void processSlice(std::size_t &current_offset, SliceT &&slice) {
		// Skip processing if this is a tag
		if constexpr (std::is_same_v<std::decay_t<SliceT>, tag::ExplicitCopy>) {
			return;
		} else {
			// Create a Slice from the source
			auto slice_instance = Slice(slice);

			using SliceInstanceType = decltype(slice_instance);

			// Assuming SliceInstanceType::Item is the item type of the slice (e.g.,
			// slice_instance.items[0]) And SliceInstanceType::EXTENT or
			// slice_instance.extent() provides its extent.
			using SourceItemType = typename SliceInstanceType::Item;

			// Statically assert that the source item type is convertible to Array's
			// Item type
			static_assert(
			  std::is_convertible_v<SourceItemType, Item>,
			  "Item type of a source slice is not convertible to Array's item "
			  "type.");

			// Statically assert that the slice's extent (obtained from the instance)
			// matches the one obtained via get::EXTENT for the source type.
			// This ensures consistency.
			static_assert(
			  slice_instance.extent().value == get::EXTENT<SliceT>.value,
			  "Slice extent mismatch: slice_instance.extent() vs get::EXTENT for "
			  "source type.");

			// Perform the copy in a constexpr-friendly way
			for (std::size_t i = 0; i < slice_instance.extent().value; ++i) {
				// Bounds check (current_offset + i < NUM_ITEMS) is implicitly
				// guaranteed by the requires clause (NUM_ITEMS == total_extent) and
				// correct iteration.
				items[current_offset + i] =
				  slice_instance.items[i]; // Implicit conversion if types differ
			}
			current_offset += slice_instance.extent().value;
		}
	}
}; // class Custom

template <class Options>
std::ostream &operator<<(std::ostream &os, const Custom<Options> &array) {
	using Array = Custom<Options>;
	os << "[";
	for (size_t i = 0; i < Array::NUM_ITEMS; i++) {
		if (i > 0) {
			os << ", ";
		}
		os << array[i];
	}
	return os << "]";
}
} // namespace VOLTISO_NAMESPACE::array

// !

namespace VOLTISO_NAMESPACE {
template <class Item, size_t NUM_ITEMS>
class Array : public array::Custom<Options<
                option::Item<Item>, option::NUM_ITEMS<NUM_ITEMS>,
                option::Self<Array<Item, NUM_ITEMS>>>> {
	using Base = array::Custom<Options<
	  option::Item<Item>, option::NUM_ITEMS<NUM_ITEMS>,
	  option::Self<Array<Item, NUM_ITEMS>>>>;
	using Base::Base;
};

// Deduction for general lists like {1, 2, 3}
template <
  class T, class... U,
  std::enable_if_t<std::conjunction_v<std::is_same<T, U>...>, int> = 0>
Array(T, U...) -> Array<std::type_identity_t<T>, 1 + sizeof...(U)>;

template <class T>
Array(std::initializer_list<T> list) -> Array<T, list.size()>;

// ! linear-time copy (make explicit?)
// Deduction guide for constructing from a raw array
// template <class Item, size_t NUM_ITEMS>
// explicit Array(const Item (&)[NUM_ITEMS]) -> Array<Item, NUM_ITEMS>;

// ! hmm does not work - pointer decay?
// template <class Item, size_t NUM_ITEMS>
// explicit Array(std::initializer_list<Item[NUM_ITEMS]> list)
//   -> Array<Item, NUM_ITEMS>;

namespace array {
// ! linear-time copy
template <class Item, size_t NUM_ITEMS>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const Item (&rawArray)[NUM_ITEMS]) {
	return Array<Item, NUM_ITEMS>::from(rawArray);
}

template <class Item, size_t NUM_ITEMS>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const std::initializer_list<Item> &list) {
	static_assert(list.size() == NUM_ITEMS, "wrong constructor selected");
	return Array<Item, NUM_ITEMS>::from(list);
}
} // namespace array

} // namespace VOLTISO_NAMESPACE

namespace std {
template <class T>
  requires requires(T t) { T::NUM_ITEMS; }
struct tuple_size<T> : std::integral_constant<std::size_t, T::NUM_ITEMS> {};
template <class T>
  requires requires(T t) { T::EXTENT; }
struct tuple_size<T> : std::integral_constant<std::size_t, T::EXTENT.value> {};
} // namespace std

// !

namespace VOLTISO_NAMESPACE {
template <class Options>
static constexpr auto is::TriviallyRelocatable<array::Custom<Options>> =
  is::TriviallyRelocatable<typename Options::template Get<option::Item>>;

template <class Item, std::size_t NUM_ITEMS>
static constexpr auto is::TriviallyRelocatable<Array<Item, NUM_ITEMS>> =
  is::TriviallyRelocatable<Item>;
} // namespace VOLTISO_NAMESPACE

#include <v/OFF>
