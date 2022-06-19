export function pathToString(path: (string | number)[]) {
	let r = ''
	for (const t of path) {
		if (typeof t === 'number') r = `${r}[${t}]`
		else r = `${r}.${t}`
	}
	return r
}
