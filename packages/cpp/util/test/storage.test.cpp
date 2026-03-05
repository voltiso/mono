#include "v/_/storage.hpp"
#include <gtest/gtest.h>

#include <v/storage>

#include <type_traits>

#include <v/ON>

using namespace VOLTISO_NAMESPACE;

// !

struct Complex {
	Complex(const Complex &) {}
};

static_assert(
  std::is_same_v<Storage<int>::__trivially_relocatable, Storage<int>>);

static_assert(is::_::builtinRelocatable<
              storage::_::DataMembersBytes<Options<option::Item<int>>>>);
static_assert(
  is::_::builtinRelocatable<storage::_::CustomNR<Options<option::Item<int>>>>);
static_assert(
  is::_::builtinRelocatable<storage::Custom<Options<option::Item<int>>>>);
static_assert(
  !is::_::builtinRelocatable<storage::Custom<Options<option::Item<Complex>>>>);
static_assert(is::_::builtinRelocatable<Storage<int>>);
static_assert(!is::_::builtinRelocatable<Storage<Complex>>);
static_assert(is::relocatable<Storage<int>>);
static_assert(!is::relocatable<Storage<Complex>>);

// !

struct RELOCATABLE(ForcedRelocatable)
    : Object<Options<option::relocatable<true>>> {
	static int numDestructorCalls;
	int value = 0;
	ForcedRelocatable() = default;
	explicit ForcedRelocatable(int v) : value(v) {}
	~ForcedRelocatable() { ++numDestructorCalls; }
	ForcedRelocatable(ForcedRelocatable &&) = delete;
	ForcedRelocatable &operator=(const ForcedRelocatable &) = delete;
	ForcedRelocatable &operator=(ForcedRelocatable &&) = delete;

private:
	// for VOLTISO_RELOCATABLE / [[clang::trivial_abi]]
	ForcedRelocatable(const ForcedRelocatable &) = default;
};

static_assert(is::relocatable<ForcedRelocatable>);
static_assert(
  is::relocatable<
    storage::_::DataMembers<Options<option::Item<ForcedRelocatable>>>>);
static_assert(is::relocatable<
              storage::_::CustomNR<Options<option::Item<ForcedRelocatable>>>>);
static_assert(
  is::relocatable<storage::Custom<Options<option::Item<ForcedRelocatable>>>>);

static_assert(is::_::builtinRelocatable<Storage<ForcedRelocatable>>);
static_assert(is::relocatable<Storage<ForcedRelocatable>>);

// !

TEST(Storage, doesNotInitialize) {
	int memory = 333;
	struct S {
		int myValue = 123'456'789;
	};
	new (&memory) Storage<S>;
	auto &storage = *reinterpret_cast<Storage<S> *>(&memory);
	EXPECT_EQ(storage.storedItem().myValue, 333);
	EXPECT_EQ(storage.bytes.NUM_ITEMS, sizeof(S));

	//

	static_assert(std::is_trivially_constructible_v<Storage<S>>);
	static_assert(std::is_trivially_default_constructible_v<Storage<S>>);
	static_assert(std::is_trivially_destructible_v<Storage<S>>);
	static_assert(concepts::ConstexprConstructible<S>);

	// ! no implicit linear-time copy
	static_assert(!std::is_copy_constructible_v<Storage<S>>);
	static_assert(!std::is_move_constructible_v<Storage<S>>);

	// !
	static_assert(std::is_trivially_copyable_v<S>);
	static_assert(std::is_trivially_copyable_v<
	              storage::_::DataMembersBytes<Options<option::Item<int>>>>);
	static_assert(std::is_trivially_copyable_v<Storage<S>>);

	static_assert(std::is_trivially_move_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<Storage<S>>);

	static_assert(std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<Storage<S>>);

	static_assert(std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_copy_constructible_v<Storage<S>>);

	static_assert(std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<Storage<S>>);

	// Item is trivially copyable - copy only via explicit-copy
	static_assert(!std::is_constructible_v<Storage<S>, Storage<S>>);
	static_assert(!std::is_constructible_v<Storage<S>, Storage<S> &&>);
	static_assert(std::is_constructible_v<Storage<S>, const Storage<S> &&>);

	// Item is trivially copyable - assign only via explicit-copy
	static_assert(!std::is_assignable_v<Storage<S> &, Storage<S>>);
	static_assert(!std::is_assignable_v<Storage<S> &, Storage<S> &&>);
	static_assert(std::is_assignable_v<Storage<S> &, const Storage<S> &&>);

	static_assert(sizeof(Storage<int>) == sizeof(int));
	struct Test {
		short a;
		int b;
		char c;
	};
	static_assert(sizeof(Storage<Test>) == sizeof(Test));
	static_assert(alignof(Storage<Test>) == alignof(Test));
}

TEST(Storage, preventMemcpy) {
	struct S {
		~S() {}
	};

	static_assert(std::is_trivially_constructible_v<Storage<S>>);
	static_assert(std::is_trivially_default_constructible_v<Storage<S>>);
	static_assert(std::is_trivially_destructible_v<Storage<S>>);

	// ! no implicit linear-time copy
	static_assert(!std::is_trivially_copyable_v<S>);
	// static_assert(!std::is_trivially_copyable_v<Storage<S>>); // !!!!!!!!!!

	static_assert(std::is_trivially_move_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<Storage<S>>);

	static_assert(!std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<Storage<S>>);

	static_assert(!std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_copy_constructible_v<Storage<S>>);

	static_assert(std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<Storage<S>>);

	// auto test = [] {
	// 	Storage<S> a;
	// 	Storage<S> b = a.copy();
	// };

	// Item not trivially copyable - no copy allowed
	static_assert(!std::is_constructible_v<Storage<S>, Storage<S>>);
	static_assert(!std::is_constructible_v<Storage<S>, Storage<S> &&>);
	static_assert(!std::is_constructible_v<Storage<S>, const Storage<S> &&>);

	// Item not trivially copyable - no assign allowed
	static_assert(!std::is_assignable_v<Storage<S> &, Storage<S>>);
	static_assert(!std::is_assignable_v<Storage<S> &, Storage<S> &&>);
	static_assert(!std::is_assignable_v<Storage<S> &, const Storage<S> &&>);
}

TEST(Storage, zeroInitialize) {
	struct S {
		int value = 123'456'789;
	};
	Storage<S> storage = {};
	EXPECT_EQ(storage.storedItem().value, 0);
}

#include <v/OFF>
