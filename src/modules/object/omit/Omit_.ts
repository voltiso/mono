/** Same as built-in Omit, but no template argument constraint on K */
export type Omit_<O, K> = O extends object ? Omit<O, K & keyof O> : never
