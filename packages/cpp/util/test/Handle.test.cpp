#include "voltiso/Handle"
#include "voltiso/Storage"

#include "gtest/gtest.h"

using namespace VOLTISO_NAMESPACE;

static_assert(std::is_trivially_copyable_v<Handle>);

TEST(Handle, doesNotInitialize) {
  struct S {};
  using Handle = Handle::WithBrand<S>;
  Storage<Handle> storage;
  storage.item() = Handle(123);
  new (&storage) Handle;
  EXPECT_EQ(storage.item().value, 123);
}

TEST(Handle, operatorBool) {
  struct S {};
  using Handle = Handle ::WithBrand<S>;
  Handle handle = Handle::null;
  EXPECT_FALSE(handle);
  handle = Handle(123);
  EXPECT_TRUE(handle);
}

TEST(Handle, zeroInitialize) {
  auto handle = Handle(0);
  EXPECT_EQ(handle.value, 0);

  struct S {};
  using Handle2 = Handle ::WithBrand<S>::template WithType<std::size_t>;
  auto handle2 = Handle2(0);
  EXPECT_EQ(handle2.value, 0);
}

// TEST(Handle, valueInitialize) {
//   struct S {};
//   // using Handle = Handle<S>;
//   using Handle = handle::CustomUnbranded<size_t>;
//   Storage<Handle> storage;
//   storage.item() = 123;
//   new (&storage) Handle{};
//   EXPECT_EQ(storage.item(), Handle::null);
// }

//

struct S {};

static_assert(std::is_trivially_default_constructible_v<Handle>);
static_assert(std::is_trivially_destructible_v<Handle>);
static_assert(std::is_trivially_copyable_v<Handle>);

static_assert(
    std::is_trivially_copyable_v<Handle ::WithBrand<S>::WithType<void *>>);

static_assert(
    std::is_trivially_copyable_v<Handle::WithBrand<S>::WithType<uint32_t>>);

// CustomUnbranded<uint32_t> a = 123;

// do not allow `int -> handle`
static_assert(!std::is_nothrow_assignable_v<
              Handle::WithBrand<S>::WithType<std::uint32_t>, std::uint32_t>);

// disallow `handle -> int` (user should use `handle.value`)
static_assert(
    !std::is_assignable_v<uint32_t, Handle::WithBrand<S>::WithType<uint32_t>>);

// allow `handle<smallInt> -> handle<bigInt>`
static_assert(std::is_assignable_v<Handle::WithBrand<S>::WithType<uint64_t>,
                                   Handle::WithBrand<S>::WithType<uint32_t>>);

// most importantly: disallow `handle<bigInt> -> handle<smallInt>`
static_assert(!std::is_assignable_v<Handle::WithBrand<S>::WithType<uint32_t>,
                                    Handle::WithBrand<S>::WithType<uint64_t>>);

static_assert(!std::is_assignable_v<Handle::WithBrand<S>::WithType<uint32_t>,
                                    Handle::WithBrand<S>::WithType<uint64_t>>);

//

static_assert(std::is_standard_layout_v<Handle::WithBrand<S>>);
static_assert(std::is_trivially_copyable_v<Handle::WithBrand<S>>);
static_assert(std::is_trivially_constructible_v<Handle::WithBrand<S>>);

//

struct A {};
struct B {};
static_assert(sizeof(Handle::WithBrand<A>) == sizeof(std::size_t));
static_assert(
    !std::is_assignable_v<Handle::WithBrand<A>, Handle::WithBrand<B>>);

static_assert(std::is_assignable_v<Handle::WithBrand<A>::WithType<size_t>,
                                   Handle::WithBrand<A>>);

static_assert(std::is_assignable_v<Handle::WithBrand<A>,
                                   Handle::WithBrand<A>::WithType<size_t>>);

static_assert(std::is_constructible_v<Handle::WithBrand<A>,
                                      Handle::WithBrand<A>::WithType<size_t>>);

//
static_assert(
    std::is_constructible_v<Handle::WithBrand<A>::WithType<uint64_t>,
                            Handle::WithBrand<A>::WithType<uint32_t>>);

static_assert(std::is_constructible_v<
              Handle::WithBrand<A>, Handle::WithBrand<A>::WithType<uint32_t>>);

static_assert(std::is_constructible_v<Handle::WithBrand<A>,
                                      Handle::WithBrand<A>::WithType<int>>);

static_assert(std::is_assignable_v<Handle::WithBrand<A>,
                                   Handle::WithBrand<A>::WithType<uint32_t>>);

static_assert(std::is_assignable_v<Handle::WithBrand<A>,
                                   Handle::WithBrand<A>::WithType<int>>);

// void *a = handle::Custom<A, A *>();
// A *b = handle::Custom<A, A *>();
// void test() {
//   a = handle::Custom<A, A *>();
//   b = handle::Custom<A, A *>();
// }

static_assert(
    std::is_constructible_v<A *, Handle::WithBrand<A>::WithType<A *>>);

static_assert(
    std::is_constructible_v<void *, Handle::WithBrand<A>::WithType<A *>>);

// static_assert(std::is_assignable_v<A *, handle::Custom<A, A *>>);
// static_assert(std::is_assignable_v<void *, handle::Custom<A, A *>>);

static_assert(std::is_same_v<decltype(std::declval<std::hash<Handle>>()(
                                 std::declval<Handle>())),
                             Handle::Value>);
