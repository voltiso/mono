// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAtomicStyles } from './getAtomicStyles'

describe('getAtomicStyles', () => {
	it('simple', () => {
		expect(
			getAtomicStyles({
				_: {
					color: 'red',
				},

				backgroundColor: 'blue',
			}),
		).toStrictEqual([
			{
				style: 'background-color:blue',
				selectors: ['&'],
				mediaQueries: [],
			},
			{
				style: 'color:red',
				selectors: ['&'],
				mediaQueries: [],
			},
		])
	})

	it('selector', () => {
		expect(
			getAtomicStyles({
				'&:hover': {
					backgroundColor: 'blue',
				},
			}),
		).toStrictEqual([
			{
				style: 'background-color:blue',
				selectors: ['&:hover'],
				mediaQueries: [],
			},
		])
	})

	it('nested selector', () => {
		expect(
			getAtomicStyles({
				'div > &:hover': {
					'&:active > span': {
						color: 'green',

						':x': {
							backgroundColor: 'blue',
						},
					},
				},
			} as never),
		).toStrictEqual([
			{
				mediaQueries: [],
				selectors: ['div > &:hover:active > span'],
				style: 'color:green',
			},
			{
				mediaQueries: [],
				selectors: ['div > &:hover:active > span:x'],
				style: 'background-color:blue',
			},
		])
	})

	it('nested media queries', () => {
		expect(
			getAtomicStyles({
				'@media (min-width: 100px)': {
					'@media (min-width: 200px)': {
						backgroundColor: 'blue',
					},
				} as never,
			}),
		).toStrictEqual([
			{
				mediaQueries: [
					'@media (min-width: 100px)',
					'@media (min-width: 200px)',
				],

				selectors: ['&'],
				style: 'background-color:blue',
			},
		])
	})
})
