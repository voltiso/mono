// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFromAtomicStyle } from './stringFromAtomicStyle'

describe('stringFromAtomicStyle', () => {
	it('suffix and selectors', () => {
		expect(
			stringFromAtomicStyle({
				selectors: ['& button', 'div &'],
				style: 'color:red',
				mediaQueries: [],
			}),
		).toBe('& button,div &{color:red}')
	})

	it('media query', () => {
		expect(
			stringFromAtomicStyle({
				selectors: ['& button', 'div &'],
				style: 'color:red',

				mediaQueries: [
					'@media (min-width: 100px)',
					'@media (min-width: 200px)',
				],
			}),
		).toBe(
			'@media (min-width: 200px){@media (min-width: 100px){& button,div &{color:red}}}',
		)
	})
})
