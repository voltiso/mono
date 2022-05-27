export type UndefinedFromOptional<T> = {
	[k in keyof T]: T[k] | (undefined extends T[k] ? undefined : never)
}
