#pragma once
#include <voltiso/_>

#include "voltiso/Array"
#include "voltiso/Handle"
#include "voltiso/Object"
#include "voltiso/Singleton"
#include "voltiso/Storage"
#include "voltiso/getParameter/Type"
#include "voltiso/getParameter/VALUE"
#include "voltiso/has"
#include "voltiso/is_trivially_relocatable"
#include "voltiso/parameter"

#include <bit>
#include <cstddef>
#include <iostream>
#include <type_traits>

#include <voltiso/ON>

namespace VOLTISO_NAMESPACE::dynamicArray {
template <class Final, class Parameters> class Custom;
} // namespace VOLTISO_NAMESPACE::dynamicArray

namespace VOLTISO_NAMESPACE::dynamicArray::_ {

template <class Final, class Parameters> struct Base_ : Object<Final> {
  using Base = Object<Final>;
  using Base::Base;
  using Base::operator=;
};

template <class Final, class Parameters>
struct DataMembersNoInPlace : Base_<Final, Parameters> {
  using Base = Base_<Final, Parameters>;
  using Base::Base;
  using Base::operator=;

  using Allocator =
      getParameter::Type<VOLTISO_NAMESPACE::parameter::Allocator, Parameters>;

protected:
  typename Allocator::Handle allocation;

public:
  size_t const numSlots = getParameter::VALUE<parameter::IN_PLACE, Parameters>;
};

template <class Final, class Parameters>
struct DataMembersInPlaceBase : Base_<Final, Parameters> {
  using Base = Base_<Final, Parameters>;
  using Base::Base;
  using Base::operator=;

  using Allocator =
      getParameter::Type<VOLTISO_NAMESPACE::parameter::Allocator, Parameters>;

  static_assert(
      std::is_trivially_constructible_v<Storage<typename Allocator::Handle>>);
  static_assert(std::is_trivially_default_constructible_v<
                Storage<typename Allocator::Handle>>);
};

template <class Final, class Parameters>
struct DataMembersInPlaceOnly : DataMembersInPlaceBase<Final, Parameters> {
  using Base = DataMembersInPlaceBase<Final, Parameters>;
  using Base::Base;
  using Base::operator=;

  using Item =
      getParameter::Type<VOLTISO_NAMESPACE::parameter::Item, Parameters>;

protected:
  Array<Storage<Item>,
        getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters>>
      inPlaceItems;

public:
  static constexpr size_t NUM_SLOTS =
      getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters>;
};

template <class Final, class Parameters>
struct DataMembersInPlace : DataMembersInPlaceBase<Final, Parameters> {
  using Base = DataMembersInPlaceBase<Final, Parameters>;
  using Base::Base;
  using Base::operator=;

  using Allocator =
      getParameter::Type<VOLTISO_NAMESPACE::parameter::Allocator, Parameters>;

  using Item =
      getParameter::Type<VOLTISO_NAMESPACE::parameter::Item, Parameters>;

protected:
  union {
    Storage<typename Allocator::Handle> allocation;
    Array<Storage<Item>, getParameter::VALUE<parameter::IN_PLACE, Parameters>>
        inPlaceItems;
  };

public:
  size_t const numSlots = getParameter::VALUE<parameter::IN_PLACE, Parameters>;
};

template <class Final, class Parameters>
using DataMembers = std::conditional_t<
    (getParameter::VALUE<parameter::IN_PLACE, Parameters> > 0),
    DataMembersInPlace<Final, Parameters>,
    std::conditional_t<
        (getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters> > 0),
        DataMembersInPlaceOnly<Final, Parameters>,
        DataMembersNoInPlace<Final, Parameters>>>;

template <class Final, class Parameters> class ConstAccessor {
private:
  using Custom = Custom<Final, Parameters>;
  using Item = typename Custom::Item;

private:
  typename Custom::Handle handle;
  const Custom &dynamicArray;

protected:
  friend Custom;
  ConstAccessor(const Handle &handle, const Custom &dynamicArray)
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

template <class Final, class Parameters>
class Accessor : public ConstAccessor<Final, Parameters> {
private:
  using Base = ConstAccessor<Final, Parameters>;
  using Custom = Custom<Final, Parameters>;
  using Item = typename Custom::Item;

private:
  friend Custom;
  Accessor(const Handle &handle, Custom &dynamicArray)
      : ConstAccessor<Final, Parameters>(handle, dynamicArray) {}

public:
  Item &item() { return const_cast<Item &>(Base::item()); }
  Item &operator*() { return item(); }
  Item *operator->() { return &item(); }
  Item *operator&() { return &item(); }
  operator Item &() { return item(); }
  auto &operator=(const Item &other) {
    item() = other;
    return *this;
  }
};

} // namespace VOLTISO_NAMESPACE::dynamicArray::_

namespace VOLTISO_NAMESPACE::dynamicArray {
// struct Defaults {
//   using Item = void; // need to override
//   using Allocator = allocator::Malloc;
//   static constexpr size_t IN_PLACE = 0;
//   static constexpr size_t IN_PLACE_ONLY = 0;

//   // for Object<Options>
//   // static constexpr bool IS_RELOCATABLE = true;
// };

//

template <class Final, class Parameters>
class Custom : public _::DataMembers<Final, Parameters> {
private:
  using Base = _::DataMembers<Final, Parameters>;
  using Self = Custom;
  template <class F, class P> using SelfTemplate = Custom<F, P>;

public:
  using Item =
      getParameter::Type<VOLTISO_NAMESPACE::parameter::Item, Parameters>;

  using Allocator =
      getParameter::Type<VOLTISO_NAMESPACE::parameter::Allocator, Parameters>;

  static constexpr auto IN_PLACE =
      getParameter::VALUE<parameter::IN_PLACE, Parameters>;

  static constexpr auto IN_PLACE_ONLY =
      getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters>;

  using Accessor = _::Accessor<Final, Parameters>;
  using ConstAccessor = _::ConstAccessor<Final, Parameters>;
  friend Accessor;
  friend ConstAccessor;

private:
  // template <class O> using SelfTemplate = Custom<O>;
  // using Final = Base::Final;

  static_assert(is_trivially_relocatable<Item>,
                "`Item` must be marked as trivially relocatable using "
                "`is_trivially_relocatable<Item> = true`");

  static_assert(getParameter::VALUE<parameter::IN_PLACE, Parameters> == 0 ||
                    getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters> ==
                        0,
                "Use either `IN_PLACE` or `IN_PLACE_ONLY`, not both");

  static constexpr size_t NUM_IN_PLACE_SLOTS =
      getParameter::VALUE<parameter::IN_PLACE, Parameters> ||
      getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters>;

public:
  // template <class Type>
  // using CustomHandle = Handle ::Brand_<Self>::template Type_<Type>;
  // using Handle = CustomHandle<std::size_t>;
  using Handle = Handle::WithBrand<Self>::template WithType<std::size_t>;

public:
  size_t const numItems = 0;
  // size_t const numSlots = NUM_IN_PLACE_SLOTS;

public:
  ~Custom() {
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
    } else if constexpr (getParameter::VALUE<parameter::IN_PLACE, Parameters> >
                         0) {
      // speed-up 'in-place' path (e.g. for `HashTable`)
      if (this->numSlots > getParameter::VALUE<parameter::IN_PLACE, Parameters>)
          [[unlikely]] {
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
      static_assert(getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters> >
                    0);
      // DCHECK_LE(this->numSlots, getParameter::VALUE<parameter::IN_PLACE_ONLY,
      // Parameters>);
      auto memory = static_cast<Storage<Item> *>(this->inPlaceItems.items);
      for (size_t i = 0; i < numItems; ++i) {
        memory[i].item().~Item();
      }
    }
  }

  // private:
  //   friend Object<Final>;
  //   // make sure the destructor will be no-op
  //   void _assumeRelocated() {
  //     const_cast<size_t &>(this->numItems) = 0;
  //     const_cast<size_t &>(this->numSlots) = 0;
  //   }

public:
  Custom() = default;

  Custom(std::initializer_list<Item> items) {
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

  template <class OtherFinal, class OtherParameters>
  explicit Custom(const Custom<OtherFinal, OtherParameters> &other) {
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
    } else if constexpr (getParameter::VALUE<parameter::IN_PLACE, Parameters> >
                         0) {
      if (numItems > getParameter::VALUE<parameter::IN_PLACE, Parameters>)
          [[unlikely]] {
        self.allocation.item() =
            _allocator().allocateBytes(_numBytes(numItems));
      }
    } else {
      static_assert(getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters> >
                    0);
      DCHECK_LE(numItems, IN_PLACE_ONLY);
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
    // return context::get<Self::Allocator>();
    return Singleton<Self::Allocator>::instance();
    // return singleton::perThread::instance<Self::Allocator>();
    // return context::tryGet<Self::Allocator>() ||
    //        singleton::instance<Self::Allocator>();
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
  template <auto IN_PLACE_ONLY =
                getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters>,
            class = std::enable_if_t<IN_PLACE_ONLY == 0>>
  auto setNumSlots(size_t newNumSlots) {
    static_assert(getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters> ==
                  0);
    // LOG(INFO) << "setNumSlots " << newNumSlots;
    VOLTISO_GE(newNumSlots, numItems);
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
    } else if constexpr (getParameter::VALUE<parameter::IN_PLACE, Parameters> >
                         0) {
      if (this->numSlots <=
          getParameter::VALUE<parameter::IN_PLACE, Parameters>) [[likely]] {
        if (newNumSlots <= getParameter::VALUE<parameter::IN_PLACE, Parameters>)
            [[likely]] {
          // noop - stay in place
        } else [[unlikely]] {
          auto allocation =
              _allocator().allocateBytes(newNumSlots * sizeof(Item));
          auto memory = _allocator()(allocation);
          ::memcpy(memory, &this->inPlaceItems[0], sizeof(Item) * numItems);
          this->allocation.item() = allocation;
        }
      } else [[unlikely]] {
        if (newNumSlots <= getParameter::VALUE<parameter::IN_PLACE, Parameters>)
            [[likely]] {
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
      static_assert(IN_PLACE_ONLY > 0);
      DCHECK_LE(this->numSlots, IN_PLACE_ONLY);
      DCHECK_LE(newNumSlots, IN_PLACE_ONLY);
      static_assert(false); // `setNumSlots` disabled in this case
    }
    (size_t &)this->numSlots = newNumSlots;
  }

  // `numSlots` must be greater than zero
  Storage<Item> *slots() {
    // if constexpr (has::numSlots<Self>) {
    //   DCHECK_GT(this->numSlots, 0);
    // }

    // if constexpr (has::NUM_SLOTS<Self>) {
    //   DCHECK_GT(this->NUM_SLOTS, 0);
    // }

    if constexpr (NUM_IN_PLACE_SLOTS == 0) {
      return std::bit_cast<Storage<Item> *>(this->allocation);
      // return static_cast<Storage<Item> *>(
      //     _allocator()(this->allocation.item()));
    } else if constexpr (getParameter::VALUE<parameter::IN_PLACE, Parameters> >
                         0) {
      if (this->numSlots <=
          getParameter::VALUE<parameter::IN_PLACE, Parameters>) [[likely]] {
        return this->inPlaceItems.items;
      } else [[unlikely]] {
        return std::bit_cast<Storage<Item> *>(this->allocation);
        // return static_cast<Storage<Item> *>(
        //     _allocator()(this->allocation));
      }
    } else {
      static_assert(getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters> >
                    0);
      // DCHECK_LE(this->numSlots, getParameter::VALUE<parameter::IN_PLACE_ONLY,
      // Parameters>);
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
    GE(index, 0);
    LT(index, numItems);
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
    // std::cout << "push" << std::endl;
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

  template <auto IN_PLACE_ONLY =
                getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters>,
            class = std::enable_if_t<IN_PLACE_ONLY == 0>>
  void grow() {
    static_assert(getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters> ==
                  0);
    auto newNumSlots = this->numSlots << 1;
    if constexpr (getParameter::VALUE<parameter::IN_PLACE, Parameters> == 0) {
      if (!newNumSlots) [[unlikely]]
        newNumSlots = 1;
    }
    // LOG(INFO) << "grow " << this->numSlots << " " << newNumSlots;
    DCHECK_GT(newNumSlots, this->numSlots);
    this->setNumSlots(newNumSlots);
  }

  template <auto IN_PLACE_ONLY =
                getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters>,
            class = std::enable_if_t<IN_PLACE_ONLY == 0>>
  void growToAtLeast(size_t minNumSlots) {
    static_assert(getParameter::VALUE<parameter::IN_PLACE_ONLY, Parameters> ==
                  0);
    while (this->numSlots < minNumSlots)
      grow(); // ! SLOW
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
      if constexpr (IN_PLACE_ONLY == 0) {
        if (newNumItems > this->numSlots) [[unlikely]] {
          setNumSlots(newNumItems);
        }
      } else {
        DCHECK_EQ(this->numSlots, IN_PLACE_ONLY);
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

  bool hasItems() const { return numItems; }

  Item pop() {
    GT(numItems, 0);
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
    // DCHECK_GT(numItems, 0);
    return &slots()->item();
  }
  Iterator end() {
    // DCHECK_GT(numItems, 0);
    return &slots()->item() + this->numItems;
  }

  ConstIterator begin() const {
    // DCHECK_GT(numItems, 0);
    return &slots()->item();
  }
  ConstIterator end() const {
    // DCHECK_GT(numItems, 0);
    return &slots()->item() + this->numItems;
  }

public:
  template <class Parameter>
  using With =
      Custom<Final,
             decltype(std::tuple_cat(std::declval<std::tuple<Parameter>>(),
                                     std::declval<Parameters>()))>;

  template <class T> using WithItem = With<parameter::Item<T>>;
  template <class T> using WithAllocator = With<parameter::Allocator<T>>;
  template <std::size_t N> using WithInPlace = With<parameter::IN_PLACE<N>>;

  template <std::size_t N>
  using WithInPlaceOnly = With<parameter::IN_PLACE_ONLY<N>>;

}; // class Custom
} // namespace VOLTISO_NAMESPACE::dynamicArray

namespace VOLTISO_NAMESPACE {
template <class Final, class Parameters>
::std::ostream &
operator<<(::std::ostream &os,
           const dynamicArray::Custom<Final, Parameters> &array) {
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
class DynamicArray final
    : public dynamicArray::Custom<DynamicArray<Item>,
                                  std::tuple<parameter::Item<Item>>> {
  using Base = dynamicArray::Custom<DynamicArray<Item>,
                                    std::tuple<parameter::Item<Item>>>;

public:
  using Base::Base;
  using Base::operator=;
};

template <class Final, class Parameters>
constexpr auto
    is_trivially_relocatable<dynamicArray::Custom<Final, Parameters>> = true;

template <class Item>
constexpr auto is_trivially_relocatable<DynamicArray<Item>> = true;

} // namespace VOLTISO_NAMESPACE

#include <voltiso/OFF>
