#pragma once
#include <v/_/_>

#include "v/_/const-string-view.forward.hpp"

#include "v/_/dynamic-string/forward.hpp"
#include "v/_/string/forward.hpp"
#include "v/_/tensor/concat-traits.hpp"
#include "v/extent"
#include "v/get/extent"
#include "v/view"

#include <v/ON>

namespace VOLTISO_NAMESPACE {
template <auto T_EXTENT>
class ConstStringView : public View<const char, T_EXTENT> {
	using Base = View<const char, T_EXTENT>;
	// using Base::Base;

protected:
	using Final = Base::Final;

public:
	// create from anything - forward to Base
	template <class Other>
	  requires(!std::is_array_v<std::remove_reference_t<Other>>)
	constexpr ConstStringView(Other &&other) : Base{std::forward<Other>(other)} {}

public:
	// create from raw array - static extent
	template <Size N>
	  requires(
	    T_EXTENT != extent::DYNAMIC && T_EXTENT != extent::UNBOUND &&
	    N == T_EXTENT + 1)
	constexpr ConstStringView(const char (&chars)[N]) : Base{&chars[0]} {
		EQ(chars[T_EXTENT], '\0');
	}

	constexpr bool operator==(const ConstStringView &other) const {
		// todo: we could have traits `is_trivially_equal_comparable` and
		// `is_trivially_less_comparable` - and use memcmp
		// (or `binary` instead of `trivially`)
		// return items == other.items ||
		//        memcmp(items, other.items, sizeof(RawArray)) == 0;
		if (&this->items == &other.items) [[unlikely]] {
			return true; // assume a==a
		}

		for (Size i = 0; i < T_EXTENT; ++i) {
			if (this->items[i] != other.items[i]) {
				return false;
			}
		}
		return true;
	}

public:
	// concat known size
	template <class Other>
	constexpr auto operator<<(this auto &&self, Other &&other)
	  requires(
	    // for now, accept only `self.copy()`
	    // !std::is_reference_v<decltype(self)> && std::is_const_v<decltype(self)>
	    // &&
	    //
	    get::EXTENT<decltype(self)> != extent::DYNAMIC &&
	    get::EXTENT<decltype(self)> != extent::UNBOUND &&
	    get::EXTENT<Other> != extent::DYNAMIC &&
	    get::EXTENT<Other> != extent::UNBOUND)
	{ // Allow rvalue this
		// Use get::EXTENT<Other> to ensure we get extent of e.g. const char (&)[N]
		// not const char* if the latter would have an UNBOUND extent.
		// ! NOTE: Base::Final is not correct - we have no CustomSlice class for now
		constexpr auto NEW_NUM_ITEMS =
		  get::EXTENT<decltype(self)> + get::EXTENT<Other>;
		// using Result = Final::template With<option::NUM_ITEMS<NEW_NUM_ITEMS>>;
		using Result = String<NEW_NUM_ITEMS>;
		// using Result = String<NEW_NUM_ITEMS> ::WithDefault<GetBrands<>>;
		static_assert(_::tensor::sumNumItems(self, other) == NEW_NUM_ITEMS);
		return Result::concat(
		  std::forward<decltype(self)>(self),
		  std::forward<Other>(other)); // rvo guaranteed
	}

	// concat unknown size
	template <class Other>
	VOLTISO_FORCE_INLINE auto operator<<(const Other &other) const
	  requires(
	    get::EXTENT<ConstStringView> == extent::DYNAMIC ||
	    get::EXTENT<Other> == extent::DYNAMIC)
	{
		// using Result = DynamicString;
		return dynamicString::concat(*this, other);
	}

public:
	// for std?
	constexpr Size size() const noexcept {
		NE(this->extent(), extent::DYNAMIC);
		NE(this->extent(), extent::UNBOUND);
		return this->extent();
	}
}; // class StringSlice

// ! deduction guide for single element (dangerous??)
template <class Item>
  requires(std::is_same_v<std::remove_const_t<Item>, char>)
ConstStringView(Item &item) -> ConstStringView<1>;

// deduction guide for raw arrays
template <Size N> ConstStringView(const char (&)[N]) -> ConstStringView<N - 1>;

// deduction guide for custom tuples - static extent
template <class TArray>
  requires(
    !std::is_array_v<TArray> &&
    std::is_same_v<
      std::remove_cvref_t<decltype(std::declval<TArray>()[0])>, char>)
ConstStringView(TArray &array) -> ConstStringView<get::EXTENT<TArray>>;

// deduction guide for custom arrays - dynamic extent
template <class TArray>
  requires(
    !std::is_array_v<TArray> &&
    std::is_same_v<
      std::remove_cvref_t<decltype(std::declval<TArray>()[0])>, char> &&
    !has::EXTENT<TArray>)
ConstStringView(TArray &array) -> ConstStringView<extent::DYNAMIC>;
} // namespace VOLTISO_NAMESPACE

// !

#include <format>
#include <ostream>

namespace std {
template <auto T_EXTENT> struct formatter<V::ConstStringView<T_EXTENT>, char> {
	constexpr auto parse(format_parse_context &ctx) { return ctx.begin(); }
	template <typename FormatContext>
	auto
	format(const V::ConstStringView<T_EXTENT> &slice, FormatContext &ctx) const {
		return std::format_to(
		  ctx.out(), "{}",
		  std::string_view(slice.items, static_cast<std::size_t>(slice.extent())));
	}
};
template <auto T_EXTENT>
struct formatter<const V::ConstStringView<T_EXTENT>, char>
    : formatter<V::ConstStringView<T_EXTENT>, char> {};
} // namespace std

// !

template <auto T_EXTENT>
std::ostream &
operator<<(std::ostream &os, const V::ConstStringView<T_EXTENT> &slice) {
	return os << std::format("{}", slice);
} // operator<<

// !

// for GTest
namespace VOLTISO_NAMESPACE {
template <auto T_EXTENT>
void PrintTo(const V::ConstStringView<T_EXTENT> &v, std::ostream *os) {
	*os << std::format("{}", v); // or string_view directly
}
} // namespace VOLTISO_NAMESPACE

// ! operator<< for std::ostream for arrays and strings

template <class T>
  requires(V::is::Object<T>)
std::ostream &operator<<(std::ostream &os, const T &t)
  requires requires { V::ConstStringView(t); }
{
	return os << V::ConstStringView(t);
}

template <class T>
  requires(V::is::Object<T>)
std::ostream &operator<<(std::ostream &os, T &&t)
  requires(
    !requires { V::ConstStringView(t); } && requires { V::View(t); })
{
	return os << V::View(t);
}

#include <v/OFF>
