// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { stringFromCssSelectors } from './stringFromCssSelectors'

describe('stringFromCssSelectors', () => {
	it('media queries', () => {
		expect(
			stringFromCssSelectors({
				h2: {
					fontSize: 32,
					fontWeight: 700,
				},

				'@media(pointer:fine)': {
					/* Firefox */
					scrollbarWidth: 123,
					scrollbarColor: `red blue`,

					/* Chrome, Edge, and Safari */
					'*::-webkit-scrollbar': {
						minWidth: 16,
					},

					'@media(nested-test)': {
						backgroundColor: 123,
					},
				},
			} as never), // TODO: fix typings
		).toBe(
			'h2{font-size:32px;font-weight:700;}@media(pointer:fine){scrollbar-width:123px;scrollbar-color:red blue;*::-webkit-scrollbar{min-width:16px;}@media(nested-test){background-color:123px;}}',
		)
	})
})
