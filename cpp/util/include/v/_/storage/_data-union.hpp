#pragma once
#include <v/_/_>

#include "v/_/is/relocatable.hpp"
#include "v/concepts/options"
#include "v/option/item"

#include <v/ON>

namespace VOLTISO_NAMESPACE::storage::_ {

#pragma push_macro("SPECIAL_MEMBERS")
#define SPECIAL_MEMBERS                                                                            \
	constexpr Union() noexcept = default;                                                            \
	constexpr Union() noexcept                                                                       \
	  requires(!std::is_trivially_constructible_v<Item>)                                             \
	{}                                                                                               \
                                                                                                   \
	constexpr Union(const Union &) = default;                                                        \
	constexpr Union(const Union &) noexcept                                                          \
	  requires(!std::is_trivially_copy_constructible_v<Item>)                                        \
	{}                                                                                               \
                                                                                                   \
	constexpr ~Union() noexcept = default;                                                           \
	constexpr ~Union() noexcept                                                                      \
	  requires(!std::is_trivially_destructible_v<Item>)                                              \
	{}

template <class Item> union Union {
	// Tensor::WithImplicitCopy _bytes; // ! circular dep, must use raw bytes
	std::byte _bytes[sizeof(Item)];
	// ⚠️ This may not be constructed yet
	Item _storedItem;
	SPECIAL_MEMBERS
};

template <class Item>
  requires(is::relocatable<Item>)
union RELOCATABLE(Union<Item>) {
	std::byte _bytes[sizeof(Item)];
	Item _storedItem;
	SPECIAL_MEMBERS
};

#pragma pop_macro("SPECIAL_MEMBERS")

// ! -------------------------------------------------------------

template <concepts::Options Options> class DataUnion {
private:
	using Item = Options::template Get<option::Item>;
	// using View = View<std::byte, sizeof(Item)>;

private:
	Union<Item> _union;

	// ! -------------------------------------------------------------------------
	// ! API
	// ! -------------------------------------------------------------------------
public:
	// TODO: return View (or Tensor cast?) - probably view better
	constexpr auto &bytes() noexcept { return this->_union._bytes; }
	constexpr const auto &bytes() const noexcept { return this->_union._bytes; }

	// ⚠️ This may not be constructed yet
	constexpr Item &storedItem() noexcept { return this->_union._storedItem; }

	// ⚠️ This may not be constructed yet
	constexpr const Item &storedItem() const noexcept { return this->_union._storedItem; }
};

} // namespace VOLTISO_NAMESPACE::storage::_

#include <v/OFF>
