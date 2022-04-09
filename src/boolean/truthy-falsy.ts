export type Falsy = null | undefined | 0 | false | void | ''

export type IsFalsy<A, T = true, F = false> = A extends Falsy ? T : A & Falsy extends never ? F : T | F

export type IsTruthy<A, T = true, F = false> = IsFalsy<A, F, T>
