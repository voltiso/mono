export type Get<T, K> = K extends keyof T ? T[K] : undefined
