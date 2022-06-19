export type AtLeast1<T> = [T, ...T[]]
export type AtLeast2<T> = [T, T, ...T[]]

export type ReadonlyAtLeast1<T> = readonly [T, ...T[]]
export type ReadonlyAtLeast2<T> = readonly [T, T, ...T[]]
