// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @internal */
export const _schemaBase = {
	validate(x: unknown): unknown {
		return x
	},

	isValid(): boolean {
		return true
	},

	exec(value: unknown): { isValid: boolean; issues: never[]; value: unknown } {
		return {
			isValid: true,
			issues: [],
			value,
		}
	},
}

/** @internal */
export function _schemaCall(): unknown {
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
