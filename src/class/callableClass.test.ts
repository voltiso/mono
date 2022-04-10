/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-statements */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-magic-numbers */
import { Assert } from '../bdd'
import { IsIdentical } from '../IsEqual'
import { callableClass } from './callableClass'

class _Cls {
	constructor(n: number)
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
	static addStaticData(this: typeof _Cls, arg: bigint | symbol): Cls
	static addStaticData(this: typeof _Cls, arg: symbol): Cls
	static addStaticData(this: typeof _Cls, arg: number | bigint | symbol): Cls

	static addStaticData(this: typeof _Cls, arg: number | bigint | symbol) {
		class Cls extends this {
			static override readonly _staticData: (number | bigint | symbol)[] = [...super._staticData, arg]
		}
		return callableClass(Cls, Fun)
	}
}

class _Derived extends _Cls {
	declare _additionalField: string
}

function Fun(s: symbol): typeof _Cls
function Fun(b: bigint): typeof _Cls
function Fun(b: string): string

function Fun(this: typeof _Cls, arg: bigint | symbol | string): typeof _Cls | string {
	if (typeof arg === 'string') return arg
	else return this.addStaticData(arg)
}

const Cls = callableClass(_Derived, Fun)
type Cls = typeof Cls

describe('callableClass', () => {
	it('works', () => {
		expect.hasAssertions()

		const cls = new Cls('test')
		expect(cls._val).toBe('test')
		Assert<IsIdentical<typeof cls._val, string | number>>()
		expect(cls._staticRef).toStrictEqual([])

		// @ts-expect-error no call signature
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		expect(() => cls()).toThrow('not a function')

		const val = Cls('aaa')
		expect(val).toBe('aaa')

		const Cls2 = Cls.addStaticData(999)
		const Cls3 = Cls2(333n)

		const cls3 = new Cls3('3')

		const cls2 = new Cls2('2')

		expect(cls2._val).toBe('2')
		expect(cls2._staticRef).toStrictEqual([999])

		expect(cls3._val).toBe('3')
		expect(cls3._staticRef).toStrictEqual([999, 333n])

		expect(cls3 instanceof _Cls).toBeTruthy()
		expect(cls3 instanceof Cls).toBeTruthy()
	})
})
