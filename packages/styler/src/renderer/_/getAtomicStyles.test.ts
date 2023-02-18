// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { WebRenderer } from '../WebRenderer'
import { getAtomicStyles } from './getAtomicStyles'

describe('getAtomicStyles', () => {
	it('simple', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
				_: {
					color: 'red',
				},

				backgroundColor: 'blue',
			}),
		).toStrictEqual([
			{
				property: 'backgroundColor',
				selectors: ['&'],

				overrides: [
					{
						values: ['blue'],
						mediaQueries: [],
					},
				],
			},
			{
				property: 'color',
				selectors: ['&'],

				overrides: [
					{
						values: ['red'],
						mediaQueries: [],
					},
				],
			},
		])
	})

	it('selector', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
				'&:hover': {
					backgroundColor: 'blue',
				},
			}),
		).toStrictEqual([
			{
				property: 'backgroundColor',
				selectors: ['&:hover'],

				overrides: [
					{
						values: ['blue'],
						mediaQueries: [],
					},
				],
			},
		])
	})

	it('nested selector', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
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
				property: 'color',
				selectors: ['div > &:hover:active > span'],

				overrides: [
					{
						values: ['green'],
						mediaQueries: [],
					},
				],
			},

			{
				property: 'backgroundColor',
				selectors: ['div > &:hover:active > span:x'],

				overrides: [
					{
						values: ['blue'],
						mediaQueries: [],
					},
				],
			},
		])
	})

	it('nested media queries', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
				'@media (min-width: 100px)': {
					'@media (min-width: 200px)': {
						backgroundColor: 'blue',
					},
				} as never,
			}),
		).toStrictEqual([
			{
				property: 'backgroundColor',
				selectors: ['&'],

				overrides: [
					{
						values: ['blue'],

						mediaQueries: [
							'@media (min-width: 100px)',
							'@media (min-width: 200px)',
						],
					},
				],
			},
		])
	})

	it('nested media queries with selectors', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
				'@media (min-width: 100px)': {
					'@media (min-width: 200px)': {
						'&:hover': {
							backgroundColor: 'blue',
						},
					},
				} as never,
			}),
		).toStrictEqual([
			{
				property: 'backgroundColor',
				selectors: ['&:hover'],

				overrides: [
					{
						values: ['blue'],

						mediaQueries: [
							'@media (min-width: 100px)',
							'@media (min-width: 200px)',
						],
					},
				],
			},
		])
	})

	it('nested media queries with selectors and nested selectors', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
				'@media (min-width: 100px)': {
					'@media (min-width: 200px)': {
						'&:hover': {
							'&:active': {
								backgroundColor: 'blue',
							},
						},
					},
				} as never,
			}),
		).toStrictEqual([
			{
				property: 'backgroundColor',
				selectors: ['&:hover:active'],

				overrides: [
					{
						values: ['blue'],

						mediaQueries: [
							'@media (min-width: 100px)',
							'@media (min-width: 200px)',
						],
					},
				],
			},
		])
	})

	it('animationName', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
				animationName: 'fade-in' as never,
			}),
		).toStrictEqual([
			{
				property: 'animationName',
				selectors: ['&'],

				overrides: [
					{
						values: ['fade-in'],
						mediaQueries: [],
					},
				],
			},
		])
	})
})
