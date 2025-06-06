#pragma once
#include <v/_/_>

#include "v/_/tensor.forward.hpp"

#include "v/_/tensor-concat-traits.hpp"

#include "v/_/dynamic-array.forward.hpp"
#include "v/concepts/options"
#include "v/get/num-items"
#include "v/handle"
#include "v/is/trivially-relocatable"
#include "v/memory/iterator"
#include "v/object"
#include "v/option/extents"
#include "v/option/input-options"
#include "v/option/item"
#include "v/option/starting-index"
#include "v/option/trivially-relocatable"
#include "v/raw-array"
#include "v/size"
#include "v/tag/concat"
#include "v/tag/explicit-copy"
#include "v/tag/explicit-copy-consteval"
#include "v/value-pack"
#include "v/view"

#include <type_traits>

#include <v/ON>

// !

namespace VOLTISO_NAMESPACE::tensor {
template <class Item, auto... ES>
struct Specializations<
  Options<option::Item<Item>, option::Extents<ValuePack<ES...>>>> {
	using Result = Tensor<Item, ES...>;
};
} // namespace VOLTISO_NAMESPACE::tensor

// !

namespace VOLTISO_NAMESPACE::tensor {
template <class Options>
  requires concepts::Options<Options> // && std::is_final_v<Final>
class Custom
    : public Object<typename Options ::template WithDefault<
        option::TRIVIALLY_RELOCATABLE<is::TriviallyRelocatable<
          typename Options::template Get<option::Item>>>,
        option::CustomTemplate<GetCustom>, option::InputOptions<Options>>> {
	using Base = Object<typename Options ::template WithDefault<
	  option::TRIVIALLY_RELOCATABLE<
	    is::TriviallyRelocatable<typename Options::template Get<option::Item>>>,
	  option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>;
	using Base::Base;

protected:
	using Self = Base::Self;

public:
	using Item = Options::template Get<option::Item>;

	static_assert(
	  !std::is_const_v<Item>,
	  "const Item does not make sense, just use `const Array<Item>`");

	using Extents = Options::template Get<option::Extents>;
	static constexpr auto EXTENTS = Extents::template array<Size>();
	static constexpr auto EXTENT = std::get<0>(Extents::tuple());
	static constexpr auto NUM_ITEMS = []() {
		// std::apply unpacks the tuple elements into the lambda's arguments.
		return std::apply(
		  [](auto... elements) {
			  return (static_cast<V::Size>(1) * ... * static_cast<V::Size>(elements));
		  },
		  EXTENTS);
	}();
	static constexpr auto STRIDES = []() {
		constexpr auto N = EXTENTS.size();

		std::array<V::Size, N> strides{};

		if constexpr (N > 0) {
			strides[N - 1] = 1;
			for (Size i = N - 1; i > 0; --i) {
				strides[i - 1] = strides[i] * EXTENTS[i];
			}
		}

		return strides;
	}();

	static constexpr auto STARTING_INDEX =
	  Options::template GET<option::STARTING_INDEX>;

	// Make sure required parameters are set
	static_assert(!std::is_same_v<Item, void>, "Item type must be specified");
	// static_assert(EXTENT > 0, "Array size must be greater than 0");

	template <class Kind>
	using CustomHandle = Handle::WithBrand<Self>::template WithKind<Kind>;

	using Handle = CustomHandle<
	  std::conditional_t<(STARTING_INDEX < 0), std::make_signed<Size>, Size>>;

	// Item items[EXTENT];
	RawArray<Item, NUM_ITEMS> items; // = {};

	// using Items = GetItems<Item, EXTENT>;
	// Items items; // = {};

public:
	constexpr auto extent() const { return EXTENT; }
	constexpr auto numItems() const { return NUM_ITEMS; }
	constexpr auto strides() const { return STRIDES; }

public:
	Custom() = default;

	// ! linear-time assign - deleted
	// use `.copy()` instead to make copies
	Custom(const Custom &) = delete;
	Custom(Custom &&) = delete;
	Custom &operator=(const Custom &) = delete;

	// // `other` is the result of `.copy()` - user wants linear-time copy
	// Custom(const Custom &&other) {
	// 	std::copy(other.items, other.items + EXTENT, items);
	// }

	// `other` is the result of `.copy()` - user wants linear-time copy
	template <class Other>
	  requires(!std::is_reference_v<Other> && Other::EXTENTS == EXTENTS)
	Custom(const Other &&other) {
		std::copy(other.items, other.items + Other::NUM_ITEMS, items);
	}

	INLINE constexpr Custom(std::initializer_list<Item> list) noexcept
	// : items{{list}}
	{
		EQ(list.size(), NUM_ITEMS);
		std::copy(list.begin(), list.end(), items);
	}

	INLINE constexpr Custom(
	  std::initializer_list<std::initializer_list<Item>> list) noexcept {
		// Assert the number of rows
		EQ(list.size(), EXTENT);

		Size i = 0;
		for (const auto &row : list) {
			// Assert the number of columns for each row
			EQ(row.size(), EXTENT);
			for (const auto &val : row) {
				items[i++] = val;
			}
		}
	}

	// explicit linear time copy
	// must not use consteval version
	// [[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
	// from(const Item (&items)[EXTENT]) {
	// 	return Self{tag::EXPLICIT_COPY, items};
	// }

	template <class Arg> static INLINE constexpr auto from(Arg &&arg) {
		return Self{tag::EXPLICIT_COPY, std::forward<Arg>(arg)};
	}

	template <class... Args> static INLINE constexpr auto concat(Args &&...args) {
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
	template <Size N>
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
	  requires(EXTENT == NUM_ITEMS)
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
	  requires(EXTENT == NUM_ITEMS)
	Item &operator[](const InferredHandle &handle) {
		return const_cast<Item &>(const_cast<const Custom &>(*this)[handle]);
	}

	// Automatic deduction does not work when assigning raw value, since the above
	// methods are templated, and creating handle from a raw value is ambiguous
	// (we can create a larger handle from a smaller value), se below we
	// explicitly define `operator[]` for raw values

	template <class Index, class = std::enable_if_t<std::is_integral_v<Index>>>
	  requires(EXTENT == NUM_ITEMS)
	const Item &operator[](const Index &index) const {
		return (*this)[CustomHandle<Index>(index)];
	}

	template <class Index, class = std::enable_if_t<std::is_integral_v<Index>>>
	  requires(EXTENT == NUM_ITEMS)
	Item &operator[](const Index &index) {
		return (*this)[CustomHandle<Index>(index)];
	}

	// md
	auto operator[](Size index)
	  requires(EXTENTS.size() > 1)
	{
		using SubView = View<Item>::template WithExtents<typename Extents::Tail>;
		return SubView{items + index * extent() - STARTING_INDEX};
	}

	auto operator[](Size index) const
	  requires(EXTENTS.size() > 1)
	{
		using SubView =
		  const View<const Item>::template WithExtents<typename Extents::Tail>;
		return SubView{items + index * extent() - STARTING_INDEX};
	}

	// comparisons
	constexpr bool operator==(const Custom &other) const {
		return NUM_ITEMS == other.NUM_ITEMS &&
		       std::equal(items, items + NUM_ITEMS, other.items);
	}

	// raw array conversion should be explicit (can loose size information)
	explicit operator RawArray<Item, NUM_ITEMS> &() noexcept { return items; }

	// raw array conversion should be explicit (can loose size information)
	explicit operator const RawArray<Item, NUM_ITEMS> &() const noexcept {
		return items;
	}

	// string_view is constant-time, so can be implicit
	constexpr operator ::std::string_view() const
	  requires std::is_same_v<std::remove_const_t<Item>, char>
	{
		return ::std::string_view(items, NUM_ITEMS);
	}

	explicit constexpr operator ::std::string() noexcept(
	  noexcept(std::string(items, items + NUM_ITEMS)))
	  requires(std::is_same_v<std::remove_const_t<Item>, char>)
	{
		return std::string(items, items + NUM_ITEMS);
	}

	// constant-time - can be implicit
	constexpr operator View<Item, NUM_ITEMS>() {
		return View<Item, NUM_ITEMS>{items};
	}

	constexpr operator View<const Item, NUM_ITEMS>() const {
		return View<const Item, NUM_ITEMS>{items};
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
	constexpr Size size() const noexcept { return NUM_ITEMS; }

public:
	// ! should we delegate to Slice::operator<< ?
	// concat known size
	template <class Other>
	  requires( // Check extent of Other directly, not its decayed type if decay
	            // loses extent info
	    get::EXTENT<Other> != extent::DYNAMIC &&
	    get::EXTENT<Other> != extent::UNBOUND)
	auto operator<<(this auto &&self, Other &&other) { // Allow rvalue this
		// Use get::EXTENT<Other> to ensure we get extent of e.g. const char (&)[N]
		// not const char* if the latter would have an UNBOUND extent.
		constexpr Size NEW_NUM_ITEMS = NUM_ITEMS + get::NUM_ITEMS<Other>;
		using Result =
		  Self::template With<option::Extents<ValuePack<NEW_NUM_ITEMS>>>;
		EQ(_::tensor::sumNumItems(self, other), NEW_NUM_ITEMS);
		return Result::concat(
		  std::forward<decltype(self)>(self), std::forward<Other>(other));
	}

private:
	// The implemented constexpr constructor for concatenation
	template <class... Slices>
	constexpr Custom(tag::Concat, Slices &&...slices)
	// requires(EXTENT == _::array::sumExtents(slices...))
	// : items{}
	{
		constexpr auto sumResult = _::tensor::sumNumItems(slices...);
		if constexpr (!is::staticError(sumResult)) {
			static_assert(NUM_ITEMS == sumResult);
		}
		Size current_offset = 0;

		// Process each source array (skip the tag)
		(void)std::initializer_list<int>{
		  (processSlice(current_offset, std::forward<Slices>(slices)), 0)...};
	}

private:
	// Helper function to process a single slice
	template <class SliceT>
	constexpr void processSlice(Size &current_offset, SliceT &&slice) {
		// Skip processing if this is a tag
		if constexpr (std::is_same_v<std::decay_t<SliceT>, tag::ExplicitCopy>) {
			return;
		} else {
			// Create a Slice from the source
			auto slice_instance = View(slice);

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
			  slice_instance.extent() == get::EXTENT<SliceT>,
			  "Slice extent mismatch: slice_instance.extent() vs get::EXTENT for "
			  "source type.");

			// Perform the copy in a constexpr-friendly way
			for (Size i = 0; i < slice_instance.extent(); ++i) {
				// Bounds check (current_offset + i < EXTENT) is implicitly
				// guaranteed by the requires clause (EXTENT == total_extent) and
				// correct iteration.
				items[current_offset + i] =
				  slice_instance.items[i]; // Implicit conversion if types differ
			}
			current_offset += slice_instance.extent();
		}
	}
}; // class Custom
} // namespace VOLTISO_NAMESPACE::tensor

// !

namespace VOLTISO_NAMESPACE {
template <class Item, auto E, auto... ES>
class Tensor : public tensor::Custom<Options<
                 option::Item<Item>, option::Extents<ValuePack<E, ES...>>,
                 option::Self<Tensor<Item, E, ES...>>>> {
	using Base = tensor::Custom<Options<
	  option::Item<Item>, option::Extents<ValuePack<E, ES...>>,
	  option::Self<Tensor<Item, E, ES...>>>>;
	using Base::Base;
};

// Deduction for general lists like {1, 2, 3}
template <
  class T, class... U,
  std::enable_if_t<std::conjunction_v<std::is_same<T, U>...>, int> = 0>
Tensor(T, U...) -> Tensor<std::type_identity_t<T>, 1 + (Size)sizeof...(U)>;

template <class T>
Tensor(std::initializer_list<T> list) -> Tensor<T, list.size()>;

// 2D Deduction Guide
template <class T>
Tensor(std::initializer_list<std::initializer_list<T>> list)
  -> Tensor<T, list.size(), list.begin()->size()>;

// 3D Deduction Guide
template <class T>
Tensor(
  std::initializer_list<std::initializer_list<std::initializer_list<T>>> list)
  -> Tensor<
    T, list.size(), list.begin()->size(), list.begin()->begin()->size()>;

// ! linear-time copy (make explicit?)
// Deduction guide for constructing from a raw array
// template <class Item, Size EXTENT>
// explicit Array(const Item (&)[EXTENT]) -> Array<Item, EXTENT>;

// ! hmm does not work - pointer decay?
// template <class Item, Size EXTENT>
// explicit Array(std::initializer_list<Item[EXTENT]> list)
//   -> Array<Item, EXTENT>;

namespace tensor {
// ! linear-time copy
template <class Item, int EXTENT>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const Item (&rawArray)[EXTENT]) {
	return Tensor<Item, EXTENT>::from(rawArray);
}

template <class Item, int EXTENT>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const std::initializer_list<Item> &list) {
	static_assert(list.size() == EXTENT, "wrong constructor selected");
	return Tensor<Item, EXTENT>::from(list);
}
} // namespace tensor

} // namespace VOLTISO_NAMESPACE

namespace std {
template <class T>
  requires requires(T t) { T::EXTENT; }
struct tuple_size<T> : std::integral_constant<V::Size, T::EXTENT> {};
} // namespace std

// !

#include <v/OFF>
