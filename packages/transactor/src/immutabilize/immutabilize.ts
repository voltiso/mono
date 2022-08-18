// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFrom } from '@voltiso/util'

import { TransactorError } from '~/error'

const isObject = (obj: unknown): obj is object =>
	Boolean(obj) && typeof obj === 'object'

export const immutabilize = <T>(obj: T, message = 'object is immutable'): T => {
	if (!isObject(obj)) return obj

	const proxy = new Proxy(obj, {
		get: (target, field, receiver): unknown => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const r = Reflect.get(target, field, receiver)

			if (
				field.toString().startsWith('__') ||
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				(r?.constructor.name !== 'Object' && !Array.isArray(r))
			)
				return r
			else return immutabilize(r, message)
		},

		set: (target, field, value, receiver) => {
			if (receiver === proxy)
				throw new TransactorError(
					`${message} (.${field.toString()} = ${stringFrom(value)})`,
				)

			return Reflect.set(target, field, value, receiver)
		},
	})

	return proxy
}
