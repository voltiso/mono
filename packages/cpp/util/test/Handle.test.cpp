#include <gtest/gtest.h>

#include <voltiso/handle/Handle>
#include <voltiso/storage/Storage>

using namespace VOLTISO_NAMESPACE;

TEST(Handle, doesNotInitialize) {
  struct S {};
  using Handle = Handle<S>;
  Storage<Handle> storage;
  storage.item() = 123;
  new (&storage) Handle;
  EXPECT_EQ(storage.item(), 123);
}

TEST(Handle, operatorBool) {
  struct S {};
  using Handle = Handle<S>;
  Handle handle = Handle::null;
  EXPECT_FALSE(handle);
  handle = 123;
  EXPECT_TRUE(handle);
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

static_assert(std::is_trivially_copyable_v<handle::unbranded::Crtp<S, void *, void>>);

static_assert(
    std::is_trivially_copyable_v<handle::unbranded::Crtp<S, uint32_t, void>>);

// CustomUnbranded<uint32_t> a = 123;

// allow `int -> handle`
static_assert(std::is_nothrow_assignable_v<handle::unbranded::Crtp<S, uint32_t, void>,
                                           uint32_t>);

// disallow `handle -> int` (user should use `handle.value`)
static_assert(
    !std::is_assignable_v<uint32_t, handle::unbranded::Crtp<S, uint32_t, void>>);

// allow `handle<smallInt> -> handle<bigInt>`
static_assert(std::is_assignable_v<handle::unbranded::Crtp<S, uint64_t, void>,
                                   handle::unbranded::Crtp<S, uint32_t, void>>);

// most importantly: disallow `handle<bigInt> -> handle<smallInt>`
static_assert(!std::is_assignable_v<handle::unbranded::Crtp<S, uint32_t, void>,
                                    handle::unbranded::Crtp<S, uint64_t, void>>);

static_assert(!std::is_assignable_v<handle::unbranded::Crtp<S, uint32_t, void>,
                                    handle::unbranded::Crtp<S, uint64_t, void>>);

//

static_assert(std::is_standard_layout_v<Handle<S>>);
static_assert(std::is_trivially_copyable_v<Handle<S>>);
static_assert(std::is_trivially_constructible_v<Handle<S>>);

//

struct A {};
struct B {};
static_assert(sizeof(Handle<A>) == sizeof(std::size_t));
static_assert(!std::is_assignable_v<Handle<A>, Handle<B>>);
static_assert(std::is_assignable_v<handle::Custom<A, size_t>, Handle<A>>);
static_assert(std::is_assignable_v<Handle<A>, handle::Custom<A, size_t>>);
static_assert(std::is_constructible_v<Handle<A>, handle::Custom<A, size_t>>);

//
static_assert(std::is_constructible_v<handle::Custom<A, uint64_t>,
                                      handle::Custom<A, uint32_t>>);

static_assert(std::is_constructible_v<Handle<A>, handle::Custom<A, uint32_t>>);
static_assert(std::is_constructible_v<Handle<A>, handle::Custom<A, int>>);

static_assert(std::is_assignable_v<Handle<A>, handle::Custom<A, uint32_t>>);
static_assert(std::is_assignable_v<Handle<A>, handle::Custom<A, int>>);
