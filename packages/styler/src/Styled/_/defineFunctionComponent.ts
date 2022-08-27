// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FC } from 'react'

import type { IForwardRefExoticComponent, IForwardRefRenderFunction } from '~'

/**
 * ! hacky !
 *
 * Set `Function.name` and `displayName` of a function component
 *
 * @param name - Component name to set as both `Function.name` and `displayName`
 * @param Component - A function component to change name of
 * @returns - The exact same component after setting its `name` and
 *   `displayName`
 */
export function defineFunctionComponent<
	ExtendsFC extends FC | IForwardRefRenderFunction | IForwardRefExoticComponent,
>(name: string, Component: ExtendsFC): ExtendsFC {
	const propertyNames = ['name', 'displayName'] as const

	for (const propertyName of propertyNames) {
		const oldDescriptor = Object.getOwnPropertyDescriptor(
			Component,
			propertyName,
		)

		Object.defineProperty(Component, propertyName, {
			value: name,
			writable: true,
		})

		// restore original `writable` state
		if (typeof oldDescriptor?.writable !== 'undefined')
			Object.defineProperty(Component, propertyName, {
				writable: oldDescriptor.writable,
			})
	}

	return Component
	// assertNotPolluting(name)
	// // eslint-disable-next-line security/detect-object-injection
	// const result = { [name]: Component }[name] as ExtendsFC
	// result.displayName = name
	// return result
}
