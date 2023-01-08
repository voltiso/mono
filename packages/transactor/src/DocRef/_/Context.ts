// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '~/Db'
import type { WithDocRef } from '~/DocRef'
import type { $$DocRelatedLike } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'
import type { WithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import type { Forbidden } from '~/util'

export interface DocRefContext<D extends $$DocRelatedLike = AnyDoc>
	extends DocRefContext.Base,
		WithDocRef<D> {}

export namespace DocRefContext {
	export type Base = WithTransactor & Partial<WithTransaction> & WithDb

	export type Parent = Base & Forbidden<WithDocRef>

	// // eslint-disable-next-line etc/no-misused-generics
	// $dev(<D extends $$Doc>() => {
	// 	$Assert.is<WithDocRef<D>, DocRefContext>()
	// 	$Assert.is<DocRefContext<D>, DocRefContext>()
	// })

	//

	export type ContextWithTransaction<D extends $$DocRelatedLike = AnyDoc> =
		WithTransactor & WithTransaction & WithDocRef<D> & WithDb
}
