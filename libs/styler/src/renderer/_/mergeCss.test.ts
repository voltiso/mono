// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { flattenCss, mergeCss } from './mergeCss'

describe('mergeCss', () => {
	it('flatten', () => {
		expect(mergeCss({ _: { color: 'red' } })).toStrictEqual({ color: 'red' })

		expect(
			mergeCss({ _: { color: 'red' } }, { backgroundColor: 'blue' }),
		).toStrictEqual({ color: 'red', backgroundColor: 'blue' })

		expect(
			flattenCss({
				color: 'green',

				_: { '&[data-state=asd]': { color: 'purple' } },
			}),
		).toStrictEqual({
			'&[data-state=asd]': { color: 'purple' },
			color: 'green',
		})
	})

	it('simple', () => {
		expect(
			mergeCss({ color: 'red' }, { backgroundColor: 'blue' }),
		).toStrictEqual({ color: 'red', backgroundColor: 'blue' })
	})

	it('nested', () => {
		expect(
			mergeCss({ color: 'red' }, { _: { _: { backgroundColor: 'blue' } } }),
		).toStrictEqual({
			color: 'red',
			backgroundColor: 'blue',
		})

		expect(
			mergeCss(
				{ _: { color: 'red' } },
				{ _: { _: { backgroundColor: 'blue' } } },
			),
		).toStrictEqual({
			color: 'red',
			backgroundColor: 'blue',
		})
	})

	it('flatten - preserves order', () => {
		expect(
			Object.keys(
				flattenCss({
					color: 'green',

					_: {
						'&[data-state=asd]': {
							color: 'purple',
						},
					},
				}),
			),
		).toStrictEqual(['color', '&[data-state=asd]'])

		expect(
			Object.keys(
				flattenCss({
					_: {
						'&[data-state=asd]': {
							color: 'purple',
						},
					},

					color: 'green',
				}),
			),
		).toStrictEqual(['&[data-state=asd]', 'color'])
	})
})
