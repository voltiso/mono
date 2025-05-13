// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FC } from 'react'

import type { IForwardRefRenderFunction } from '~/_/StyledData'
import type {
	IForwardRefAndCssRenderFunction,
	IForwardRefExoticComponent,
} from '~/react-types'

/**
 * ! hacky !
 *
 * Set `Function.name` and `displayName` of a function component
 *
 * @param name - Component name to set as both `Function.name` and `displayName`
 * @param component - A function component to change name of
 * @returns - The exact same component after setting its `name` and
 *   `displayName`
 */
export function defineFunctionComponent<
	ExtendsFC extends
		| FC
		| IForwardRefRenderFunction
		| IForwardRefExoticComponent
		| IForwardRefAndCssRenderFunction,
>(name: string, component: ExtendsFC): ExtendsFC {
	const propertyNames = ['name', 'displayName'] as const

	for (const propertyName of propertyNames) {
		const oldDescriptor = Object.getOwnPropertyDescriptor(
			component,
			propertyName,
		)

		Object.defineProperty(component, propertyName, {
			value: name,
			writable: true,
		})

		// restore original `writable` state
		if (oldDescriptor?.writable !== undefined)
			Object.defineProperty(component, propertyName, {
				writable: oldDescriptor.writable,
			})
	}

	return component
	// assertNotPolluting(name)
	// // eslint-disable-next-line security/detect-object-injection
	// const result = { [name]: Component }[name] as ExtendsFC
	// result.displayName = name
	// return result
}
