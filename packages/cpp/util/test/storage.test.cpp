#include "gtest/gtest.h"

#include <v/storage>

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

TEST(Storage, doesNotInitialize) {
	int memory = 333;
	struct S {
		int myValue = 123'456'789;
	};
	new (&memory) Storage<S>;
	auto &storage = *reinterpret_cast<Storage<S> *>(&memory);
	EXPECT_EQ(storage.object().myValue, 333);
	EXPECT_EQ(storage.bytes.NUM_ITEMS, sizeof(S));

	//

	static_assert(std::is_trivially_constructible_v<Storage<S>>);
	static_assert(std::is_trivially_default_constructible_v<Storage<S>>);
	static_assert(std::is_trivially_destructible_v<Storage<S>>);

	// ! no implicit linear-time copy
	static_assert(!std::is_copy_constructible_v<Storage<S>>);
	static_assert(!std::is_move_constructible_v<Storage<S>>);

	// !
	static_assert(std::is_trivially_copyable_v<S>);
	// static_assert(!std::is_trivially_copyable_v<Storage<S>>); // !!!!!!!

	static_assert(std::is_trivially_move_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<Storage<S>>);

	static_assert(std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<Storage<S>>);

	static_assert(std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_copy_constructible_v<Storage<S>>);

	static_assert(std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<Storage<S>>);

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
}

TEST(Storage, zeroInitialize) {
	struct S {
		int value = 123'456'789;
	};
	Storage<S> storage = {};
	EXPECT_EQ(storage.object().value, 0);
}
