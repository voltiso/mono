#pragma once

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_USING(Self)                                                                \
public:                                                                                            \
	using Base::Base;                                                                                \
	using Base::operator=;                                                                           \
                                                                                                   \
private:

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_CONSTRUCT_COPY(Self)                                                       \
protected:                                                                                         \
	constexpr Self(const Self &) = default;                                                          \
                                                                                                   \
public:                                                                                            \
	explicit(!std::is_convertible_v<const Base &, Base>) constexpr Self(const Self &)                \
	  requires(std::is_copy_constructible_v<Base>)                                                   \
	= default;                                                                                       \
                                                                                                   \
	template <class Dummy = void> constexpr Self(const Self &) = delete;                             \
                                                                                                   \
private:

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_CONSTRUCT_MOVE(Self)                                                       \
protected:                                                                                         \
	constexpr Self(Self &&) = default;                                                               \
                                                                                                   \
public:                                                                                            \
	explicit(!std::is_convertible_v<Base &&, Base>) constexpr Self(Self &&)                          \
	  requires(std::is_move_constructible_v<Base>)                                                   \
	= default;                                                                                       \
                                                                                                   \
	template <class Dummy = void> constexpr Self(Self &&) = delete;                                  \
                                                                                                   \
private:

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_CONSTRUCT_COPY_RVALUE(Self)                                                \
public:                                                                                            \
	/* `const Self&& other` separate noexcept overloads, because noexcept(bool) fails (clang-22) */  \
	template <class Src>                                                                             \
	  requires(                                                                                      \
	    std::is_same_v<Src, const Self> && std::is_constructible_v<Base, const Base &&> &&           \
	    std::is_nothrow_constructible_v<Base, const Base &&>)                                        \
	explicit(!std::is_convertible_v<const Base &&, Base>) constexpr Self(Src &&src) noexcept         \
	    : Base(                                                                                      \
	        static_cast<std::conditional_t<std::is_same_v<Src, Src>, const Base &&, void>>(src)) {}  \
                                                                                                   \
	template <class Src>                                                                             \
	  requires(                                                                                      \
	    std::is_same_v<Src, const Self> && std::is_constructible_v<Base, const Base &&> &&           \
	    !std::is_nothrow_constructible_v<Base, const Base &&>)                                       \
	explicit(!std::is_convertible_v<const Base &&, Base>) constexpr Self(Src &&src)                  \
	    : Base(                                                                                      \
	        static_cast<std::conditional_t<std::is_same_v<Src, Src>, const Base &&, void>>(src)) {}  \
                                                                                                   \
private:

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_CONSTRUCT(Self)                                                            \
	VOLTISO_INHERIT_CONSTRUCT_COPY(Self)                                                             \
	VOLTISO_INHERIT_CONSTRUCT_MOVE(Self)                                                             \
	VOLTISO_INHERIT_CONSTRUCT_COPY_RVALUE(Self)

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_ASSIGN_COPY(Self)                                                          \
private:                                                                                           \
	struct _VoltisoCopyAssignExposer : Base {                                                        \
		_VoltisoCopyAssignExposer &operator=(const _VoltisoCopyAssignExposer &) = default;             \
		_VoltisoCopyAssignExposer &operator=(_VoltisoCopyAssignExposer &&) = delete;                   \
	};                                                                                               \
                                                                                                   \
public:                                                                                            \
	constexpr Self &operator=(const Self &)                                                          \
	  requires(std::is_copy_assignable_v<Base>)                                                      \
	= default;                                                                                       \
                                                                                                   \
protected:                                                                                         \
	constexpr Self &operator=(const Self &)                                                          \
	  requires(!std::is_copy_assignable_v<Base> &&                                                   \
	           std::is_copy_assignable_v<_VoltisoCopyAssignExposer>)                                 \
	= default;                                                                                       \
                                                                                                   \
public:                                                                                            \
	constexpr Self &operator=(const Self &)                                                          \
	  requires(!std::is_copy_assignable_v<_VoltisoCopyAssignExposer>)                                \
	= delete;                                                                                        \
                                                                                                   \
private:

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_ASSIGN_MOVE(Self)                                                          \
private:                                                                                           \
	struct _VoltisoMoveAssignExposer : Base {                                                        \
		_VoltisoMoveAssignExposer &operator=(const _VoltisoMoveAssignExposer &) = delete;              \
		_VoltisoMoveAssignExposer &operator=(_VoltisoMoveAssignExposer &&) = default;                  \
	};                                                                                               \
                                                                                                   \
public:                                                                                            \
	constexpr Self &operator=(Self &&)                                                               \
	  requires(std::is_move_assignable_v<Base>)                                                      \
	= default;                                                                                       \
                                                                                                   \
protected:                                                                                         \
	constexpr Self &operator=(Self &&)                                                               \
	  requires(!std::is_move_assignable_v<Base> &&                                                   \
	           std::is_move_assignable_v<_VoltisoMoveAssignExposer>)                                 \
	= default;                                                                                       \
                                                                                                   \
public:                                                                                            \
	constexpr Self &operator=(Self &&)                                                               \
	  requires(!std::is_move_assignable_v<_VoltisoMoveAssignExposer>)                                \
	= delete;                                                                                        \
                                                                                                   \
private:

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_ASSIGN_COPY_RVALUE(Self)                                                   \
public:                                                                                            \
	template <class Src>                                                                             \
	  requires(                                                                                      \
	    std::is_same_v<Src, const Self> && std::is_assignable_v<Base &, const Base &&> &&            \
	    !std::is_assignable_v<Base &, const Src &&> &&                                               \
	    std::is_nothrow_assignable_v<Base &, const Base &&>)                                         \
	constexpr Self &operator=(Src &&src) noexcept {                                                  \
		static_cast<std::conditional_t<std::is_same_v<Src, Src>, Base &, void>>(*this) =               \
		  static_cast<std::conditional_t<std::is_same_v<Src, Src>, const Base &&, void>>(src);         \
		return *this;                                                                                  \
	}                                                                                                \
                                                                                                   \
	template <class Src>                                                                             \
	  requires(                                                                                      \
	    std::is_same_v<Src, const Self> && std::is_assignable_v<Base &, const Base &&> &&            \
	    !std::is_assignable_v<Base &, const Src &&> &&                                               \
	    !std::is_nothrow_assignable_v<Base &, const Base &&>)                                        \
	constexpr Self &operator=(Src &&src) {                                                           \
		static_cast<std::conditional_t<std::is_same_v<Src, Src>, Base &, void>>(*this) =               \
		  static_cast<std::conditional_t<std::is_same_v<Src, Src>, const Base &&, void>>(src);         \
		return *this;                                                                                  \
	}                                                                                                \
                                                                                                   \
private:

// -------------------------------------------------------------------------------------------------

#define VOLTISO_INHERIT_ASSIGN(Self)                                                               \
	VOLTISO_INHERIT_ASSIGN_COPY(Self)                                                                \
	VOLTISO_INHERIT_ASSIGN_MOVE(Self)                                                                \
	VOLTISO_INHERIT_ASSIGN_COPY_RVALUE(Self)

// -------------------------------------------------------------------------------------------------

// ⚠️ Requires `Base` typedef in scope.
// - We want it trivially copyable
#define VOLTISO_INHERIT(Self)                                                                      \
	VOLTISO_INHERIT_USING(Self)                                                                      \
	VOLTISO_INHERIT_CONSTRUCT(Self)                                                                  \
	VOLTISO_INHERIT_ASSIGN(Self)

// -------------------------------------------------------------------------------------------------
