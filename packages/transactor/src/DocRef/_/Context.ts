// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithDb } from '~/Db'
import type { $$DocRelated } from '~/Doc'
import type { WithDocRef } from '~/DocRef'
import type { AnyDocTag } from '~/DocTypes'
import type { WithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import type { Forbidden } from '~/util'

export type DocRefContext<D extends $$DocRelated = AnyDocTag> =
	DocRefContext.Base & WithDocRef<D>

export namespace DocRefContext {
	export type Base = WithTransactor & Partial<WithTransaction> & WithDb

	export type Parent = Base & Forbidden<WithDocRef>

	// // eslint-disable-next-line etc/no-misused-generics
	// $dev(<D extends $$Doc>() => {
	// 	$Assert.is<WithDocRef<D>, DocRefContext>()
	// 	$Assert.is<DocRefContext<D>, DocRefContext>()
	// })

	//

	export type ContextWithTransaction<D extends $$DocRelated = AnyDocTag> =
		WithTransactor & WithTransaction & WithDocRef<D> & WithDb
}
