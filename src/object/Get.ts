export type Get<T, k> = k extends keyof T ? T[k] : never
