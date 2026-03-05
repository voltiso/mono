#include "gtest/gtest.h"

#include <v/glue/std>
#include <v/handle>
#include <v/storage>

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
	using Handle = Handle ::WithBrand<S>;
	Handle handle = handle::INVALID;
	EXPECT_FALSE(handle);
	handle = Handle((void *)123);
	EXPECT_TRUE(handle);
}

TEST(Handle, zeroInitialize) {
	auto handle = Handle(nullptr);
	EXPECT_EQ(handle.value, nullptr);

	struct S {};
	using Handle2 = Handle ::WithBrand<S>::template WithKind<Size>;
	auto handle2 = Handle2(0);
	EXPECT_EQ(handle2.value, 0);
}

//

struct S {};

static_assert(std::is_trivially_default_constructible_v<Handle>);
static_assert(std::is_trivially_destructible_v<Handle>);
static_assert(std::is_trivially_copyable_v<Handle>);

static_assert(
  std::is_trivially_copyable_v<Handle ::WithBrand<S>::WithKind<void *>>);

static_assert(
  std::is_trivially_copyable_v<Handle::WithBrand<S>::WithKind<uint32_t>>);

// CustomUnbranded<uint32_t> a = 123;

// do not allow `int -> handle`
static_assert(!std::is_nothrow_assignable_v<
              Handle::WithBrand<S>::WithKind<std::uint32_t>, std::uint32_t>);

// disallow `handle -> int` (user should use `handle.value`)
static_assert(
  !std::is_assignable_v<uint32_t, Handle::WithBrand<S>::WithKind<uint32_t>>);

// void test() {
// 	Handle::WithBrand<S>::WithKind<uint64_t> test =
// 	  Handle::WithBrand<S>::WithKind<uint32_t>();

// 	test = Handle::WithBrand<S>::WithKind<uint32_t>();
// }

// allow `handle<smallInt> -> handle<bigInt>`
static_assert(std::is_assignable_v<
              Handle::WithBrand<S>::WithKind<uint64_t>,
              Handle::WithBrand<S>::WithKind<uint32_t>>);

// most importantly: disallow `handle<bigInt> -> handle<smallInt>`
static_assert(!std::is_assignable_v<
              Handle::WithBrand<S>::WithKind<uint32_t>,
              Handle::WithBrand<S>::WithKind<uint64_t>>);

static_assert(!std::is_assignable_v<
              Handle::WithBrand<S>::WithKind<uint32_t>,
              Handle::WithBrand<S>::WithKind<uint64_t>>);

//

static_assert(std::is_standard_layout_v<Handle::WithBrand<S>>);
static_assert(std::is_trivially_copyable_v<Handle::WithBrand<S>>);
static_assert(std::is_trivially_constructible_v<Handle::WithBrand<S>>);

//

struct A {};
struct B {};
static_assert(sizeof(Handle::WithBrand<A>) == sizeof(Size));
static_assert(
  !std::is_assignable_v<Handle::WithBrand<A>, Handle::WithBrand<B>>);

static_assert(std::is_assignable_v<
              Handle::WithBrand<A>::WithKind<Size>, Handle::WithBrand<A>>);

static_assert(std::is_assignable_v<
              Handle::WithBrand<A>, Handle::WithBrand<A>::WithKind<Size>>);

static_assert(std::is_constructible_v<
              Handle::WithBrand<A>, Handle::WithBrand<A>::WithKind<Size>>);

//
static_assert(std::is_constructible_v<
              Handle::WithBrand<A>::WithKind<uint64_t>,
              Handle::WithBrand<A>::WithKind<uint32_t>>);

static_assert(std::is_constructible_v<
              Handle::WithBrand<A>, Handle::WithBrand<A>::WithKind<uint32_t>>);

static_assert(std::is_constructible_v<
              Handle::WithBrand<A>, Handle::WithBrand<A>::WithKind<int>>);

static_assert(std::is_assignable_v<
              Handle::WithBrand<A>, Handle::WithBrand<A>::WithKind<uint32_t>>);

static_assert(std::is_assignable_v<
              Handle::WithBrand<A>, Handle::WithBrand<A>::WithKind<int>>);

static_assert(
  std::is_constructible_v<A *, Handle::WithBrand<A>::WithKind<A *>>);

static_assert(
  std::is_constructible_v<void *, Handle::WithBrand<A>::WithKind<A *>>);

// static_assert(
//   std::is_same_v<
//     decltype(std::declval<std::hash<Handle>>()(std::declval<Handle>())),
//     Handle::Value>);
