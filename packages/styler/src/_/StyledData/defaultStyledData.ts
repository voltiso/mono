// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

export const defaultStyledData = {
	component: null as null,

	childElements: null as null,

	stack: [] as never[],

	defaults: {},
	domDefaults: {},

	cssProps: {},

	unit: 'px' as const,
}

export type DefaultStyledData = typeof defaultStyledData
