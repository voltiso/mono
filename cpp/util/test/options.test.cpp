#include "v/options"
#include "v/option"

using namespace VOLTISO_NAMESPACE;

// ============================================================================
// GetOptions (canonical Options<> from any option pack)
// ============================================================================

struct TEST_GetOptions {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	using Default = Options<TypeOpt<int>, ValueOpt<7>>;
	using Meta = options::option::defaultOptions<Default>;
	static_assert(
	  std::is_same_v<GetOptions<Meta, TypeOpt<int>, ValueOpt<3>>, Options<ValueOpt<3>, Meta>>);
	static_assert(std::is_same_v<GetOptions<TypeOpt<int>>, Options<TypeOpt<int>>>);
};

// ============================================================================
// Get (type) + get-or fallback
// ============================================================================

struct TEST_OptionsGet_TypeWithFallback {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <class T> struct MissingTypeOpt : Option::Type<T> {};

	using O = Options<TypeOpt<int>>;
	static_assert(std::is_same_v<O::template Get<TypeOpt>, int>);
	static_assert(std::is_same_v<O::template Get<MissingTypeOpt, double>, double>);

	// using A = O::template Get<MissingTypeOpt>; // ! should fail with nice error
};

// ============================================================================
// get (value)
// ============================================================================

struct TEST_OptionsGet_ValueGet {
	template <auto V> struct ValueOpt : Option::Value<V> {};

	using O = Options<ValueOpt<3>, ValueOpt<5>>;
	static_assert(O::template get<ValueOpt> == 3);
};

// ============================================================================
// GetTemplate (template option)
// ============================================================================

struct TEST_OptionsGetTemplate_FindsFirstAndInstantiates {
	template <template <class...> class Impl> struct TemplateOpt : Option::Template<Impl> {};

	template <class... Args> struct ImplG {
		static constexpr int ID = 7;
	};
	template <class... Args> struct ImplH {
		static constexpr int ID = 8;
	};

	using O = Options<TemplateOpt<ImplG>, TemplateOpt<ImplH>>;
	using Res = O::template GetTemplate<TemplateOpt, int, double>;
	static_assert(std::is_same_v<Res, ImplG<int, double>>);
	static_assert(Res::ID == 7);
};

// ============================================================================
// With / WithIfMissing (kind-based updates, no sorting)
// ============================================================================

struct TEST_OptionsWith_OverrideExistingKind {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	using In = Options<TypeOpt<int>, ValueOpt<0>>;
	using Out = In::template With<TypeOpt<double>>;

	using Expected = Options<ValueOpt<0>, TypeOpt<double>>;
	static_assert(std::is_same_v<Out, Expected>);
};

struct TEST_OptionsWithIfMissing_InsertIfMissingOnly {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	// Both kinds exist -> no change
	using In = Options<TypeOpt<int>, ValueOpt<0>>;
	using Out = In::template WithIfMissing<TypeOpt<double>, ValueOpt<1>>;
	static_assert(std::is_same_v<Out, In>);

	// TypeOpt missing -> appended
	using In2 = Options<ValueOpt<0>>;
	using Out2 = In2::template WithIfMissing<TypeOpt<int>>;
	using Expected2 = Options<ValueOpt<0>, TypeOpt<int>>;
	static_assert(std::is_same_v<Out2, Expected2>);
};

// ============================================================================
// WithoutKind (remove by option class template)
// ============================================================================

struct TEST_OptionsWithoutKind_RemovesMatchingKind {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	using In = Options<TypeOpt<int>, ValueOpt<0>>;
	using Out = In::template WithoutKind<TypeOpt>;
	using Expected = Options<ValueOpt<0>>;
	static_assert(std::is_same_v<Out, Expected>);

	// kind absent -> unchanged
	using In2 = Options<ValueOpt<1>>;
	using Out2 = In2::template WithoutKind<TypeOpt>;
	static_assert(std::is_same_v<Out2, In2>);

	// only matching kind -> empty
	using In3 = Options<TypeOpt<long>>;
	using Out3 = In3::template WithoutKind<TypeOpt>;
	static_assert(std::is_same_v<Out3, Options<>>);
};

// ============================================================================
// Without (remove by Option::Tag)
// ============================================================================

struct TEST_OptionsWithout_RemovesByOptionTag {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	struct SomeTag : Option::Tag {};
	template <class T> struct TaggedOpt : Option::Type<T, SomeTag> {};

	using In = Options<TaggedOpt<int>, ValueOpt<0>>;
	using Out = In::template Without<SomeTag>;
	static_assert(std::is_same_v<Out, Options<ValueOpt<0>>>);

	using Default = Options<TypeOpt<int>, ValueOpt<7>>;
	using Meta = options::option::defaultOptions<Default>;
	using In2 = GetOptions<Meta, ValueOpt<1>>;
	using Out2 = In2::template Without<options::option::DefaultOptions>;
	static_assert(std::is_same_v<Out2, Options<ValueOpt<1>>>);
};

// ============================================================================
// Get / get / GetTemplate through options::option::defaultOptions<>
// ============================================================================

struct TEST_OptionsGet_SearchesDefaultOptionsMeta {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	using DefaultPack = Options<TypeOpt<int>, ValueOpt<7>>;

	using O = GetOptions<options::option::defaultOptions<DefaultPack>, ValueOpt<3>>;
	static_assert(std::is_same_v<O::template Get<TypeOpt>, int>);
	static_assert(O::template get<ValueOpt> == 3);

	using O2 = GetOptions<options::option::defaultOptions<DefaultPack>, TypeOpt<long>, ValueOpt<3>>;
	static_assert(std::is_same_v<O2::template Get<TypeOpt>, long>);
	static_assert(O2::template get<ValueOpt> == 3);
};

struct TEST_OptionsGetTemplate_ThroughDefaultOptionsMeta {
	template <template <class...> class Impl> struct TemplateOpt : Option::Template<Impl> {};
	template <class... Args> struct ImplA {
		static constexpr int ID = 1;
	};

	using DefaultPack = Options<TemplateOpt<ImplA>>;

	using O = GetOptions<options::option::defaultOptions<DefaultPack>>;
	using Res = O::template GetTemplate<TemplateOpt, char>;
	static_assert(std::is_same_v<Res, ImplA<char>>);
	static_assert(Res::ID == 1);
};

// ============================================================================
// With / WithIfMissing canonicalize when `options::option::defaultOptions<>` is in the pack
// ============================================================================

struct TEST_OptionsWith_CanonicalizesWhenDefaultsMetaPresent {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};
	template <auto V> struct UnknownValueOpt : Option::Value<V> {};

	using Default = Options<TypeOpt<int>, ValueOpt<7>>;
	using Meta = options::option::defaultOptions<Default>;

	using Good = GetOptions<Meta, TypeOpt<int>, ValueOpt<7>>;
	static_assert(std::is_same_v<typename Good::With<>, Options<Meta>>);

	// ! unknown kind vs inner defaults
	// using A = GetOptions<Meta, TypeOpt<long>, UnknownValueOpt<1>>;
};

struct TEST_OptionsWith_StripsEntriesEqualToDefaults {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	using Default = Options<TypeOpt<int>, ValueOpt<7>>;
	using Meta = options::option::defaultOptions<Default>;

	using Current = GetOptions<Meta, TypeOpt<int>, ValueOpt<3>>;
	using Res = typename Current::With<>;
	using Expected = Options<ValueOpt<3>, Meta>;
	static_assert(std::is_same_v<Res, Expected>);

	using Current2 = GetOptions<Meta, TypeOpt<int>, ValueOpt<7>>;
	using Res2 = typename Current2::With<>;
	static_assert(std::is_same_v<Res2, Options<Meta>>);
};

struct TEST_OptionsWith_PicksThroughDefaultOptionsMeta {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	using Default = Options<TypeOpt<int>, ValueOpt<7>>;
	using Meta = options::option::defaultOptions<Default>;

	using Current = GetOptions<Meta, ValueOpt<3>>;
	using Res = typename Current::With<>;
	using Expected = Options<ValueOpt<3>, Meta>;
	static_assert(std::is_same_v<Res, Expected>);
};

struct TEST_OptionsWith_NoCanonicalizationWithoutDefaultsMeta {
	template <class T> struct TypeOpt : Option::Type<T> {};

	using O = Options<TypeOpt<int>>;
	static_assert(std::is_same_v<typename O::With<>, O>);
};

// ============================================================================
// Canonical: `options::option::defaultOptions<>` meta is last in the pack
// ============================================================================

struct TEST_OptionsCanonical_MetaIsLast {
	template <class T> struct TypeOpt : Option::Type<T> {};
	template <auto V> struct ValueOpt : Option::Value<V> {};

	using Default = Options<TypeOpt<int>, ValueOpt<7>>;
	using Meta = options::option::defaultOptions<Default>;

	// User may spell meta first; `GetOptions` canonicalizes with meta last.
	static_assert(std::is_same_v<GetOptions<Meta, ValueOpt<3>>, Options<ValueOpt<3>, Meta>>);
};

// ============================================================================
// Option::Value: Tuple
// ============================================================================

struct TEST_Options_Tuple {
	template <auto... vs> struct TupleOpt : Option::Value<std::array{vs...}> {};
	using O = Options<TupleOpt<1, 2, 3>>;
	static constexpr auto a = O::template get<TupleOpt>;
	static_assert(a == std::array{1, 2, 3});
};

// ============================================================================
// Option::Type: get by tag
// ============================================================================

// namespace option {
// struct Array {};
// template <class I, auto n> struct array : Option::Type<std::array<I, n>, Array> {};
// } // namespace option

// struct TEST_Options_MixedTypeValueTemplateParameters {
// 	using O = Options<option::array<int, 3>>;
// 	static_assert(std::is_same_v<O::GetByTag<option::Array>, std::array<int, 3>>);
// };
