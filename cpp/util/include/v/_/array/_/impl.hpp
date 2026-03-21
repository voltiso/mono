#pragma once
#include <v/_/_>

#include "../options.hpp"
#include "get-base.hpp"

#include "v/_/0-is-derived-from-template.hpp"
// #include "v/_/view.forward.hpp"
#include "v/copy"
#include "v/memory/iterator"
#include "v/move"
#include "v/raw-array"
#include "v/size"
#include "v/tag/concat"
#include "v/tag/copy"
#include "v/tag/copy-consteval"
#include "v/trait/num-items"

#include <algorithm>
#include <cstring>
#include <iterator>
#include <string>
#include <string_view>
#include <type_traits>
#include <utility>

#include <v/ON>

namespace VOLTISO_NAMESPACE::array::_ {
consteval Size sumNumItems() { return 0; }

template <class T, class... Ts> consteval Size sumNumItems(T &&, Ts &&...ts) {
	return trait::numItems<T> + sumNumItems(std::forward<Ts>(ts)...);
}

// !

template <is::Option... Os> class RELOCATABLE(Impl) : public _::GetBase<Os...> {
	using Base = _::GetBase<Os...>;
	using Final = Base::Final;

	using typename Base::Config;
	using Item = Config::Item;
	using Items = Config::Items;

private:
	// ⚠️ All data members here
	Items _items;

public:
	consteval Items &items() noexcept { return _items; }
	consteval const Items &items() const noexcept { return _items; }

public:
	static consteval auto numItems() noexcept { return Config::numItems; }

	// ! ---------------------------------
	// ! CONSTRUCT
	// ! ---------------------------------
public:
	Impl() = default;

	template <class... Items>
	  requires(sizeof...(Items) == Config::numItems)
	INLINE constexpr Impl(Items &&...items) noexcept
	  requires requires { decltype(_items){std::forward<Items>(items)...}; }
	    : _items{std::forward<Items>(items)...} {}

	// ! COPY
public:
	Impl(const Impl &) = delete;
	Impl(const Impl &)
	  requires(Config::implicitCopy)
	= default;

	// implicit construct-copy-conversion
	template <class Other>
	  requires(
	    Config::implicitCopy && is::DerivedFromTemplate<Other, Impl> &&
	    Config::numItems == trait::numItems<Other>)
	constexpr Impl(const Other &other) : Impl(other, std::make_index_sequence<Config::numItems>{}) {}

private:
	// copy helper
	template <class Other, std::size_t... Is>
	constexpr Impl(const Other &other, std::index_sequence<Is...>)
	    : _items{copy(*std::next(other.begin(), Is))...} {}

	// ! EXPLICIT COPY (const Other&&)
public:
	template <class Other>
	  requires(
	    std::is_const_v<Other> && !std::is_reference_v<Other> &&
	    is::DerivedFromTemplate<Other, Impl> && Config::numItems == trait::numItems<Other>)
	constexpr Impl(/*const*/ Other &&other)
	    : Impl(other, std::make_index_sequence<Config::numItems>{}) {}

	// ! MOVE
public:
	// Don't use directly:
	explicit Impl(Impl &&) = default; // for trivially_copyable / [[trivial_abi]]

	Impl(Impl &&)
	  requires(Config::implicitCopy)
	= default;

	// implicit construct-move-conversion
	template <class Other>
	  requires(
	    !std::is_reference_v<Other> && !std::is_const_v<Other> && Config::implicitCopy &&
	    is::DerivedFromTemplate<Other, Impl> && Config::numItems == trait::numItems<Other>)
	constexpr Impl(Other &&other)
	    : Impl(std::move(other), std::make_index_sequence<Config::numItems>{}) {}

private:
	// move helper
	template <class Other, std::size_t... Is>
	  requires(!std::is_const_v<Other> && !std::is_reference_v<Other>)
	constexpr Impl(Other &&other, std::index_sequence<Is...>)
	    : _items{move(*std::next(other.begin(), Is))...} {}

	// ! ---------------------------------
	// ! ASSIGN
	// ! ---------------------------------

	// ! COPY
public:
	Impl &operator=(const Impl &) = delete;
	Impl &operator=(const Impl &other)
	  requires(Config::implicitCopy)
	= default;

	template <class Other>
	  requires(Config::implicitCopy && Config::numItems == trait::numItems<Other>)
	constexpr auto &operator=(const Other &other) noexcept(
	  noexcept(std::copy(other.begin(), other.end(), this->begin()))) {
		std::copy(other.begin(), other.end(), this->begin());
		return *this;
	}

	// ! EXPLICIT COPY ASSIGN (const Other&&)
public:
	template <class Other>
	  requires(
	    // strictly `const T&& other`
	    !std::is_reference_v<Other> && std::is_const_v<Other> &&
	    Config::numItems == trait::numItems<Other>)
	constexpr auto &operator=(/*const*/ Other &&other) {
		std::copy(other.begin(), other.end(), this->begin());
		return *this;
	}

	// ! MOVE
public:
	Impl &operator=(Impl &&) = delete;
	Impl &operator=(Impl &&)
	  requires(Config::implicitCopy)
	= default;

	template <class Other>
	  requires(
	    Config::implicitCopy && !std::is_reference_v<Other> && !std::is_const_v<Other> &&
	    Config::numItems == trait::numItems<Other>)
	constexpr Impl &operator=(Other &&other) noexcept(
	  noexcept(std::move(other.begin(), other.end(), this->begin()))) {
		std::move(other.begin(), other.end(), this->begin());
		return *this;
	}

	// ! ---------------------------------

public:
	template <class Arg> static INLINE constexpr auto from(Arg &&arg) {
		return Final{tag::COPY, std::forward<Arg>(arg)};
	}

	template <class... Args> static INLINE constexpr auto concat(Args &&...args) {
		return Final{tag::CONCAT, std::forward<Args>(args)...};
	}

public:
	template <class TSource> constexpr Impl(tag::Copy, const TSource &source) {
		// Compile-time shape compatibility check.
		static_assert(trait::numItems<TSource> == Config::numItems);
		std::copy(source.items(), source.items() + Config::numItems, this->items());
	}

	constexpr Impl(tag::Copy, RawArray<const Item, Config::numItems> &items) {
		std::copy(items, items + Config::numItems, this->items());
	}

	template <Size N>
	  requires(N >= Config::numItems)
	consteval Impl(tag::CopyConsteval, const Item (&items)[N]) {
		// Accept N >= NUM_ITEMS to support null-terminated string literals.
		std::copy(items, items + Config::numItems, this->items());
	}

	// ! ---------------------------------

public:
	template <class InferredHandle>
	  requires std::is_same_v<typename InferredHandle::Brand, Final>
	const Item &operator[](const InferredHandle &handle) const {
		GE(handle.value, Config::startingIndex);
		LT(
		  handle.value - Config::startingIndex,
		  (std::make_signed_t<decltype(Config::numItems)>)Config::numItems);
		return this->items()[handle.value - Config::startingIndex];
	}

	template <
	  class InferredHandle,
	  std::enable_if_t<std::is_same_v<typename InferredHandle::Brand, Final>> * = nullptr>
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
		return std::equal(this->items(), this->items() + Config::numItems, other.items());
	}

	explicit operator RawArray<Item, Config::numItems> &() noexcept { return this->items(); }
	explicit operator const RawArray<Item, Config::numItems> &() const noexcept {
		return this->items();
	}

	constexpr operator ::std::string_view() const
	  requires std::is_same_v<std::remove_const_t<Item>, char>
	{
		return ::std::string_view(this->items(), Config::numItems);
	}

	explicit constexpr operator ::std::string() noexcept(
	  noexcept(std::string(this->items(), this->items() + Config::numItems)))
	  requires(std::is_same_v<std::remove_const_t<Item>, char>)
	{
		return std::string(this->items(), this->items() + Config::numItems);
	}

	// constexpr operator View<Item, _numItems>() { return View<Item, _numItems>{this->items()}; }

	// constexpr operator View<const Item, _numItems>() const {
	// 	return View<const Item, _numItems>{this->items()};
	// }

	// [[nodiscard]] constexpr auto view() noexcept { return View<Item, _numItems>{*this}; }
	// [[nodiscard]] constexpr auto view() const noexcept { return View<const Item, _numItems>{*this};
	// }

	using Iterator = memory::Iterator<Item>;
	using ConstIterator = memory::Iterator<const Item>;

	// Iterator validity follows underlying storage relocation rules.
	Iterator begin() { return Iterator{this->items()}; }
	Iterator end() { return Iterator{this->items() + Config::numItems}; }
	ConstIterator begin() const { return ConstIterator{this->items()}; }
	ConstIterator end() const { return ConstIterator{this->items() + Config::numItems}; }

	[[nodiscard]] constexpr Size size() const noexcept { return Config::numItems; }
	[[nodiscard]] constexpr auto &data() const noexcept { return this->items(); }

public:
	// Concat for statically-sized sources only.
	template <class Other>
	  requires requires { trait::numItems<Other>; }
	constexpr auto operator<<(this auto &&self, Other &&other) {
		constexpr Size newNumItems = Config::numItems + trait::numItems<Other>;
		using Result = With<option::numItems<newNumItems>>;
		EQ(array::_::sumNumItems(self, other), newNumItems);
		return Result::concat(std::forward<decltype(self)>(self), std::forward<Other>(other));
	}

private:
	template <class... Slices> constexpr Impl(tag::Concat, Slices &&...slices) {
		constexpr auto sumResult = array::_::sumNumItems(slices...);
		if constexpr (!is::staticError(sumResult)) {
			static_assert(Config::numItems == sumResult);
		}
		Size currentOffset = 0;
		(void)std::initializer_list<int>{
		  (processSlice(currentOffset, std::forward<Slices>(slices)), 0)...};
	}

	template <class SliceT> constexpr void processSlice(Size &currentOffset, SliceT &&slice) {
		if constexpr (std::is_same_v<std::decay_t<SliceT>, tag::Copy>) {
			return;
		} else {
			auto view = View(slice);
			using ViewType = decltype(view);
			using SourceItemType = typename ViewType::Item;
			static_assert(
			  std::is_convertible_v<SourceItemType, Item>,
			  "Item type of a source slice is not convertible to Array item type.");
			static_assert(view.extent() == trait::numItems<SliceT>, "Slice extent mismatch.");
			for (Size i = 0; i < view.extent(); ++i) {
				this->items()[currentOffset + i] = view.items[i];
			}
			currentOffset += view.extent();
		}
	}

public:
	template <class... More> using With = Base::template With<More...>;
	template <auto n> using NumItems = With<option::numItems<n>>;
	using ImplicitCopy = With<option::implicitCopy<true>>;
}; // class Impl
} // namespace VOLTISO_NAMESPACE::array::_

#include <v/OFF>
