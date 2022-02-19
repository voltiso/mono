export type Unpack<T> = T extends readonly (infer X)[] ? X : T
