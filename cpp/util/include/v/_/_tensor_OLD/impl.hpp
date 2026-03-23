#pragma once
#include <v/_/_>

#include "concat-traits.hpp"
#include "forward.hpp"

#include "v/_/dynamic-array.forward.hpp"
#include "v/_/view.forward.hpp"
#include "v/extent"
#include "v/get/extent"
#include "v/get/num-items"
#include "v/handle"
#include "v/is/options"
#include "v/memory/iterator"
#include "v/object"
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

#include <cstring>
#include <type_traits>

#include <v/ON>

namespace V::_::tensor {
template <class Options>
static constexpr auto extentKind = [] {
	using Extents = Options::template Get<option::Extents>;
	constexpr auto EXTENTS = Extents::tuple();
	if constexpr (std::tuple_size_v<decltype(EXTENTS)> == 0) {
		return 2;
	} else {
		return std::get<0>(EXTENTS) == V::extent::DYNAMIC;
	}
}();
template <class Options, int KIND> class ExtentData;

template <class Options> class ExtentData<Options, 2> {};

template <class Options> class ExtentData<Options, 1> {
public:
	static constexpr auto EXTENT = V::extent::DYNAMIC;
};

template <class Options> class ExtentData<Options, 0> {
public:
	static constexpr auto EXTENT = [] {
		using Extents = Options::template Get<option::Extents>;
		return std::get<0>(Extents::tuple());
	}();
};

template <is::Options Options>
class CustomNNR : public Object<typename Options ::template WithDefault<
                    option::CustomTemplate<V::tensor::GetCustom>, option::InputOptions<Options>>>,
                  public ExtentData<Options, extentKind<Options>> {
protected:
	using Object = Object<typename Options ::template WithDefault<
	  option::CustomTemplate<V::tensor::GetCustom>, option::InputOptions<Options>>>;
	using Object::Object;

public:
	using Item = Options::template Get<option::Item>;
	using Extents = Options::template Get<option::Extents>;
	static constexpr auto EXTENTS = Extents::template array<Size>();
	static constexpr auto NUM_ITEMS = []() {
		V::Size result = 1;
		for (const auto &extent : EXTENTS) {
			if (extent < 0) {
				return extent;
			}
			result *= extent;
		}
		return result;
	}();

public:
	RawArray<Item, NUM_ITEMS> items;

private:
	using Base = ExtentData<Options, extentKind<Options>>;

protected:
	using Final = Object::Final;

public:
	static_assert(
	  !std::is_const_v<Item>, "const Item does not make sense, just use `const Array<Item>`");

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

	static constexpr auto STARTING_INDEX = Options::template get<option::startingIndex>;

	static_assert(!std::is_same_v<Item, void>, "Item type must be specified");

	template <class Kind> using CustomHandle = Handle::WithBrand<Final>::template WithKind<Kind>;

	using Handle =
	  CustomHandle<std::conditional_t<(STARTING_INDEX < 0), std::make_signed<Size>, Size>>;

public:
	constexpr auto extent() const noexcept { return Base::EXTENT; }
	constexpr auto numItems() const noexcept { return NUM_ITEMS; }
	constexpr auto strides() const noexcept { return STRIDES; }

private:
	static constexpr auto _implicitCopy = Options::template get<option::implicitCopy>;

public:
	CustomNNR() = default;

public:
	CustomNNR(const CustomNNR &) = default;

	// CustomNNR(const CustomNNR &other)
	//   requires(_implicitCopy)
	// = default;

	//

	CustomNNR(CustomNNR &&other)
	  requires(_implicitCopy)
	= default;

protected:
	CustomNNR(CustomNNR &&other) = default;

public:
	CustomNNR &operator=(const CustomNNR &) = default;

	//

	CustomNNR &operator=(CustomNNR &&) = delete;

	CustomNNR &operator=(CustomNNR &&other)
	  requires(_implicitCopy)
	= default;

public:
	// explicit copy
	template <class Other>
	  requires(!std::is_reference_v<Other> && std::is_const_v<Other> && Other::EXTENTS == EXTENTS)
	constexpr CustomNNR(/*const*/ Other &&other) {
		if constexpr (std::is_trivially_copyable_v<Item>) {
			std::memcpy(this, &other, sizeof(CustomNNR));
		} else {
			std::copy(other.items, other.items + Other::NUM_ITEMS, this->items);
		}
	}

	template <class Other>
	  requires(Other::EXTENTS == EXTENTS)
	constexpr Final &operator=(const Other &&other) {
		if constexpr (std::is_trivially_copyable_v<Item>) {
			std::memcpy(this, &other, sizeof(CustomNNR));
		} else {
			std::copy(other.items, other.items + Other::NUM_ITEMS, this->items);
		}
		return Object::final();
	}

	INLINE constexpr CustomNNR(std::initializer_list<Item> list) noexcept {
		EQ(list.size(), NUM_ITEMS);
		std::copy(list.begin(), list.end(), this->items);
	}

	INLINE constexpr CustomNNR(std::initializer_list<std::initializer_list<Item>> list) noexcept {
		EQ(list.size(), Base::EXTENT);
		Size i = 0;
		for (const auto &row : list) {
			EQ(row.size(), Base::EXTENT);
			for (const auto &val : row) {
				this->items[i++] = val;
			}
		}
	}

	template <class Arg> static INLINE constexpr auto from(Arg &&arg) {
		return Final{tag::COPY, std::forward<Arg>(arg)};
	}

	template <class... Args> static INLINE constexpr auto concat(Args &&...args) {
		return Final{tag::CONCAT, std::forward<Args>(args)...};
	}

public:
	template <class TSource> constexpr CustomNNR(tag::Copy, const TSource &source) {
		static_assert(TSource::NUM_ITEMS == NUM_ITEMS);
		std::copy(source.items, source.items + NUM_ITEMS, this->items);
	}

	constexpr CustomNNR(tag::Copy, RawArray<const Item, NUM_ITEMS> &items) {
		std::copy(items, items + NUM_ITEMS, this->items);
	}

	template <Size N>
	  requires(N >= NUM_ITEMS)
	consteval CustomNNR(tag::CopyConsteval, const Item (&items)[N]) {
		std::copy(items, items + NUM_ITEMS, this->items);
	}

public:
	VOLTISO_FORCE_INLINE auto dynamic() const && -> auto { return dynamicArray::from(this->final()); }

public:
	template <
	  class InferredHandle,
	  std::enable_if_t<std::is_same_v<typename InferredHandle::Brand, Final>> * = nullptr>
	  requires(Base::EXTENT == NUM_ITEMS)
	const Item &operator[](const InferredHandle &handle) const {
		GE(handle.value, STARTING_INDEX);
		LT(handle.value - STARTING_INDEX, (std::make_signed_t<decltype(NUM_ITEMS)>)NUM_ITEMS);
		return this->items[handle.value - STARTING_INDEX];
	}

	template <
	  class InferredHandle,
	  std::enable_if_t<std::is_same_v<typename InferredHandle::Brand, Final>> * = nullptr>
	  requires(Base::EXTENT == NUM_ITEMS)
	Item &operator[](const InferredHandle &handle) {
		return const_cast<Item &>(const_cast<const CustomNNR &>(*this)[handle]);
	}

	template <class Index, class = std::enable_if_t<std::is_integral_v<Index>>>
	  requires(Base::EXTENT == NUM_ITEMS)
	const Item &operator[](const Index &index) const {
		return (*this)[CustomHandle<Index>(index)];
	}

	template <class Index, class = std::enable_if_t<std::is_integral_v<Index>>>
	  requires(Base::EXTENT == NUM_ITEMS)
	Item &operator[](const Index &index) {
		return (*this)[CustomHandle<Index>(index)];
	}

	auto operator[](Size index)
	  requires(EXTENTS.size() > 1)
	{
		using SubView = View<Item>::template WithExtents<typename Extents::Tail>;
		return SubView{this->items + index * extent() - STARTING_INDEX};
	}

	auto operator[](Size index) const
	  requires(EXTENTS.size() > 1)
	{
		using SubView = const View<const Item>::template WithExtents<typename Extents::Tail>;
		return SubView{this->items + index * extent() - STARTING_INDEX};
	}

	constexpr bool operator==(const CustomNNR &other) const {
		return NUM_ITEMS == other.NUM_ITEMS &&
		       std::equal(this->items, this->items + NUM_ITEMS, other.items);
	}

	explicit operator RawArray<Item, NUM_ITEMS> &() noexcept { return this->items; }

	explicit operator const RawArray<Item, NUM_ITEMS> &() const noexcept { return this->items; }

	constexpr operator ::std::string_view() const
	  requires std::is_same_v<std::remove_const_t<Item>, char>
	{
		return ::std::string_view(this->items, NUM_ITEMS);
	}

	explicit constexpr
	operator ::std::string() noexcept(noexcept(std::string(this->items, this->items + NUM_ITEMS)))
	  requires(std::is_same_v<std::remove_const_t<Item>, char>)
	{
		return std::string(this->items, this->items + NUM_ITEMS);
	}

	constexpr operator View<Item, NUM_ITEMS>() { return View<Item, NUM_ITEMS>{this->items}; }

	constexpr operator View<const Item, NUM_ITEMS>() const {
		return View<const Item, NUM_ITEMS>{this->items};
	}

	[[nodiscard]] constexpr auto view() noexcept {
		using Result = View<Item>::template WithExtents<Extents>;
		return Result{*this};
	}

	[[nodiscard]] constexpr auto view() const noexcept {
		using Result = const View<const Item>::template WithExtents<Extents>;
		return Result{*this};
	}

	using Iterator = memory::Iterator<Item>;
	using ConstIterator = memory::Iterator<const Item>;

	Iterator begin() { return Iterator{this->items}; }
	Iterator end() { return Iterator{this->items + NUM_ITEMS}; }
	ConstIterator begin() const { return ConstIterator{this->items}; }
	ConstIterator end() const { return ConstIterator{this->items + NUM_ITEMS}; }

	constexpr Size size() const noexcept { return NUM_ITEMS; }
	[[nodiscard]] constexpr auto data() const noexcept { return this->items; }

public:
	template <class Other>
	  requires(get::EXTENT<Other> != V::extent::DYNAMIC && get::EXTENT<Other> != V::extent::UNBOUND)
	constexpr auto operator<<(this auto &&self, Other &&other) {
		constexpr Size newNumItems = NUM_ITEMS + get::numItems<Other>;
		using Result = Final::template With<option::Extents<ValuePack<newNumItems>>>;
		EQ(_::tensor::sumNumItems(self, other), newNumItems);
		return Result::concat(std::forward<decltype(self)>(self), std::forward<Other>(other));
	}

private:
	template <class... Slices> constexpr CustomNNR(tag::Concat, Slices &&...slices) {
		constexpr auto sumResult = _::tensor::sumNumItems(slices...);
		if constexpr (!is::staticError(sumResult)) {
			static_assert(NUM_ITEMS == sumResult);
		}
		Size current_offset = 0;
		(void)std::initializer_list<int>{
		  (processSlice(current_offset, std::forward<Slices>(slices)), 0)...};
	}

	template <class SliceT> constexpr void processSlice(Size &current_offset, SliceT &&slice) {
		if constexpr (std::is_same_v<std::decay_t<SliceT>, tag::Copy>) {
			return;
		} else {
			auto slice_instance = View(slice);
			using SliceInstanceType = decltype(slice_instance);
			using SourceItemType = typename SliceInstanceType::Item;
			static_assert(
			  std::is_convertible_v<SourceItemType, Item>,
			  "Item type of a source slice is not convertible to Array's item "
			  "type.");
			static_assert(
			  slice_instance.extent() == get::EXTENT<SliceT>,
			  "Slice extent mismatch: slice_instance.extent() vs get::EXTENT for "
			  "source type.");
			for (Size i = 0; i < slice_instance.extent(); ++i) {
				this->items[current_offset + i] = slice_instance.items[i];
			}
			current_offset += slice_instance.extent();
		}
	}

public:
	template <class Extents> using WithExtents = Object::template With<option::Extents<Extents>>;
	using WithImplicitCopy = Object::template With<option::implicitCopy<true>>;
};
} // namespace V::_::tensor

#include <v/OFF>
