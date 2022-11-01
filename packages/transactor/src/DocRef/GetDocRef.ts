// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AnyDoc } from '~/DocTypes'

import type { CustomDocRef } from './CustomDocRef'
import type { DocRef } from './DocRef'
import type { StrongDocRef, StrongDocRef } from './StrongDocRef'
import type { CustomWeakDocRef, WeakDocRef } from './WeakDocRef'

// type A = GetDocRef<{ doc: IndexedDoc; onlyStaticallyKnownFields: true }>

export type GetDocRef<O extends Partial<DocRef.Options>> = GetDocRef.Get<O>

export namespace GetDocRef {
	export type Get<O extends Partial<DocRef.Options>> =
		AnyDoc extends DocRef.Options.Get<O>['doc']
			? boolean extends DocRef.Options.Get<O>['isStrong']
				? DocRef
				: DocRef.Options.Get<O>['isStrong'] extends true
				? StrongDocRef
				: DocRef.Options.Get<O>['isStrong'] extends false
				? WeakDocRef
				: never
			: boolean extends DocRef.Options.Get<O>['isStrong']
			? CustomDocRef<{ doc: DocRef.Options.Get<O>['doc'] }>
			: DocRef.Options.Get<O>['isStrong'] extends true
			? StrongDocRef<{ doc: DocRef.Options.Get<O>['doc'] }>
			: DocRef.Options.Get<O>['isStrong'] extends false
			? CustomWeakDocRef<{ doc: DocRef.Options.Get<O>['doc'] }>
			: never
}
