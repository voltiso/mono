// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable import/no-named-as-default-member */

import { $fastAssert, getKeys, tryAt } from '@voltiso/util'
import type { ForwardedRef } from 'react'
// ! has to be default-imported - otherwise Next.js will complain
import React from 'react'

import type { IForwardRefRenderFunction, StyledData } from '~/_/StyledData'
import { useRenderer, useTheme } from '~/client'
import type { Css } from '~/Css/Css'
import type {
	IForwardedRef,
	IForwardRefAndCssRenderFunction,
	Props,
} from '~/react-types'
import type { WebRenderer } from '~/renderer'
import { isWebRenderer } from '~/renderer'
import type { NativeRenderer } from '~/renderer/NativeRenderer'
import { rscRenderer } from '~/server'
import type { NativeInnerProps, OuterProps, WebInnerProps } from '~/Stylable'
import type { StyledTypeInfo } from '~/StyledTypeInfo'
import { isServerComponent } from '~/util/isServerComponent'

import { consumeCssProps } from './consumeCssProps'
import { maybeFlushRscStyle } from './maybeFlushRscStyle'
import { prepare } from './prepare'
import {
	isGetStyleNode,
	isMapPropsNode,
	isPropsNode,
	isRemovePropsNode,
	isStyleNode,
	isWrapNode,
} from './Stack'

/** @internal */
function _getCssArray(css: Css | readonly Css[] | undefined): Css[] {
	return Array.isArray(css) ? (css as Css[]) : css ? [css as Css] : []
}

/** @internal */
function _prepareProps(
	props: object,
	params: { theme: object | null; customCss?: object | undefined },
) {
	const result = {} as Record<string, unknown>
	for (const [prop, value] of Object.entries(props)) {
		result[prop] = prepare(value, { ...params, isPreparingProps: true })
	}
	return result
}

/** @internal */
function _getFinalWebProps(className: string, props: WebInnerProps) {
	let finalClassName = className

	if (typeof props.className === 'string')
		finalClassName = `${finalClassName} ${props.className as unknown as string}`

	finalClassName = finalClassName.trim()

	return finalClassName === '' ? props : { ...props, className: finalClassName }
}

/** @internal */
function _getFinalNativeProps(css: Css, props: NativeInnerProps) {
	let style = css

	if (props.style) style = { ...style, ...(props.style as unknown as object) }

	if (getKeys(style).length === 0) return props

	return { ...props, style }
}

export function render<$ extends StyledTypeInfo>(
	props: $['Props'] & OuterProps,
	ref: ForwardedRef<unknown>,
	data: StyledData<$>,
) {
	const renderer: WebRenderer | NativeRenderer | null = isServerComponent
		? rscRenderer
		: // eslint-disable-next-line react-hooks/rules-of-hooks
			useRenderer()

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (React.useInsertionEffect && isWebRenderer(renderer)) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		React.useInsertionEffect(() => {
			const style = renderer.flushStyle()
			if (!style) return

			const node = document.createElement('style')
			// eslint-disable-next-line unicorn/prefer-dom-node-dataset
			node.setAttribute('data-voltiso', '')
			node.textContent = style
			document.head.append(node)
		})
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const theme = isServerComponent ? {} : useTheme()

	const { css, ...otherProps } = props
	// const css = props.css
	// const otherProps = omitIfPresent(props, 'css')

	let p = ref ? { ...otherProps, ref } : otherProps

	const stack = data.stack

	const finalCustomCss = tryAt(stack, -1)?.customCss

	// // ! BAD IDEA: prepare props - dangerous - do not pass customCss
	// for (const k of Object.keys(p) as (keyof typeof p)[]) {
	// 	if (k === 'children') continue // dangerous and slow

	// 	// assertNotPolluting(k)
	// 	// eslint-disable-next-line security/detect-object-injection
	// 	p[k] = prepare(p[k], { theme, isPreparingProps: true }) as never
	// }

	// eslint-disable-next-line etc/no-internal
	const cssArray = [..._getCssArray(css)].reverse()

	const styles: Css[] = []

	for (const css of cssArray) {
		styles.push(prepare(css, { theme, customCss: finalCustomCss }))
	}

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
		const node = stack[i]

		if (isRemovePropsNode(node)) {
			for (const prop of node.removeProps) delete p[prop as never]
		} else if (isStyleNode(node)) {
			styles.push(prepare(node.style, { theme, customCss: node.customCss }))
		} else if (isGetStyleNode(node)) {
			// eslint-disable-next-line etc/no-internal
			const props = _prepareProps(
				{ ...data.defaults, ...p },
				{ theme, customCss: node.customCss },
			)
			const style = node.getStyle(props)
			styles.push(
				prepare(style, {
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

				return React.createElement(element as never, props)
			})

			p = { ...p, children }

			// children = node.isWrapBefore
			// 	? [...children, ...newChildElements]
			// 	: [...newChildElements, ...children]
		} else if (isMapPropsNode(node)) {
			// eslint-disable-next-line etc/no-internal
			const inputProps = _prepareProps(
				{ ...data.defaults, ...p },
				{ theme, customCss: node.customCss },
			)
			p = {
				...p,
				...node.mapProps(inputProps),
			}
		}
	}

	p = { ...data.domDefaults, ...p }

	styles.reverse()

	const shouldForwardCss =
		typeof data.component === 'function' && data.component.length === 3

	if (shouldForwardCss) {
		$fastAssert(!('css' in p))
		// $assert('ref' in p)
		const { ref, ...finalProps } = p as { ref?: IForwardedRef }
		return maybeFlushRscStyle(
			// { renderer },
			(data.component as IForwardRefAndCssRenderFunction)(
				finalProps,
				ref,
				styles,
			),
		)
	}

	const renderedProps = isWebRenderer(renderer)
		? // eslint-disable-next-line etc/no-internal
			_getFinalWebProps(
				(renderer as unknown as WebRenderer | null)?.classNameFor(...styles) ||
					'',
				p,
			)
		: // eslint-disable-next-line etc/no-internal
			_getFinalNativeProps(
				(renderer as unknown as NativeRenderer | null)?.styleFor(...styles) ||
					{},
				p,
			)

	if (typeof data.component === 'function' && data.component.length >= 2) {
		const { ref, ...finalProps } = renderedProps as { ref: IForwardedRef }
		return maybeFlushRscStyle(
			// { renderer },
			(data.component as IForwardRefRenderFunction)(finalProps, ref),
		)
	}

	return maybeFlushRscStyle(
		// { renderer },
		React.createElement(data.component as never, renderedProps as never),
	)
}
