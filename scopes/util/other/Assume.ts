/** If your generic type argument does not accept what you want - pass the argument through `Assume` first */
export type Assume<Type, X> = X extends Type ? X : never

/** Intersect `X` with `Type`, unless `X` is already a subtype of `Type` */
export type Force<Type, X> = X extends Type ? X : X & Type
