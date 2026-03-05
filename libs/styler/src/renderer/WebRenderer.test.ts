// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import type { Unit } from '~/_'

import { WebRenderer } from './WebRenderer'

const options = { unit: 'px' as Unit }

describe('WebRenderer', () => {
	it('simple', () => {
		const renderer = new WebRenderer()

		const className = renderer.classNameFor(options, {
			_: {
				color: 'red',
			},

			backgroundColor: 'blue',
		})

		expect(className).toBe(`rQJi6g Gb-r5A`)
		// ).toBe(`_0 _1`)

		expect(renderer.flushStyle()).toBe(
			// `._0{background-color:blue}._1{color:red}`,
			`.rQJi6g{color:red;}.Gb-r5A{background-color:blue;}`,
		)
	})

	it('media query', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor(options, {
				_: {
					color: 'red',

					'@media (min-width: 100px)': {
						color: 'blue',
					},
				},
			}),
		).toBe(`qYy06Q`)
		// ).toBe(`_0`)

		expect(renderer.flushStyle()).toBe(
			// `@media (min-width: 100px){._0{color:blue}}._0{color:red}`,
			`.qYy06Q{color:red;}@media (min-width: 100px){.qYy06Q{color:blue;}}`,
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			// `@media (min-width: 100px){._0{color:blue}}._0{color:red}`,
			`.qYy06Q{color:red;}@media (min-width: 100px){.qYy06Q{color:blue;}}`,
		)
	})

	it('animationName', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor(options, {
				animationName: {
					'0%': {
						backgroundColor: 'red',
					},

					'100%': {
						backgroundColor: 'blue',
					},
				},
			} as never),

			/* cspell:disable-next-line */
		).toBe(`meviQw`)
		// ).toBe(`_0`)

		expect(renderer.flushStyle()).toBe(
			// `@keyframes _0{0%{background-color:red}100%{background-color:blue}}._0{animation-name:_0}`,
			/* cspell:disable-next-line */
			`@keyframes GzQ-KQ{0%{background-color:red;}100%{background-color:blue;}}.meviQw{-webkit-animation-name:GzQ-KQ;animation-name:GzQ-KQ;}`,
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			// `._0{animation-name:_0}@keyframes _0{0%{background-color:red}100%{background-color:blue}}`,
			/* cspell:disable-next-line */
			`.meviQw{-webkit-animation-name:GzQ-KQ;animation-name:GzQ-KQ;}@keyframes GzQ-KQ{0%{background-color:red;}100%{background-color:blue;}}`,
		)
	})

	it('flatten media query - preserves order', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor(options, {
				color: 'red',

				_: {
					'@media (min-width: 100px)': {
						color: 'blue',
					},
				},
			}),
		).toBe(`qYy06Q`)

		expect(renderer.flushStyle()).toBe(
			'.qYy06Q{color:red;}@media (min-width: 100px){.qYy06Q{color:blue;}}',
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			'.qYy06Q{color:red;}@media (min-width: 100px){.qYy06Q{color:blue;}}',
		)
	})

	it('vendor prefix', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor(options, {
				_: {
					backdropFilter: 'blur(10px)',
				},
			}),

			/* cspell:disable-next-line */
		).toBe(`IDEKYw`)

		expect(renderer.flushStyle()).toBe(
			/* cspell:disable-next-line */
			`.IDEKYw{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);}`,
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			/* cspell:disable-next-line */
			`.IDEKYw{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);}`,
		)
	})

	it('animationName with vendor prefix', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor(options, {
				animationName: {
					'0%': {
						/* cspell:disable-next-line */
						backdropFilter: 'blur(10px)',
					},

					'100%': {
						/* cspell:disable-next-line */
						backdropFilter: 'blur(0px)',
					},
				},
			} as never),

			/* cspell:disable-next-line */
		).toBe(`Anwm4w`)
		// ).toBe(`_0`)

		expect(renderer.flushStyle()).toBe(
			/* cspell:disable-next-line */
			`@keyframes _-ZQDZA{0%{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);}100%{-webkit-backdrop-filter:blur(0px);backdrop-filter:blur(0px);}}.Anwm4w{-webkit-animation-name:_-ZQDZA;animation-name:_-ZQDZA;}`,
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			/* cspell:disable-next-line */
			`.Anwm4w{-webkit-animation-name:_-ZQDZA;animation-name:_-ZQDZA;}@keyframes _-ZQDZA{0%{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);}100%{-webkit-backdrop-filter:blur(0px);backdrop-filter:blur(0px);}}`,
		)
	})
})
