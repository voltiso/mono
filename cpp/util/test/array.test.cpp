#include <gtest/gtest.h>

#include "v/_/is/relocatable.hpp"
#include "v/array"
#include "v/is/relocatable"
#include "v/storage"
#include "v/view"

#include <string>
#include <type_traits>

#include <v/ON>

using namespace VOLTISO_NAMESPACE;

// !

// ! not an aggregate
// TODO: implement `array::Aggregate` if needed
// static_assert(!std::is_aggregate_v<Array<int, 3>>);

static_assert(std::is_trivially_constructible_v<Array<int, 3>>);

static_assert(is::relocatable<Array<int, 3>>);
static_assert(std::is_trivially_copyable_v<
              array::_::Impl<Options<option::Item<int>, option::Extents<ValuePack<1>>>>>);
static_assert(std::is_trivially_copyable_v<Array<int, 1>>);

using Implicit = array::_::Impl<
  Options<option::Item<int>, option::Extents<ValuePack<3>>, option::implicitCopy<true>>>;
// using Implicit = Array<int, 3>::WithImplicitCopy;

static_assert(std::is_trivially_copyable_v<Implicit>);

// !

TEST(Array, uninitialized) {
	Storage<Array<int, 10>> array;
	*(int *)&array = 123;

	// No value-init here: underlying bytes remain untouched.
	new (&array) Array<int, 10>;
	EXPECT_EQ(((Array<int, 10> &)array)[0], 123);
}

TEST(Array, defaultInitialized) {
	Storage<Array<int, 10>> array;
	*(int *)&array = 123;

	// `{}` value-initializes the storage.
	new (&array) Array<int, 10>{};
	EXPECT_EQ(((Array<int, 10> &)array)[0], 0);
}

template <class T, class... Args>
concept CanBraceInit = requires { T{std::declval<Args>()...}; };

TEST(Array, braceInit) {
	Array<int, 3> array = {1, 2, 3};
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 3);

	static_assert(CanBraceInit<Array<int, 3>>);

	static_assert(CanBraceInit<Array<int, 3>, int, int, int>);
	static_assert(!CanBraceInit<Array<int, 3>, int, int>);
	static_assert(!CanBraceInit<Array<int, 3>, int, int, int, int>);
}

TEST(Array, deductionGuide) {
	auto array = Array{1, 2, 3};
	static_assert(std::is_same_v<decltype(array), Array<int, 3L>>);
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
	EXPECT_EQ(array[2], 3);
}

TEST(Array, deductionGuideStrings) {
	auto array = Array{"a", "b"};
	static_assert(std::is_same_v<decltype(array), Array<const char *, 2L>>);
	EXPECT_EQ(array[0], "a");
	EXPECT_EQ(array[1], "b");
}

TEST(Array, deductionGuideSingleString) {
	auto array = Array{"a"};
	static_assert(std::is_same_v<decltype(array), Array<const char *, 1L>>);
	EXPECT_EQ(array[0], "a");
}

TEST(Array, initializerList_deductionGuide) {
	Array array = {1, 2};
	EXPECT_EQ(array[0], 1);
	EXPECT_EQ(array[1], 2);
}

TEST(Array, from) {
	auto str = array::from("abc");
	static_assert(std::is_same_v<decltype(str), Array<char, 4>>);

	auto arr = array::from({1, 2, 3});
	static_assert(std::is_same_v<decltype(arr), Array<int, 3>>);

	auto arr2 = array::from({"a"});
	static_assert(std::is_same_v<decltype(arr2), Array<const char *, 1>>);
}

TEST(Array, deductionGuideStr) {
	Array array = {"a", "b"};
	static_assert(std::is_same_v<decltype(array), Array<const char *, 2L>>);

	Array arr = {"abc"};
	static_assert(std::is_same_v<decltype(arr), Array<const char *, 1L>>);
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

TEST(Array, compareWithRaw) {
	Array<int, 3> array = {1, 2, 3};
	int raw[3] = {1, 2, 3};
	// Comparison routes through View interoperability.
	EXPECT_EQ((View<int, 3>(array)), (View<int, 3>(raw)));
	EXPECT_EQ(array, raw);
	EXPECT_EQ(raw, array);
}

TEST(Array, concat) {
	Array<int, 3> a = {1, 2, 3};
	auto b = Array{4, 5, 6};
	static_assert(std::is_same_v<decltype(b), Array<int, 3L>>);

	auto c = a << b;
	static_assert(std::is_same_v<decltype(c), Array<int, 6L>>);
	EXPECT_EQ(c[0], 1);
	EXPECT_EQ(c[1], 2);
	EXPECT_EQ(c[2], 3);
	EXPECT_EQ(c[3], 4);
	EXPECT_EQ(c[4], 5);
	EXPECT_EQ(c[5], 6);
	EXPECT_EQ(c, (Array<int, 6>{1, 2, 3, 4, 5, 6}));
}

TEST(Array, noImplicitCopy) {
	using Array = array::_::Impl<Options<option::Item<int>, option::Extents<ValuePack<3>>>>;
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
	Array<int, 3> array = {10, 20, 30};

	int sum = 0;
	for (const auto &val : array) {
		sum += val;
	}
	EXPECT_EQ(sum, 60);
	EXPECT_EQ(std::distance(array.begin(), array.end()), 3);
	EXPECT_TRUE(std::equal(array.begin(), array.end(), array.data()));
}

TEST(Array, stringConversions) {
	Array<char, 3> text = {'a', 'b', 'c'};
	// std::string_view conversion is implicit and constant-time.
	std::string_view sv = text;
	EXPECT_EQ(sv, "abc");
	EXPECT_EQ(sv.length(), 3);

	// std::string conversion performs allocation/copy, so explicit.
	std::string s = static_cast<std::string>(text);
	EXPECT_EQ(s, "abc");
	EXPECT_EQ(s.length(), 3);
}

TEST(Array, viewMemberFunction) {
	Array<int, 3> array = {1, 2, 3};
	auto v = array.view();
	EXPECT_EQ(v[0], 1);
	EXPECT_EQ(v[1], 2);
	EXPECT_EQ(v[2], 3);

	const Array<int, 3> constArray = {4, 5, 6};
	auto cv = constArray.view();
	EXPECT_EQ(cv[0], 4);
}

TEST(Array, runtimeExtentAndNumItems) {
	Array<int, 6> array = {1, 2, 3, 4, 5, 6};
	EXPECT_EQ(array.numItems(), 6);
	EXPECT_EQ(array.extent(), 6);
	auto s = array.strides();
	EXPECT_EQ(s[0], 1);
}

TEST(Array, explicitRawArrayConversion) {
	Array<int, 3> array = {7, 8, 9};
	// Explicit cast to avoid silently dropping semantic type info.
	auto &raw = static_cast<RawArray<int, 3> &>(array);
	EXPECT_EQ(raw[0], 7);
	EXPECT_EQ(raw[1], 8);
	EXPECT_EQ(raw[2], 9);

	raw[0] = 99;
	EXPECT_EQ(array[0], 99);
}

TEST(Array, customStartingIndex) {
	using Custom1Indexed = array::Custom<
	  Options<option::Item<int>, option::Extents<ValuePack<3>>, option::startingIndex<1>>>;

	Custom1Indexed array = {10, 20, 30};
	EXPECT_EQ(array[1], 10);
	EXPECT_EQ(array[2], 20);
	EXPECT_EQ(array[3], 30);
}

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
		Array<CopyLifecycle, 3> array = {0, 0, 0};
		EXPECT_EQ(array[0].num, 0);
		EXPECT_EQ(array[1].num, 0);
		EXPECT_EQ(array[2].num, 0);
		auto array2 = array.copy();
		static_assert(std::is_same_v<decltype(array2), Array<CopyLifecycle, 3>>);
		EXPECT_EQ(array2[0].num, 1);
		EXPECT_EQ(array2[1].num, 1);
		EXPECT_EQ(array2[2].num, 1);
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
		Array<AssignLifecycle, 3> array = {0, 0, 0};
		EXPECT_EQ(array[0].num, 0);
		EXPECT_EQ(array[1].num, 0);
		EXPECT_EQ(array[2].num, 0);
		Array<AssignLifecycle, 3> array2 = {10, 10, 10};
		array2 = array.copy();
		EXPECT_EQ(array2[0].num, 1);
		EXPECT_EQ(array2[1].num, 1);
		EXPECT_EQ(array2[2].num, 1);
	}
	EXPECT_EQ(AssignLifecycle::numConstructed, 6);
	EXPECT_EQ(AssignLifecycle::numDestructed, 6);
}

TEST(Array, copyConversion) {
	struct S {
		S(int) {}
	};

	using IArray = Array<int, 3>;
	using SArray = Array<S, 3>;

	IArray array = {1, 2, 3};
	SArray array2 = array.copy();
	array2 = array.copy();
}

TEST(Array, implicitCopyConversion) {
	Array<int, 3>::WithImplicitCopy array = {1, 2, 3};
	struct S {
		int x;
		S(int x) : x(2 * x) {}
	};
	Array<S, 3>::WithImplicitCopy array2 = array;
	EXPECT_EQ(array2[0].x, 2);
	EXPECT_EQ(array2[1].x, 4);
	EXPECT_EQ(array2[2].x, 6);
}

TEST(Array, implicitAssignConversion) {
	Array<int, 3>::WithImplicitCopy array = {1, 2, 3};
	struct SS {
		SS() = default;
		int x = 0;
		void operator=(int x) { this->x = x; }
		SS(const SS &) = delete;
		SS(SS &&) = delete;
		SS &operator=(const SS &) = delete;
	};
	Array<SS, 3>::WithImplicitCopy array3;
	array3 = array;
	EXPECT_EQ(array3[0].x, 1);
	EXPECT_EQ(array3[1].x, 2);
	EXPECT_EQ(array3[2].x, 3);
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
              array::_::Impl<Options<option::Item<int>, option::Extents<ValuePack<3>>>>>);

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
	using Array = Array<MoveOnly, 3>::WithImplicitCopy;
	// using Array = array::_::Impl<
	//   Options<option::Item<MoveOnly>, option::Extents<ValuePack<3>>, option::implicitCopy<true>>>;
	Array array = {1, 2, 3};
	EXPECT_EQ(array[0].x, 1);
	EXPECT_EQ(array[1].x, 2);
	EXPECT_EQ(array[2].x, 3);

	// static_assert(!std::is_constructible_v<Array, Array &>);
	// auto arrayCopy = array.copy();

	// static_assert(std::is_constructible_v<Array, Array &&>);
	auto arrayMove = array.move();
	static_assert(std::is_same_v<decltype(arrayMove), Array>);

	EXPECT_EQ(arrayMove[0].x, 1);
	EXPECT_EQ(arrayMove[1].x, 2);
	EXPECT_EQ(arrayMove[2].x, 3);
	EXPECT_EQ(array[0].x, 0);
	EXPECT_EQ(array[1].x, 0);
	EXPECT_EQ(array[2].x, 0);
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
	using Array = array::_::Impl<Options<
	  option::Item<MoveAssignOnly>, option::Extents<ValuePack<3>>, option::implicitCopy<true>>>;
	// using Array = Array<MoveAssignOnly, 3>::WithImplicitCopy;
	Array array = {1, 2, 3};
	Array array2 = {4, 5, 6};

	static_assert(!std::is_assignable_v<Array &, Array &>);
	// static_assert(std::is_assignable_v<Array &, Array &&>);
	array = array2.move();
	EXPECT_EQ(array[0].x, 4);
	EXPECT_EQ(array[1].x, 5);
	EXPECT_EQ(array[2].x, 6);
	EXPECT_EQ(array2[0].x, 0);
	EXPECT_EQ(array2[1].x, 0);
	EXPECT_EQ(array2[2].x, 0);
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
	using Array = array::_::Impl<
	  Options<option::Item<CopyMove>, option::Extents<ValuePack<3>>, option::implicitCopy<true>>>;
	// using Array = Array<CopyMove, 3>::WithImplicitCopy;
	Array array = {1, 2, 3};
	EXPECT_EQ(array[0].x, 1);
	EXPECT_EQ(array[1].x, 2);
	EXPECT_EQ(array[2].x, 3);

	// should select copy constructor
	auto arrayCopy = array.copy();
	static_assert(std::is_same_v<decltype(arrayCopy), Array>);
	EXPECT_EQ(arrayCopy[0].x, 1);
	EXPECT_EQ(arrayCopy[1].x, 2);
	EXPECT_EQ(arrayCopy[2].x, 3);
	EXPECT_EQ(array[0].x, 1);
	EXPECT_EQ(array[1].x, 2);
	EXPECT_EQ(array[2].x, 3);

	// should select move constructor
	auto arrayMove = array.move();
	EXPECT_EQ(arrayMove[0].x, 1);
	EXPECT_EQ(arrayMove[1].x, 2);
	EXPECT_EQ(arrayMove[2].x, 3);
	EXPECT_EQ(array[0].x, 0);
	EXPECT_EQ(array[1].x, 0);
	EXPECT_EQ(array[2].x, 0);
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

static_assert(std::is_trivially_copyable_v<Array<Relocatable, 3>>);
static_assert(is::_::builtinRelocatable<
              array::_::Impl<Options<option::Item<int>, option::Extents<ValuePack<3>>>>>);
static_assert(is::_::builtinRelocatable<
              array::Custom<Options<option::Item<int>, option::Extents<ValuePack<3>>>>>);
// static_assert(is::_::builtinRelocatable<
//               array::Custom<Options<option::Item<Relocatable>, option::Extents<ValuePack<3>>>>>);
static_assert(is::relocatable<Array<Relocatable, 3>>);
static_assert(is::relocatable<Array<Relocatable, 3>::WithImplicitCopy>);

// !

static_assert(is::relocatable<array::Custom<Options<option::Item<int>>>>);
static_assert(is::relocatable<Array<int, 1>>);

// !

// ! note: our Array is not an aggregate type !
// TODO: implement `array::Aggregate` if needed
static_assert(!std::is_aggregate_v<Array<int, 3>>); // !
static_assert(std::is_aggregate_v<std::array<int, 3>>);

// void test() {
// 	Implicit a = {1, 2, 3};
// 	Implicit b = a;
// 	b = a;
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
static_assert(std::is_assignable_v<Implicit &, const Implicit &&>);

#include <v/OFF>
