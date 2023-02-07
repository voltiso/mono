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
})
