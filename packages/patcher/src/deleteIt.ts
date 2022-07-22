// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */

export type DeleteIt = {
	__deleteIt: true
}

export const deleteIt: DeleteIt = {
	__deleteIt: true,
}

export function isDeleteIt(x: any): x is DeleteIt {
	return Object.hasOwn(x || {}, '__deleteIt')
}
