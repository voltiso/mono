#pragma once
#include <v/_/_>

#include "v/_/dynamic-string.forward.hpp"
#include "v/const-string-view"
#include "v/dynamic-array"
#include "v/get/brands"
#include "v/option/custom-template"
#include "v/option/item"
#include "v/option/self"
#include "v/options"
#include "v/tag/concat"

#include <utility>

#include <v/ON>

namespace VOLTISO_NAMESPACE::dynamicString {
template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};

template <class... Args>
using GetCustom = typename Specializations<Args...>::Result;
} // namespace VOLTISO_NAMESPACE::dynamicString

// !

namespace VOLTISO_NAMESPACE::dynamicString {
template <class TOptions>
  requires concepts::Options<TOptions>
class Custom
    : public dynamicArray::Custom<typename TOptions::template WithDefault<
        option::Item<char>, option::CustomTemplate<GetCustom>>> {
	using Base = dynamicArray::Custom<typename TOptions::template WithDefault<
	  option::Item<char>, option::CustomTemplate<GetCustom>>>;
	using Base::Base; // not enough

protected:
	using Self = Base::Self;

public:
	template <class... Args>
	INLINE Custom(Args &&...args) : Base(std::forward<Args>(args)...) {}

	template <Size N>
	explicit INLINE Custom(const char (&rawString)[N])
	    : Base(tag::COPY, ConstStringView{rawString}) {}

public:
	VOLTISO_FORCE_INLINE auto dynamic() const && -> auto {
		return dynamicArray::from(this->self());
	}

public:
	template <class... Args>
	VOLTISO_FORCE_INLINE static auto concat(const Args &...args) {
		static_assert(std::is_base_of_v<Custom, Self>);
		return Self(tag::CONCAT, args...);
	}

	template <class Arg> VOLTISO_FORCE_INLINE static auto from(const Arg &arg) {
		static_assert(std::is_base_of_v<Custom, Self>);
		// return Self(ConstStringView{arg}.copy());
		return Self(tag::COPY, arg);
	}

protected:
	template <class... Args>
	VOLTISO_FORCE_INLINE Custom(tag::Concat, const Args &...args)
	    : Base(tag::Concat{}, ConstStringView(args)...) {}

	template <class Arg>
	VOLTISO_FORCE_INLINE Custom(tag::Copy, const Arg &arg)
	    // requires requires { ConstStringView(arg); }
	    : Base(tag::COPY, ConstStringView(arg)) {}

public:
	template <class Other>
	decltype(auto) operator<<=(this auto &&self, const Other &other)
	  requires(!std::is_const_v<std::remove_reference_t<decltype(self)>>)
	{
		self.template as<Base>().operator<<=(ConstStringView(other));
		return std::forward<decltype(self)>(self);
	}
};
} // namespace VOLTISO_NAMESPACE::dynamicString

// !

namespace VOLTISO_NAMESPACE {
class DynamicString : public dynamicString::Custom<VOLTISO_NAMESPACE::Options<
                        option::Item<char>, option::Self<DynamicString>>> {
	using Base = dynamicString::Custom<VOLTISO_NAMESPACE::Options<
	  option::Item<char>, option::Self<DynamicString>>>;
	using Base::Base;
};
} // namespace VOLTISO_NAMESPACE

// !

namespace VOLTISO_NAMESPACE::dynamicString {
// // Overload for C-style string literals
// // Creates a DynamicString from a raw string, excluding the null terminator.
// template <Size NUM_ITEMS_WITH_NULL>
// [[nodiscard]] VOLTISO_FORCE_INLINE auto
// from(const char (&rawString)[NUM_ITEMS_WITH_NULL]) {
// 	constexpr auto SLICE_SIZE =
// 	  NUM_ITEMS_WITH_NULL > 0 ? NUM_ITEMS_WITH_NULL - 1 : 0;
// 	auto slice = VOLTISO_NAMESPACE::Slice<const char,
// SLICE_SIZE>{&rawString[0]}; 	return
// VOLTISO_NAMESPACE::DynamicString::from(slice);
// }

// infer brands from `Other`
// forward to DynamicString<...>::from` member constructor proxy
template <class Other>
[[nodiscard]] VOLTISO_FORCE_INLINE auto from(Other &&other) {
	using OtherBrands = get::Brands<Other>;
	using Result = typename DynamicString::template WithDefault<OtherBrands>;
	return Result::from(std::forward<Other>(other));
} // from

// more than one argument - do not infer brands, just forward to
// DynamicString<...>::from` member constructor proxy
template <class... Args>
[[nodiscard]] VOLTISO_FORCE_INLINE auto concat(Args &&...args) {
	return DynamicString::concat(std::forward<Args>(args)...);
} // from
} // namespace VOLTISO_NAMESPACE::dynamicString

// !

namespace VOLTISO_NAMESPACE::dynamicString {
template <class Options>
::std::ostream &operator<<(::std::ostream &os, const Custom<Options> &custom) {
	return os << ConstStringView{custom};
}
} // namespace VOLTISO_NAMESPACE::dynamicString

// !
namespace VOLTISO_NAMESPACE::string {
using Dynamic = DynamicString;
};

#include <v/OFF>
