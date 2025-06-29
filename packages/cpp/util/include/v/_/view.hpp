#pragma once
#include <v/_/_>

#include "v/_/view.forward.hpp"

#include "v/_/0-is-voltiso-type.hpp"
#include "v/_/const-string-view.forward.hpp"
#include "v/_/dynamic-array.forward.hpp"
#include "v/_/tensor.forward.hpp"
#include "v/extent"
#include "v/get/extent"
#include "v/memory/iterator"
#include "v/object"
#include "v/option/extents"
#include "v/option/item"
#include "v/options"
#include "v/raw-array"
#include "v/tag/copy"
#include "v/value-pack"

#include <ostream>
#include <string_view>
#include <tuple>
#include <type_traits>

#include <v/ON>

namespace V::view {
template <class Item, auto... EXTENTS>
struct Specializations<
  Options<option::Item<Item>, option::Extents<ValuePack<EXTENTS...>>>> {
	using Result = View<Item, EXTENTS...>;
};
} // namespace V::view

// !

namespace V::_::view {
template <class Options>
static constexpr int extentKind = [] {
	using Extents = Options::template Get<option::Extents>;
	constexpr auto EXTENTS = Extents::tuple();
	if constexpr (std::tuple_size_v<decltype(EXTENTS)> == 0) {
		return 2;
	} else {
		return std::get<0>(EXTENTS) == V::extent::DYNAMIC;
	}
}();
template <class Options, int KIND> class ExtentData;

// static extent
template <class Options> class ExtentData<Options, 0> {
public:
	static constexpr auto EXTENT = Options::template Get<option::Extents>::HEAD;
};

// dynamic extent
template <class Options> class ExtentData<Options, 1> {
public:
	static constexpr auto EXTENT = V::extent::DYNAMIC;
	const Size _extent;
};

// no extent
template <class Options> class ExtentData<Options, 2> {};

//

template <class Options>
static constexpr bool isDynamicNumItems = [] {
	using Extents = Options::template Get<option::Extents>;
	constexpr auto EXTENTS = Extents::template array<Size>();
	for (auto extent : EXTENTS) {
		if (extent < 0) {
			return true;
		}
	}
	return false;
}();

template <class Options, bool DYNAMIC> class NumItemsData;

template <class Options> class NumItemsData<Options, false> {
public:
	static constexpr auto NUM_ITEMS = []() {
		Size numItems = 1;
		for (auto extent :
		     Options::template Get<option::Extents>::template array<Size>()) {
			numItems *= extent;
		}
		return numItems;
	}();
};
template <class Options> class NumItemsData<Options, true> {
public:
	static constexpr auto NUM_ITEMS = V::extent::DYNAMIC;

private:
	const Size _numItems;

public:
	constexpr auto numItems() const noexcept { return _numItems; }

public:
	constexpr NumItemsData(Size numItems) : _numItems(numItems) {}
};

//

template <class Options>
class Data : public ExtentData<Options, extentKind<Options>>,
             public NumItemsData<Options, isDynamicNumItems<Options>> {
	using ExtentBase = ExtentData<Options, extentKind<Options>>;
	using NumItemsBase = NumItemsData<Options, isDynamicNumItems<Options>>;

public:
	constexpr Data() = default;
	constexpr Data(Size extent, Size numItems)
	    : ExtentBase{extent}, NumItemsBase{numItems} {}
};
} // namespace V::_::view

// !

namespace VOLTISO_NAMESPACE::view {
template <class Options>
  requires concepts::Options<Options>
class Custom
    : public Object<typename Options::template WithDefault<
        option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>,
      public _::view::Data<Options> {
	using DataBase = _::view::Data<Options>;
	using Base = Object<typename Options::template WithDefault<
	  option::CustomTemplate<GetCustom>, option::InputOptions<Options>>>;

public:
	using Item = Options::template Get<option::Item>;
	using Extents = Options::template Get<option::Extents>;
	static constexpr auto EXTENTS = Extents::template array<Size>();

public:
	[[nodiscard]] VOLTISO_FORCE_INLINE constexpr auto extent() const noexcept {
		if constexpr (requires { DataBase::_extent; }) {
			return DataBase::_extent;
		} else {
			return DataBase::EXTENT;
		}
	}

public:
	using Items =
	  GetRawArray<Item, typename Options::template Get<option::Extents>>;
	// using Items = typename view::_::GetItems<Item, E, ES...>::Result;

	// Items &items;
	// Items *const items; // ! super-bug-prone
	Item *const items = nullptr;

public:
	// default construct empty view - only if numItems == 0
	constexpr Custom() noexcept
	  requires(DataBase::NUM_ITEMS == 0)
	    : items(nullptr) {}

	// default construct empty view - if first extent is dynamic (make it 0)
	constexpr Custom() noexcept
	  requires(DataBase::EXTENT == extent::DYNAMIC)
	    : DataBase(0, 0), items(nullptr) {}

	// create from single item (static extent)
	constexpr Custom(Item &item) noexcept
	  requires(DataBase::EXTENT == 1)
	    : items(&item) {}

	// create from raw array - static extent
	constexpr Custom(Items &items) noexcept
	  requires(DataBase::EXTENT != extent::DYNAMIC)
	    : items(items) {
		// static_assert(
		//   !std::is_same_v<std::remove_const_t<Item>, char>,
		//   "allow views of char?");
		static_assert(std::is_array_v<Items>);
		static_assert(!requires { this->extent; }); // no need to set?
	}

	// create from anything - static extent, unbound
	template <class TSource>
	  requires(DataBase::EXTENT == extent::UNBOUND)
	constexpr Custom(TSource &&source) noexcept
	  requires(requires {
		  { &source[0] } -> std::convertible_to<Item *>;
	  } && get::EXTENT<std::remove_reference_t<TSource>> == extent::UNBOUND)
	    : items(&source[0]) {}

	// create from anything - static extent
	template <class TSource>
	  requires(
	    DataBase::EXTENT != extent::DYNAMIC &&
	    DataBase::EXTENT != extent::UNBOUND &&
	    DataBase::EXTENT == get::EXTENT<std::remove_reference_t<TSource>>)
	constexpr Custom(TSource &&source) noexcept
	  requires requires {
		  { &source[0] } -> std::convertible_to<Item *>;
	  }
	    : items(&source[0]) {
		static_assert(!requires { this->extent; }); // no need to set?
	}

	// create from anything indexable - dynamic extent
	template <class TSource>
	  requires(DataBase::EXTENT == extent::DYNAMIC)
	constexpr Custom(TSource &&source) noexcept
	  requires(requires {
		          { &source[0] } -> std::convertible_to<Item *>;
	          })
	    : DataBase(get::extent(source), get::extent(source)), items(&source[0]) {}

	// create from anything iterable - dynamic extent
	template <class TSource>
	  requires(DataBase::EXTENT == extent::DYNAMIC)
	constexpr Custom(TSource &&source) noexcept
	  requires(requires {
		          { source.begin() } -> std::convertible_to<Item *>;
	          })
	    : DataBase(get::extent(source), get::extent(source)),
	      items(&*source.begin()) {}

	// create from initializer_list - dynamic extent
	constexpr Custom(const std::initializer_list<Item> &source) noexcept
	  requires(DataBase::EXTENT == extent::DYNAMIC)
	    : DataBase(source.size(), source.size()), items(&*source.begin()) {}

	// create from pointer - static extent
	template <class ItemsPointer>
	  requires(
	    DataBase::EXTENT != extent::DYNAMIC &&
	    std::is_pointer_v<std::remove_reference_t<ItemsPointer>> &&
	    !std::is_array_v<std::remove_reference_t<ItemsPointer>>)
	constexpr Custom(ItemsPointer &&pFirstItem) noexcept : items(pFirstItem) {
		static_assert(!requires { this->extent; }); // no need to set?
	}

	// create from pointer - dynamic extent
	template <class ItemsPointer>
	  requires(Extents::tuple() == std::tuple{extent::DYNAMIC} &&
	           DataBase::EXTENT == extent::DYNAMIC &&
	           std::is_pointer_v<std::remove_reference_t<ItemsPointer>> &&
	           !std::is_array_v<std::remove_reference_t<ItemsPointer>>)
	constexpr Custom(ItemsPointer &&pFirstItem, Size numItems) noexcept
	    : DataBase(numItems, numItems), items(pFirstItem) {}

	// cheap copy, so implicit
	constexpr Custom(const Custom &) noexcept = default;

	constexpr Custom &operator=(const Custom &) = delete; // ref semantics

	// ! explicit - raw arrays don't handle comparison nicely
	explicit operator Items &() const { return items; }

	auto &operator[](Size i) {
		LT(i, extent());
		return items[i];
	}

	const auto &operator[](Size i) const {
		LT(i, extent());
		return items[i];
	}

	template <Size START, Size END>
	[[nodiscard]] constexpr auto view() const noexcept {
		auto ptr = items + START;
		using SubView =
		  Base::template With<option::Extents<ValuePack<END - START>>>;
		return SubView{ptr};
	}

	[[nodiscard]] constexpr auto view(Size start, Size end) const noexcept {
		LT(start, extent());
		LT(end, extent());
		using Result =
		  Base::template With<option::Extents<ValuePack<extent::DYNAMIC>>>;
		return Result{items + start, end - start};
	}

	// !

	[[nodiscard]] constexpr auto copy() const noexcept {
		if constexpr (DataBase::NUM_ITEMS < 0) {
			using Result = v::DynamicArray<std::remove_const_t<Item>>;
			return Result{tag::COPY, *this};
		} else {
			using Result =
			  V::Tensor<std::remove_const_t<Item>>::template WithExtents<Extents>;
			return Result{tag::COPY, *this};
		}
	}

	[[nodiscard]] constexpr auto map(auto &&func) const noexcept {
		using NewItem = std::remove_cvref_t<decltype(func(items[0]))>;
		if constexpr (DataBase::NUM_ITEMS < 0) {
			using Result = v::DynamicArray<NewItem>;
			Result result;
			result.setNumSlotsAtLeast(extent());
			for (Size i = 0; i < extent(); ++i) {
				result.pushUnchecked(func(items[i]));
			}
			return result;
		} else {
			using Result = V::Tensor<NewItem>::template WithExtents<Extents>;
			Result result;
			for (Size i = 0; i < extent(); ++i) {
				result[i] = func(items[i]);
			}
			return result;
		}
	}

	// !

	[[nodiscard]] constexpr operator std::string_view() const noexcept
	  requires std::is_same_v<Item, char> || std::is_same_v<Item, const char>
	{
		return std::string_view(items, extent());
	}

	// ! iteration
	auto begin() const noexcept { return memory::Iterator(items); }
	auto end() const noexcept { return memory::Iterator(items + extent()); }

public:
	template <class Extents>
	using WithExtents = Base::template With<option::Extents<Extents>>;
}; // class Custom

// static_assert(
//   std::is_trivially_copyable_v<Custom<Options<
//     option::Item<const int>, option::Extents<ValuePack<extent::DYNAMIC>>>>>);

} // namespace VOLTISO_NAMESPACE::view

// !

namespace V {
template <class Item, auto... ES>
class View : public view::Custom<Options<
               option::Item<Item>, option::Extents<ValuePack<ES...>>,
               option::Self<View<Item, ES...>>>> {
	using Base = view::Custom<Options<
	  option::Item<Item>, option::Extents<ValuePack<ES...>>,
	  option::Self<View<Item, ES...>>>>;
	using Base::Base;

public:
	constexpr View() noexcept = default;
	constexpr View(const View &) noexcept = default;
};

// static_assert(std::is_trivially_copyable_v<View<const int,
// extent::DYNAMIC>>);

// deduction guide for raw arrays
template <class Item, Size NUM_ITEMS>
View(Item (&array)[NUM_ITEMS]) -> View<Item, NUM_ITEMS>;

// deduction guide for anything - static extent
template <class TArray>
  requires(!std::is_array_v<TArray>)
View(TArray &array)
  -> View<std::remove_reference_t<decltype(array[0])>, get::EXTENT<TArray>>;

// // deduction guide for anything - dynamic extent
// template <class TArray>
//   requires(!std::is_array_v<TArray> && get::EXTENT<TArray> ==
//   Extent::DYNAMIC)
// View(TArray &array)
//   -> View<std::remove_reference_t<decltype(array[0])>, get::EXTENT<TArray>>;

//

// if both sides are convertible to ConstStringView, compare this way
template <class A, class B>
[[nodiscard]] INLINE constexpr bool operator==(const A &a, const B &b)
  requires(V::is::VoltisoType<A> || V::is::VoltisoType<B>) && requires {
	  ConstStringView(a);
	  ConstStringView(b);
  }
{
	auto viewA = ConstStringView(a);
	auto viewB = ConstStringView(b);
	if constexpr (
	  viewA.EXTENT != extent::DYNAMIC && viewB.EXTENT != extent::DYNAMIC) {
		// static_assert(viewA.EXTENT == viewB.EXTENT, "String sizes mismatch");
		if constexpr (viewA.EXTENT != viewB.EXTENT) {
			return false;
		}
		return std::equal(viewA.items, viewA.items + viewA.EXTENT, viewB.items);
	} else {
		// std::cout << "dynamic branch" << std::endl;

		// ! we could force user to check this
		// EQ(viewA.extent(), viewB.extent());

		// ! or allow this, bad for performance if views are always the same length
		// likely / unlikely ?? really depends - let compiler decide
		if (viewA.extent() != viewB.extent()) /* [[unlikely]] */ {
			return false;
		}

		NE(viewA.extent(), extent::DYNAMIC); // should never happen
		NE(viewA.extent(), extent::UNBOUND); // can happen
		if (viewA.items == viewB.items) /* [[likely]] */ {
			// this will usually be *unlikely*, but we speed-up this path
			return true;
		}
		return std::equal(viewA.items, viewA.items + viewA.extent(), viewB.items);
	}
}

// if both sides are convertible to View, compare this way
// ! NOTE: This currently asserts that both sides are the same size and point to
// different memory. (performance)
template <class A, class B>
[[nodiscard]] inline constexpr auto operator==(const A &a, const B &b)
  requires(V::is::VoltisoType<A> || V::is::VoltisoType<B>) &&
          requires {
	          View(a);
	          View(b);
          } &&
          (!(requires { ConstStringView(a); }) ||
           !(requires { ConstStringView(b); }))
{
	// int aa = ConstStringView(a);
	// static_assert(requires { ConstStringView(a); });
	auto viewA = View(a);
	auto viewB = View(b);
	// if constexpr (std::is_same_v<A, v::Array<int, 3>>) {
	//   // int x = viewA;
	//   static_assert(viewA.EXTENT == 3);
	// }
	// int aa = viewB;
	if constexpr (requires {
		              viewA.NUM_ITEMS;
		              viewB.NUM_ITEMS;
	              }) {
		// static_assert(viewA.NUM_ITEMS == viewB.NUM_ITEMS, "View sizes mismatch");
		if constexpr (viewA.NUM_ITEMS != viewB.NUM_ITEMS) {
			return false;
		}
		return std::equal(viewA.items, viewA.items + viewA.NUM_ITEMS, viewB.items);
	} else {
		// dynamic branch
		if (viewA.extent() != viewB.extent()) [[unlikely]] {
			return false;
		}
		NE(viewA.extent(), extent::DYNAMIC); // should never happen
		NE(viewA.extent(), extent::UNBOUND); // can happen

		// ! check in client code (performance)
		EQ(viewA.extent(), viewB.extent());

		// ! check in client code (performance)
		NE(viewA.items, viewB.items);

		return std::equal(viewA.items, viewA.items + viewA.NUM_ITEMS, viewB.items);
	}
}

// !

// ! rhs voltiso types concatenation (array or string)

// if lhs is convertible to ConstStringView, and RHS is a voltiso type,
// we can convert LHS to ConstStringView and use its operator<<
template <class A, class B>
[[nodiscard]] inline constexpr auto operator<<(const A &a, const B &b)
  requires(requires {
	  ConstStringView(a);
  } && !is::VoltisoType<A> && is::VoltisoType<B>)
{
	// static_assert(std::is_same_v<
	//               decltype(ConstStringView(a).copy()), ConstStringView<2>
	//               &&>);
	return ConstStringView(a) << b;
}

// otherwise, try View(a), but only if can't convert lhs to ConstStringView
template <class A, class B>
[[nodiscard]] inline constexpr auto operator<<(const A &a, const B &b)
  requires requires { View(a); } && (!(requires { ConstStringView(a); }) &&
                                     !is::VoltisoType<A> && is::VoltisoType<B>)
{
	return View(a) << b;
}

// !

template <class TItem, auto... ES>
std::ostream &operator<<(std::ostream &os, const View<TItem, ES...> &view) {
	os << '[';
	for (Size i = 0; i < view.extent(); i++) {
		if (i > 0) {
			os << ", ";
		}
		os << view.items[i];
	}
	return os << "]";
} // operator<<
} // namespace V

// !

namespace std {
template <class Item, auto E, auto... ES>
struct tuple_size<V::View<Item, E, ES...>>
    : std::integral_constant<V::Size, E> {};
} // namespace std

//

#include <v/OFF>
