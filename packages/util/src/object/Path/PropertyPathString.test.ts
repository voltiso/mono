// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, it } from 'vitest'

import type { IsIdentical } from '~/type'

import type { PropertyPath } from './PropertyPath'
import type { PropertyPathString } from './PropertyPathString'

describe('DeepKeys', () => {
	it('type', () => {
		type Obj = { a: 1; b: { b0?: 123; b2: 234 } }
		type A = PropertyPathString<Obj>
		$Assert<IsIdentical<A, 'a' | 'b' | 'b.b0' | 'b.b2'>>()
	})

	it('omits symbols', () => {
		const sym = Symbol('sym')
		type Obj = { [sym]: 1; a: 1; b: { b0?: 123; b2?: 234 } }
		type A = PropertyPathString<Obj>
		$Assert<IsIdentical<A, 'a' | 'b' | 'b.b0' | 'b.b2'>>()
	})

	it('works with index signatures', () => {
		type Obj = {
			oops: Record<string, string>
		}

		type X = PropertyPath.ForObject<Obj>
		$Assert<IsIdentical<X, ['oops'] | ['oops', string]>>()

		type A = PropertyPathString<Obj>
		$Assert<IsIdentical<A, 'oops' | `oops.${string}`>>()
	})

	it('works with any', () => {
		type Obj = {
			oops: Record<any, any>
		}

		type X = PropertyPath.ForObject<Obj>
		$Assert<
			IsIdentical<
				X,
				| ['oops']
				| ['oops', string]
				| ['oops', string, string]
				| ['oops', string, string, ...any[]]
			>
		>() // hmm

		type A = PropertyPathString<Obj>
		$Assert<
			IsIdentical<A, 'oops' | `oops.${string}` | `oops.${string}.${string}`>
		>()
	})
})
