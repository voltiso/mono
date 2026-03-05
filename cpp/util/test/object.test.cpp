#include <gtest/gtest.h>

#include "v/concepts/options"
#include "v/is/relocatable"
#include "v/object"
#include "v/option/custom-template"
#include "v/option/item"
#include "v/options"

using namespace VOLTISO_NAMESPACE;

// using A = v::option::Item<void>::StoredDefault;

static_assert(std::is_empty_v<Object<Options<>>>);

struct Derived : Object<Options<>> {
	int a;
};
static_assert(sizeof(Derived) == sizeof(int));

static_assert(is::_::builtinRelocatable<Object<Options<>>>);
static_assert(is::relocatable<Object<Options<>>>);

static_assert(
  !is::_::builtinRelocatable<Object<Options<option::relocatable<false>>>>);
static_assert(!is::relocatable<Object<Options<option::relocatable<false>>>>);

// !

// #pragma clang diagnostic push
// #pragma clang diagnostic ignored "-Wignored-attributes"
// struct [[clang::trivial_abi]] S {
// 	S() = default;

// private:
// 	S(const S &) = default;

// 	// S(const S &) {};
// };
// #pragma clang diagnostic pop
// static_assert(is::_::builtinRelocatable<S>);

// !

// ! This fails
// ! The `[[clang::trivial_abi]]` attribute is NOT really ignored
// ! for the pusposes of trivial relocatability
// ! NOT GOOD !
// #if defined(__clang__)
// 	#pragma clang diagnostic push
// 	#pragma clang diagnostic ignored "-Wignored-attributes"
// struct [[clang::trivial_abi]] TrivialAbi
//     : Object<Options<option::relocatable<false>>> {
// 	// TrivialAbi(const TrivialAbi &) {}
// };
// static_assert(!is::_::builtinRelocatable<TrivialAbi>);
// static_assert(!is::relocatable<TrivialAbi>);
// 	#pragma clang diagnostic pop
// #endif

// !

struct NotDefaultRelocatable : Object<Options<>> {
	NotDefaultRelocatable(const NotDefaultRelocatable &) {}
};
static_assert(!is::_::builtinRelocatable<NotDefaultRelocatable>);
static_assert(!is::relocatable<NotDefaultRelocatable>);

// !

namespace myObject {
template <class Options>
  requires(v::concepts::Options<Options>)
class Custom
    : public Object<
        typename Options::template With<option::CustomTemplate<Custom>>> {
	using Base =
	  Object<typename Options::template With<option::CustomTemplate<Custom>>>;
	using Self = Base::Self;

public:
	using Base::Base;

	using Item = Options::template Get<option::Item>;
}; // class Custom
} // namespace myObject

template <class Item>
class MyObject : public myObject::Custom<Options<option::Item<Item>>> {
	using Base = myObject::Custom<Options<option::Item<Item>>>;

public:
	using Base::Base;
}; // class MyObject

//

TEST(Object, options) {
	using A = Options<option::Item<int>>;
	using B = A::With<option::CustomTemplate<myObject::Custom>>;
	static_assert(
	  std::is_same_v<
	    B, Options<option::Item<int>, option::CustomTemplate<myObject::Custom>>>);
}

TEST(Object, rebind) {
	using A = MyObject<int>;
	static_assert(std::is_same_v<A::Item, int>);

	static_assert(
	  std::is_same_v<
	    A::Options,
	    Options<option::Item<int>, option::CustomTemplate<myObject::Custom>>>);

	// static_assert(
	//   std::is_same_v<A::SelfTemplate<Options<>>, myObject::Custom<Options<>>>);

	using B = A::With<>;
	static_assert(
	  std::is_same_v<
	    B, myObject::Custom<Options<
	         option::Item<int>, option::CustomTemplate<myObject::Custom>>>>);

	using C = A::With<option::Item<double>>;
	static_assert(std::is_same_v<
	              C, myObject::Custom<v::Options<
	                   v::option::Item<double>,
	                   v::option::CustomTemplate<myObject::Custom>>>>);

	static_assert(std::is_same_v<C::Item, double>);
}

// ! make sure object is not relocatable
