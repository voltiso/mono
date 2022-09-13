// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable etc/no-internal */

/** @internal */
export const _schemaBase = {
	validate(x: unknown) {
		return x
	},

	isValid() {
		return true
	},

	exec(value: unknown) {
		return {
			isValid: true,
			issues: [],
			value,
		}
	},
}

/** @internal */
export function _schemaCall() {
	return _schema
}

export const _schema: unknown = new Proxy(_schemaCall, {
	get(target, property, receiver) {
		if (property in target)
			return Reflect.get(target, property, receiver) as never
		else return _schema
	},
})

Object.setPrototypeOf(_schema, _schemaBase)
