// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as test from './numericSeparators'
void test

import * as test2 from './numericSeparators.js'
void test2

export * from './numericSeparators'
export * as default from './numericSeparators'

export * as x from './test'

export type { A } from './test'

import type { A as B } from './test'
export type { B }

export { a, type A as AA } from './test'

import { type A as AAA } from './test'
export { type AAA }

export { a as a3 } from '../compat/test'
export { a as a2 } from '~/compat/test'
export { abc } from '_'

export type testA = typeof import('./numericSeparators')
export type testB = import('./test').A
export type testC = import('./test/index').A

export { default as jsonTest } from '../../package.json'
