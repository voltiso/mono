// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function freeze<O extends object>(o: O, ...properties: (keyof O)[]) {
	for (const p of properties) {
		Object.defineProperty(o, p, {
			configurable: false,
			writable: false,
			// eslint-disable-next-line security/detect-object-injection
			value: o[p],
		})
	}
}
