// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** DEPRECATE? */

/* eslint-disable jsdoc/require-param-description */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable etc/no-misused-generics */
/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable security/detect-object-injection */
/* eslint-disable unicorn/no-object-as-default-parameter */
/* eslint-disable tsdoc/syntax */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-constructor-return */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-this */
/* eslint-disable @typescript-eslint/no-this-alias */

type Constructor<Args extends unknown[] = unknown[], Inst = unknown> = new (
	...args: Args
) => Inst

type Condition<X, C, T, F> = X extends C ? T : F

type CMType<Inst> = Condition<
	Inst[keyof Inst],
	CallableFunction,
	keyof Inst,
	never
>
type PMType<Inst> = Condition<Inst[keyof Inst], object, keyof Inst, never>

export type Interface<
	Inst,
	Field extends keyof Inst & string,
	CM extends CMType<Inst> = '_CALL' & CMType<Inst>,
	PM extends PMType<Inst> = '_PROXY_OBJECT' & PMType<Inst>,
> = Pick<Inst, Field> & {
	_: Inst
} & (CM | void extends void ? unknown : Inst[CM]) &
	(PM | void extends void ? unknown : Inst[PM])

/**
 * Does not work with constructor overloads
 *
 * @param Cls
 * @param fields
 * @param options
 * @param options.callMethodName
 * @param options.proxyObjectMethodName
 */
export function createClassInterface<
	Class extends Constructor<any>,
	Field extends keyof InstanceType<Class> & string,
	CM extends CMType<InstanceType<Class>> = '_CALL' &
		CMType<InstanceType<Class>>,
	PM extends PMType<InstanceType<Class>> = '_PROXY_OBJECT' &
		PMType<InstanceType<Class>>,
>(
	Cls: Class,
	fields: readonly Field[] | Field,
	options: {
		callMethodName: CM | '_CALL'
		proxyObjectMethodName: PM | '_PROXY_OBJECT'
	} = { callMethodName: '_CALL', proxyObjectMethodName: '_PROXY_OBJECT' },
) {
	type R = Constructor<
		ConstructorParameters<Class>,
		Interface<InstanceType<Class>, Field, CM, PM>
	>

	function Construct(this: NewClass) {
		const isCallable = (m: CM | '_CALL'): m is CM =>
			Boolean((this._ as Record<any, unknown>)[m])

		let result: { _: InstanceType<Class> } = this

		if (isCallable(options.callMethodName)) {
			const m = options.callMethodName
			const self = this._ as Record<CM, CallableFunction>

			function f(...args: unknown[]) {
				const r = self[m](...args) as unknown

				if (r === self) return f

				return r
			}
			f._ = this._
			Object.setPrototypeOf(f, <object>Object.getPrototypeOf(this))
			result = f
		}

		const hasProxyObject = (m: PM | '_PROXY_OBJECT'): m is PM =>
			Boolean((this._ as Record<any, unknown>)[m])

		if (hasProxyObject(options.proxyObjectMethodName)) {
			const m = options.proxyObjectMethodName
			const newResult = new Proxy(result, {
				get(result, p) {
					const proxyObject = result._[m] as unknown as object

					if (p in result) return Reflect.get(result, p) as unknown

					return Reflect.get(proxyObject, p) as unknown
				},

				set(result, p, value, receiver) {
					// call with null receiver to bypass proxy object (e.g. calls from derived class constructor)
					const proxyObject = result._[m] as unknown as object

					if (p in result) return Reflect.set(result, p, value)

					if (receiver === null) return Reflect.set(result, p, value)

					return Reflect.set(proxyObject, p, value)
				},

				deleteProperty(result, p) {
					const proxyObject = result._[m] as unknown as object

					if (p in result) return Reflect.deleteProperty(result, p)

					return Reflect.deleteProperty(proxyObject, p)
				},
			})
			result = newResult
		}

		// if (fields.includes('clone' as Field)) {
		// 	result.clone = function () {
		// 		return new newClass()
		// 	}
		// }

		return result
	}

	class NewClass {
		_: InstanceType<Class>
		constructor(...args: unknown[]) {
			this._ = new Cls(...args) as InstanceType<Class>
			return Construct.call(this)
		}
	}

	const prototype = Cls.prototype as InstanceType<Class> & {}
	type NewInst = Pick<InstanceType<Class> & {}, Field> & {
		_: InstanceType<Class>
	}
	const newPrototype = NewClass.prototype as NewInst

	appendInterface(newPrototype, prototype, fields, (x: { _: unknown }) => x._)

	return NewClass as unknown as R
}

export function createInterface<
	Inst extends object,
	Field extends keyof Inst & string,
	CM extends CMType<Inst> = '_CALL' & CMType<Inst>,
	PM extends PMType<Inst> = '_PROXY_OBJECT' & PMType<Inst>,
>(
	sourceObj: Inst,
	fields: Field | readonly Field[],
	callMethodName: CM | '_CALL' = '_CALL',
) {
	type R = Interface<Inst, Field, CM, PM>

	function isCallable(m: CM | '_CALL'): m is CM {
		return (m !== '_CALL' && m in sourceObj) || '_CALL' in sourceObj // hack to avoid TS error...
	}

	const dstObj = (
		isCallable(callMethodName)
			? (...args: unknown[]) => {
					const r = (sourceObj as unknown as Record<CM, CallableFunction>)[
						callMethodName
					](...args) as unknown

					if (r === sourceObj) return dstObj

					return r
			  }
			: {}
	) as R

	dstObj._ = sourceObj
	appendInterface(dstObj, sourceObj, fields, (x: { _: unknown }) => x._)
	return dstObj
}

function isArray(array: unknown): array is unknown[] | readonly unknown[] {
	return Array.isArray(array)
}

export function appendInterface<
	R extends object,
	Field extends keyof R & string,
>(
	dstObj: Pick<R, Field>,
	sourceObj: R,
	fields?: readonly Field[] | Field,
	thisTransform?: (t: any) => unknown,
) {
	if (typeof fields === 'undefined') {
		fields = Object.getOwnPropertyNames(sourceObj) as Field[]
	} else if (!isArray(fields)) fields = [fields]

	for (const field of fields) {
		if (!(field in sourceObj))
			throw new Error(`createInterface: ${field} not part of the source object`)

		// const source = srcObj[field]
		Object.defineProperty(dstObj, field, {
			get(this: any) {
				const self = (thisTransform ? thisTransform(this) : this) as unknown
				const r = Reflect.get(sourceObj, field, self) as unknown

				if (typeof r === 'function')
					return (...args: unknown[]) => {
						const rr = r.call(self, ...args) as unknown

						if (rr === self) return this as unknown

						return rr
					}

				return r
			},

			set(v) {
				const self = (thisTransform ? thisTransform(this) : this) as unknown
				return Reflect.set(sourceObj, field, v, self)
			},
		})
	}
}
