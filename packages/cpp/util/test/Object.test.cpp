#include "voltiso/Object"
#include "voltiso/Options"

#include <type_traits>

using namespace VOLTISO_NAMESPACE;

struct Defaults {
  using Brand = int;
  using Type = void *;
};

using DefaultOptions = v::Options<Defaults>;

static_assert(v::has::type::Brand<DefaultOptions>);

static_assert(std::is_same_v<DefaultOptions::Brand, int>);
static_assert(std::is_same_v<DefaultOptions::Type, void *>);

static_assert(std::is_same_v<DefaultOptions::Brand_<char>::Brand, char>);
static_assert(std::is_same_v<DefaultOptions::Brand_<char>::Type, void *>);

static_assert(
    std::is_same_v<DefaultOptions::Brand_<char>::Type_<int *>::Brand, char>);
static_assert(
    std::is_same_v<DefaultOptions::Brand_<char>::Type_<int *>::Type, int *>);

//

template <class O>
struct S
    : Object<typename O::template FinalTemplate_<S>::template Final_<S<O>>> {};

static_assert(std::is_trivially_default_constructible_v<S<DefaultOptions>>);
static_assert(std::is_trivially_destructible_v<S<DefaultOptions>>);
