/* eslint-disable no-inner-declarations */
/* eslint-disable no-constructor-return */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-this */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/ban-types */

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
	PM extends PMType<Inst> = '_PROXY_OBJECT' & PMType<Inst>
> = Pick<Inst, Field> & {
	_: Inst
} & (CM | void extends void ? unknown : Inst[CM]) &
	(PM | void extends void ? unknown : Inst[PM])

/**
 * Does not work with constructor overloads
 */
export function createClassInterface<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Class extends Constructor<any>,
	Field extends keyof InstanceType<Class> & string,
	CM extends CMType<InstanceType<Class>> = '_CALL' &
		CMType<InstanceType<Class>>,
	PM extends PMType<InstanceType<Class>> = '_PROXY_OBJECT' &
		PMType<InstanceType<Class>>
>(
	Cls: Class,
	fields: readonly Field[] | Field,
	options: {
		callMethodName: CM | '_CALL'
		proxyObjectMethodName: PM | '_PROXY_OBJECT'
	} = { callMethodName: '_CALL', proxyObjectMethodName: '_PROXY_OBJECT' }
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
				else return r
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
					else return Reflect.get(proxyObject, p) as unknown
				},
				// eslint-disable-next-line max-params
				set(result, p, value, receiver) {
					// call with null receiver to bypass proxy object (e.g. calls from derived class constructor)
					const proxyObject = result._[m] as unknown as object
					if (p in result) return Reflect.set(result, p, value)
					else if (receiver === null) return Reflect.set(result, p, value)
					else return Reflect.set(proxyObject, p, value)
				},
				deleteProperty(result, p) {
					const proxyObject = result._[m] as unknown as object
					if (p in result) return Reflect.deleteProperty(result, p)
					else return Reflect.deleteProperty(proxyObject, p)
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
	PM extends PMType<Inst> = '_PROXY_OBJECT' & PMType<Inst>
>(
	srcObj: Inst,
	fields: Field | readonly Field[],
	callMethodName: CM | '_CALL' = '_CALL'
) {
	type R = Interface<Inst, Field, CM, PM>

	function isCallable(m: CM | '_CALL'): m is CM {
		return (m !== '_CALL' && m in srcObj) || '_CALL' in srcObj // hack to avoid TS error...
	}

	const dstObj = (
		isCallable(callMethodName)
			? (...args: unknown[]) => {
					const r = (srcObj as unknown as Record<CM, CallableFunction>)[
						callMethodName
					](...args) as unknown
					if (r === srcObj) return dstObj
					else return r
			  }
			: {}
	) as R

	dstObj._ = srcObj
	appendInterface(dstObj, srcObj, fields, (x: { _: unknown }) => x._)
	return dstObj
}

function isArray(arr: unknown): arr is unknown[] | readonly unknown[] {
	return Array.isArray(arr)
}

// eslint-disable-next-line max-params
export function appendInterface<
	R extends object,
	Field extends keyof R & string
>(
	dstObj: Pick<R, Field>,
	srcObj: R,
	fields?: readonly Field[] | Field,
	thisTransform?: (t: any) => unknown
) {
	if (typeof fields === 'undefined') {
		fields = Object.getOwnPropertyNames(srcObj) as Field[]
	} else if (!isArray(fields)) fields = [fields]

	for (const field of fields) {
		if (!(field in srcObj))
			throw new Error(`createInterface: ${field} not part of the source object`)
		// const source = srcObj[field]
		Object.defineProperty(dstObj, field, {
			get(this: any) {
				const self = (thisTransform ? thisTransform(this) : this) as unknown
				const r = Reflect.get(srcObj, field, self) as unknown
				if (typeof r === 'function')
					return (...args: unknown[]) => {
						const rr = r.call(self, ...args) as unknown
						if (rr === self) return this as unknown
						else return rr
					}
				else return r
			},
			set(v) {
				const self = (thisTransform ? thisTransform(this) : this) as unknown
				return Reflect.set(srcObj, field, v, self)
			},
		})
	}
}
