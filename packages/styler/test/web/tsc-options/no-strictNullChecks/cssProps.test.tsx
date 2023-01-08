// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical, StaticError } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { style } from '~'

describe('cssProps', () => {
	it('works', () => {
		expect.assertions(0)

		const Button = style('button').cssProps('flex', 'backgroundColor')

		//
		;<Button /> // check if optional
	})

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
				StaticError &
					'Props already exist' & {
						duplicateProps: 'border' | 'gap'
					}
			>
		>()

		const StrippedSvg = Svg.forgetProps('border', 'gap', 'fill')

		// @ts-expect-error no `fill`
		;() => <StrippedSvg fill='red' />

		// @ts-expect-error no `border`
		;() => <StrippedSvg border />

		// @ts-expect-error no `gap`
		;() => <StrippedSvg gap />

		// good!
		;() => <StrippedSvg magic />
		;() => StrippedSvg.cssProps('margin')
	})
})
