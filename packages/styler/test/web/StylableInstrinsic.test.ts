// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { _ } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { JSX } from 'react'

import type {
	IsReactNative,
	IStylableIntrinsicElement,
	Props,
	StylableIntrinsic,
} from '~'

describe('StylableIntrinsic', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<StylableIntrinsic<P>, IStylableIntrinsicElement>()
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('every JSX intrinsic element has className?', () => {
		expect.assertions(0)
		// allows simplifying typings

		type All = _<keyof JSX.IntrinsicElements & string>
		type WithClassName = StylableIntrinsic<{}>

		$Assert.is<All, WithClassName>()
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('every JSX intrinsic property is optional?', <K extends
		keyof JSX.IntrinsicElements>() => {
		expect.assertions(0)

		$Assert.is<JSX.IntrinsicElements[K], {}>()
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('does not accept unknown props', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
		type A = StylableIntrinsic<{ size?: never; bbb?: never }>
		$Assert.is<A, never>()
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('accepts multiple props', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
		type A = StylableIntrinsic<{ size?: never; type?: never }>
		$Assert.is<'input', A>()
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('does not accept super-type props', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
		type A = StylableIntrinsic<{ size?: never; type?: unknown }>
		$Assert.is<A, never>()
	})
})
