// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import { $Assert, $dev, lazyConstructor } from '@voltiso/util'

import type { WithTransaction } from '~/Transaction'

import type { WithDocRef } from '../DocRef/WithDocRef'
import { _DocFieldPath } from './_DocFieldPath'

//

/** @throws When either Doc or path does not exist */
export type DocFieldPath<data = unknown> = _<PromiseLike<data>> & // ! convert `PromiseLike` to a type reference (assignability with for index signatures)
	(data extends object
		? {
				[k in keyof data]:
					| DocFieldPath<data[k]>
					| ('then' extends k ? PromiseLike<data>['then'] : never) // ! fix assignability for `D` with index signatures
		  }
		: unknown)

$dev(() => {
	$Assert.is<DocFieldPath<{ a: 1 }>, DocFieldPath>()
	$Assert.is<DocFieldPath<{ a: 1 }>, DocFieldPath<{ [k: keyof any]: number }>>()
})

//

//

export interface DocFieldPathConstructor {
	new <data>(ctx: DocFieldPath.Context, path: string[]): DocFieldPath<data>
}

// eslint-disable-next-line import/export
export const DocFieldPath = lazyConstructor(
	// eslint-disable-next-line etc/no-internal
	() => _DocFieldPath,
) as unknown as DocFieldPathConstructor

//

//

// eslint-disable-next-line import/export
export namespace DocFieldPath {
	export type Context = WithDocRef & Partial<WithTransaction>
}
