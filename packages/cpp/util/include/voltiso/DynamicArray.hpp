#pragma once
#include <bit>
#include <cstddef>
#include <voltiso/_>

#include "voltiso/allocator/Malloc.hpp"

#include "voltiso/Array"
#include "voltiso/Handle"
#include "voltiso/Object"
#include "voltiso/Options"
#include "voltiso/Storage"
#include "voltiso/has"
#include "voltiso/is_derived_from_template"
#include "voltiso/is_trivially_relocatable"

#include "glog/logging.h"

#include <type_traits>

namespace VOLTISO_NAMESPACE::dynamicArray {
template <class Options> class Build;
} // namespace VOLTISO_NAMESPACE::dynamicArray

//

namespace VOLTISO_NAMESPACE::dynamicArray::_ {
template <class Options> struct Base_ : Object<Options> {
  using Base = Object<Options>;
  using Base::Base;
  using Base::operator=;
};

template <class Options> struct DataMembersNoInPlace : Base_<Options> {
  using Base = Base_<Options>;
  using Base::Base;
  using Base::operator=;

protected:
  Options::Allocator::Handle allocation;

public:
  size_t const numSlots = Options::IN_PLACE; // 0
};

template <class Options> struct DataMembersInPlaceBase : Base_<Options> {
  using Base = Base_<Options>;
  using Base::Base;
  using Base::operator=;

  static_assert(std::is_trivially_constructible_v<
                Storage<typename Options::Allocator::Handle>>);

  static_assert(std::is_trivially_default_constructible_v<
                Storage<typename Options::Allocator::Handle>>);
};

template <class Options>
struct DataMembersInPlaceOnly : DataMembersInPlaceBase<Options> {
  using Base = DataMembersInPlaceBase<Options>;
  using Base::Base;
  using Base::operator=;

protected:
  Array<Storage<typename Options::Item>, Options::IN_PLACE_ONLY> inPlaceItems;

public:
  static constexpr size_t NUM_SLOTS = Options::IN_PLACE_ONLY;
};

template <class Options>
struct DataMembersInPlace : DataMembersInPlaceBase<Options> {
  using Base = DataMembersInPlaceBase<Options>;
  using Base::Base;
  using Base::operator=;

protected:
  union {
    Storage<typename Options::Allocator::Handle> allocation;
    Array<Storage<typename Options::Item>, Options::IN_PLACE> inPlaceItems;
  };

public:
  size_t const numSlots = Options::IN_PLACE;
};

template <class Options>
using DataMembers =
    std::conditional_t<(Options::IN_PLACE > 0), DataMembersInPlace<Options>,
                       std::conditional_t<(Options::IN_PLACE_ONLY > 0),
                                          DataMembersInPlaceOnly<Options>,
                                          DataMembersNoInPlace<Options>>>;

template <class Options> class ConstAccessor {
private:
  using Build = Build<Options>;
  using Item = typename Build::Item;

private:
  typename Build::Handle handle;
  const Build &dynamicArray;

protected:
  friend Build;
  ConstAccessor(const Handle &handle, const Build &dynamicArray)
      : handle(handle), dynamicArray(dynamicArray) {}

public:
  const Item &item() const {
    DCHECK_GE(this->handle.value, 0);
    DCHECK_LT(this->handle.value, this->dynamicArray.numItems);
    return dynamicArray.slots()[this->handle.value].item();
  }
  const Item &operator*() const { return item(); }
  const Item *operator->() const { return &item(); }
  const Item *operator&() const { return &item(); }
  operator const Item &() const { return item(); }
};

template <class Options> class Accessor : public ConstAccessor<Options> {
private:
  using Base = ConstAccessor<Options>;
  using Build = Build<Options>;
  using Item = typename Build::Item;

private:
  friend Build;
  Accessor(const Handle &handle, Build &dynamicArray)
      : ConstAccessor<Options>(handle, dynamicArray) {}

public:
  Item &item() { return const_cast<Item &>(Base::item()); }
  Item &operator*() { return item(); }
  Item *operator->() { return &item(); }
  Item *operator&() { return &item(); }
  operator Item &() { return item(); }
};

} // namespace VOLTISO_NAMESPACE::dynamicArray::_

//

namespace VOLTISO_NAMESPACE::dynamicArray {
struct Defaults {
  using Item = void; // need to override
  using Allocator = allocator::Malloc;
  static constexpr size_t IN_PLACE = 0;
  static constexpr size_t IN_PLACE_ONLY = 0;

  // for Object<Options>
  // static constexpr bool IS_RELOCATABLE = true;
};

using DefaultOptions = Options<Defaults>;

//

template <class _Options> class Build : public _::DataMembers<_Options> {
public:
  using Base = _::DataMembers<_Options>;
  using Options = _Options;
  using Item = Options::Item;
  using Allocator = Options::Allocator;

  using Accessor = _::Accessor<Options>;
  using ConstAccessor = _::ConstAccessor<Options>;
  friend Accessor;
  friend ConstAccessor;

private:
  using Self = Build;
  template <class O> using SelfTemplate = Build<O>;
  using Final = Base::Final;

  static_assert(is_trivially_relocatable<Item>,
                "`Item` must be marked as trivially relocatable using "
                "`is_trivially_relocatable<Item> = true`");

  static_assert(Options::IN_PLACE == 0 || Options::IN_PLACE_ONLY == 0,
                "Use either `IN_PLACE` or `IN_PLACE_ONLY`, not both");

  static constexpr size_t NUM_IN_PLACE_SLOTS =
      Options::IN_PLACE || Options::IN_PLACE_ONLY;

public:
  // template <class Type>
  // using CustomHandle = Handle ::Brand_<Self>::template Type_<Type>;
  // using Handle = CustomHandle<std::size_t>;
  using Handle = Handle::Brand_<Self>::template Type_<std::size_t>;

public:
  size_t const numItems = 0;
  // size_t const numSlots = NUM_IN_PLACE_SLOTS;

public:
  ~Build() {
    if constexpr (NUM_IN_PLACE_SLOTS == 0) {
      // speed-up usual 'non-empty' path
      if (this->numSlots > 0) [[likely]] {
        auto memory =
            static_cast<Storage<Item> *>(_allocator()(this->allocation));
        for (size_t i = 0; i < numItems; ++i) [[likely]] {
          memory[i].item().~Item();
        }
        _allocator().freeBytes(this->allocation, _numBytes(this->numSlots));
      }
    } else if constexpr (Options::IN_PLACE > 0) {
      // speed-up 'in-place' path (e.g. for `HashTable`)
      if (this->numSlots > Options::IN_PLACE) [[unlikely]] {
        auto memory =
            static_cast<Storage<Item> *>(_allocator()(this->allocation.item()));
        // speed-up empty path
        for (size_t i = 0; i < numItems; ++i) [[unlikely]] {
          memory[i].item().~Item();
        }
        _allocator().freeBytes(this->allocation.item(),
                               _numBytes(this->numSlots));
      } else [[likely]] {
        // speed-up inplace path
        // speed-up empty path
        for (size_t i = 0; i < numItems; ++i) [[unlikely]] {
          this->inPlaceItems[i].item().~Item();
        }
      }
    } else {
      static_assert(Options::IN_PLACE_ONLY > 0);
      // DCHECK_LE(this->numSlots, Options::IN_PLACE_ONLY);
      auto memory = static_cast<Storage<Item> *>(this->inPlaceItems.items);
      for (size_t i = 0; i < numItems; ++i) {
        memory[i].item().~Item();
      }
    }
  }

private:
  friend Object<Options>;
  // make sure the destructor will be no-op
  void _assumeRelocated() {
    const_cast<size_t &>(this->numItems) = 0;
    const_cast<size_t &>(this->numSlots) = 0;
  }

public:
  Build() = default;

  Build(std::initializer_list<Item> items) {
    setNumSlots(items.size());
    for (auto &item : items) {
      push(item);
    }
  }

  // using Base::Base;

  // BUILD(BUILD&& other) noexcept = default;
  // BUILD& operator=(BUILD&& other) noexcept = default;

  // explicit Build(const Self &other) = default;
  // Build(Self &&other) noexcept = default;

  template <class Other, class = std::enable_if_t<
                             is_derived_from_template<Other, SelfTemplate>>>
  explicit Build(const Other &other) {
    setNumSlots(other.numItems);
    auto memory = slots();
    auto otherMemory = other.slots();
    const_cast<size_t &>(numItems) = other.numItems;
    for (size_t i = 0; i < other.numItems; ++i) {
      new (memory + i) Item(otherMemory[i].item());
    }
  }

  using Base::Base;
  using Base::operator=;

  Self &operator=(const Self &other) {
    DCHECK_NE(this, &other); // forbid
    auto memory = slots();
    for (size_t i = 0; i < numItems; ++i) {
      memory[i].item().~Item();
    }
    if (this->numSlots < other.numItems) [[unlikely]] {
      setNumSlots(other.numItems);
      memory = slots();
    }
    const_cast<size_t &>(numItems) = other.numItems;
    for (size_t i = 0; i < other.numItems; ++i) {
      new (memory + i) Item(other[i]);
    }
    return *this;
  }

  // Self &operator=(Self &&other) noexcept {
  //   DCHECK_NE(this, &other);
  //   this->~Self();
  //   static_assert(is_trivially_relocatable<Self>);
  //   static_assert(is_trivially_relocatable<Item>);
  //   memcpy(this, &other, sizeof(Self)); // trivially relocatable
  //   other._assumeRelocated();
  //   return *this;
  // }

public:
  // `numItems` must be at least 1
  template <class... Args>
  static Final createWithNumItems(size_t numItems, Args &&...args) {
    Final _self;
    static_assert(!std::is_polymorphic_v<Self>);
    static_assert(!std::is_polymorphic_v<Final>);
    auto &self = reinterpret_cast<Self &>(_self);

    const_cast<size_t &>(self.numItems) = numItems;
    const_cast<size_t &>(self.numSlots) = numItems;

    auto item = Item(std::forward<Args>(args)...);

    if constexpr (NUM_IN_PLACE_SLOTS == 0) {
      self.allocation = _allocator().allocateBytes(_numBytes(numItems));
    } else if constexpr (Options::IN_PLACE > 0) {
      if (numItems > Options::IN_PLACE) [[unlikely]] {
        self.allocation.item() =
            _allocator().allocateBytes(_numBytes(numItems));
      }
    } else {
      static_assert(Options::IN_PLACE_ONLY > 0);
      DCHECK_LE(numItems, Options::IN_PLACE_ONLY);
    }

    auto memory = self.slots();

    for (size_t i = 0; i < numItems; ++i) {
      new (memory + i) Item(item);
    }
    return _self;
  }

  //

private:
  static auto &_allocator() {
    return singleton::perThread::instance<Self::Allocator>();
  }

public:
  static const auto &allocator() { return _allocator(); }

  //

private:
  static constexpr auto _numBytes(size_t numSlots) {
    constexpr auto roundUp = alignof(std::max_align_t);
    static_assert(std::has_single_bit(roundUp));
    constexpr auto MASK = roundUp - 1;
    auto numBytes = numSlots * sizeof(Item);
    auto numBytesAligned = (numBytes + roundUp - 1) & ~MASK;
    return numBytesAligned;
  }

  //

public:
  // `newNumSlots` must be at least `numItems`
  template <auto IN_PLACE_ONLY = Options::IN_PLACE_ONLY,
            class = std::enable_if_t<IN_PLACE_ONLY == 0>>
  auto setNumSlots(size_t newNumSlots) {
    static_assert(!std::is_same_v<Item, void>);
    static_assert(is_trivially_relocatable<Item>);
    // newNumSlots = std::bit_ceil(newNumSlots);
    DCHECK_GE(newNumSlots, numItems);
    if constexpr (NUM_IN_PLACE_SLOTS == 0) {
      if (this->numSlots > 0) [[likely]] {
        if (newNumSlots > 0) [[likely]] {
          this->allocation = _allocator().reallocateBytes(
              this->allocation, _numBytes(this->numSlots),
              _numBytes(newNumSlots));
        } else [[unlikely]] {
          _allocator().freeBytes(this->allocation, _numBytes(this->numSlots));
        }
      } else [[unlikely]] {
        if (newNumSlots > 0) [[likely]] {
          this->allocation = _allocator().allocateBytes(_numBytes(newNumSlots));
        } else [[unlikely]] {
          // noop
        }
      }
    } else if constexpr (Options::IN_PLACE > 0) {
      if (this->numSlots <= Options::IN_PLACE) [[likely]] {
        if (newNumSlots <= Options::IN_PLACE) [[likely]] {
          // noop - stay in place
        } else [[unlikely]] {
          auto allocation =
              _allocator().allocateBytes(newNumSlots * sizeof(Item));
          auto memory = _allocator()(allocation);
          ::memcpy(memory, &this->inPlaceItems[0], sizeof(Item) * numItems);
          this->allocation.item() = allocation;
        }
      } else [[unlikely]] {
        if (newNumSlots <= Options::IN_PLACE) [[likely]] {
          auto oldData = this->allocation.item();
          DCHECK_LT(newNumSlots, this->numSlots);
          ::memcpy(&this->inPlaceItems[0], oldData, sizeof(Item) * numItems);
          _allocator().freeBytes(oldData, this->numSlots * sizeof(Item));
        } else [[unlikely]] {
          this->allocation.item() = _allocator().reallocateBytes(
              this->allocation.item(), this->numSlots * sizeof(Item),
              newNumSlots * sizeof(Item));
        }
      }
    } else {
      static_assert(Options::IN_PLACE_ONLY > 0);
      DCHECK_LE(this->numSlots, Options::IN_PLACE_ONLY);
      DCHECK_LE(newNumSlots, Options::IN_PLACE_ONLY);
      static_assert(false); // `setNumSlots` disabled in this case
    }
    (size_t &)this->numSlots = newNumSlots;
  }

  // `numSlots` must be greater than zero
  Storage<Item> *slots() {
    if constexpr (has::numSlots<Self>) {
      DCHECK_GT(this->numSlots, 0);
    }
    if constexpr (has::NUM_SLOTS<Self>) {
      DCHECK_GT(this->NUM_SLOTS, 0);
    }

    if constexpr (NUM_IN_PLACE_SLOTS == 0) {
      return static_cast<Storage<Item> *>(_allocator()(this->allocation));
    } else if constexpr (Options::IN_PLACE > 0) {
      if (this->numSlots <= Options::IN_PLACE) [[likely]] {
        return this->inPlaceItems.items;
      } else [[unlikely]] {
        return static_cast<Storage<Item> *>(
            _allocator()(this->allocation.item()));
      }
    } else {
      static_assert(Options::IN_PLACE_ONLY > 0);
      // DCHECK_LE(this->numSlots, Options::IN_PLACE_ONLY);
      return this->inPlaceItems.items;
    }
  }

  const Storage<Item> *slots() const {
    return const_cast<Self &>(*this).slots();
  }

  Accessor operator[](const Handle &handle) {
    DCHECK_LT(handle.value, numItems);
    return {handle, *this};
    // return *(Item *)&(*this)[handle.value];
  }

  ConstAccessor operator[](const Handle &handle) const {
    DCHECK_LT(handle.value, numItems);
    return {handle, *this};
    // return *(const Item *)&(*this)[handle.value];
  }

  Accessor operator[](const size_t &index) {
    DCHECK_GE(index, 0);
    DCHECK_LT(index, numItems);
    return {Handle(index), *this};
    // return slots()[index].item();
  }

  ConstAccessor operator[](const size_t &index) const {
    return {Handle(index), *this};
  }

  Item &first() { return (*this)[0]; }
  const Item &first() const { return (*this)[0]; }

  Item &last() { return (*this)[numItems - 1]; }
  const Item &last() const { return (*this)[numItems - 1]; }

  Handle push(Item &&item) { return push<>(std::move(item)); }
  Handle push(const Item &item) { return push<>(item); }

  template <class... Args> Handle push(Args &&...args) {
    if constexpr (has::numSlots<Self>) {
      DCHECK_LE(numItems, this->numSlots);
    }

    if constexpr (has::NUM_SLOTS<Self>) {
      DCHECK_LE(numItems, this->NUM_SLOTS);
    }

    if constexpr (has::numSlots<Self>) {
      if (numItems == this->numSlots) [[unlikely]] {
        this->grow();
      }
    }

    if constexpr (has::numSlots<Self>) {
      DCHECK_LT(numItems, this->numSlots);
    }

    if constexpr (has::NUM_SLOTS<Self>) {
      DCHECK_LT(numItems, this->NUM_SLOTS);
    }

    // LOG(INFO) << "push " << numItems;

    auto index = numItems;
    ++(size_t &)numItems;

    if constexpr (has::NUM_SLOTS<Self>)
      DCHECK_LE(numItems, this->NUM_SLOTS);

    slots()[index].construct(std::forward<Args>(args)...);

    if constexpr (has::NUM_SLOTS<Self>)
      DCHECK_LE(numItems, this->NUM_SLOTS);

    auto handle = Handle(index);
    return handle;
  }

  template <auto IN_PLACE_ONLY = Options::IN_PLACE_ONLY,
            class = std::enable_if_t<IN_PLACE_ONLY == 0>>
  void grow() {
    static_assert(Options::IN_PLACE_ONLY == 0);
    // LOG(INFO) << "grow";
    auto newNumSlots = this->numSlots << 1;
    if constexpr (Options::IN_PLACE == 0) {
      if (!newNumSlots) [[unlikely]]
        newNumSlots = 1;
    }
    DCHECK_GT(newNumSlots, this->numSlots);
    this->setNumSlots(newNumSlots);
  }

  // cannot perfect-forward
  template <class... Args>
  void setNumItems(size_t newNumItems, Args &&...args) {
    if (newNumItems < numItems) {
      auto memory = slots();
      for (size_t i = numItems; i < newNumItems; ++i) {
        memory[i].item().~Item();
      }
    } else if (newNumItems > numItems) [[likely]] {
      if constexpr (Options::IN_PLACE_ONLY == 0) {
        if (newNumItems > this->numSlots) [[unlikely]] {
          setNumSlots(newNumItems);
        }
      } else {
        DCHECK_EQ(this->numSlots, Options::IN_PLACE_ONLY);
        DCHECK_LE(newNumItems, this->numSlots);
      }
      auto memory = slots();
      if constexpr (std::is_copy_constructible_v<Item>) {
        auto item = Item(std::forward<Args>(args)...);
        for (size_t i = numItems; i < newNumItems; ++i) {
          new (memory + i) Item(item);
        }
      } else {
        for (size_t i = numItems; i < newNumItems; ++i) {
          new (memory + i) Item(args...); // no std::forward (values reused)
        }
      }
    }
    const_cast<size_t &>(numItems) = newNumItems;
  }

  void clear() {
    if (numItems != 0) [[likely]] {
      auto memory = slots();
      for (size_t i = 0; i < numItems; ++i) {
        memory[i].item().~Item();
      }
      const_cast<size_t &>(numItems) = 0;
    }
  }

  Item pop() {
    DCHECK_GT(numItems, 0);
    auto lastIndex = numItems - 1;
    Item item = std::move((*this)[lastIndex].item());
    (*this)[lastIndex]->~Item();
    const_cast<size_t &>(numItems) = lastIndex;
    return item;
  }

  /**
   *  - Invalidates on resize
   *  - Invalidates on relocation
   */
  class Iterator final : public memory::IteratorCrtp<Item, Iterator> {
  public:
    // using Self = Iterator;
    using Base = memory::IteratorCrtp<Item, Iterator>;

    // using Item = Item;

    using Base::Base;
  };

  /**
   *  - Invalidates on resize
   *  - Invalidates on relocation
   */
  class ConstIterator final
      : public memory::ConstIteratorCrtp<Item, ConstIterator> {
  public:
    // using Self = ConstIterator;
    using Base = memory::ConstIteratorCrtp<Item, ConstIterator>;

    // using Item = Item;

    using Base::Base;
  };

  // private:
  // Iterator _end; // cannot store pointer to self (we're relocatable)

  Iterator begin() {
    DCHECK_GT(numItems, 0);
    return &slots()->item();
  }
  Iterator end() {
    DCHECK_GT(numItems, 0);
    return &slots()->item() + this->numItems;
  }
};
} // namespace VOLTISO_NAMESPACE::dynamicArray
VOLTISO_OBJECT_FINAL(dynamicArray)
VOLTISO_OBJECT_TRIVIALLY_RELOCATABLE(dynamicArray)

namespace VOLTISO_NAMESPACE {
template <class Options>
::std::ostream &operator<<(::std::ostream &os,
                           const dynamicArray::Build<Options> &array) {
  os << "[";
  for (size_t i = 0; i < array.numItems; ++i) {
    if (i > 0) {
      os << ", ";
    }
    os << array[i];
  }
  os << "]";
  return os;
}
} // namespace VOLTISO_NAMESPACE

namespace VOLTISO_NAMESPACE {
template <class Item>
using DynamicArray =
    dynamicArray::Final<dynamicArray::DefaultOptions::Item_<Item>>;
} // namespace VOLTISO_NAMESPACE

//

// static_assert(v::has::numSlots<v::DynamicArray<int>>);
// static_assert(v::has::NUM_SLOTS<v::DynamicArray<int>::IN_PLACE_ONLY_<4>>);
