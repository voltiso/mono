// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomDocRef, DocRef$, WeakDocRef$ } from '~'

export type GetDocRef$<O extends Partial<CustomDocRef.Options>> =
	GetDocRef$.Get<CustomDocRef.Options.Get<O>>

export namespace GetDocRef$ {
	export type Get<O extends CustomDocRef.Options> = O['isStrong'] extends true
		? DocRef$<O['doc']>
		: WeakDocRef$<O['doc']>
}
