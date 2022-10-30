// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface DeleteIt {
	__deleteIt: true
}

export const deleteIt: DeleteIt = {
	__deleteIt: true,
}

export function isDeleteIt(x: any): x is DeleteIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__deleteIt')
}
