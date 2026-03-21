#include <gtest/gtest.h>

#include "v/_/is/relocatable.hpp"
#include "v/_/storage/storage.hpp"
#include "v/is/constexpr-constructible"
#include "v/storage"

#include <type_traits>

#include <v/ON>

using namespace V;
using namespace storage;
using namespace option;

// ============================================================================
// Builder
// ============================================================================

struct TestBuilder {
	using A = Storage<int>::NonUnion::With<option::nonUnion<false>>;
	static_assert(std::is_same_v<A, Storage<int>>);
};

// ============================================================================
// Relocatable
// ============================================================================

static_assert(is::relocatable<Custom<Item<int>>>);
static_assert(is::relocatable<Storage<int>>);

static_assert(is::relocatable<Custom<Item<int>, nonUnion<true>>>);
static_assert(is::relocatable<Storage<int>::NonUnion>);

static_assert(std::is_trivially_copyable_v<Storage<int>>);
static_assert(std::is_trivially_copyable_v<Storage<int>::NonUnion>);

// ! ---------------------

// nested
static_assert(is::relocatable<Storage<Storage<int>>>);
static_assert(is::relocatable<Storage<Storage<int>>::NonUnion>);

// ! ---------------------

struct WithConstructor {
	int value = 123'456'789;
};
static_assert(is::relocatable<WithConstructor>);

struct WithDestructor {
	int value;
	~WithDestructor() {}
};
static_assert(!is::relocatable<WithDestructor>);

struct RELOCATABLE(ForcedRelocatable) {
	using Self = ForcedRelocatable;
	RELOCATABLE_BODY;

public:
	ForcedRelocatable() = default;

private:
	ForcedRelocatable(const ForcedRelocatable &) = delete;
	explicit ForcedRelocatable(ForcedRelocatable &&) = default; // for [[trivial_abi]]
	ForcedRelocatable &operator=(const ForcedRelocatable &) = delete;
	ForcedRelocatable &operator=(ForcedRelocatable &&) = delete;

public:
	~ForcedRelocatable() {}
};

// ! ---------------------

static_assert(is::relocatable<Storage<ForcedRelocatable>>);
static_assert(is::relocatable<Storage<ForcedRelocatable>::NonUnion>);

static_assert(!std::is_trivially_copyable_v<ForcedRelocatable>);
static_assert(std::is_trivially_copyable_v<Storage<ForcedRelocatable>::NonUnion>); // ! BAD?
// here's the difference for union-backed constexpr storage:
static_assert(!std::is_trivially_copyable_v<Storage<ForcedRelocatable>>);

// nested
static_assert(is::relocatable<Storage<Storage<ForcedRelocatable>>>);
static_assert(is::relocatable<Storage<Storage<ForcedRelocatable>>::NonUnion>);

// ! ---------------------

static_assert(!is::relocatable<WithDestructor>);
static_assert(!is::relocatable<Storage<WithDestructor>>);
static_assert(!is::relocatable<Storage<WithDestructor>::NonUnion>);

static_assert(!std::is_trivially_copyable_v<WithDestructor>);
static_assert(!std::is_trivially_copyable_v<Storage<WithDestructor>>);
static_assert(!std::is_trivially_copyable_v<Storage<WithDestructor>::NonUnion>);

// nested
static_assert(!is::relocatable<Storage<Storage<WithDestructor>>>);
static_assert(!is::relocatable<Storage<Storage<WithDestructor>>::NonUnion>);

// ! ---------------------

struct STORAGE_NON_UNION {
	using S = Storage<WithDestructor>::NonUnion;
	// ! These work contrary to the union-backed storage
	static_assert(std::is_trivially_constructible_v<S>);
	static_assert(std::is_trivially_destructible_v<S>);
};

struct STORAGE_CONSTEXPR {
	using S = Storage<WithDestructor>;
	// ! These work contrary to the bytes-backed storage
	static constexpr auto test = [] {
		S s;
		s.construct();
		return 0;
	}();
};

// ! ---------------------

static_assert(is::relocatable<ForcedRelocatable>);
static_assert(!std::is_trivially_copyable_v<ForcedRelocatable>);
static_assert(!std::is_copy_constructible_v<ForcedRelocatable>);

TEST(Storage, ForcedRelocatableNonUnion) {
	using S = Storage<ForcedRelocatable>::NonUnion;
	static_assert(is::relocatable<S>);

	static_assert(std::is_trivially_constructible_v<S>);
	static_assert(std::is_trivially_destructible_v<S>);

	static_assert(!std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<S>);

	// ...but it's still trivially copyable!
	static_assert(std::is_trivially_copyable_v<S>);
};

TEST(Storage, ForcedRelocatableConstexpr) {
	using S = Storage<ForcedRelocatable>;
	static_assert(is::relocatable<S>);

	// ! not true for union-backed storage:
	// static_assert(std::is_trivially_constructible_v<S>);
	// static_assert(std::is_trivially_destructible_v<S>);

	static_assert(!std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<S>);

	// static_assert(std::is_trivially_copyable_v<S>); // ! not true for union
};

// ! ---------------------

template <class S> struct TRIVIAL {
	static_assert(std::is_trivially_copyable_v<S>); // true in clang/gcc

	// ! now disabled:
	static_assert(!std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<S>);
};
template struct TRIVIAL<Storage<int>>;
template struct TRIVIAL<Storage<int>::NonUnion>;

// ! ---------------------

template <class S> struct WITH_DESTRUCTOR {
	static_assert(!std::is_trivially_copyable_v<WithDestructor>);

	// ! trivially_copyable for bytes-backed storage
	// static_assert(std::is_trivially_copyable_v<S>);

	static_assert(!std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<S>);

	// contrary to WithDestructor:
	static_assert(!std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<S>);
};
template struct WITH_DESTRUCTOR<Storage<WithDestructor>>;
template struct WITH_DESTRUCTOR<Storage<WithDestructor>::NonUnion>;

// ! ---------------------

template <class S> struct WITH_CONSTRUCTOR {
	static_assert(std::is_trivially_copyable_v<S>);

	// ! not true for union-backed storage
	// static_assert(std::is_trivially_constructible_v<S>);

	static_assert(std::is_trivially_destructible_v<S>);

	static_assert(!std::is_copy_constructible_v<S>);
	static_assert(!std::is_move_constructible_v<S>);

	static_assert(!std::is_trivially_move_assignable_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<S>);

	// Item is trivially copyable - copy only via explicit-copy
	static_assert(!std::is_constructible_v<S, S>);
	static_assert(!std::is_constructible_v<S, S &&>);
	static_assert(!std::is_constructible_v<S, const S &&>);

	// Item is trivially copyable - assign only via explicit-copy
	static_assert(!std::is_assignable_v<S &, S>);
	static_assert(!std::is_assignable_v<S &, S &&>);
	static_assert(!std::is_assignable_v<S &, const S &&>);
};

template struct WITH_CONSTRUCTOR<Storage<WithConstructor>>;
template struct WITH_CONSTRUCTOR<Storage<WithConstructor>::NonUnion>;

struct WITH_CONSTRUCTOR_BYTES {
	using S = Storage<WithConstructor>::NonUnion;
	static_assert(std::is_trivially_constructible_v<S>);
	static_assert(is::constexprConstructible<S>);
};

// ! ---------------------

template <class S> struct PREVENT_IMPLICIT_COPY {
	static_assert(!is::relocatable<WithDestructor>);
	// ! trivially_copyable for bytes-backed storage
	// static_assert(std::is_trivially_copyable_v<S>);

	static_assert(!std::is_trivially_move_assignable_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<S>);

	// Item not trivially copyable - no copy allowed
	static_assert(!std::is_constructible_v<S, S>);
	static_assert(!std::is_constructible_v<S, const S &>);
	static_assert(!std::is_constructible_v<S, S &>);
	static_assert(!std::is_constructible_v<S, S &&>);
	static_assert(!std::is_constructible_v<S, const S &&>);

	// Item not trivially copyable - no assign allowed
	static_assert(!std::is_assignable_v<S &, S>);
	static_assert(!std::is_assignable_v<S &, S &&>);
	static_assert(!std::is_assignable_v<S &, const S &&>);
};
template struct PREVENT_IMPLICIT_COPY<Storage<WithDestructor>>;
template struct PREVENT_IMPLICIT_COPY<Storage<WithDestructor>::NonUnion>;

// ! ---------------------

static_assert(sizeof(Storage<int>) == sizeof(int));
static_assert(sizeof(Storage<int>::NonUnion) == sizeof(int));

// ! ---------------------

struct Test {
	short a;
	int b;
	char c;
};

static_assert(sizeof(Storage<Test>) == sizeof(Test));
static_assert(alignof(Storage<Test>) == alignof(Test));

static_assert(sizeof(Storage<Test>::NonUnion) == sizeof(Test));
static_assert(alignof(Storage<Test>::NonUnion) == alignof(Test));

// ! ---------------------
// ! RUNTIME
// ! ---------------------

// template <class S> struct StorageWithConstructorTest : ::testing::Test {};

// using WithConstructorTestTypes =
//   ::testing::Types<Storage<WithConstructor>, Storage<WithConstructor>::NonUnion>;

// TYPED_TEST_SUITE(StorageWithConstructorTest, WithConstructorTestTypes);

// TYPED_TEST(StorageWithConstructorTest, implicitCopy) {
// 	using S = TypeParam;
// 	S a;
// 	a.construct(1);
// 	S b = a;
// 	EXPECT_EQ(b.storedItem().value, 1);
// }

// TYPED_TEST(StorageWithConstructorTest, implicitMove) {
// 	using S = TypeParam;
// 	S a;
// 	a.construct(1);
// 	S b = std::move(a);
// 	EXPECT_EQ(b.storedItem().value, 1);
// }

// TYPED_TEST(StorageWithConstructorTest, constructTrivialInitialize) {
// 	using S = TypeParam;
// 	S a = 1;
// 	EXPECT_EQ(a.storedItem().value, 1);
// }

// !

template <class S> struct StorageWithDestructorTest : ::testing::Test {};

using WithDestructorTestTypes =
  ::testing::Types<Storage<WithDestructor>, Storage<WithDestructor>::NonUnion>;

TYPED_TEST_SUITE(StorageWithDestructorTest, WithDestructorTestTypes);

TYPED_TEST(StorageWithDestructorTest, doesNotInitialize) {
	int memory = 333;
	using S = TypeParam;
	new (&memory) S;
	auto &storage = *reinterpret_cast<S *>(&memory);
	EXPECT_EQ(storage.storedItem().value, 333);
	// EXPECT_EQ(storage.bytes().NUM_ITEMS, sizeof(S));
}

TYPED_TEST(StorageWithDestructorTest, zeroInitialize) {
	using S = TypeParam;
	S storage = {};
	EXPECT_EQ(storage.storedItem().value, 0);
}

#include <v/OFF>
