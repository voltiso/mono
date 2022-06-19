/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-void */

/**
 * Use instead of `undefined`
 *  - `undefined` can be shadowed - not safe
 *  - using `void 0` explicitly is not readable - bad style
 * */
export const undef: undefined = void 0
