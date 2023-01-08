// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line tsdoc/syntax
/** @author Toru Nagashima See LICENSE file in root directory for full license. */

export function stripImportPathParams(path: string) {
	const i = path.indexOf('!')
	return i === -1 ? path : path.slice(0, i)
}
