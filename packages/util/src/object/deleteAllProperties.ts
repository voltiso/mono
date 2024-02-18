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
	for (const property of Object.getOwnPropertyNames(object))
		delete object[property as never]

	for (const property of Object.getOwnPropertySymbols(object))
		delete object[property as never]
}
