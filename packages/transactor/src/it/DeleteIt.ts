// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const IS_DELETE_IT = Symbol('IS_DELETE_IT')

export class DeleteIt {
	readonly [IS_DELETE_IT] = true as const
}
export const deleteIt = (): DeleteIt => new DeleteIt()

export function isDeleteIt(x: unknown): x is DeleteIt {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as DeleteIt | null)?.[IS_DELETE_IT])
}
