// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function tryDeleteAllProperties(object: object): void {
	for (const property of Object.getOwnPropertyNames(object))
		Reflect.deleteProperty(object, property)

	for (const property of Object.getOwnPropertySymbols(object))
		Reflect.deleteProperty(object, property)
}

//

export function deleteAllProperties(object: object): void {
	for (const property of Object.getOwnPropertyNames(object)) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete object[property as never]
	}

	for (const property of Object.getOwnPropertySymbols(object)) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete object[property as never]
	}
}
