/* eslint-disable @typescript-eslint/ban-types */

/**
 * VSCode code-completion hack
 *
 * @example
 * type Test<X extends 'a' | 'b' | Suggest<string>> = never
 *
 * type R = Text<'... // accepts any `string`, but suggest 'a' or 'b'
 */
export type Suggest<X> = X & {}
