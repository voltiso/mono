// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @internal */
export function _createElement(elementType: keyof JSX.IntrinsicElements) {
	if (typeof document !== 'undefined')
		return document.createElement(elementType)
	else return undefined
}
