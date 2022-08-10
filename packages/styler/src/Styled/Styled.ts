// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { assert } from '@voltiso/assertor'
import type {
	MapOrUndefined,
	PickOptional,
	StaticError,
	Throw,
	UndefinedFromOptional,
} from '@voltiso/util'
import { assertNotPolluting, getKeys, isDefined } from '@voltiso/util'
import type { ComponentPropsWithRef } from 'react'

import type { IndexedCssProps, IndexedCssPropsSingle } from '~/_/CssProps'
import type {
	IStyledDataMod as IStyledDataModule,
	StyledData,
} from '~/_/StyledData'
import type { ChildElement } from '~/_/StyledData/_/ChildElement'
import type { GetModProps as GetModuleProps } from '~/_/StyledData/GetModProps'
import { STYLED_DATA, STYLED_TYPE_INFO } from '~/_/symbols'
import type { Css, CssObject } from '~/Css'
import type { MergeProps_, Props } from '~/react-types'
import type { IStylable } from '~/Stylable'
import type { StyledComponent } from '~/StyledComponent'

import type { $GetStyledProps as G } from '.'
import { isStyled } from '.'
import { getComponent } from './_/getComponent'
import { mergeCssProps } from './_/mergeCssProps'
import { mergeDefaults } from './_/mergeDefaults'
import type { ForcePatch_, Patch_, PatchRemoveProps_ } from './_/Patch'
import type { PropValue } from './_/PropValue'
import type { MapProps } from './_/Stack'
import type { StyleFromProps } from './_/StyleFromProps'
import type { PropsFromCssProps } from './_detail/PropsFromCssProps'

class Styled<P extends Props, C extends IStylable | null> {
	declare readonly [STYLED_TYPE_INFO]: { P: P }

	private readonly [STYLED_DATA]: StyledData<P, C>

	get component(): C {
		// eslint-disable-next-line security/detect-object-injection
		return this[STYLED_DATA].element
	}

	private _clone<NewData extends IStyledDataModule>(
		newData: NewData,
	): Patch_<this, GetModuleProps<NewData>> {
		return new Styled({
			element: isDefined(newData.element)
				? newData.element
				: // eslint-disable-next-line security/detect-object-injection
				  this[STYLED_DATA].element,

			stack: isDefined(newData.stack)
				? // eslint-disable-next-line security/detect-object-injection
				  [...this[STYLED_DATA].stack, ...newData.stack]
				: // eslint-disable-next-line security/detect-object-injection
				  this[STYLED_DATA].stack,

			defaults: mergeDefaults(
				// eslint-disable-next-line security/detect-object-injection
				this[STYLED_DATA].defaults,
				newData.defaults,
				newData.domDefaults,
			),

			domDefaults: mergeDefaults(
				// eslint-disable-next-line security/detect-object-injection
				this[STYLED_DATA].domDefaults,
				newData.domDefaults,
			),

			cssProps: mergeCssProps(
				// eslint-disable-next-line security/detect-object-injection
				this[STYLED_DATA].cssProps,
				newData.cssProps,
			) as never,
		}) as never
	}

	constructor(data: StyledData<P, C>) {
		// eslint-disable-next-line security/detect-object-injection
		this[STYLED_DATA] = data

		const r =
			data.element === null
				? <E extends IStylable>(
						element: E,
				  ): StyledComponent<MergeProps_<ComponentPropsWithRef<E>, P>> => {
						if (isStyled(element)) return element as never

						return this._clone({ element }) as never
				  }
				: getComponent(data as never)

		Object.setPrototypeOf(r, this)
		// eslint-disable-next-line no-constructor-return
		return r as never
	}

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
	css(style: Css): Patch_<this>

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
	css(styleFromProps: StyleFromProps<G<P, C>>): Patch_<this>

	css(style: Css | StyleFromProps<G<P, C>>): Patch_<this> {
		const stackNode =
			typeof style === 'function' ? { getStyle: style } : { style }

		return this._clone({ stack: [stackNode] } as never) as never
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
	cssProps<PropNames extends (keyof CssObject & string)[]>(
		...propNames: PropNames
	): Patch_<this, Pick<CssObject, PropNames[number]>> {
		// Patch<this, { [k in PropNames[number]]?: CssObject[k] | undefined }>

		const cssProps = {} as IndexedCssProps

		for (const propName of propNames) {
			assertNotPolluting(cssProps, propName)

			// eslint-disable-next-line security/detect-object-injection
			cssProps[propName] = [
				// eslint-disable-next-line security/detect-object-injection
				...(cssProps[propName] || []),
				(value: unknown) => ({ [propName]: value }),
			]
		}

		return this._clone({
			stack: [{ removeProps: propNames as never }],
			cssProps,
		}) as never
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
		style: Css,
	): Patch_<this, { [k in PropName]?: boolean | undefined }>

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
		// eslint-disable-next-line etc/no-misused-generics
		PV,
		StyleFromProp extends (propValue?: PV) => Css,
	>(
		propName: PropName,
		styleFromProp: StyleFromProp,
	): Parameters<StyleFromProp> extends []
		? Patch_<this, { [k in PropName]?: boolean | undefined }>
		: Patch_<this, { [k in PropName]?: PV | undefined }>

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
		styleFromProp: (propValue: PV) => Css,
	): Patch_<this, { [k in PropName]: PV }>

	newCssProp<
		PropName extends string,
		S extends Css | ((propValue: unknown) => Css),
	>(propName: PropName, style: S): never {
		// Patch<this, { [k in PropName]?: PropValueFromCssProp<S> }>
		return this._clone({
			stack: [
				{
					removeProps: [propName as never],
				},
			],

			cssProps: {
				[propName]: style,
			},
		}) as never
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
	newCssProps<CP extends IndexedCssPropsSingle>(
		cssProps: CP,
	): Patch_<this, PropsFromCssProps<CP>> {
		return this._clone({
			stack: [
				{
					removeProps: getKeys(cssProps),
				},
			],

			cssProps,
		}) as never
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
	prop<Name extends keyof G<P, C>>(
		name: Name,
		value: PropValue<G<P, C>, G<P, C>[Name]>,
	): ForcePatch_<this, { [k in Name]?: G<P, C>[Name] | undefined }>

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
		Name extends keyof G<P, C> &
			keyof {
				[k in keyof G<P, C> as boolean extends G<P, C>[k] ? k : never]: never
			},
	>(name: Name): ForcePatch_<this, { [k in Name]?: G<P, C>[Name] | undefined }>

	prop<Name extends keyof G<P, C> & string>(
		name: Name,
		value?: PropValue<G<P, C>, G<P, C>[Name]>,
	): ForcePatch_<this, { [k in Name]?: G<P, C>[Name] | undefined }> {
		const myValue = arguments.length === 1 ? true : value
		// assert(typeof myValue !== 'undefined')
		return this._clone({
			stack: [{ props: { [name]: myValue } }],
		}) as never
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
	props<PP extends Partial<G<P, C>>>(
		props: PP,
	): ForcePatch_<
		this,
		{
			[k in keyof PP]?: k extends keyof G<P, C> ? G<P, C>[k] | undefined : never
		}
	> {
		return this._clone({
			stack: [{ props }],
		}) as never
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
	computeProp<Name extends keyof G<P, C> & string>(
		name: Name,
		propFromProps: (props: G<P, C>) => G<P, C>[Name],
	): Patch_<this> {
		return this._clone({
			stack: [
				{
					mapProps: ((p: G<P, C>) => ({
						[name as keyof G<P, C>]: propFromProps(p),
					})) as never,
				},
			],
		}) as never
	}

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
	 * @param mapProp - Function returning prop value, based on previous optional prop value
	 * @returns Builder for further chaining
	 */
	mapProp<PropName extends keyof G<P, C>, TT>(
		propName: PropName,
		mapProp: (x?: TT) => G<P, C>[PropName],
	): ForcePatch_<this, { [k in PropName]?: TT | undefined }>

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
	mapProp<PropName extends keyof G<P, C>, TT>(
		propName: PropName,
		mapProp: (x: TT) => G<P, C>[PropName],
	): ForcePatch_<this, { [k in PropName]: TT }>

	mapProp<PropName extends keyof G<P, C>, TT>(
		propName: PropName,
		mapProp: (x?: TT) => G<P, C>[PropName],
	): ForcePatch_<this, { [p in PropName]?: TT | undefined }> {
		return this._clone({
			stack: [
				{
					mapProps: (p: G<P, C>) => ({
						...p,
						// eslint-disable-next-line security/detect-object-injection
						[propName]: mapProp(p[propName] as never),
					}),
				},
			] as never,
		}) as never
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
	mapProps<MP extends MapProps<G<P, C>, G<P, C>>>(
		mapProps: MP,
	): PatchRemoveProps_<this, keyof ReturnType<MP>> {
		return this._clone({
			stack: [{ mapProps }] as never,
		}) as never
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
	): Patch_<this, { [k in PropName]: boolean }>

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
	 * @param _exampleValue - Unused example prop value (used only for type inference)
	 * @returns Builder for further chaining
	 */
	newRequiredProp<PropName extends string, PV>(
		propName: PropName,

		_exampleValue: PV,
	): Patch_<this, { [k in PropName]: PV }>

	newRequiredProp<PropName extends string, PV>(
		propName: PropName,

		_exampleValue?: PV,
	): Patch_<this, { [k in PropName]: PV }> {
		return this._clone({
			stack: [
				{
					removeProps: [propName],
				},
			],
		}) as never
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
	): Patch_<this, { [k in PropName]: boolean }>

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
	 * @param _exampleValue - Unused example prop value (used only for type inference)
	 * @returns Builder for further chaining
	 */
	newRequiredDomProp<PropName extends string, PV>(
		propName: PropName,

		_exampleValue: PV,
	): Patch_<this, { [k in PropName]: PV }>

	newRequiredDomProp<PropName extends string, PV>(
		_propName: PropName,

		_exampleValue?: PV,
	): Patch_<this, { [k in PropName]: PV }> {
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
	): Patch_<this, { [k in PropName]?: boolean | undefined }>

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
	): Patch_<this, { [k in PropName]?: PV | undefined }>

	newProp<PropName extends string, PV>(
		propName: PropName,
		defaultValue?: PV,
	): Patch_<this, { [k in PropName]?: PV | undefined }> {
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
		}) as never
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
	): Patch_<this, { [k in PropName]?: boolean | undefined }>

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
	): Patch_<this, { [k in PropName]?: PV | undefined }>

	newDomProp<PropName extends string, PV>(
		propName: PropName,
		defaultValue?: PV,
	): Patch_<this, { [k in PropName]?: PV | undefined }> {
		const myDefaultValue = arguments.length === 2 ? defaultValue : false
		return this._clone({
			domDefaults: {
				[propName]: myDefaultValue,
			},
		}) as never
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
	 * @param _exampleValues - Unused example values (used only for type inference)
	 * @returns Builder for further chaining
	 */
	newRequiredProps<PP extends Props>(_exampleValues: PP): Patch_<this, PP> {
		return this._clone({
			stack: [
				{
					removeProps: getKeys(_exampleValues),
				},
			],
		}) as never
	}

	//

	//

	/**
	 * Define new optional props, defaulting to `defaultValues`
	 *
	 * - DO NOT provide `NewProps` type - it should be inferred. To provide custom
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
		defaultValues?: Partial<UndefinedFromOptional<PP>> &
			Required<PickOptional<UndefinedFromOptional<Omit<PP, 'children'>>>>,
	): Patch_<this, { [k in keyof PP]?: PP[k] | undefined }> {
		return this._clone({
			stack: [{ removeProps: getKeys(defaultValues || {}) }],
			defaults: defaultValues || {},
		}) as never
	}

	//

	//

	/**
	 * Define props by providing `DefinedProps` type
	 *
	 * - Provide `NewProps` type To infer from `defaultValues`, use `newProps()` instead
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
	// eslint-disable-next-line etc/no-misused-generics
	defineProps<DefinedProps extends Props>(): keyof PickOptional<
		Omit<DefinedProps, 'children' | keyof P>
	> extends never
		? ForcePatch_<this, UndefinedFromOptional<DefinedProps>>
		: Throw<
				'defineProps requires providing default values for optional props' & {
					missingDefaults: keyof PickOptional<DefinedProps> & string // need to filter out `undefined` - TS bug??
				}
		  >

	/**
	 * Define props by providing `DefinedProps` type, defaulting to `defaultValues`
	 *
	 * - Provide `NewProps` type To infer from `defaultValues`, use `newProps()` instead
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
				Required<PickOptional<Omit<DefinedProps, 'children' | keyof P>>>
			>,
	): ForcePatch_<this, UndefinedFromOptional<DefinedProps>>

	// eslint-disable-next-line sonarjs/no-identical-functions
	defineProps<DefinedProps extends Props>(
		defaultValues?: Partial<UndefinedFromOptional<DefinedProps>> &
			MapOrUndefined<
				Required<PickOptional<Omit<DefinedProps, 'children' | keyof P>>>
			>,
	): ForcePatch_<this, UndefinedFromOptional<DefinedProps>> | StaticError {
		return this._clone({
			stack: [{ removeProps: getKeys(defaultValues || {}) }],
			defaults: defaultValues || {},
		}) as never
	}

	//

	//

	/**
	 * Define new required DOM props
	 *
	 * - DOM props are rendered to DOM (useful for `data-xxx` props)
	 * - No-op at runtime (type-only)
	 *
	 * @param _exampleValues - Unused example values (used only for type inference)
	 * @returns Builder for further chaining
	 */

	newRequiredDomProps<PP extends Props>(_exampleValues: PP): Patch_<this, PP> {
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
	newDomProps<PP extends Props>(defaultValues: PP): Patch_<this, Partial<PP>> {
		return this._clone({
			domDefaults: defaultValues,
		}) as never
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
	makePropsRequired<PropName extends keyof G<P, C>>(
		..._propNames: PropName[]
	): ForcePatch_<this, { [k in PropName]-?: Exclude<G<P, C>[k], undefined> }> {
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
	makePropsOptional<PropName extends keyof G<P, C> & string>(
		..._propNames: PropName[]
	): ForcePatch_<this, { [k in PropName]+?: G<P, C>[k] | undefined }> {
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
	forgetProps<PropName extends keyof G<P, C> & string>(
		..._propNames: PropName[]
	): PatchRemoveProps_<this, PropName> {
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
	wrap(...childElements: ChildElement<G<P, C>>[]): Patch_<this> {
		return this._clone({ stack: [{ wrap: childElements }] }) as never
	}

	// wrapBefore(...childElements: ChildElement<P>[]): Patch<this> {
	// 	return this._clone({
	// 		stack: [{ wrap: childElements, isWrapBefore: true }],
	// 	}) as never
	// }
}

export { Styled as Styled_ }
