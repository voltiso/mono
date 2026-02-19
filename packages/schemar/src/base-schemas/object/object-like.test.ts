// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Output, SchemaLike } from '~'

describe('object', () => {
	it('object-like', () => {
		type A = {
			a: SchemaLike<string>
		}

		type AA = Output<A>
		$Assert<IsIdentical<AA, { a: string }>>()

		//

		type B = {
			a: SchemaLike<string> & { isReadonly: true }
		}

		type BB = Output<B>
		$Assert<IsIdentical<BB, { readonly a: string }>>()

		//

		type C = {
			a: SchemaLike<string> & { isOptional: true }
		}

		type CC = Output<C>
		$Assert<IsIdentical<CC, { a?: string }>>()

		//

		type D = {
			a: SchemaLike<string> & { isReadonly: true; isOptional: true }
		}

		type DD = Output<D>
		$Assert<IsIdentical<DD, { readonly a?: string }>>()
	})
})
