// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export default function stripImportPathParams(path: string) {
	const i = path.indexOf('!')

	return i === -1 ? path : path.slice(0, i)
}
