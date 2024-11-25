// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-return */

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import { CallableConstructor } from './CallableConstructor'

class _Cls {
	constructor(n: number)
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	constructor(s: string)

	constructor(arg: string | number) {
		this._val = arg
		// assert((this.constructor as typeof _Cls)._staticData)
		const ctor = this.constructor as typeof _Cls
		this._staticRef = ctor._staticData
		// this._staticRef = (Object.getPrototypeOf(this) as typeof _Cls)._staticData
	}

	_val: string | number

	_staticRef: (number | bigint | symbol)[]

	static readonly _staticData: (number | bigint | symbol)[] = []

	static addStaticData(this: typeof _Cls, arg: number): Cls
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	static addStaticData(this: typeof _Cls, arg: bigint | symbol): Cls
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	static addStaticData(this: typeof _Cls, arg: symbol): Cls
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	static addStaticData(this: typeof _Cls, arg: number | bigint | symbol): Cls

	static addStaticData(this: typeof _Cls, arg: number | bigint | symbol): Cls {
		class Cls extends this {
			static override readonly _staticData: (number | bigint | symbol)[] = [
				...super._staticData,
				arg,
			]
		}

		return CallableConstructor({ call, constructor: Cls }) as never
	}
}

class _Derived extends _Cls {
	declare _additionalField: string
}

function call(s: symbol): typeof _Cls
// eslint-disable-next-line @typescript-eslint/unified-signatures
function call(b: bigint): typeof _Cls
function call(b: string): string

// eslint-disable-next-line sonarjs/function-return-type
function call(
	this: typeof _Cls,
	arg: bigint | symbol | string,
): typeof _Cls | string {
	if (typeof arg === 'string') return arg

	return this.addStaticData(arg) as never
}

const Cls = CallableConstructor({ call, constructor: _Derived })
type Cls = typeof Cls

describe('callableConstructor', () => {
	it('works', () => {
		expect.hasAssertions()

		const cls = new Cls('test')

		expect(cls._val).toBe('test')

		$Assert<IsIdentical<typeof cls._val, string | number>>()

		expect(cls._staticRef).toStrictEqual([])

		// @ts-expect-error no call signature

		expect(() => cls()).toThrow('not a function')

		// eslint-disable-next-line sonarjs/inconsistent-function-call
		const value = Cls('aaa')

		expect(value).toBe('aaa')

		const Cls2 = Cls.addStaticData(999)
		const Cls3 = Cls2(333n)

		const cls3 = new Cls3('3')

		// eslint-disable-next-line sonarjs/inconsistent-function-call
		const cls2 = new Cls2('2')

		expect(cls2._val).toBe('2')
		expect(cls2._staticRef).toStrictEqual([999])

		expect(cls3._val).toBe('3')
		expect(cls3._staticRef).toStrictEqual([999, 333n])

		expect(cls3 instanceof _Cls).toBeTruthy()
		expect(cls3 instanceof Cls).toBeTruthy()
	})
})
