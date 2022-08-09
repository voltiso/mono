// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { VPartial } from '@voltiso/util'
import { assertNotPolluting, getKeys } from '@voltiso/util'
import type { ForwardedRef } from 'react'
import { createElement } from 'react'
import { useFela } from 'react-fela'

import type { CssProps } from '~/_/CssProps'
import type { StyledData } from '~/_/StyledData'
import type { Css } from '~/Css'
import type { Props } from '~/react-types'
import type { IStylable, OuterProps } from '~/Stylable'

import { consumeCssProps } from './consumeCssProps'
import { prepare } from './prepare'
import {
	isGetStyleNode,
	isMapPropsNode,
	isPropsNode,
	isRemovePropsNode,
	isStyleNode,
	isWrapNode,
} from './Stack'

export function render<P extends Props, C extends IStylable>(
	props: P & OuterProps,
	ref: ForwardedRef<unknown>,
	data: StyledData<P, C>,
) {
	// eslint-disable-next-line react-hooks/rules-of-hooks, destructuring/no-rename
	const { css: getFelaCss, theme } = useFela()

	const { css, ...otherProps } = props
	// const css = props.css
	// const otherProps = omitIfPresent(props, 'css')

	let p = ref ? { ...otherProps, ref } : otherProps

	const stack = data.stack

	const styles: Css[] = []

	if (typeof css !== 'undefined') styles.push(prepare(css, theme))

	const consumedCssProps = {} as VPartial<CssProps<P>>

	function consume(p: Props) {
		consumeCssProps({
			props: p,
			consumed: consumedCssProps,
			all: data.cssProps,
			theme,
			styles,
		})
	}

	consume(p)

	// let children = [] as (ReactElement | null)[]
	// let overrideChildren = false

	// let nextChildKey = 0

	for (let i = stack.length - 1; i >= 0; --i) {
		// eslint-disable-next-line security/detect-object-injection
		const node = stack[i]

		if (isRemovePropsNode(node)) {
			for (const prop of node.removeProps) delete p[prop as never]
		} else if (isStyleNode(node)) {
			styles.push(prepare(node.style, theme))
		} else if (isGetStyleNode(node)) {
			styles.push(prepare(node.getStyle({ ...data.defaults, ...p }), theme))
		} else if (isPropsNode(node)) {
			consume(node.props)
			p = { ...node.props, ...p }
		} else if (isWrapNode(node)) {
			// overrideChildren = true

			// eslint-disable-next-line no-loop-func
			const children = node.wrap.map((element, index) => {
				let props = {
					key: index,
				}

				if (typeof element === 'function')
					props = {
						...props,
						...data.defaults,
						...p,
					}

				return createElement(element as never, props)
			})

			p = { ...p, children }

			// children = node.isWrapBefore
			// 	? [...children, ...newChildElements]
			// 	: [...newChildElements, ...children]
		} else if (isMapPropsNode(node)) {
			p = {
				...p,
				...node.mapProps({ ...data.defaults, ...p } as never),
			}
		} else throw new Error('style: unknown stack Node')
	}

	for (const k of Object.keys(p) as (keyof typeof p)[]) {
		assertNotPolluting(p, k)
		// eslint-disable-next-line security/detect-object-injection
		p[k] = prepare(p[k], theme) as never
	}

	p = { ...data.domDefaults, ...p }

	const felaValue = getFelaCss([...styles].reverse() as never)

	const isReactNative = typeof felaValue !== 'string'

	function getFinalReactProps() {
		let finalClassName = felaValue

		if (typeof p.className === 'string')
			finalClassName = `${finalClassName} ${p.className as unknown as string}`

		finalClassName = finalClassName.trim()

		return finalClassName === '' ? p : { ...p, className: finalClassName }
	}

	function getFinalReactNativeProps() {
		let style = felaValue as Css

		if (p.style) style = { ...style, ...(p.style as unknown as object) }

		if (getKeys(style).length === 0) return p

		return { ...p, style }
	}

	const finalProps = isReactNative
		? getFinalReactNativeProps()
		: getFinalReactProps()

	// if (overrideChildren) {
	// 	finalProps = {
	// 		...finalProps,
	// 		children,
	// 	}
	// }

	return createElement(data.element as never, finalProps as never)
}
