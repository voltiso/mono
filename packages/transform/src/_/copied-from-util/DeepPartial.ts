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
][0]
