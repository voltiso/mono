// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function pathToString(path: (keyof any)[]): string {
	let r = ''

	for (const t of path) {
		if (typeof t === 'number') r = `${r}[${t}]`
		else r = `${r}.${t.toString()}`
	}

	return r
}
