#pragma once
#include <v/_/_>

#include "config.hpp"

#include "v/is/options"

#include <v/ON>
namespace VOLTISO_NAMESPACE::storage::_ {

//

template <is::Options Options> class DataBytes {
	using Config = _::Config<Options>;
	using Item = Config::Item;
	// using Tensor = Tensor<std::byte, sizeof(Item)>;

protected:
	// it was public, but we want trivially_copyable.
	// solution is to either use Tensor::WithImplicitCopy here,
	// or access via accessor method. We chose the latter, because don't want to
	// have public interface exposing Tensor::WithImplicitCopy.
	// - ACTUALLY - circular dep, must use raw bytes
	// alignas(Item) Tensor::WithImplicitCopy _bytes;
	alignas(Item) std::byte _bytes[sizeof(Item)];

	constexpr DataBytes() noexcept = default;

	// ! -------------------
	// ! API
	// ! -------------------
public:
	// TODO: return View (or Tensor cast?) - probably view better
	constexpr auto &bytes() noexcept { return this->_bytes; }
	constexpr const auto &bytes() const noexcept { return this->_bytes; }

	// ⚠️ This may not be constructed yet
	Item &storedItem() noexcept { return reinterpret_cast<Item &>(this->bytes()); }

	// ⚠️ This may not be constructed yet
	const Item &storedItem() const noexcept { return reinterpret_cast<const Item &>(this->bytes()); }
};

//

} // namespace VOLTISO_NAMESPACE::storage::_
#include <v/OFF>
