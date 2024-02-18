// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @internal */
export function _createElement(elementType: keyof JSX.IntrinsicElements) {
	// eslint-disable-next-line unicorn/no-negated-condition
	if (typeof document !== 'undefined')
		return document.createElement(elementType)
	else return undefined
}
