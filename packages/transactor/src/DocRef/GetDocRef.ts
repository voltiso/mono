// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomDocRef } from './CustomDocRef'
import type { DocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

export type GetDocRef<O extends Partial<CustomDocRef.Options>> = GetDocRef.Get<O>

export namespace GetDocRef {
	export type Get<O extends Partial<DocRef.Options>> =
		CustomDocRef.Options.Get<O>['isStrong'] extends true
			? DocRef<CustomDocRef.Options.Get<O>['doc']>
			: WeakDocRef<CustomDocRef.Options.Get<O>['doc']>

}
