// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { WebRenderer } from '../WebRenderer'
import { getAtomicStyles } from './getAtomicStyles'

// eslint-disable-next-line sonarjs/sonar-max-lines-per-function
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
				property: 'color',
				selectors: ['&'],

				overrides: [
					{
						values: ['red'],
						mediaQueries: [],
					},
				],
			},
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
		])
	})

	it('array value', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
				backgroundColor: ['blue', 'red'] as never,
			}),
		).toStrictEqual([
			{
				property: 'backgroundColor',
				selectors: ['&'],

				overrides: [
					{
						values: ['blue', 'red'],
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

	it('flatten media query - preserves order', () => {
		expect(
			getAtomicStyles(new WebRenderer(), {
				display: 'flex',

				flexDirection: 'column',

				// _: {
				'@media (min-width: 100px)': {
					flexDirection: 'row',
				},
				// },
			}),
		).toStrictEqual([
			{
				overrides: [{ mediaQueries: [], values: ['flex'] }],
				property: 'display',
				selectors: ['&'],
			},
			{
				overrides: [{ mediaQueries: [], values: ['column'] }],
				property: 'flexDirection',
				selectors: ['&'],
			},
			{
				overrides: [
					{ mediaQueries: ['@media (min-width: 100px)'], values: ['row'] },
				],

				property: 'flexDirection',
				selectors: ['&'],
			},
		])

		expect(
			getAtomicStyles(new WebRenderer(), {
				display: 'flex',

				flexDirection: 'column',

				_: {
					'@media (min-width: 100px)': {
						flexDirection: 'row',
					},
				},
			}),
		).toStrictEqual([
			{
				overrides: [{ mediaQueries: [], values: ['flex'] }],
				property: 'display',
				selectors: ['&'],
			},
			{
				overrides: [{ mediaQueries: [], values: ['column'] }],
				property: 'flexDirection',
				selectors: ['&'],
			},
			{
				overrides: [
					{ mediaQueries: ['@media (min-width: 100px)'], values: ['row'] },
				],

				property: 'flexDirection',
				selectors: ['&'],
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
