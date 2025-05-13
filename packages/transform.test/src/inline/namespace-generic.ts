// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Test } from './_/external-stuff'

export type Flatten<T> = [{ [k in keyof T]: T[k] }][0]

/** @inline */ export type InlineFlatten<T> = [{ [k in keyof T]: T[k] }][0]

// const a = 0 as unknown as Test.A

const obj = {
	a: 0 as unknown as Test.A, // `typeof a` stopped working!
	b: 0 as unknown as Test.B,
	c: 0 as unknown as Test.Nested.C,
	d: 0 as unknown as <T = Test.Nested.C>() => Test.Nested.C<T>,
}

export type Inlined = /** @inline */ InlineFlatten<typeof obj>

type Local = 1

export type InlinedG = /** @inline */ InlineFlatten<
	{
		fun: <A = { x: Test.Nested.C<Test.A> }>(arg: A) => A & typeof obj
	} & {
		x: Test.A | Test.Nested.C<Test.B>

		fun2: <Local = 2>() => Local

		loc: Local
	}
>
