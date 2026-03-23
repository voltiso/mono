#pragma once
#include <v/_/_>

#include "extent.hpp"

#include <v/ON>
namespace V::tensor {

namespace _ {
template <class T, auto... es> struct Rec;
template <class T> struct Rec<T> {
	using Result = T;
};
template <class T, auto e, auto... es> struct Rec<T, e, es...> {
	using Result = Rec<T, es...>::Result[e.value];
};
template <class T, auto... es> struct Rec<T, Extent::dynamic, es...> {
	using Result = Rec<T, es...>::Result[];
};

//

template <class T, auto... es> struct Get {
	using Result = typename Rec<T, es...>::Result;
};

template <class T> struct Get<T> {
	using Result = T[];
};
} // namespace _

/**
 * @brief Type alias for a raw C-style array.
 *
 * - `RawArray<int>` -> `int[]`
 * - `RawArray<int, 3>` -> `int[3]`
 * - `RawArray<int, 2, 3>` -> `int[2][3]`
 * - `RawArray<int, Extent::dynamic, 2, 3>` -> `int[][2][3]`
 * - `RawArray<int, Extent::dynamic>` -> `int[]`
 */
template <class Item, Extent... es> using Raw = typename _::Get<Item, es...>::Result;

// static_assert(std::is_same_v<const Raw<int, 3>, Raw<const int, 3>>);

} // namespace V::tensor
#include <v/OFF>
