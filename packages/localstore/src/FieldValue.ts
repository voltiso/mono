// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { staticImplements } from '@voltiso/util'

@staticImplements<Database.TypeofFieldValue>()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore experimental decorators
export class FieldValue implements Database.FieldValue {
	static delete() {
		return new DeleteIt()
	}

	static increment(n: number) {
		return new IncrementIt(n)
	}
}

export class IncrementIt extends FieldValue {
	_n: number
	constructor(n: number) {
		super()
		this._n = n
	}
}

export class DeleteIt extends FieldValue {}