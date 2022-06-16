export type IsSubtype<A, B, T = true, F = false> = A extends B ? T : F
export type IsSupertype<A, B, T = true, F = false> = B extends A ? T : F
