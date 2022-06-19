/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Manually force-narrow type of `x`
 * https://github.com/microsoft/TypeScript/issues/10421#issuecomment-518806979
 * @param x value
 */
export function assumeType<T>(_x: unknown): asserts _x is T {}
