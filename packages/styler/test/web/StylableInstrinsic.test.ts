// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	IsReactNative,
	IStylableIntrinsicElement,
	Props,
	StylableIntrinsic,
} from '~'

describe('StylableIntrinsic', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<StylableIntrinsic<P>, IStylableIntrinsicElement>()
	})

	it('every JSX intrinsic element has className?', () => {
		expect.assertions(0)
		// allows simplifying typings

		type All = _<keyof JSX.IntrinsicElements & string>
		type WithClassName = StylableIntrinsic<{}>

		$Assert.is<All, WithClassName>()
	})

	it('every JSX intrinsic property is optional?', <K extends
		keyof JSX.IntrinsicElements>() => {
		expect.assertions(0)

		$Assert.is<JSX.IntrinsicElements[K], {}>()
	})

	it('does not accept unknown props', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
		type A = StylableIntrinsic<{ size?: never; bbb?: never }>
		$Assert.is<A, never>()
	})

	it('accepts multiple props', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
		type A = StylableIntrinsic<{ size?: never; type?: never }>
		$Assert.is<'input', A>()
	})

	it('does not accept super-type props', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
		type A = StylableIntrinsic<{ size?: never; type?: unknown }>
		$Assert.is<A, never>()
	})
})
