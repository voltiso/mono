// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function shorten(str: string, maxLength: number): string {
	if (str.length <= maxLength) return str
	return `${str.slice(0, Math.max(0, maxLength - 3))}...`
}
