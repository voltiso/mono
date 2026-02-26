#include <gtest/gtest.h>

#include <v/concepts/constexpr-constructible>
#include <v/storage>

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

TEST(Storage, doesNotInitialize) {
	int memory = 333;
	struct S {
		int myValue = 123'456'789;
	};
	using G = Storage<S>::Constexpr;
	new (&memory) G;
	auto &storage = *reinterpret_cast<G *>(&memory);
	EXPECT_EQ(storage.storedItem().myValue, 333);
	EXPECT_EQ(storage.bytes.NUM_ITEMS, sizeof(S));

	//

	// static_assert(std::is_trivially_constructible_v<G>); // not true for union
	// static_assert(std::is_trivially_default_constructible_v<G>); // not true
	// for union
	static_assert(std::is_trivially_destructible_v<G>);

	// ! no implicit linear-time copy
	static_assert(!std::is_copy_constructible_v<G>);
	static_assert(!std::is_move_constructible_v<G>);

	// !
	static_assert(std::is_trivially_copyable_v<S>);
	// static_assert(!std::is_trivially_copyable_v<Storage<S>>); // !!!!!!!

	static_assert(std::is_trivially_move_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<G>);

	static_assert(std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<G>);

	static_assert(std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_copy_constructible_v<G>);

	static_assert(std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<G>);

	static_assert(sizeof(Storage<int>::Constexpr) == sizeof(int));
	struct Test {
		short a;
		int b;
		char c;
	};
	static_assert(sizeof(Storage<Test>::Constexpr) == sizeof(Test));
	static_assert(alignof(Storage<Test>::Constexpr) == alignof(Test));
}

TEST(Storage, preventMemcpy) {
	struct S {
		~S() {}
	};
	using G = Storage<S>::Constexpr;

	G storage;

	// ! these are not true for union
	// static_assert(std::is_trivially_constructible_v<G>);
	// static_assert(std::is_trivially_default_constructible_v<G>);
	// static_assert(std::is_trivially_destructible_v<G>);
	// static_assert(concepts::ConstexprConstructible<G>);

	// ! no implicit linear-time copy
	static_assert(!std::is_trivially_copyable_v<S>);
	// static_assert(!std::is_trivially_copyable_v<Storage<S>>); // !!!!!!!!!!

	static_assert(std::is_trivially_move_assignable_v<S>);
	static_assert(!std::is_trivially_move_assignable_v<G>);

	static_assert(!std::is_trivially_move_constructible_v<S>);
	static_assert(!std::is_trivially_move_constructible_v<G>);

	static_assert(!std::is_trivially_copy_constructible_v<S>);
	static_assert(!std::is_trivially_copy_constructible_v<G>);

	static_assert(std::is_trivially_copy_assignable_v<S>);
	static_assert(!std::is_trivially_copy_assignable_v<G>);
}

TEST(Storage, zeroInitialize) {
	struct S {
		int value = 123'456'789;
	};
	Storage<S>::Constexpr storage = {};
	EXPECT_EQ(storage.storedItem().value, 0);
}

TEST(Storage, preservesTriviality) {
	struct S {
		int value;
	};
	static_assert(std::is_trivially_constructible_v<Storage<S>::Constexpr>);
	static_assert(
	  std::is_trivially_default_constructible_v<Storage<S>::Constexpr>);
	static_assert(std::is_trivially_destructible_v<Storage<S>::Constexpr>);

	static_assert(std::is_trivially_copyable_v<S>);
	static_assert(std::is_trivially_move_assignable_v<S>);
	static_assert(std::is_trivially_move_constructible_v<S>);
	static_assert(std::is_trivially_copy_constructible_v<S>);
	static_assert(std::is_trivially_copy_assignable_v<S>);
}
