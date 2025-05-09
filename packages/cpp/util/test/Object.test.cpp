#include <gtest/gtest.h>

#include <v/Object>
#include <v/Options>
#include <v/concepts/Options>
#include <v/option/CustomTemplate>
#include <v/option/Item>

using namespace VOLTISO_NAMESPACE;

// using A = v::option::Item<void>::StoredDefault;

static_assert(std::is_empty_v<Object<Options<>>>);

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
