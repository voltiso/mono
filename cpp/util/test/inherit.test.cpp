#include <v/_/_>

#include "v/is/relocatable"

#include <type_traits>

#include <v/ON>

using namespace VOLTISO_NAMESPACE;

struct TEST_RELOCATABLE {
	struct Base {
		using Self = Base;
		RELOCATABLE_BODY
	};

	template <class = void> struct Derived : Base {
		using Self = Derived;
		RELOCATABLE_BODY
		using Base = Base;
		INHERIT(Derived);
	};

	static_assert(is::relocatable<Base>);
	static_assert(is::relocatable<Derived<>>);
};

struct HIDE_PROTECTED_COPY_CONSTRUCT {
	struct ProtectedCopyable {
	public:
		ProtectedCopyable(ProtectedCopyable &&) = default;

	protected:
		ProtectedCopyable(const ProtectedCopyable &) = default;
	};
	static_assert(std::is_move_constructible_v<ProtectedCopyable>);
	static_assert(!std::is_copy_constructible_v<ProtectedCopyable>);

	struct Derived : ProtectedCopyable {};
	static_assert(std::is_move_constructible_v<Derived>);
	static_assert(std::is_copy_constructible_v<Derived>); // we don't want this

	template <class = void> struct BetterDerived : ProtectedCopyable {
		using Base = ProtectedCopyable;
		INHERIT(BetterDerived);
	};
	static_assert(std::is_move_constructible_v<BetterDerived<>>);
	static_assert(!std::is_copy_constructible_v<BetterDerived<>>); // better!
};

struct HIDE_PROTECTED_MOVE_CONSTRUCT {
	struct ProtectedMovable {
	public:
		ProtectedMovable(const ProtectedMovable &) = default;

	protected:
		ProtectedMovable(ProtectedMovable &&) = default;
	};
	static_assert(std::is_copy_constructible_v<ProtectedMovable>);
	static_assert(!std::is_move_constructible_v<ProtectedMovable>);

	struct Derived : ProtectedMovable {};
	static_assert(std::is_copy_constructible_v<Derived>);
	static_assert(std::is_move_constructible_v<Derived>); // we don't want this

	template <class = void> struct BetterDerived : ProtectedMovable {
		using Base = ProtectedMovable;
		INHERIT(BetterDerived);
	};
	static_assert(std::is_copy_constructible_v<BetterDerived<>>);
	static_assert(!std::is_move_constructible_v<BetterDerived<>>); // better!

	static_assert(std::is_trivially_copyable_v<BetterDerived<>>);
};

struct HIDE_PROTECTED_COPY_ASSIGN {
	struct ProtectedCopyAssignable {
	public:
		ProtectedCopyAssignable &operator=(ProtectedCopyAssignable &&) = default;

	protected:
		ProtectedCopyAssignable &operator=(const ProtectedCopyAssignable &) = default;
	};
	static_assert(std::is_move_assignable_v<ProtectedCopyAssignable>);
	static_assert(!std::is_copy_assignable_v<ProtectedCopyAssignable>);

	struct Derived : ProtectedCopyAssignable {};
	static_assert(std::is_move_assignable_v<Derived>);
	static_assert(std::is_copy_assignable_v<Derived>); // we don't want this

	template <class = void> struct BetterDerived : ProtectedCopyAssignable {
		using Base = ProtectedCopyAssignable;
		INHERIT(BetterDerived);
	};
	static_assert(std::is_move_assignable_v<BetterDerived<>>);
	static_assert(!std::is_copy_assignable_v<BetterDerived<>>); // better!
};

struct HIDE_PROTECTED_MOVE_ASSIGN {
	struct ProtectedMoveAssignable {
	public:
		ProtectedMoveAssignable &operator=(const ProtectedMoveAssignable &) = default;

	protected:
		ProtectedMoveAssignable &operator=(ProtectedMoveAssignable &&) = default;
	};
	static_assert(std::is_copy_assignable_v<ProtectedMoveAssignable>);
	static_assert(!std::is_move_assignable_v<ProtectedMoveAssignable>);

	struct Derived : ProtectedMoveAssignable {};
	static_assert(std::is_copy_assignable_v<Derived>);
	static_assert(std::is_move_assignable_v<Derived>); // we don't want this

	template <class = void> struct BetterDerived : ProtectedMoveAssignable {
		using Base = ProtectedMoveAssignable;
		INHERIT(BetterDerived);
	};
	static_assert(std::is_copy_assignable_v<BetterDerived<>>);
	static_assert(!std::is_move_assignable_v<BetterDerived<>>); // better!
};

struct INHERIT_SUPER_EXPLICIT_COPY_CONSTRUCT {
	struct SuperExplicitCopyable {
		SuperExplicitCopyable(const SuperExplicitCopyable &) = delete;
		SuperExplicitCopyable(SuperExplicitCopyable &&) = delete;
		template <class Other>
		  requires(std::is_same_v<Other, SuperExplicitCopyable>)
		SuperExplicitCopyable(const Other &&){};
	};
	static_assert(std::is_trivially_copyable_v<SuperExplicitCopyable>);
	static_assert(!std::is_copy_constructible_v<SuperExplicitCopyable>);
	static_assert(!std::is_move_constructible_v<SuperExplicitCopyable>);
	static_assert(std::is_constructible_v<SuperExplicitCopyable, const SuperExplicitCopyable>);

	template <class = void> struct Derived : SuperExplicitCopyable {
		using Base = SuperExplicitCopyable;
		INHERIT(Derived);
	};
	static_assert(std::is_trivially_copyable_v<Derived<>>);
	static_assert(!std::is_copy_constructible_v<Derived<>>);
	static_assert(!std::is_move_constructible_v<Derived<>>);
	static_assert(std::is_constructible_v<Derived<>, const Derived<>>);
};

struct INHERIT_SUPER_EXPLICIT_COPY_ASSIGN {
	struct SuperExplicitCopyAssignable {
		SuperExplicitCopyAssignable &operator=(const SuperExplicitCopyAssignable &) = delete;
		SuperExplicitCopyAssignable &operator=(SuperExplicitCopyAssignable &&) = delete;
		template <class Other>
		  requires(std::is_same_v<Other, SuperExplicitCopyAssignable>)
		SuperExplicitCopyAssignable &operator=(const Other &&) {
			return *this;
		};
	};
	static_assert(std::is_trivially_copyable_v<SuperExplicitCopyAssignable>);
	static_assert(!std::is_copy_assignable_v<SuperExplicitCopyAssignable>);
	static_assert(!std::is_move_assignable_v<SuperExplicitCopyAssignable>);
	static_assert(
	  std::is_assignable_v<SuperExplicitCopyAssignable &, const SuperExplicitCopyAssignable &&>);

	template <class = void> struct Derived : SuperExplicitCopyAssignable {
		using Base = SuperExplicitCopyAssignable;
		INHERIT(Derived);
	};
	static_assert(std::is_trivially_copyable_v<Derived<>>);
	static_assert(!std::is_copy_assignable_v<Derived<>>);
	static_assert(!std::is_move_assignable_v<Derived<>>);
	static_assert(std::is_assignable_v<Derived<> &, const Derived<> &&>);
};

struct INHERIT_COPY_ASSIGN {
	struct Assignable {
		Assignable() = default;
		Assignable(const Assignable &) = delete;
		Assignable &operator=(const Assignable &) { return *this; }
	};
	static_assert(std::is_copy_assignable_v<Assignable>);
	static_assert(!std::is_constructible_v<Assignable, const Assignable &&>);

	template <class = void> struct Derived : Assignable {
		using Base = Assignable;
		INHERIT(Derived);
	};
	static_assert(std::is_copy_assignable_v<Derived<>>);
};

struct INHERIT_MOVE_ASSIGN {
	struct Assignable {
		Assignable() = default;
		Assignable(Assignable &&) = delete;
		Assignable &operator=(Assignable &&) { return *this; }
	};
	static_assert(std::is_move_assignable_v<Assignable>);
	static_assert(!std::is_constructible_v<Assignable, const Assignable &&>);

	template <class = void> struct Derived : Assignable {
		using Base = Assignable;
		INHERIT(Derived);
	};
	static_assert(std::is_move_assignable_v<Derived<>>);
};

struct DELETED_MOVE_CONSTRUCT {
	struct Base {
		Base() = default;
		Base(const Base &) = default;
		Base(Base &&) = delete;
	};
	static_assert(std::is_copy_constructible_v<Base>);
	static_assert(!std::is_move_constructible_v<Base>);

	template <class = void> struct Derived : Base {
		INHERIT(Derived);
	};
	static_assert(std::is_copy_constructible_v<Derived<>>);
	static_assert(!std::is_move_constructible_v<Derived<>>);
};

struct DELETED_MOVE_ASSIGN {
	struct Base {
		Base() = default;
		Base &operator=(const Base &) = default;
		Base &operator=(Base &&) = delete;
	};
	static_assert(std::is_copy_assignable_v<Base>);
	static_assert(!std::is_move_assignable_v<Base>);

	template <class = void> struct Derived : Base {
		INHERIT(Derived);
	};
	static_assert(std::is_copy_assignable_v<Derived<>>);
	static_assert(!std::is_move_assignable_v<Derived<>>);
};

struct ONLY_COPY_CONSTRUCT {
	struct Base {
		Base() = default;
		Base(const Base &) {}
	};
	static_assert(std::is_copy_constructible_v<Base>);
	static_assert(
	  std::is_move_constructible_v<Base>); // Standard C++ behavior: move falls back to copy

	template <class = void> struct Derived : Base {
		INHERIT(Derived);
	};
	static_assert(std::is_copy_constructible_v<Derived<>>);
	static_assert(std::is_move_constructible_v<Derived<>>); // Derived mirrors this fallback
};

struct ONLY_COPY_ASSIGN {
	struct Base {
		Base() = default;
		Base &operator=(const Base &) { return *this; }
	};
	static_assert(std::is_copy_assignable_v<Base>);
	static_assert(std::is_move_assignable_v<Base>); // Standard C++ behavior: move falls back to copy

	template <class = void> struct Derived : Base {
		INHERIT(Derived);
	};
	static_assert(std::is_copy_assignable_v<Derived<>>);
	static_assert(std::is_move_assignable_v<Derived<>>); // Derived mirrors this fallback
};

struct PROTECTED_CONSTRUCT_COPY {
	struct Base {
		Base() = default;

	protected:
		Base(const Base &) = default;
	};
	static_assert(!std::is_copy_constructible_v<Base>);

	template <class = void> struct Derived : Base {
		INHERIT(Derived);
	};
	static_assert(!std::is_copy_constructible_v<Derived<>>); // Proves it's not public

	// Proves it's protected (accessible to subclasses) and not deleted
	struct Tester : Derived<> {
		Tester() = default;
		Tester(const Tester &other) : Derived<>(other) {}
	};
	static_assert(std::is_copy_constructible_v<Tester>);
};

struct PROTECTED_CONSTRUCT_MOVE {
	struct Base {
		Base() = default;
		Base(const Base &) = default;

	protected:
		Base(Base &&) = default;
	};
	static_assert(std::is_copy_constructible_v<Base>);
	static_assert(!std::is_move_constructible_v<Base>);

	template <class = void> struct Derived : Base {
		INHERIT(Derived);
	};
	static_assert(std::is_copy_constructible_v<Derived<>>);
	static_assert(!std::is_move_constructible_v<Derived<>>); // Proves move is not public

	// Proves protected move works and didn't fall back to copy
	struct Tester : Derived<> {
		Tester() = default;
		Tester(const Tester &) = default;
		Tester(Tester &&other) : Derived<>(std::move(other)) {}
	};
	static_assert(std::is_move_constructible_v<Tester>);
};

struct PROTECTED_ASSIGN_COPY {
	struct Base {
		Base() = default;

	protected:
		Base &operator=(const Base &) = default;
	};
	static_assert(!std::is_copy_assignable_v<Base>);

	template <class = void> struct Derived : Base {
		INHERIT(Derived);
	};
	static_assert(!std::is_copy_assignable_v<Derived<>>); // Proves it's not public

	// Proves it's protected and not deleted
	struct Tester : Derived<> {
		Tester &operator=(const Tester &other) {
			Derived<>::operator=(other);
			return *this;
		}
	};
	static_assert(std::is_copy_assignable_v<Tester>);
};

struct PROTECTED_ASSIGN_MOVE {
	struct Base {
		Base() = default;
		Base &operator=(const Base &) = default;

	protected:
		Base &operator=(Base &&) = default;
	};
	static_assert(std::is_copy_assignable_v<Base>);
	static_assert(!std::is_move_assignable_v<Base>);

	template <class = void> struct Derived : Base {
		INHERIT(Derived);
	};
	static_assert(std::is_copy_assignable_v<Derived<>>);
	static_assert(!std::is_move_assignable_v<Derived<>>); // Proves move is not public

	// Proves protected move works
	struct Tester : Derived<> {
		Tester &operator=(Tester &&other) {
			Derived<>::operator=(std::move(other));
			return *this;
		}
	};
	static_assert(std::is_move_assignable_v<Tester>);
};

struct STORAGE_TRIVIALITY_BUG_TEST {
	struct Item {};

	template <class T> struct Impl {
		Impl() = default;

	protected:
		Impl(const Impl &) = delete;
		Impl(Impl &&) = default;
		Impl &operator=(const Impl &) = delete;
		Impl &operator=(Impl &&) = delete;
	};

	template <class T> struct Custom : Impl<T> {
		using Base = Impl<T>;
		using Self = Custom;
		VOLTISO_INHERIT_ASSIGN_COPY(Custom)
		VOLTISO_INHERIT_ASSIGN_MOVE(Custom)
	};

	template <class T> struct Storage : Custom<T> {
		using Base = Custom<T>;
		using Self = Storage;
		VOLTISO_INHERIT_ASSIGN_COPY(Storage)
		VOLTISO_INHERIT_ASSIGN_MOVE(Storage)
	};

	static_assert(std::is_trivially_copyable_v<Impl<Item>>);
	static_assert(std::is_trivially_copyable_v<Custom<Item>>);
	static_assert(std::is_trivially_copyable_v<Storage<Item>>);
};

struct TENSOR_TRIVIALITY_BUG_TEST {
	struct CustomNNR {
		CustomNNR() = default;
		CustomNNR(const CustomNNR &) = default;
		CustomNNR &operator=(const CustomNNR &) = default;
		CustomNNR(CustomNNR &&) = delete;
		CustomNNR &operator=(CustomNNR &&) = delete;
	};

	template <class = void> struct Custom : CustomNNR {
		using Base = CustomNNR;
		using Self = Custom;
		VOLTISO_INHERIT_ASSIGN_COPY(Custom)
		VOLTISO_INHERIT_ASSIGN_MOVE(Custom)
	};

	template <class = void> struct Tensor : Custom<> {
		using Base = Custom<>;
		using Self = Tensor;
		VOLTISO_INHERIT_ASSIGN_COPY(Tensor)
		VOLTISO_INHERIT_ASSIGN_MOVE(Tensor)
	};

	static_assert(std::is_trivially_copyable_v<CustomNNR>);
	static_assert(std::is_trivially_copyable_v<Custom<>>);
	static_assert(std::is_trivially_copyable_v<Tensor<>>);
};

#include <v/OFF>
