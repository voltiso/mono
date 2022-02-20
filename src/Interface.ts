/* eslint-disable @typescript-eslint/ban-types */

type Constructor<Args extends unknown[] = unknown[], Inst = unknown> = new (...args: Args) => Inst

type Condition<X, C, T, F> = X extends C ? T : F

type CMType<Inst> = Condition<Inst[keyof Inst], CallableFunction, keyof Inst, never>
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

export const createClassInterface = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Cls extends Constructor<any>,
	Field extends keyof InstanceType<Cls> & string,
	CM extends CMType<InstanceType<Cls>> = '_CALL' & CMType<InstanceType<Cls>>,
	PM extends PMType<InstanceType<Cls>> = '_PROXY_OBJECT' & PMType<InstanceType<Cls>>
>(
	cls: Cls,
	fields: readonly Field[] | Field,
	options: {
		callMethodName: CM | '_CALL'
		proxyObjectMethodName: PM | '_PROXY_OBJECT'
	} = { callMethodName: '_CALL', proxyObjectMethodName: '_PROXY_OBJECT' }
) => {
	type R = Constructor<ConstructorParameters<Cls>, Interface<InstanceType<Cls>, Field, CM, PM>>

	const newClass = class {
		_: InstanceType<Cls>
		constructor(...args: unknown[]) {
			this._ = new cls(...args) as InstanceType<Cls>

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const isCallable = (m: CM | '_CALL'): m is CM => !!(this._ as Record<any, unknown>)[m]

			// eslint-disable-next-line @typescript-eslint/no-this-alias
			let result: { _: InstanceType<Cls> } = this

			if (isCallable(options.callMethodName)) {
				const m = options.callMethodName
				const self = this._ as Record<CM, CallableFunction>
				// eslint-disable-next-line no-inner-declarations
				function f(...args: unknown[]) {
					const r = self[m](...args) as unknown
					if (r === self) return f
					else return r
				}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				f._ = this._
				Object.setPrototypeOf(f, <object>Object.getPrototypeOf(this))
				result = f
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const hasProxyObject = (m: PM | '_PROXY_OBJECT'): m is PM => !!(this._ as Record<any, unknown>)[m]

			if (hasProxyObject(options.proxyObjectMethodName)) {
				const m = options.proxyObjectMethodName
				const newResult = new Proxy(result, {
					get(result, p) {
						const proxyObject = result._[m] as unknown as object
						if (p in result) return Reflect.get(result, p) as unknown
						else return Reflect.get(proxyObject, p) as unknown
					},
					set(result, p, value, receiver) {
						// call with null receiver to bypass proxy object (e.g. calls from derived class constructor)
						const proxyObject = result._[m] as unknown as object
						if (p in result) return Reflect.set(result, p, value)
						else if (receiver === null) return Reflect.set(result, p, value)
						else return Reflect.set(proxyObject, p, value)
					},
				})
				result = newResult
			}

			return result
		}
	}

	const prototype = cls.prototype as InstanceType<Cls> & {}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type NewInst = Pick<InstanceType<Cls> & {}, Field> & { _: InstanceType<Cls> }
	const newPrototype = newClass.prototype as NewInst

	appendInterface(newPrototype, prototype, fields, (x: { _: unknown }) => x._)

	return newClass as unknown as R
}

export const createInterface = <
	Inst extends object,
	Field extends keyof Inst & string,
	CM extends CMType<Inst> = '_CALL' & CMType<Inst>,
	PM extends PMType<Inst> = '_PROXY_OBJECT' & PMType<Inst>
>(
	srcObj: Inst,
	fields: Field | readonly Field[],
	callMethodName: CM | '_CALL' = '_CALL'
) => {
	type R = Interface<Inst, Field, CM, PM>

	const isCallable = (m: CM | '_CALL'): m is CM => (m !== '_CALL' && m in srcObj) || '_CALL' in srcObj // hack to avoid TS error...

	const dstObj = (
		isCallable(callMethodName)
			? function (...args: unknown[]) {
					const r = (srcObj as unknown as Record<CM, CallableFunction>)[callMethodName](...args) as unknown
					if (r === srcObj) return dstObj
					else return r
			  }
			: {}
	) as R

	dstObj._ = srcObj
	appendInterface(dstObj, srcObj, fields, (x: { _: unknown }) => x._)
	return dstObj
}

const isArray = (arr: unknown): arr is unknown[] | readonly unknown[] => Array.isArray(arr)

export const appendInterface = <R extends object, Field extends keyof R & string>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dstObj: Pick<R, Field>,
	srcObj: R,
	fields?: readonly Field[] | Field,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	thisTransform?: (t: any) => unknown
) => {
	if (fields === undefined) {
		fields = Object.getOwnPropertyNames(srcObj) as Field[]
	} else if (!isArray(fields)) fields = [fields]

	for (const field of fields) {
		if (!(field in srcObj)) throw new Error(`createInterface: ${field} not part of the source object`)
		// const source = srcObj[field]
		Object.defineProperty(dstObj, field, {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
