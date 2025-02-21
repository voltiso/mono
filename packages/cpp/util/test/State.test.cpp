#include <gtest/gtest.h>

#include <voltiso/throwError>

using namespace VOLTISO_NAMESPACE;

template <class T> class State {
  //
}; // class State

template <class T> void serialize(const T &value) {
  throwError("not implemented");
}

// template <class T, class = std::enable_if_t<std::is_arithmetic_v<T> ||
//                                             std::is_same_v<T, std::byte>>>
// void serialize(const T &value) {
//   // throwError("not implemented");
// }

template <> void serialize(const int &) {
  //
}

template <class T> class Diff {
  //
}; // class Diff

//

template <> void serialize(const TestA &value) {
  serialize("a", value.a);
  serialize("b", value.b);
  serialize("c", value.c);
  serialize("inner", value.inner);
}

//

TEST(State, simple) {
  serialize(123);
  //
}

TEST(State, diff) { auto diff = v::diff(a, b); }
