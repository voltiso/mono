// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isWithId(data: object): data is { id: unknown } {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return !!data && 'id' in data
}
