// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! COPIED from `@voltiso/util` - to avoid cyclic package deps

/**
 * Non-distributive `DeepPartial` without type constraints
 *
 * @inline
 */
export type DeepPartial_<T> = [
	{
		[k in keyof T]?: DeepPartial_<T[k]>
	},
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
][0]
