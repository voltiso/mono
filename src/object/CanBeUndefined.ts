export type CanBeUndefined<T, k extends keyof T, TT = true, FF = false> = {
	[kk in keyof T]: T[kk] | (kk extends k ? undefined : never)
} extends T
	? TT
	: FF
