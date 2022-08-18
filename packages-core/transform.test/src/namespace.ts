// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Test } from './_/external-stuff'

export type Flatten<T> = [{ [k in keyof T]: T[k] }][0]

/** @inline */ export type InlineFlatten<T> = [{ [k in keyof T]: T[k] }][0]

const a = 0 as unknown as Test.A

const obj = {
	a: 0 as unknown as typeof a,
	b: 0 as unknown as Test.B,
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore necessary...
type A = Test.A

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore necessary...
type B = Test.B

export type Inlined = InlineFlatten<typeof obj>
