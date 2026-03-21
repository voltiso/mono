#include "gtest/gtest.h"

#include "v/size"
// #include "v/glue/std"
#include "v/handle"
#include "v/storage"

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_trivially_copyable_v<Handle>);

TEST(Handle, doesNotInitialize) {
	struct S {};
	using Handle = Handle::WithBrand<S>;
	Storage<Handle> storage;
	storage.storedItem() = Handle((void *)123);
	new (&storage) Handle;
	EXPECT_EQ(storage.storedItem().value, (void *)123);
}

TEST(Handle, operatorBool) {
	struct S {};
	using Handle = Handle::WithBrand<S>;
	Handle handle = handle::null;
	EXPECT_FALSE(handle);
	handle = Handle((void *)123);
	EXPECT_TRUE(handle);
}

TEST(Handle, zeroInitialize) {
	auto handle = Handle(nullptr);
	EXPECT_EQ(handle.value, nullptr);

	struct S {};
	using Handle2 = Handle::WithBrand<S>::WithValue<Size>;
	auto handle2 = Handle2(0);
	EXPECT_EQ(handle2.value, 0);
}

// ============================================================================
// Dereference
// ============================================================================

template <class T>
concept CanDereference = requires(T t) { *t; };

TEST(Handle, dereference) {
	static_assert(!CanDereference<Handle>);
	static_assert(!CanDereference<Handle::WithValue<void *>>);
	static_assert(CanDereference<Handle::WithValue<int *>>);
	int i = 123;
	using Handle = Handle::WithValue<int *>;
	Handle handle = Handle(&i);
	EXPECT_EQ(*handle, 123);
}

template <class T>
concept CanArrow = requires(T t) { t.operator->(); };

TEST(Handle, arrowDereference) {
	static_assert(!CanArrow<Handle>);
	static_assert(!CanArrow<Handle::WithValue<void *>>);
	static_assert(CanArrow<Handle::WithValue<int *>>);
	struct S {
		int i;
	};
	S s{123};
	using Handle = Handle::WithValue<S *>;
	Handle handle = Handle(&s);
	EXPECT_EQ(handle->i, 123);
}

// ============================================================================
// Trivial
// ============================================================================

static_assert(std::is_trivially_default_constructible_v<Handle>);
static_assert(std::is_trivially_destructible_v<Handle>);
static_assert(std::is_trivially_copyable_v<Handle>);
static_assert(std::is_trivially_copyable_v<Handle::WithValue<int>>);

// ============================================================================
// Convert
// ============================================================================

// no implicit `int -> handle`
static_assert(!std::is_assignable_v<Handle::WithValue<int> &, int>);

// no implicit `handle -> int`
static_assert(!std::is_assignable_v<int &, Handle::WithValue<int>>);

// allow `handle<smallInt> -> handle<bigInt>`
static_assert(std::is_assignable_v<Handle::WithValue<uint64_t> &, Handle::WithValue<uint32_t>>);

// most importantly: disallow `handle<bigInt> -> handle<smallInt>`
static_assert(!std::is_assignable_v<Handle::WithValue<uint32_t> &, Handle::WithValue<uint64_t>>);

// ============================================================================
// Brand
// ============================================================================

struct TEST_Brand {
	struct Base {};
	struct Raw : Base {};
	using A = Handle::WithBrand<Raw>::WithValue<Raw *>;

	static_assert(sizeof(A) == sizeof(void *));

	// pointer vs integer mismatch
	static_assert(!std::is_assignable_v<A::WithValue<Size> &, A>);
	static_assert(!std::is_assignable_v<A &, A::WithValue<Size>>);

	// int convert
	static_assert(std::is_constructible_v<A::WithValue<uint64_t>, A::WithValue<uint32_t>>);
	static_assert(!std::is_constructible_v<A::WithValue<uint32_t>, A::WithValue<uint64_t>>);

	// to pointer
	static_assert(std::is_constructible_v<Raw *, A>);
	static_assert(std::is_constructible_v<Base *, A>);
	static_assert(std::is_constructible_v<void *, A>);
};

// ============================================================================
// Cross-Brand
// ============================================================================

struct TEST_Brand_Cross {
	struct _A {};
	struct _B {};
	using A = Handle::WithBrand<_A>;
	using B = Handle::WithBrand<_B>;

	static_assert(!std::is_assignable_v<A, B>);
	static_assert(!std::is_assignable_v<B, A>);

	static_assert(!std::is_constructible_v<A::WithValue<uint64_t>, B::WithValue<uint32_t>>);
	static_assert(!std::is_constructible_v<A::WithValue<uint32_t>, B::WithValue<uint64_t>>);
};
