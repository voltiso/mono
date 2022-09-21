// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getKeys } from '@voltiso/util'
import type { ForwardedRef } from 'react'
import { createElement } from 'react'
import { useFela } from 'react-fela'

import type { StyledTypeInfo } from '~'
import type { StyledData } from '~/_/StyledData'
import type { Css } from '~/Css/Css'
import type { Props } from '~/react-types'
import type { OuterProps } from '~/Stylable'

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

export function render<$ extends StyledTypeInfo>(
	props: $['Props'] & OuterProps,
	ref: ForwardedRef<unknown>,
	data: StyledData<$>,
) {
	// eslint-disable-next-line react-hooks/rules-of-hooks, destructuring/no-rename
	const { css: getFelaCss, theme } = useFela()

	const { css, ...otherProps } = props
	// const css = props.css
	// const otherProps = omitIfPresent(props, 'css')

	let p = ref ? { ...otherProps, ref } : otherProps

	const stack = data.stack

	const finalCustomCss = stack.at(-1)?.customCss

	// ! prepare props - dangerous - do not pass customCss
	for (const k of Object.keys(p) as (keyof typeof p)[]) {
		// assertNotPolluting(k)
		// eslint-disable-next-line security/detect-object-injection
		p[k] = prepare(p[k], { theme }) as never
	}

	const styles: Css[] = []

	if (typeof css !== 'undefined')
		styles.push(prepare(css, { theme, customCss: finalCustomCss }))

	// const consumedCssProps = {} as $ extends any
	// 	? Required<Partial<CssProps<$['Props'], object>>>
	// 	: never

	function consume(props: Props, customCss?: object | undefined) {
		consumeCssProps({
			props,
			cssProps: data.cssProps,
			theme,
			styles,
			customCss,
		})
	}

	consume(p, finalCustomCss)

	for (let i = stack.length - 1; i >= 0; --i) {
		// eslint-disable-next-line security/detect-object-injection
		const node = stack[i]

		if (isRemovePropsNode(node)) {
			for (const prop of node.removeProps) delete p[prop as never]
		} else if (isStyleNode(node)) {
			styles.push(prepare(node.style, { theme, customCss: node.customCss }))
		} else if (isGetStyleNode(node)) {
			styles.push(
				prepare(node.getStyle({ ...data.defaults, ...p }), {
					theme,
					customCss: node.customCss,
				}),
			)
		} else if (isPropsNode(node)) {
			consume(node.props, node.customCss)
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
		}
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
		let style = felaValue as unknown as Css

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

	return createElement(data.component as never, finalProps as never)
}
