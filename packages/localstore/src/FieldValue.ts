// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import type * as Database from '@voltiso/firestore-like'
import { staticImplements } from '@voltiso/util'

@staticImplements<Database.TypeofFieldValue>()
export class FieldValue implements Database.FieldValue {
	static delete(): DeleteIt {
		return new DeleteIt()
	}

	static increment(n: number): IncrementIt {
		return new IncrementIt(n)
	}

	static arrayUnion(...items: unknown[]): ArrayUnion {
		return new ArrayUnion(...items)
	}

	static arrayRemove(...items: unknown[]): ArrayRemove {
		return new ArrayRemove(...items)
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

//

export class ArrayUnion extends FieldValue {
	_items: unknown[]

	constructor(...items: unknown[]) {
		super()
		this._items = items
	}
}

export class ArrayRemove extends FieldValue {
	_items: unknown[]

	constructor(...items: unknown[]) {
		super()
		this._items = items
	}
}
