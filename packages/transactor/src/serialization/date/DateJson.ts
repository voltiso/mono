// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DateJson = {
	__date: string // iso
}

export function isDateJson(x: unknown): x is DateJson {
	return !!(x as DateJson | null)?.__date
}
