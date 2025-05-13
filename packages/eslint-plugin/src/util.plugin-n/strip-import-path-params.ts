// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line import/no-default-export
export default function stripImportPathParams(path: string): string {
	const i = path.indexOf('!')

	return i === -1 ? path : path.slice(0, i)
}
