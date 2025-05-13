// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function underscoredNonEnumerable(obj: object): void {
	for (const k of Object.keys(obj).filter(k => k.startsWith('_')))
		Object.defineProperty(obj, k, { enumerable: false })
}
