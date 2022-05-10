export type If<B, T, F> = B extends true ? T : B extends false ? F : never
