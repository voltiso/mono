// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jsdoc/informative-docs */
/* eslint-disable @typescript-eslint/unified-signatures */

import type {
	MapOrUndefined,
	PickOptional,
	StaticError,
	Throw,
	UndefinedFromOptional,
} from '@voltiso/util'
import { tryAt } from '@voltiso/util'

import type { IndexedCssPropsSingle } from '~/_/CssProps'
import type { IStyledDataMod, StyledData } from '~/_/StyledData'
import type { ChildElement } from '~/_/StyledData/_/ChildElement'
import { STYLED_DATA as DATA, STYLED_TYPE_INFO as $ } from '~/_/symbols'
import type {
	ForwardRefAndCssRenderFunction,
	ForwardRefRenderFunction,
	Props,
} from '~/react-types'
import type { Stylable } from '~/Stylable'
import type { StyledSubject, StyledTypeInfo } from '~/StyledTypeInfo'

import type { $GetStyledLikeProps as P } from './_'
import { getComponent } from './_/getComponent'
import { mergeCssProps } from './_/mergeCssProps'
import { mergeDefaults } from './_/mergeDefaults'
import type { ForcePatch, Patch, PatchRemoveProps } from './_/Patch'
import type { PropValue } from './_/PropValue'
import type { MapProps } from './_/Stack'
import type { RelaxedStyleFromProps, StyleFromProps } from './_/StyleFromProps'
import type { PropsFromCssProps } from './_detail/PropsFromCssProps'
import type {
	GetStyledCss as C,
	GetStyledRelaxedCss as RelaxedC,
	GetStyledTypeInfo as G,
} from './GetStyledTypeInfo'
import type { IStyled } from './IStyled'
import { isStyled } from './IStyled'

export class Styled<$ extends Partial<StyledTypeInfo>> {
	declare readonly [$]: G<$>
	// eslint-disable-next-line es-x/no-class-instance-fields
	readonly [DATA]: StyledData<G<$>, C<$>>

	get component(): G<$>['Component'] {
		return this[DATA].component as never
	}

	private _clone<NewData extends IStyledDataMod<C<$>>>(
		newData: NewData,
	): never {
		if (newData.stack) {
			const alreadyHaveCustomCss = tryAt(this[DATA].stack, -1)?.customCss
			const incomingCustomCss = newData.customCss

			if (alreadyHaveCustomCss ?? incomingCustomCss) {
				const customCss = { ...alreadyHaveCustomCss, ...incomingCustomCss }
				// eslint-disable-next-line no-param-reassign
				newData = {
					...newData,
					stack: newData.stack.map(node => ({ ...node, customCss })),
				}
			}
		}

		return new Styled({
			component: (newData.component || this[DATA].component) as never,

			stack: newData.stack
				? [...this[DATA].stack, ...newData.stack]
				: this[DATA].stack,

			defaults: mergeDefaults(
				this[DATA].defaults,
				newData.defaults,
				newData.domDefaults,
			),

			domDefaults: mergeDefaults(this[DATA].domDefaults, newData.domDefaults),

			cssProps: mergeCssProps(this[DATA].cssProps, newData.cssProps) as never,
		}) as never
	}

	constructor(data: StyledData<G<$>, C<$>>) {
		// console.log('Styled constructor', data)
		this[DATA] = data

		const r =
			data.component === null
				? (component: Stylable) => {
						if (isStyled(component))
							return this._clone(component[DATA] as never)
						return this._clone({ component })
					}
				: getComponent(data as never)

		Object.setPrototypeOf(r, this)
		// eslint-disable-next-line no-constructor-return
		return r as never
	}

	//

	/** Forward ref (but not css), add all props of T */
	forwardRef<
		T extends StyledSubject, // e.g. HTMLButtonElement
	>(
		renderFunction: ForwardRefRenderFunction<T, $['Props']>,
	): ForcePatch<this, { Component: T }>

	/** Forward ref (but not css), add all props of T, add props P */
	forwardRef<T extends StyledSubject, P extends Props>(
		renderFunction: ForwardRefRenderFunction<T, P & $['Props']>,
	): ForcePatch<this, { Component: T; Props: P }>

	/** Forward ref and css */
	forwardRef<T extends StyledSubject>(
		renderFunction: ForwardRefAndCssRenderFunction<T, C<$>, $['Props']>,
	): ForcePatch<this, { Component: T }>

	/** Forward ref and css, add props P */
	forwardRef<T extends StyledSubject, P extends Props>(
		renderFunction: ForwardRefAndCssRenderFunction<T, C<$>, P & $['Props']>,
	): ForcePatch<this, { Component: T; Props: P }>

	//

	forwardRef<T extends StyledSubject, P extends Props>(
		renderFunction:
			| ForwardRefRenderFunction<T, P & $['Props']>
			| ForwardRefAndCssRenderFunction<T, C<$>, P & $['Props']>,
	): IStyled | StaticError {
		return this._clone({
			component: renderFunction as never,
		})
	}

	//

	/**
	 * Override CSS style
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').css({ backgroundColor: 'red' })
	 *
	 * <Button />
	 * ```
	 *
	 * @param style - CSS style to merge
	 * @returns Builder for further chaining
	 */
	css(style: C<$>): this

	/**
	 * Override CSS style, based on props
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newProps({big: false}).css(props => ({height: props.big ? '40px' : '20px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param styleFromProps - Function returning CSS style to merge, given props
	 * @returns Builder for further chaining
	 */
	css(styleFromProps: StyleFromProps<P<$>>): this

	css(style: C<$> | StyleFromProps<P<$>>): this {
		const stackNode =
			typeof style === 'function' ? { getStyle: style } : { style }

		return this._clone({ stack: [stackNode] } as never)
	}

	/**
	 * Override CSS style - relaxed typings to allow for any CSS selector
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').cssSelectors({ '* li': { backgroundColor: 'red' } })
	 *
	 * <Button />
	 * ```
	 *
	 * @example Same as:
	 *
	 * ```ts
	 * const Button = style('button').css({ _: { '* li': { backgroundColor: 'red' } } })
	 *
	 * <Button />
	 * ```
	 *
	 * @param style - CSS style to merge
	 * @returns Builder for further chaining
	 */
	cssSelectors(style: RelaxedC<$>): this

	/**
	 * Override CSS style, based on props
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newProps({big: false}).css(props => ({height: props.big ? '40px' : '20px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param styleFromProps - Function returning CSS style to merge, given props
	 * @returns Builder for further chaining
	 */
	cssSelectors(styleFromProps: RelaxedStyleFromProps<P<$>>): this

	cssSelectors(style: RelaxedC<$> | RelaxedStyleFromProps<P<$>>): this {
		return this.css(style as never)
	}

	/**
	 * Map props to CSS properties 1:1
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').cssProps('backgroundColor')
	 *
	 * <Button backgroundColor="red" />
	 * ```
	 *
	 * @param propNames - List of prop names to map
	 * @returns Builder for further chaining
	 */
	cssProps<PropNames extends (keyof C<$>)[]>(
		...propNames: PropNames
	): // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore TS2590: Expression produces a union type that is too complex to represent.
	Patch<this, { Props: Pick<C<$>, PropNames[number]> }> {
		// Patch<this, { [k in PropNames[number]]?: CssObject[k] | undefined }>

		const cssProps = {} as Record<string, unknown[]>

		for (const propName of propNames as string[]) {
			// assertNotPolluting(propName)

			cssProps[propName] = [
				...(cssProps[propName] || []),
				(value: unknown) => ({ [propName]: value }),
			]
		}

		return this._clone({
			stack: [{ removeProps: propNames as never }],
			cssProps: cssProps as never,
		})
	}

	/**
	 * Define a new optional boolean prop that maps to CSS style
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newCssProp('big', {height: '40px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param propName - Prop name
	 * @param style - Style to set when `propName` is truthy
	 * @returns Builder for further chaining
	 */
	newCssProp<PropName extends string>(
		propName: PropName,
		style: C<$>,
	): Patch<this, { Props: { [k in PropName]?: boolean | undefined } }>

	/**
	 * Define a new prop that maps to CSS style - #1: prop is optional
	 *
	 * - If a function without arguments is passed, a boolean prop is assumed
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newCssProp('size', (size?: number) => ({
	 * 	width: size,
	 * 	height: size,
	 * }))
	 *
	 * <Button size={24} />
	 * ```
	 *
	 * @param propName - Prop name
	 * @param styleFromProp - Function returning CSS style, based on prop value
	 * @returns Builder for further chaining
	 */
	newCssProp<
		PropName extends string,
		PV,
		StyleFromProp extends (propValue?: PV) => C<$>,
	>(
		propName: PropName,
		styleFromProp: StyleFromProp,
	): Parameters<StyleFromProp> extends []
		? Patch<this, { Props: { [k in PropName]?: boolean | undefined } }>
		: Patch<this, { Props: { [k in PropName]?: PV | undefined } }>

	/**
	 * Define a new prop that maps to CSS style - #2: prop is mandatory
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newCssProp('size', (size: number) => ({
	 * 	width: size,
	 * 	height: size,
	 * }))
	 *
	 * <Button size={24} />
	 * ```
	 *
	 * @param propName - Prop name
	 * @param styleFromProp - Function returning CSS style, based on prop value
	 * @returns Builder for further chaining
	 */
	newCssProp<PropName extends string, PV>(
		propName: PropName,
		styleFromProp: (propValue: PV) => C<$>,
	): Patch<this, { Props: { [k in PropName]: PV } }>

	newCssProp<PropName extends string, PV>(
		propName: PropName,
		style: C<$> | ((propValue: PV) => C<$>),
	): Patch<this, { Props: { [k in PropName]?: PV | boolean | undefined } }> {
		return this._clone({
			stack: [
				{
					removeProps: [propName as never],
				},
			],

			cssProps: {
				[propName]: style,
			},
		})
	}

	/**
	 * Define multiple new props that map to CSS styles
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newCssProps({
	 * 	red: { backgroundColor: 'red' },
	 * })
	 *
	 * <Button red />
	 * ```
	 *
	 * @param cssProps - Object mapping prop to CSS style, or to function
	 *   returning CSS style based on prop value
	 * @returns Builder for further chaining
	 */
	newCssProps<CP extends IndexedCssPropsSingle<C<$>>>(
		cssProps: CP,
	): Patch<this, { Props: PropsFromCssProps<CP, C<$>> }> {
		return this._clone({
			stack: [
				{
					removeProps: Object.keys(cssProps),
				},
			],

			cssProps,
		})
	}

	//

	/**
	 * Define new custom CSS Property
	 *
	 * @param customCssPropertyName - Name of the new CSS custom property
	 * @param style - CSS styles object
	 * @returns Builder for further chaining
	 */
	newCustomCssProperty<CssName extends string>(
		customCssPropertyName: CssName,
		style: C<$>,
	): Patch<this, { CustomCss: { [k in CssName]?: boolean | undefined } }>

	/**
	 * Define new custom CSS Property
	 *
	 * @param customCssPropertyName - Name of the new CSS custom property
	 * @param getStyle - Function returning CSS styles object
	 * @returns Builder for further chaining
	 */
	newCustomCssProperty<CssName extends string, PV>(
		customCssPropertyName: CssName,
		getStyle: (propertyValue: PV) => C<$>,
	): Patch<this, { CustomCss: { [k in CssName]?: PV | undefined } }>

	newCustomCssProperty<CssName extends string, PV>(
		customCssPropertyName: CssName,
		style: C<$> | ((cssValue: unknown) => C<$>),
	): Patch<this, { CustomCss: { [k in CssName]?: PV | undefined } }> {
		return this._clone({
			stack: [{}],
			customCss: { [customCssPropertyName]: style },
		})
	}

	//

	/**
	 * Define new custom CSS properties
	 *
	 * @param customCssProperties - An object mapping new CSS property names to
	 *   CSS objects
	 * @returns Builder for further chaining
	 */
	newCustomCssProperties<CP extends IndexedCssPropsSingle<C<$>>>(
		customCssProperties: CP,
	): Patch<this, { CustomCss: PropsFromCssProps<CP, C<$>> }> {
		return this._clone({
			stack: [{}],
			customCss: customCssProperties,
		})
	}

	/**
	 * Set known prop
	 *
	 * @example
	 *
	 * ```ts
	 * const CheckBox = style('input').prop('type', 'checkbox'})
	 *
	 * <CheckBox />
	 * ```
	 *
	 * @param name - Prop name
	 * @param value - Prop value
	 * @returns Builder for further chaining
	 */
	prop<Name extends keyof P<$>>(
		name: Name,
		value: PropValue<P<$>, P<$>[Name]>,
	): ForcePatch<this, { Props: { [k in Name]?: P<$>[Name] | undefined } }>

	/**
	 * Set known boolean prop to `true`
	 *
	 * @example
	 *
	 * ```ts
	 * const CheckBox = style('input').prop('type', 'checkbox'}).prop('checked')
	 *
	 * <CheckBox />
	 * ```
	 *
	 * @param name - Prop name
	 * @returns Builder for further chaining
	 */
	prop<
		Name extends keyof P<$> &
			keyof {
				[k in keyof P<$> as boolean extends P<$>[k] ? k : never]: never
			},
	>(
		name: Name,
	): ForcePatch<this, { Props: { [k in Name]?: P<$>[Name] | undefined } }>

	prop<Name extends keyof P<$> & string>(
		name: Name,
		value?: PropValue<P<$>, P<$>[Name]>,
	): ForcePatch<this, { Props: { [k in Name]?: P<$>[Name] | undefined } }> {
		const myValue = arguments.length === 1 ? true : value
		// assert(typeof myValue !== 'undefined')
		return this._clone({
			stack: [{ props: { [name]: myValue } }],
		})
	}

	/**
	 * Set known props
	 *
	 * @example
	 *
	 * ```ts
	 * const CheckBox = style('input').props({type: 'checkbox', checked: true})
	 *
	 * <CheckBox />
	 * ```
	 *
	 * @param props - Props values to set
	 * @returns Builder for further chaining
	 */
	props<PP extends Partial<P<$>>>(
		props: PP,
	): ForcePatch<
		this,
		{
			Props: {
				[k in keyof PP]?: k extends keyof P<$> ? P<$>[k] | undefined : never
			}
		}
	> {
		return this._clone({
			stack: [{ props }],
		})
	}

	/**
	 * Set known prop based on all props
	 *
	 * @example
	 *
	 * ```ts
	 * const CheckedIfCheckBox = style('input').computeProp('checked', props => props.type === 'checkbox'})
	 *
	 * <CheckedIfCheckBox type="checkbox" />
	 * ```
	 *
	 * @param name - Prop name
	 * @param propFromProps - Function returning prop value given all props
	 * @returns Builder for further chaining
	 */
	computeProp<Name extends keyof P<$> & string>(
		name: Name,
		propFromProps: (props: P<$>) => P<$>[Name],
	): this {
		return this._clone({
			stack: [
				{
					mapProps: ((p: P<$>) => ({
						[name as keyof P<$>]: propFromProps(p),
					})) as never,
				},
			],
		})
	}

	//

	/**
	 * Map prop value (and possibly type) - #1: input prop optional
	 *
	 * @example
	 *
	 * ```ts
	 * const Input = style('input').mapProp('onChange', handler => event => handler(event.target.value))
	 *
	 * <Input onChange={text => console.log(text)} />
	 * ```
	 *
	 * @param propName - Prop name
	 * @param mapProp - Function returning prop value, based on previous optional
	 *   prop value
	 * @returns Builder for further chaining
	 */
	mapProp<PropName extends keyof P<$>, TT>(
		propName: PropName,
		mapProp: (x?: TT) => P<$>[PropName],
	): ForcePatch<this, { Props: { [k in PropName]?: TT | undefined } }>

	/**
	 * Map prop value (and possibly type) - #2: input prop mandatory
	 *
	 * @example
	 *
	 * ```ts
	 * const Input = style('input').mapProp('onChange', handler => event => handler(event.target.value))
	 *
	 * <Input onChange={text => console.log(text)} />
	 * ```
	 *
	 * @param propName - Prop name
	 * @param mapProp - Function returning prop value, based on previous mandatory
	 *   prop value
	 * @returns Builder for further chaining
	 */
	mapProp<PropName extends keyof P<$>, TT>(
		propName: PropName,
		mapProp: (x: TT) => P<$>[PropName],
	): ForcePatch<this, { Props: { [k in PropName]: TT } }>

	mapProp<PropName extends keyof P<$>, TT>(
		propName: PropName,
		mapProp: (x?: TT) => P<$>[PropName],
	): ForcePatch<this, { Props: { [p in PropName]?: TT | undefined } }> {
		return this._clone({
			stack: [
				{
					mapProps: (p: P<$>) =>
						({
							[propName]: mapProp(p[propName] as never),
						}) as never,
				},
			] as never,
		})
	}

	/**
	 * Map prop values
	 *
	 * @example
	 *
	 * ```ts
	 * const Input = style('input').mapProps({onChange: handler => event => handler(event.target.value)})
	 *
	 * <Input onChange={text => console.log(text)} />
	 * ```
	 *
	 * @param mapProps - Function returning some props, based on previous props
	 * @returns Builder for further chaining
	 */
	mapProps<MP extends MapProps<P<$>, P<$>>>(
		mapProps: MP,
	): PatchRemoveProps<this, keyof ReturnType<MP>> {
		return this._clone({
			stack: [{ mapProps }] as never,
		})
	}

	//

	//

	/**
	 * Define new required boolean prop
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newProp('big').css(props => ({height: props.big ? '40px' : '20px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param booleanPropName - Prop name
	 * @returns Builder for further chaining
	 */
	newRequiredProp<PropName extends string>(
		booleanPropName: PropName,
	): Patch<this, { Props: { [k in PropName]: boolean } }>

	/**
	 * Define new required prop
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newRequiredProp('big', false).css(props => ({height: props.big ? '40px' : '20px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param propName - Prop name
	 * @param _exampleValue - Unused example prop value (used only for type
	 *   inference)
	 * @returns Builder for further chaining
	 */
	newRequiredProp<PropName extends string, PV>(
		propName: PropName,
		_exampleValue: PV,
	): Patch<this, { Props: { [k in PropName]: PV } }>

	newRequiredProp<PropName extends string, PV>(
		propName: PropName,

		_exampleValue?: PV,
	): Patch<this, { Props: { [k in PropName]: PV } }> {
		return this._clone({
			stack: [
				{
					removeProps: [propName],
				},
			],
		})
	}

	//

	//

	/**
	 * Define new required boolean DOM prop
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newRequiredDomProp('data-foo')
	 *
	 * <Button data-foo={true} />
	 * ```
	 *
	 * - DOM props are rendered to DOM (useful for `data-xxx` props)
	 * - No-op at runtime (type-only)
	 *
	 *
	 * @param booleanPropName - Prop name
	 * @returns Builder for further chaining
	 */
	newRequiredDomProp<PropName extends string>(
		booleanPropName: PropName,
	): Patch<this, { Props: { [k in PropName]: boolean } }>

	/**
	 * Define new required DOM prop
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newRequiredDomProp('data-foo', '')
	 *
	 * <Button data-foo="bar" />
	 * ```
	 *
	 * - DOM props are rendered to DOM (useful for `data-xxx` props)
	 * - No-op at runtime (type-only)
	 *
	 *
	 * @param propName - Prop name
	 * @param _exampleValue - Unused example prop value (used only for type
	 *   inference)
	 * @returns Builder for further chaining
	 */
	newRequiredDomProp<PropName extends string, PV>(
		propName: PropName,
		_exampleValue: PV,
	): Patch<this, { Props: { [k in PropName]: PV } }>

	newRequiredDomProp<PropName extends string, PV>(
		_propName: PropName,
		_exampleValue?: PV,
	): Patch<this, { Props: { [k in PropName]: PV } }> {
		return this as never
	}

	//

	//

	/**
	 * Define new optional boolean prop defaulting to `false`
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newProp('big').css(props => ({height: props.big ? '40px' : '20px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param booleanPropName - Prop name
	 * @returns Builder for further chaining
	 */
	newProp<PropName extends string>(
		booleanPropName: PropName,
	): Patch<this, { Props: { [k in PropName]?: boolean | undefined } }>

	/**
	 * Define new optional prop defaulting to `defaultValue`
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newProp('big', false).css(props => ({height: props.big ? '40px' : '20px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param propName - Prop name
	 * @param defaultValue - Default value
	 * @returns Builder for further chaining
	 */
	newProp<PropName extends string, PV>(
		propName: PropName,
		defaultValue: PV,
	): Patch<this, { Props: { [k in PropName]?: PV | undefined } }>

	newProp<PropName extends string, PV>(
		propName: PropName,
		defaultValue?: PV,
	): Patch<this, { Props: { [k in PropName]?: PV | undefined } }> {
		const myDefaultValue = arguments.length === 2 ? defaultValue : false
		return this._clone({
			stack: [
				{
					removeProps: [propName],
				},
			],

			defaults: {
				[propName]: myDefaultValue,
			},
		})
	}

	//

	//

	/**
	 * Define new optional boolean DOM prop defaulting to `false`
	 *
	 * - DOM props are rendered to DOM (useful for `data-xxx` props)
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newDomProp('data-foo', '')
	 *
	 * <Button data-foo="bar" />
	 * ```
	 *
	 * @param booleanPropName - Prop name
	 * @returns Builder for further chaining
	 */
	newDomProp<PropName extends string>(
		booleanPropName: PropName,
	): Patch<this, { Props: { [k in PropName]?: boolean | undefined } }>

	/**
	 * Define new optional DOM prop defaulting to `defaultValue`
	 *
	 * - DOM props are rendered to DOM (useful for `data-xxx` props)
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newDomProp('data-foo', 'bar')
	 *
	 * <Button data-foo="bar" />
	 * ```
	 *
	 * @param propName - Prop name
	 * @param defaultValue - Default value
	 * @returns Builder for further chaining
	 */
	newDomProp<PropName extends string, PV>(
		propName: PropName,
		defaultValue: PV,
	): Patch<this, { Props: { [k in PropName]?: PV | undefined } }>

	newDomProp<PropName extends string, PV>(
		propName: PropName,
		defaultValue?: PV,
	): Patch<this, { Props: { [k in PropName]?: PV | undefined } }> {
		const myDefaultValue = arguments.length === 2 ? defaultValue : false
		return this._clone({
			domDefaults: {
				[propName]: myDefaultValue,
			},
		})
	}

	//

	//

	/**
	 * Define new required props
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newRequiredProps({big: false}).css(props => ({height: props.big ? '40px' : '20px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param _exampleValues - Unused example values (used only for type
	 *   inference)
	 * @returns Builder for further chaining
	 */
	newRequiredProps<PP extends Props>(
		_exampleValues: PP,
	): Patch<this, { Props: PP }> {
		return this._clone({
			stack: [
				{
					removeProps: Object.keys(_exampleValues),
				},
			],
		})
	}

	//

	//

	/**
	 * Define new optional props, defaulting to `defaultValues`
	 *
	 * - DO NOT provide the `PP` type - it should be inferred. To provide custom
	 *   Props type, use `defineProps<DefinedProps>()` instead
	 * - To render props to DOM, use `newDomProps` instead
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newProps({big: false}).css(props => ({height: props.big ? '40px' : '20px'})
	 *
	 * <Button big />
	 * ```
	 *
	 * @param defaultValues - Required for all props
	 * @returns Builder for further chaining
	 */
	newProps<PP extends Props>(
		defaultValues: PP, // Partial<UndefinedFromOptional<PP>> &
		// Required<PickOptional<UndefinedFromOptional<Omit<PP, 'children'>>>>,
	): Patch<this, { Props: { [k in keyof PP]?: PP[k] | undefined } }> {
		return this._clone({
			stack: [{ removeProps: Object.keys(defaultValues) }],
			defaults: defaultValues,
		})
	}

	//

	//

	/**
	 * Define props by providing `DefinedProps` type
	 *
	 * - Provide `NewProps` type
	 * - To infer from `defaultValues`, use `newProps()` instead
	 * - To render props to DOM, use `newDomProps` instead
	 *
	 * @example
	 *
	 * ```ts
	 * type Props = { type: 'checkbox' | 'text' }
	 * const Input = style('input').defineProps<Props>()
	 * ```
	 *
	 * @returns Builder for further chaining
	 */
	defineProps<DefinedProps extends Props>(): keyof PickOptional<
		Omit<DefinedProps, 'children' | keyof $['Props']>
	> extends never
		? ForcePatch<this, { Props: UndefinedFromOptional<DefinedProps> }>
		: Throw<
				'defineProps requires providing default values for optional props' & {
					/** Need to filter out `undefined` - TS bug?? */
					missingDefaults: keyof PickOptional<DefinedProps> & string
				}
			>

	/**
	 * Define props by providing `DefinedProps` type, defaulting to
	 * `defaultValues`
	 *
	 * - Provide `NewProps` type To infer from `defaultValues`, use `newProps()`
	 *   instead
	 * - To render props to DOM, use `newDomProps` instead
	 *
	 * @example
	 *
	 * ```ts
	 * type Props = { type: 'checkbox' | 'text'; color: string }
	 * const Input = style('input').defineProps<Props>({ color: 'red' })
	 * ```
	 *
	 * @param defaultValues - Required for props that are both optional and not
	 *   already present
	 * @returns Builder for further chaining
	 */
	defineProps<DefinedProps extends Props>(
		defaultValues: Partial<UndefinedFromOptional<DefinedProps>> &
			MapOrUndefined<
				Required<
					PickOptional<Omit<DefinedProps, 'children' | keyof $['Props']>>
				>
			>,
	): ForcePatch<this, { Props: UndefinedFromOptional<DefinedProps> }>

	// eslint-disable-next-line sonarjs/function-return-type
	defineProps<DefinedProps extends Props>(
		defaultValues?: Partial<UndefinedFromOptional<DefinedProps>> &
			MapOrUndefined<
				Required<
					PickOptional<Omit<DefinedProps, 'children' | keyof $['Props']>>
				>
			>,
	):
		| ForcePatch<this, { Props: UndefinedFromOptional<DefinedProps> }>
		| StaticError {
		return this._clone({
			stack: [{ removeProps: Object.keys(defaultValues ?? {}) }],
			defaults: defaultValues ?? {},
		})
	}

	//

	//

	/**
	 * Define new required DOM props
	 *
	 * - DOM props are rendered to DOM (useful for `data-xxx` props)
	 * - No-op at runtime (type-only)
	 *
	 * @param _exampleValues - Unused example values (used only for type
	 *   inference)
	 * @returns Builder for further chaining
	 */

	newRequiredDomProps<PP extends Props>(
		_exampleValues: PP,
	): Patch<this, { Props: PP }> {
		return this as never
	}

	/**
	 * Define new optional DOM props, defaulting to `defaultValues`
	 *
	 * - DOM props are rendered to DOM (useful for `data-xxx` props)
	 *
	 * @example
	 *
	 * ```ts
	 * const Button = style('button').newDomProps({'data-foo': 'bar'})
	 *
	 * <Button data-foo="baz" />
	 * ```
	 *
	 * @param defaultValues - Default values
	 * @returns Builder for further chaining
	 */
	newDomProps<PP extends Props>(
		defaultValues: PP,
	): Patch<this, { Props: Partial<PP> }> {
		return this._clone({
			domDefaults: defaultValues,
		})
	}

	//

	//

	/**
	 * No-op at runtime (type-only)
	 *
	 * @example
	 *
	 * ```ts
	 * const Img = style('img').makePropsRequired('alt')
	 * ```
	 *
	 * @param _propNames - Prop names
	 * @returns Builder for further chaining
	 */
	makePropsRequired<PropName extends keyof P<$>>(
		..._propNames: PropName[]
	): ForcePatch<
		this,
		{ Props: { [k in PropName]-?: Exclude<P<$>[k], undefined> } }
	> {
		return this as never
	}

	/**
	 * WARNING: Props are required for a reason - use with caution
	 *
	 * - No-op at runtime (type-only)
	 *
	 * @example
	 *
	 * ```ts
	 * const Img = style('img')
	 * 	.makePropsRequired('alt')
	 * 	.makePropsOptional('alt')
	 * ```
	 *
	 * @param _propNames - Prop names (unused at runtime; type-only)
	 * @returns Builder for further chaining
	 */
	makePropsOptional<PropName extends keyof P<$> & string>(
		..._propNames: PropName[]
	): ForcePatch<this, { Props: { [k in PropName]+?: P<$>[k] | undefined } }> {
		return this as never
	}

	/**
	 * Remove props from TS typing
	 *
	 * - No-op at runtime (type-only)
	 *
	 * @example
	 *
	 * ```ts
	 * const CheckBoxForever = style('input')
	 * 	.props({ type: 'checkbox' })
	 * 	.forgetProps('type')
	 * ```
	 *
	 * @param _propNames - Unused in runtime - for type inference only
	 * @returns Builder for further chaining
	 */
	forgetProps<PropName extends keyof P<$> & string>(
		..._propNames: PropName[]
	): ForcePatch<this, { Props: { [k in PropName]?: never } }> {
		return this as never
	}

	/**
	 * Wrap provided components as `children`
	 *
	 * - If you pass `children` when creating the final resulting element, they'll
	 *   be passed as `children` prop to the children wrapped here
	 *
	 * @example
	 *
	 * ```ts
	 * const WrappedButton = style('div').wrap(props => (
	 * 	<button>{props.children}</button>
	 * )) // `button` with custom content inside a `div`
	 *
	 * <WrappedButton>Click Me!</WrappedButton>
	 * ```
	 *
	 * @param childElements - Children to wrap
	 * @returns Builder for further chaining
	 */
	wrap(...childElements: ChildElement<P<$>>[]): this {
		return this._clone({ stack: [{ wrap: childElements }] })
	}

	// wrapBefore(...childElements: ChildElement<P>[]): Patch<this> {
	// 	return this._clone({
	// 		stack: [{ wrap: childElements, isWrapBefore: true }],
	// 	}) as never
	// }
}
