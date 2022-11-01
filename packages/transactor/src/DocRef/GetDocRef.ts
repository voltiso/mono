// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AnyDocTag } from '~/DocTypes'

import type { CustomDocRef } from './CustomDocRef'
import type { DocRef } from './DocRef'
import type { StrongDocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

export type GetDocRef<O extends Partial<DocRef.Options>> = GetDocRef.Get<O>

export namespace GetDocRef {
	export type Get<O extends Partial<DocRef.Options>> =
		AnyDocTag extends DocRef.Options.Get<O>['doc']
			? boolean extends DocRef.Options.Get<O>['isStrong']
				? DocRef
				: DocRef.Options.Get<O>['isStrong'] extends true
				? StrongDocRef
				: DocRef.Options.Get<O>['isStrong'] extends false
				? WeakDocRef
				: never
			: boolean extends DocRef.Options.Get<O>['isStrong']
			? CustomDocRef<{ doc: DocRef.Options.Get<O>['doc'] }>
			: CustomDocRef<{
					doc: DocRef.Options.Get<O>['doc']
					isStrong: DocRef.Options.Get<O>['isStrong']
			  }>
}
