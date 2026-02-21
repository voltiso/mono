// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type { ComponentClass } from 'react'
import { describe, expect, it } from 'vitest'

import type { IStylableJsxConstruct, Props, StylableJsxConstruct } from '~'

describe('StylableJsx', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<StylableJsxConstruct<P>, IStylableJsxConstruct>()
		$Assert.is<StylableJsxConstruct<P>, StylableJsxConstruct>()
	})

	it('type', () => {
		expect.assertions(0)

		// Assert(
		// 	Is<ComponentClass<{ a?: 'aa' }>>().not.subtypeOf<IStylableJsxConstruct>(),
		// )

		// Assert(
		// 	Is<ComponentClass<{ a?: 'aa' }>>().not.subtypeOf<StylableJsxConstruct>(),
		// )

		$Assert.is<
			ComponentClass<{ className?: string | undefined }>,
			StylableJsxConstruct
		>()

		$Assert.is<
			ComponentClass<{ className?: string | undefined; a?: 'aa' }>,
			StylableJsxConstruct
		>()

		$Assert.is<
			ComponentClass<{ className: string; a?: 'aa' }>,
			IStylableJsxConstruct
		>()

		$Assert.is<
			ComponentClass<{ readonly className: string; a?: 'aa' }>,
			StylableJsxConstruct
		>()

		$Assert.is<
			ComponentClass<{ readonly className?: 'a' | 'b' | undefined; a?: 'aa' }>,
			StylableJsxConstruct
		>()

		//

		// ! TODO: react now allows Promises?
		// $Assert.is<FC<{ className: string; a?: 'aa' }>, StylableJsxCall>()
	})
})
