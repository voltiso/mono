// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, it } from 'vitest'

import type {
	$$DocRef,
	Doc,
	DocRef,
	GetDocTI,
	IDoc,
	IndexedDocTI,
	WeakDocRef,
} from '~'

describe('WeakDocRef', () => {
	it('generic', () => {
		$Assert.is<{ a: 1 }, { [k: string]: unknown; readonly id?: never }>()

		$Assert.is<DocRef, WeakDocRef>()

		$Assert.is<DocRef<'zebra'>, $$DocRef>()

		// $Assert.is<
		// 	DocRef<'zebra'>,
		// 	CustomDocRef<{
		// 		doc: ANY_DOC
		// 	}>
		// >()

		type ZebraTI = GetDocTI<'zebra'>

		$Assert.is<Doc<ZebraTI>, IDoc>()
		$Assert.is<Doc<ZebraTI>, Doc>()

		$Assert.is<ZebraTI, IndexedDocTI>()

		// $Assert.is<Doc<ZebraTI>, IndexedDoc>()

		// type Opts = CustomDocRef.Options.Get<{}>

		// $Assert.is<DocRef<'zebra'>, _CustomDocRef<Opts>>()

		// $Assert.is<DocRef<'zebra'>, CustomDocRef.Base<{ doc: ANY_DOC }>>()
		// $Assert.is<DocRef<'zebra'>, CustomDocRef.Get<{ doc: 'zebra' }>>()
		// $Assert.is<DocRef<'zebra'>, CustomDocRef<{ doc: 'zebra' }>>()

		// $Assert.is<WeakDocRef<'zebra'>, WeakDocRef>() // ! too deep
		// $Assert.is<DocRef<'zebra'>, DocRef>() // ! too deep

		// $Assert.is<DocRef<'zebra'>, WeakDocRef>() // ! too deep

		// type A = WeakDocRef<'zebra'>['schemaWithId']
	})
})

// type A = SimpleSchema<{
// 	__voltiso: GetVoltisoEntry<'zebra'>
// }>

// type B = SimpleSchema<{
// 	[k: string]: unknown
// 	readonly id?: never
// 	__voltiso: VoltisoEntry
// }>

// $Assert.is<A, B>()

// $Assert.is<GetVoltisoEntry<'zebra'>, VoltisoEntry>()
// $Assert.is<SimpleSchema<GetVoltisoEntry<'zebra'>>, SimpleSchema<VoltisoEntry>>()

// $Assert.is<
// 	{
// 		aggregateTarget: { testAgg: { value: number; numSources: number } }
// 		numRefs: number
// 		aggregateSource: Record<string, Record<string, true>>
// 		migrations: never
// 		migratedAt: Date
// 		numMigrations: number
// 		createdAt: Date
// 		updatedAt: Date
// 	},
// 	VoltisoEntry
// >()

// type A = DocRef['data']

// type B = GetData<ANY_DOC>

// type A = {
// 	a: 1
// }

// type B = { [k: string]: unknown }

// $Assert.is<A, B>()

// type Test<T> = { t: T }

// $Assert.is<Test<A>, Test<B>>()

// type Test2<T> = {
// 	fun(): T
// }

// $Assert.is<Test2<A>, Test2<B>>()

// interface Test3<T> {
// 	t: T
// }

// $Assert.is<Test3<A>, Test3<B>>()

// interface Test4<T> {
// 	fun(): T
// }

// $Assert.is<Test4<A>, Test4<B>>()
