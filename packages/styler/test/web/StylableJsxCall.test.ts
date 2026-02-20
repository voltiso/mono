// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert, $Is } from '@voltiso/util'

import type { IStylableJsxCall, Props, StylableJsxCall } from '~'

import type { FC } from './common'

describe('StylableJsxCall', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<StylableJsxCall<P>, IStylableJsxCall>()
		$Assert.is<StylableJsxCall<P>, StylableJsxCall>()
	})

	it('type', () => {
		expect.assertions(0)

		// Assert(Is<FC<{ a?: 'aa' }>>().not.subtypeOf<IStylableJsxCall>())
		// Assert(Is<FC<{ a?: 'aa' }>>().not.subtypeOf<StylableJsxCall>())

		$Assert.is<FC<{ className?: string | undefined }>, StylableJsxCall>()

		$Assert.is<
			FC<{ className?: string | undefined; a?: 'aa' }>,
			StylableJsxCall
		>()

		$Assert.is<FC<{ className: string; a?: 'aa' }>, IStylableJsxCall>()
		$Assert.is<FC<{ readonly className: string; a?: 'aa' }>, StylableJsxCall>()

		$Assert.is<
			FC<{ readonly className?: 'a' | 'b' | undefined; a?: 'aa' }>,
			StylableJsxCall
		>()

		//

		$Assert.is<FC<{ className: string; a?: 'aa' }>, StylableJsxCall>()
	})

	it('type #3', () => {
		expect.assertions(0)

		$Assert.is<(props: { className: string }) => null, StylableJsxCall>()

		$Assert.is<
			(props: { className: string; other: number }) => null,
			StylableJsxCall
		>()
	})

	it('type #4 - does not accept', () => {
		expect.assertions(0)

		$Assert(
			$Is<
				(props: { someProp?: boolean }) => null
			>().not.subtypeOf<StylableJsxCall>(),
		)

		// ! bivariance does not help here!! have to manually check if props are empty `{}`
		// Assert(Is<(props: {}) => null>().not.subtypeOf<StylableJsxCall>())
	})
})
