/**
 * Similar to the standard `ReturnType`
 *
 * Obtain the return type of a function type
 *  - More strict version than in the standard lib - no `any` in definition to fix linting errors
 */
export type Return<T extends (...args: never[]) => unknown> = T extends (...args: never[]) => infer R ? R : never
