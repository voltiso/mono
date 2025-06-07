#pragma once
#include <v/_/_>

#include "v/_/dynamic-string.forward.hpp"
#include "v/_/string.forward.hpp"
#include "v/_/tensor.forward.hpp"
#include "v/const-string-view"
#include "v/option/custom-template"
#include "v/option/extents"
#include "v/option/item"
#include "v/tensor"

#include <v/ON>

// --- primary template for mapping Options -> string::Custom
namespace V::string {
template <class Options>
  requires concepts::Options<Options>
struct Specializations;

// helper alias for option::CustomTemplate
template <class... Args>
using GetCustom = typename Specializations<Args...>::Result;
} // namespace V::string

// --- get custom-type logic: dispatch Options+CustomTemplate -> actual Custom
// or String
namespace V::string {
// alias for CustomTemplate
template <class... Args>
using GetCustom = typename Specializations<Args...>::Result;

// primary Specializations: map any Options -> Custom<Options>
template <class Options>
  requires concepts::Options<Options>
struct Specializations {
	using Result = Custom<Options>;
};
} // namespace V::string

// --- string::GetCustom for wiring CustomTemplate -> types
namespace V::string {
template <class... Args>
using GetCustom = typename Specializations<Args...>::Result;
}
// --- string::GetCustom alias and Specializations primary template
namespace V::string {
template <class... Args>
using GetCustom = typename Specializations<Args...>::Result;
} // namespace V::string

// --- primary dispatch: map Options -> string::Custom, and helper alias
namespace V::string {
template <class... Args>
using GetCustom = typename Specializations<Args...>::Result;
} // namespace V::string
// --- enable `.dynamic()` on fixed-size strings via string::Custom<Options>
namespace V::string {
template <class Options>
  requires concepts::Options<Options>
class Custom
    : public V::tensor::Custom<typename Options ::template WithDefault<
        option::Item<char>, option::CustomTemplate<string::GetCustom>>> {
	using Base = V::tensor::Custom<typename Options ::template WithDefault<
	  option::Item<char>, option::CustomTemplate<string::GetCustom>>>;
	using Base::Base;

public:
	VOLTISO_FORCE_INLINE auto dynamic() const && -> auto {
		return dynamicString::from(this->self());
	}
};
} // namespace V::string

// !

namespace V::string {
template <Size NUM_ITEMS>
struct Specializations<Options<
  option::Item<char>, option::Extents<ValuePack<NUM_ITEMS>>,
  option::CustomTemplate<string::GetCustom>>> {
	using Result = String<NUM_ITEMS>;
};
} // namespace V::string

// !

// ! if we ever want to add null termination,
// we can add it to the array::Custom
// so that it generalizes null-termination (add option::NULL_TERMINATED)
// ! The only reason this class is here, deriving from flat Array,
// is that we want to use it with `operator""_s`
namespace V {
template <Size NUM_ITEMS>
class String : public string::Custom<Options<
                 option::Extents<ValuePack<NUM_ITEMS>>,
                 option::Self<String<NUM_ITEMS>>>> {
	using Base = string::Custom<Options<
	  option::Extents<ValuePack<NUM_ITEMS>>, option::Self<String<NUM_ITEMS>>>>;
	using Base::Base;

public:
	// `consteval`-only constructor for `operator""_s`
	template <Size NUM_ITEMS_WITH_NULL>
	  requires(NUM_ITEMS_WITH_NULL == NUM_ITEMS + 1)
	consteval String(const char (&items)[NUM_ITEMS_WITH_NULL])
	    : Base(tag::COPY_CONSTEVAL, items) {
		VOLTISO_EQ(items[NUM_ITEMS], '\0');
	}

public:
	// interpret raw string as c-string - check for null-terminator, but discard
	// it
	template <Size NUM_ITEMS_WITH_NULL>
	  requires(NUM_ITEMS == NUM_ITEMS_WITH_NULL - 1)
	[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
	from(const char (&rawString)[NUM_ITEMS_WITH_NULL]) noexcept {
		EQ(rawString[NUM_ITEMS], '\0');
		return String<NUM_ITEMS>(rawString, String<NUM_ITEMS>::COPY);
	}

	// forward everything else to `Array<>::from`
	template <class... Args>
	[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
	from(Args &&...args) {
		return Base::from(std::forward<Args>(args)...);
	}

public:
	// forward everything else to `Array<>::from`
	template <class... Args>
	[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
	concat(Args &&...args) {
		// return Base::concat(std::forward<Args>(args)...);
		return Base::concat(ConstStringView{std::forward<Args>(args)}...);
	}

public:
	VOLTISO_FORCE_INLINE auto dynamic() const && -> auto {
		return dynamicString::from(this->self());
	}

public:
	// concat known size
	template <class Other>
	  requires(
	    get::EXTENT<Other> != extent::DYNAMIC &&
	    get::EXTENT<Other> != extent::UNBOUND)
	constexpr auto operator<<(
	  this auto &&self, Other &&other) { // `other` is the RHS of String << Other
		// Assuming `self.template cast<Base>()` correctly returns Base&, const
		// Base&, Base&&, or const Base&&, matching the cv-ref qualifiers of `self`.
		// This calls Base::operator<< on the correctly casted `self`.
		return self.template as<Base>().operator<<(ConstStringView(
		  std::forward<Other>(other)) // Forward 'other' to ConstStringView
		);
	}
};
// deduction guide
template <Size N> String(const char (&)[N]) -> String<N - 1>;

// // rhs concat known size
// template <class Lhs, Size SelfN>
//   requires(
//     get::EXTENT<Lhs> != extent::DYNAMIC && get::EXTENT<Lhs> !=
//     extent::UNBOUND)
// constexpr auto operator<<(const Lhs &lhs, const String<SelfN> &rhs) {
// 	return lhs.template as<array::Custom<Options<option::Item<char>>>>()
// 	  .operator<<(rhs.self());
// }

} // namespace V

// !

namespace V::string {
// interpret raw string as c-string - check for null-terminator, but discard it
template <Size NUM_ITEMS_WITH_NULL>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(const char (&rawString)[NUM_ITEMS_WITH_NULL]) noexcept {
	constexpr auto NUM_ITEMS = NUM_ITEMS_WITH_NULL - 1;
	return String<NUM_ITEMS>{rawString};
}
// forward everything else to `tensor::from`
template <class... Args>
[[nodiscard]] static VOLTISO_FORCE_INLINE constexpr auto
from(Args &&...args) noexcept(
  noexcept(tensor::from(std::forward<Args>(args)...))) {
	return tensor::from(std::forward<Args>(args)...);
}
} // namespace V::string

// !

namespace V {
// #pragma GCC diagnostic push
// #pragma GCC diagnostic ignored "-Wuser-defined-literals"
template <String STRING> consteval auto &operator""_s() { return STRING; }
// #pragma GCC diagnostic pop
} // namespace V

#include <v/OFF>
