// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical, Throw } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { style } from '~'

describe('cssProps', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('works', () => {
		expect.assertions(0)

		const Button = style('button').cssProps('flex', 'backgroundColor')
		;<Button /> // check if optional
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('does not allow overwriting props', () => {
		expect.assertions(0)

		const Svg = style('svg')
			.newCssProp('gap', { margin: 10 })
			.newCssProps({
				border: {
					borderRadius: 8,
				},

				magic: {
					color: 'purple',
				},
			})

		const BadSvg = Svg.cssProps('gap', 'border', 'margin')

		$Assert<
			IsIdentical<
				typeof BadSvg,
				Throw<
					'Props already exist' & {
						duplicateProps: 'border' | 'gap'
					}
				>
			>
		>()

		const StrippedSvg = Svg.forgetProps('border', 'gap')

		// @ts-expect-error no `border`
		;() => <StrippedSvg border />

		// @ts-expect-error no `gap`
		;() => <StrippedSvg gap />

		// good!
		;() => <StrippedSvg magic />
		;() => StrippedSvg.cssProps('margin')
	})
})
