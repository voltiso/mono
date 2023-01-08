// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isPlainObject, stringFrom } from '@voltiso/util'

import { TransactorError } from '~/error'

export const immutabilize = <T>(obj: T, message = 'object is immutable'): T => {
	if (!isPlainObject(obj) && !Array.isArray(obj)) return obj

	const proxy = new Proxy(obj, {
		get: (target, field, receiver): unknown => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const r = Reflect.get(target, field, receiver)

			if (
				field.toString().startsWith('__') ||
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				(r?.constructor?.name !== 'Object' && !Array.isArray(r)) // ! constructor may be `undefined` if null proto
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
