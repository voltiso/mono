/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

/**
 * VSCode code-completion hack
 *
 * @example
 * type Test<X extends 'a' | 'b' | AlsoAccept<string>> = never
 *
 * type R = Text<'... // accepts any `string`, but suggest 'a' or 'b'
 */
export type AlsoAccept<X> = X & {}

export type ButReject<Obj extends object> = { [k in keyof Obj]?: never }
export type ButRejectKey<K extends keyof any> = { [k in K]?: never }
