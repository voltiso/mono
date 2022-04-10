/* eslint-disable no-magic-numbers */

// https://stackoverflow.com/a/55541672/1123898
export type IsAny<X, T = true, F = false> = 0 extends 1 & X ? T : F
