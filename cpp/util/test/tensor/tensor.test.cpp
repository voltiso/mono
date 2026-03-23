#include <gtest/gtest.h>

#include "v/_/is/relocatable.hpp"
#include "v/is/relocatable"
#include "v/storage"
#include "v/tensor"
// #include "v/view"

#include <string>
#include <type_traits>

#include <v/ON>

using namespace VOLTISO_NAMESPACE;

// !

// ! not an aggregate
// TODO: implement `array::Aggregate` if needed
// static_assert(!std::is_aggregate_v<Array<int, 3>>);

static_assert(std::is_trivially_constructible_v<Tensor<int, 3>>);

static_assert(is::relocatable<Tensor<int, 3>>);
static_assert(std::is_trivially_copyable_v<
              tensor::_::Impl<tensor::option::item<int>, tensor::option::numItems<1>>>);
static_assert(std::is_trivially_copyable_v<Tensor<int, 1>>);

// using Implicit =
//   array::_::Impl<Options<option::Item<int>, option::numItems<3>, option::implicitCopy<true>>>;
using Implicit = tensor::Custom<
  tensor::option::item<int>, tensor::option::numItems<3>, tensor::option::implicitCopy<true>>;
// using Implicit = Array<int, 3>::WithImplicitCopy;

static_assert(std::is_trivially_copyable_v<Implicit>);

// !

static_assert(
  std::is_same_v<
    Tensor<int, 3>::ImplicitCopy::With<tensor::option::implicitCopy<false>>, Tensor<int, 3>>);

// !

TEST(Array, uninitialized) {
	Storage<Tensor<int, 10>> array;
	*(int *)&array = 123;

	// No value-init here: underlying bytes remain untouched.
	new (&array) Tensor<int, 10>;
	EXPECT_EQ(((Tensor<int, 10> &)array)[0], 123);
}

TEST(Array, defaultInitialized) {
	Storage<Tensor<int, 10>> array;
	*(int *)&array = 123;

	// `{}` value-initializes the storage.
	new (&array) Tensor<int, 10>{};
	EXPECT_EQ(((Tensor<int, 10> &)array)[0], 0);
}

template <class T, class... Args>
concept CanBraceInit = requires { T{std::declval<Args>()...}; };

TEST(Array, braceInit) {
	Tensor<int, 3> array = {1, 2, 3};
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 3);

	static_assert(CanBraceInit<Tensor<int, 3>>);

	static_assert(CanBraceInit<Tensor<int, 3>, int, int, int>);
	static_assert(!CanBraceInit<Tensor<int, 3>, int, int>);
	static_assert(!CanBraceInit<Tensor<int, 3>, int, int, int, int>);
}

TEST(Array, deductionGuide) {
	auto array = Tensor{1, 2, 3};
	static_assert(std::is_same_v<decltype(array), Tensor<int, 3L>>);
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 3);
}

TEST(Array, deductionGuideStrings) {
	auto array = Tensor{"a", "b"};
	static_assert(std::is_same_v<decltype(array), Tensor<const char *, 2L>>);
	EXPECT_EQ(array[0], "a");
	EXPECT_EQ(array[1], "b");
}

TEST(Array, deductionGuideSingleString) {
	auto array = Tensor{"a"};
	static_assert(std::is_same_v<decltype(array), Tensor<const char *, 1L>>);
	EXPECT_EQ(array[0], "a");
}

TEST(Array, initializerList_deductionGuide) {
	Tensor array = {1, 2};
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
}

TEST(Array, from) {
	auto str = tensor::from("abc");
	static_assert(std::is_same_v<decltype(str), Tensor<char, 4>>);

	auto arr = tensor::from({1, 2, 3});
	static_assert(std::is_same_v<decltype(arr), Tensor<int, 3>>);

	auto arr2 = tensor::from({"a"});
	static_assert(std::is_same_v<decltype(arr2), Tensor<const char *, 1>>);
}

TEST(Tensor, deductionGuideStr) {
	Tensor array = {"a", "b"};
	static_assert(std::is_same_v<decltype(array), Tensor<const char *, 2L>>);

	Tensor arr = {"abc"};
	static_assert(std::is_same_v<decltype(arr), Tensor<const char *, 1L>>);
}

// TODO !!!!!!!!!!!!!!!!!!!!!!
// TEST(Array, sliceOfArrayDeductionGuide) {
// 	Array<int, 3> array = {1, 2, 3};
// 	static_assert(Array<int, 3>::NUM_ITEMS == 3);
// 	static_assert(Array<int, 3>::EXTENT == 3);
// 	auto slice = View{array};
// 	static_assert(std::is_same_v<decltype(slice), View<int, 3>>);
// 	EXPECT_EQ(slice[0], 1);
// 	EXPECT_EQ(slice[1], 2);
// 	EXPECT_EQ(slice[2], 3);
// 	EXPECT_EQ(slice, array);
// }

// TODO !!!!!!!!!!!!!!!!!!!!!!
// TEST(Array, compareWithRaw) {
// 	Array<int, 3> array = {1, 2, 3};
// 	int raw[3] = {1, 2, 3};
// 	// Comparison routes through View interoperability.
// 	EXPECT_EQ((View<int, 3>(array)), (View<int, 3>(raw)));
// 	EXPECT_EQ(array, raw);
// 	EXPECT_EQ(raw, array);
// }

// TODO !!!!!!!!!!!!!!!!!!!!!!
// TEST(Array, concat) {
// 	Array<int, 3> a = {1, 2, 3};
// 	auto b = Array{4, 5, 6};
// 	static_assert(std::is_same_v<decltype(b), Array<int, 3L>>);

// 	auto c = a << b;
// 	static_assert(std::is_same_v<decltype(c), Array<int, 6L>>);
// 	EXPECT_EQ(c[0], 1);
// 	EXPECT_EQ(c[1], 2);
// 	EXPECT_EQ(c[2], 3);
// 	EXPECT_EQ(c[3], 4);
// 	EXPECT_EQ(c[4], 5);
// 	EXPECT_EQ(c[5], 6);
// 	EXPECT_EQ(c, (Array<int, 6>{1, 2, 3, 4, 5, 6}));
// }

TEST(Array, noImplicitCopy) {
	using Array = tensor::_::Impl<tensor::option::item<int>, tensor::option::numItems<3>>;
	// using Array = Array<int, 3>;

	// Regular copy/move is intentionally disabled (linear-time operation).
	static_assert(!std::is_constructible_v<Array, Array &>);

	static_assert(std::is_constructible_v<Array, Array>);
	static_assert(!std::is_convertible_v<Array, Array>);

	Array array = {1, 2, 3};
	auto newArray = array.copy();
	static_assert(std::is_same_v<decltype(newArray), Array>);
	EXPECT_EQ(newArray, array);

	Array anotherArray;
	static_assert(!std::is_assignable_v<Array &, Array>);
	anotherArray = array.copy();
	EXPECT_EQ(anotherArray, array);
}

TEST(Array, iterators) {
	Tensor<int, 3> tensor = {10, 20, 30};

	int sum = 0;
	for (const auto &val : tensor) {
		sum += val;
	}
	EXPECT_EQ(sum, 60);
	EXPECT_EQ(std::distance(tensor.begin(), tensor.end()), 3);
}

TEST(Array, stringConversions) {
	static_assert(std::is_same_v<Tensor<char, 3>::Item, char>);
	Tensor<char, 3>::Std text = {'a', 'b', 'c'};
	// std::string_view conversion is implicit and constant-time.
	std::string_view sv = text;
	EXPECT_EQ(sv, "abc");
	EXPECT_EQ(sv.length(), 3);

	// std::string conversion performs allocation/copy, so explicit.
	std::string s = static_cast<std::string>(text);
	EXPECT_EQ(s, "abc");
	EXPECT_EQ(s.length(), 3);
}

// TODO !!!!!!!!!!!!!!!!!!!!!!
// TEST(Array, viewMemberFunction) {
// 	Array<int, 3> array = {1, 2, 3};
// 	auto v = array.view();
// 	EXPECT_EQ(v[0], 1);
// 	EXPECT_EQ(v[1], 2);
// 	EXPECT_EQ(v[2], 3);

// 	const Array<int, 3> constArray = {4, 5, 6};
// 	auto cv = constArray.view();
// 	EXPECT_EQ(cv[0], 4);
// }

// TODO !!!!!!!!!!!!!!!!!!!!!!
// TEST(Array, runtimeExtentAndNumItems) {
// 	Array<int, 6> array = {1, 2, 3, 4, 5, 6};
// 	EXPECT_EQ(array.numItems(), 6);
// 	auto s = array.strides();
// 	EXPECT_EQ(s[0], 1);
// }

TEST(Array, explicitRawArrayConversion) {
	Tensor<int, 3> tensor = {7, 8, 9};
	// Explicit cast to avoid silently dropping semantic type info.
	auto &raw = static_cast<tensor::Raw<int, 3> &>(tensor);
	EXPECT_EQ(raw[0], 7);
	EXPECT_EQ(raw[1], 8);
	EXPECT_EQ(raw[2], 9);

	raw[0] = 99;
	EXPECT_EQ(tensor[0], 99);
}

// TODO !!!!!!!!!!!!!!!!!!!!!!
// TEST(Array, customStartingIndex) {
// 	using Custom1Indexed = array::Custom<
// 	  Options<array::option::item<int>, array::option::numItems<3>,
// array::option::startingIndex<1>>>;

// 	Custom1Indexed array = {10, 20, 30};
// 	EXPECT_EQ(array[1], 10);
// 	EXPECT_EQ(array[2], 20);
// 	EXPECT_EQ(array[3], 30);
// }

struct CopyLifecycle {
	static int numConstructed;
	static int numDestructed;
	int num = 0;
	CopyLifecycle(int num) : num(num) { ++numConstructed; }
	CopyLifecycle(const CopyLifecycle &other) : num(other.num + 1) { ++numConstructed; }
	~CopyLifecycle() { ++numDestructed; }
	auto &operator=(const CopyLifecycle &other) = delete;
};
int CopyLifecycle::numConstructed = 0;
int CopyLifecycle::numDestructed = 0;

TEST(Array, copyLifecycle) {
	CopyLifecycle::numConstructed = 0;
	CopyLifecycle::numDestructed = 0;
	{
		Tensor<CopyLifecycle, 3> tensor = {0, 0, 0};
		EXPECT_EQ(tensor[0].num, 0);
		EXPECT_EQ(tensor[1].num, 0);
		EXPECT_EQ(tensor[2].num, 0);
		auto tensor2 = tensor.copy();
		static_assert(std::is_same_v<decltype(tensor2), Tensor<CopyLifecycle, 3>>);
		EXPECT_EQ(tensor2[0].num, 1);
		EXPECT_EQ(tensor2[1].num, 1);
		EXPECT_EQ(tensor2[2].num, 1);
	}
	EXPECT_EQ(CopyLifecycle::numConstructed, 6);
	EXPECT_EQ(CopyLifecycle::numDestructed, 6);
}

struct AssignLifecycle {
	static int numConstructed;
	static int numDestructed;
	int num = 0;
	AssignLifecycle(int num) : num(num) { ++numConstructed; }
	~AssignLifecycle() { ++numDestructed; }
	void operator=(const AssignLifecycle &other) { num = other.num + 1; }
	AssignLifecycle(const AssignLifecycle &other) = delete;
};
int AssignLifecycle::numConstructed = 0;
int AssignLifecycle::numDestructed = 0;

TEST(Array, assignLifecycle) {
	AssignLifecycle::numConstructed = 0;
	AssignLifecycle::numDestructed = 0;
	{
		Tensor<AssignLifecycle, 3> tensor = {0, 0, 0};
		EXPECT_EQ(tensor[0].num, 0);
		EXPECT_EQ(tensor[1].num, 0);
		EXPECT_EQ(tensor[2].num, 0);
		Tensor<AssignLifecycle, 3> tensor2 = {10, 10, 10};
		tensor2 = tensor.copy();
		EXPECT_EQ(tensor2[0].num, 1);
		EXPECT_EQ(tensor2[1].num, 1);
		EXPECT_EQ(tensor2[2].num, 1);
	}
	EXPECT_EQ(AssignLifecycle::numConstructed, 6);
	EXPECT_EQ(AssignLifecycle::numDestructed, 6);
}

TEST(Array, copyConversion) {
	struct S {
		int x;
		S(int x) : x(x) {}
	};

	using ITensor = Tensor<int, 3>;
	using STensor = Tensor<S, 3>;

	ITensor tensor = {1, 2, 3};
	STensor tensor2 = tensor.copy();
	EXPECT_EQ(tensor2[0].x, 1);
	EXPECT_EQ(tensor2[1].x, 2);
	EXPECT_EQ(tensor2[2].x, 3);
	STensor tensor3 = {0, 0, 0};
	tensor3 = tensor.copy();
	EXPECT_EQ(tensor3[0].x, 1);
	EXPECT_EQ(tensor3[1].x, 2);
	EXPECT_EQ(tensor3[2].x, 3);
}

TEST(Array, copyConversionImplicit) {
	Tensor<int, 3>::ImplicitCopy tensor = {1, 2, 3};
	struct S {
		int x;
		S(int x) : x(2 * x) {}
	};
	Tensor<S, 3>::ImplicitCopy tensor2 = tensor;
	EXPECT_EQ(tensor2[0].x, 2);
	EXPECT_EQ(tensor2[1].x, 4);
	EXPECT_EQ(tensor2[2].x, 6);
	Tensor<S, 3>::ImplicitCopy tensor3 = {0, 0, 0};
	tensor3 = tensor;
	EXPECT_EQ(tensor3[0].x, 2);
	EXPECT_EQ(tensor3[1].x, 4);
	EXPECT_EQ(tensor3[2].x, 6);
}

TEST(Array, moveConversionImplicit) {
	Tensor<int, 3>::ImplicitCopy iTensor1 = {1, 2, 3};
	struct S {
		int x;
		S(int &&x) : x(2 * x) { x = 0; }
	};
	Tensor<S, 3>::ImplicitCopy sTensor1 = iTensor1.move();
	EXPECT_EQ(sTensor1[0].x, 2);
	EXPECT_EQ(sTensor1[1].x, 4);
	EXPECT_EQ(sTensor1[2].x, 6);
	EXPECT_EQ(iTensor1[0], 0);
	EXPECT_EQ(iTensor1[1], 0);
	EXPECT_EQ(iTensor1[2], 0);

	Tensor<int, 3>::ImplicitCopy iTensor2 = {1, 2, 3};
	Tensor<S, 3>::ImplicitCopy sTensor2 = {0, 0, 0};
	sTensor2 = iTensor2.move();
	EXPECT_EQ(sTensor2[0].x, 2);
	EXPECT_EQ(sTensor2[1].x, 4);
	EXPECT_EQ(sTensor2[2].x, 6);
	EXPECT_EQ(iTensor2[0], 0);
	EXPECT_EQ(iTensor2[1], 0);
	EXPECT_EQ(iTensor2[2], 0);
}

// !

struct TestS {
	int x = 0;
	TestS() = default;

private:
	TestS(const TestS &) = default;
	// TestS(TestS &&) = delete;

public:
	template <class Other> TestS(Other &&) { x = 1; }
};

static_assert(std::is_trivially_copyable_v<TestS>);

TEST(Array, test) {
	TestS a;
	TestS b = std::move(a);
	EXPECT_EQ(b.x, 1);
}

static_assert(std::is_trivially_copyable_v<
              tensor::_::Impl<tensor::option::item<int>, tensor::option::numItems<3>>>);

// !

struct MoveOnly {
	int x = 0;
	MoveOnly() = delete;
	MoveOnly(int x) : x(x) {}
	MoveOnly(MoveOnly &&other) : x(other.x) { other.x = 0; }

	MoveOnly(const MoveOnly &) = delete;
	MoveOnly &operator=(const MoveOnly &) = delete;
	MoveOnly &operator=(MoveOnly &&) = delete;
};
static_assert(!is::relocatable<MoveOnly>);

TEST(Array, implicitMoveOnly) {
	using Tensor = Tensor<MoveOnly, 3>::ImplicitCopy;
	// using Array = array::_::Impl<
	//   Options<option::Item<MoveOnly>, option::Extents<ValuePack<3>>, option::implicitCopy<true>>>;
	Tensor tensor = {1, 2, 3};
	EXPECT_EQ(tensor[0].x, 1);
	EXPECT_EQ(tensor[1].x, 2);
	EXPECT_EQ(tensor[2].x, 3);

	// static_assert(!std::is_constructible_v<Array, Array &>);
	// auto arrayCopy = array.copy();

	// static_assert(std::is_constructible_v<Array, Array &&>);
	auto tensorMove = tensor.move();
	static_assert(std::is_same_v<decltype(tensorMove), Tensor>);

	EXPECT_EQ(tensorMove[0].x, 1);
	EXPECT_EQ(tensorMove[1].x, 2);
	EXPECT_EQ(tensorMove[2].x, 3);
	EXPECT_EQ(tensor[0].x, 0);
	EXPECT_EQ(tensor[1].x, 0);
	EXPECT_EQ(tensor[2].x, 0);
}

struct MoveAssignOnly {
	int x = 0;
	MoveAssignOnly() = delete;
	MoveAssignOnly(int x) : x(x) {}
	MoveAssignOnly &operator=(MoveAssignOnly &&other) {
		x = other.x;
		other.x = 0;
		return *this;
	};

	MoveAssignOnly(MoveAssignOnly &&other) = delete;
	MoveAssignOnly(const MoveAssignOnly &) = delete;
	MoveAssignOnly &operator=(const MoveAssignOnly &) = delete;
};
static_assert(!is::relocatable<MoveAssignOnly>);

TEST(Array, implicitMoveAssignOnly) {
	// using Array = array::_::Impl<
	//   array::option::item<MoveAssignOnly>, array::option::numItems<3>,
	//   mixin::copy::option::implicitCopy<true>>;
	using Tensor = Tensor<MoveAssignOnly, 3>::ImplicitCopy;
	Tensor tensor = {1, 2, 3};
	Tensor tensor2 = {4, 5, 6};

	static_assert(!std::is_assignable_v<Tensor &, Tensor &>);
	// static_assert(std::is_assignable_v<Tensor &, Tensor &&>);
	tensor = tensor2.move();
	EXPECT_EQ(tensor[0].x, 4);
	EXPECT_EQ(tensor[1].x, 5);
	EXPECT_EQ(tensor[2].x, 6);
	EXPECT_EQ(tensor2[0].x, 0);
	EXPECT_EQ(tensor2[1].x, 0);
	EXPECT_EQ(tensor2[2].x, 0);
}

TEST(Array, implicitCopyMove) {
	struct CopyMove {
		int x = 0;
		CopyMove() = delete;
		CopyMove(int x) : x(x) {}
		CopyMove(CopyMove &&other) : x(other.x) { other.x = 0; }
		CopyMove(const CopyMove &other) : x(other.x) {}
		CopyMove &operator=(CopyMove &&other) = delete;
		CopyMove &operator=(const CopyMove &other) = delete;
	};
	static_assert(!is::relocatable<CopyMove>);
	// using Array = array::_::Impl<
	//   array::option::item<CopyMove>, array::option::numItems<3>,
	//   mixin::copy::option::implicitCopy<true>>;
	using Tensor = Tensor<CopyMove, 3>::ImplicitCopy;
	Tensor tensor = {1, 2, 3};
	EXPECT_EQ(tensor[0].x, 1);
	EXPECT_EQ(tensor[1].x, 2);
	EXPECT_EQ(tensor[2].x, 3);

	// should select copy constructor
	auto tensorCopy = tensor.copy();
	static_assert(std::is_same_v<decltype(tensorCopy), Tensor>);
	EXPECT_EQ(tensorCopy[0].x, 1);
	EXPECT_EQ(tensorCopy[1].x, 2);
	EXPECT_EQ(tensorCopy[2].x, 3);
	EXPECT_EQ(tensor[0].x, 1);
	EXPECT_EQ(tensor[1].x, 2);
	EXPECT_EQ(tensor[2].x, 3);

	// should select move constructor
	auto tensorMove = tensor.move();
	EXPECT_EQ(tensorMove[0].x, 1);
	EXPECT_EQ(tensorMove[1].x, 2);
	EXPECT_EQ(tensorMove[2].x, 3);
	EXPECT_EQ(tensor[0].x, 0);
	EXPECT_EQ(tensor[1].x, 0);
	EXPECT_EQ(tensor[2].x, 0);
}

class RELOCATABLE(Relocatable) {
	using Self = Relocatable;
	RELOCATABLE_BODY

public:
	Relocatable() = default;

public:
	explicit Relocatable(Relocatable &&) = default; // for trivially_copyable / [[trivial_abi]]
};
static_assert(std::is_trivially_copyable_v<Relocatable>);
static_assert(
  std::is_trivially_copy_constructible_v<Relocatable> ||
  std::is_trivially_move_constructible_v<Relocatable>);
static_assert(is::_::builtinRelocatable<Relocatable>);
static_assert(is::relocatable<Relocatable>);

// ! this is impossible for aggregate type
static_assert(is::_::builtinRelocatable<std::array<Relocatable, 3>>);

static_assert(std::is_trivially_copyable_v<Tensor<Relocatable, 3>>);
static_assert(is::_::builtinRelocatable<
              tensor::_::Impl<tensor::option::item<int>, tensor::option::numItems<3>>>);
static_assert(is::_::builtinRelocatable<
              tensor::Custom<tensor::option::item<int>, tensor::option::numItems<3>>>);
// static_assert(is::_::builtinRelocatable<
//               array::Custom<array::option::item<Relocatable>, array::option::numItems<3>>>);
static_assert(is::relocatable<Tensor<Relocatable, 3>>);
static_assert(is::relocatable<tensor::Custom<
                tensor::option::item<Relocatable>, tensor::option::numItems<3>,
                tensor::option::implicitCopy<true>>>);

// !

static_assert(
  is::relocatable<tensor::Custom<tensor::option::item<int>, tensor::option::numItems<1>>>);
static_assert(is::relocatable<Tensor<int, 1>>);

// !

// ! note: our Tensor is not an aggregate type !
// TODO: implement `array::Aggregate` if needed
static_assert(!std::is_aggregate_v<Tensor<int, 3>>); // !
static_assert(std::is_aggregate_v<std::array<int, 3>>);

// void test() {
// 	Implicit a = {1, 2, 3};
// 	Implicit b = a;
// 	b = a;
// 	b = a.copy();
// }

// WithImplicitCopy should restore regular copy/move ergonomics.
static_assert(std::is_constructible_v<Implicit, Implicit &>);
static_assert(std::is_constructible_v<Implicit, Implicit &&>);
static_assert(std::is_constructible_v<Implicit, const Implicit &>);
static_assert(std::is_constructible_v<Implicit, const Implicit &&>);
static_assert(std::is_assignable_v<Implicit &, Implicit>);
static_assert(std::is_assignable_v<Implicit &, Implicit &>);
static_assert(std::is_assignable_v<Implicit &, Implicit &&>);
static_assert(std::is_assignable_v<Implicit &, const Implicit &>);
static_assert(trait::numItems<Implicit> == 3);
static_assert(std::is_assignable_v<Implicit &, const Implicit &&>);

#include <v/OFF>
