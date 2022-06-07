/** Same as built-in Pick, but no template argument constraint on K */
export type Pick_<O, K> = O extends object ? Pick<O, K & keyof O> : never
