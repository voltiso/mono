// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { stringFromAtomicStyle } from './stringFromAtomicStyle'

describe('stringFromAtomicStyle', () => {
	it('suffix and selectors', () => {
		expect(
			stringFromAtomicStyle({
				property: 'color',
				selectors: ['& button', 'div &'],

				overrides: [
					{
						values: ['red'],
						mediaQueries: [],
					},
				],
			}),
		).toBe('& button,div &{color:red;}')
	})

	it('media query', () => {
		expect(
			stringFromAtomicStyle({
				property: 'color',
				selectors: ['& button', 'div &'],

				overrides: [
					{
						values: ['red'],

						mediaQueries: [
							'@media (min-width: 100px)',
							'@media (min-width: 200px)',
						],
					},
				],
			}),
		).toBe(
			'@media (min-width: 200px){@media (min-width: 100px){& button,div &{color:red;}}}',
		)
	})

	it('auto unit', () => {
		expect(
			stringFromAtomicStyle({
				property: 'width',
				selectors: ['&'],

				overrides: [
					{
						values: [100],
						mediaQueries: [],
					},
				],
			}),
		).toBe('&{width:100px;}')
	})

	it('camel case', () => {
		expect(
			stringFromAtomicStyle({
				property: 'flexDirection',
				selectors: ['&'],

				overrides: [
					{
						values: ['row'],
						mediaQueries: [],
					},
				],
			}),
		).toBe(
			'&{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}',
		)
	})
})
