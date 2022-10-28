// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schemable,
	GetDeepShape_,
	GetShape_,
	InferSchema_,
	InputType_,
	OutputType_,
	Schemable,
	Type_,
} from '@voltiso/schemar.types'
import { getSchemableChild } from '@voltiso/schemar.types'
import type { PatchFor } from '@voltiso/util'
import {
	$assert,
	$AssumeType,
	assertNotPolluting,
	deleteIt,
	patch,
	patchUpdate,
} from '@voltiso/util'
import { BehaviorSubject } from 'rxjs'

import type {
	NestedSubjectChildOptions,
	NestedSubjectRootOptions,
	NestedSubjectWithSchemaRootOptions,
	ObserverDiContext,
} from './_'
import { isNestedSubjectChildOptions } from './_'
import { _nestedSubjectUpdateToRoot } from './_/_nestedSubjectUpdateToRoot'
import { _validate } from './_/_validate'

export function isWithGetShape(x: unknown): x is { getShape: unknown } {
	return typeof (x as { getShape: unknown } | null)?.getShape !== 'undefined'
}

export function isWithGetDeepShape(x: unknown): x is { getDeepShape: unknown } {
	return typeof (x as { getDeepShape: unknown } | null) !== 'undefined'
}

export class NestedSubjectImpl<S extends $$Schemable> {
	readonly _diContext: ObserverDiContext | undefined
	readonly _parent: NestedSubjectImpl<Schemable> | null = null
	readonly _parentKey: keyof any | null = null

	readonly _schemable: S | undefined
	// eslint-disable-next-line rxjs/no-exposed-subjects
	readonly _subject$: BehaviorSubject<Type_<S>>
	_exists: boolean

	get exists() {
		return this._exists
	}

	readonly _children: {
		[k in keyof GetShape_<S>]?: NestedSubjectImpl<GetShape_<S>[k]>
	} = {}

	get schemable(): S | undefined {
		// $assert(
		// 	typeof this._schemable !== 'undefined',
		// 	'get schemable() called on NestedSubject without schema',
		// )
		return this._schemable
	}

	get schema(): InferSchema_<S> | undefined {
		if (!this._schemable) return undefined
		$assert(this._diContext)
		return this._diContext.schema(this._schemable) as never
	}

	get shape(): GetShape_<S> | undefined {
		if (!this._schemable) return undefined
		const schema = this.schema
		$assert(isWithGetShape(schema))
		return schema.getShape as never
	}

	get deepShape(): GetDeepShape_<S> | undefined {
		if (!this._schemable) return undefined
		const schema = this.schema
		$assert(isWithGetDeepShape(schema))
		return schema.getDeepShape as never
	}

	get _() {
		return new Proxy(
			{},
			{
				get: (_target, property, _receiver) => {
					$assert(typeof property === 'string')
					return new NestedSubjectImpl({ parent: this, key: property }) as never
				},
			},
		)
	}

	constructor(options: NestedSubjectWithSchemaRootOptions<S>)
	constructor(options: NestedSubjectRootOptions)
	constructor(options: NestedSubjectChildOptions)

	constructor(
		options:
			| NestedSubjectWithSchemaRootOptions<S>
			| NestedSubjectRootOptions
			| NestedSubjectChildOptions,
	) {
		const proxyHandlers = {
			get: (_target: object, property: keyof any, receiver: unknown) => {
				if (property in this)
					return Reflect.get(this, property, receiver) as never
				else if (property in this._subject$ || typeof property !== 'string') {
					const result = Reflect.get(
						this._subject$,
						property,
						receiver,
					) as unknown
					if (typeof result === 'function')
						return result.bind(this._subject$) as never
					else return result
				} else {
					assertNotPolluting(property)
					if (property in this._children)
						// eslint-disable-next-line security/detect-object-injection
						return this._children[property] as never
					else {
						// console.log('create child', property)
						return new NestedSubjectImpl({
							parent: this,
							key: property,
						}) as never
					}
				}
			},
		}

		if (isNestedSubjectChildOptions(options)) {
			assertNotPolluting(options.key)
			this._diContext = options.parent._diContext
			this._parent = options.parent
			this._parentKey = options.key

			// console.log({ PARENT_IS: options.parent, CHILD_KEY: options.key })

			// console.log({
			// 	PARENT: options.parent._schemable,
			// 	SELF: getSchemableChild(options.parent._schemable, options.key),
			// })

			this._schemable = options.parent.schemable
				? (getSchemableChild(options.parent.schemable, options.key) as never)
				: undefined

			this._subject$ = new BehaviorSubject(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				options.parent._subject$.value?.[options.key],
			) as never

			this._exists =
				typeof options.parent._subject$.value === 'object' &&
				Object.prototype.hasOwnProperty.call(
					options.parent._subject$.value,
					options.key,
				)

			const self = new Proxy(this, proxyHandlers)

			$assert(!(options.key in options.parent._children))
			this._parent._children[options.key as never] = self as never
			// eslint-disable-next-line no-constructor-return
			return self as never
		} else {
			$AssumeType<NestedSubjectWithSchemaRootOptions<S>>(options)
			this._diContext = options.diContext

			this._schemable = options.schemable

			this._subject$ = new BehaviorSubject(
				// eslint-disable-next-line etc/no-internal
				_validate({
					diContext: this._diContext,
					schemable: this._schemable,

					value:
						typeof options.initialValue !== 'undefined'
							? options.initialValue
							: {},
				}),
			) as never

			this._exists = true

			const self = new Proxy(this, proxyHandlers)
			// eslint-disable-next-line no-constructor-return
			return self as never
		}
	}

	update(updates: PatchFor<InputType_<S>>) {
		const newValue = patchUpdate(this._subject$.value, updates as never)
		// console.log('UPDATE', this._subject$.value, updates, newValue)
		this.set(newValue)
	}

	updateUnchecked(updates: PatchFor<OutputType_<S>>) {
		const newValue = patchUpdate(this._subject$.value, updates)
		this.setUnchecked(newValue)
	}

	patch(patchValue: PatchFor<InputType_<S>>) {
		const newValue = patch(this._subject$.value, patchValue as never)
		this.set(newValue)
	}

	patchUnchecked(patchValue: PatchFor<OutputType_<S>>) {
		const newValue = patch(this._subject$.value, patchValue)
		this.setUnchecked(newValue)
	}

	next(newValue: InputType_<S>): void {
		this.set(newValue)
	}

	set(newValue: InputType_<S>): void {
		if (newValue === this._subject$.value) return // no change

		// eslint-disable-next-line etc/no-internal
		const validNewValue = _validate({
			diContext: this._diContext,
			schemable: this._schemable,
			value: newValue,
		}) as OutputType_<S>

		this.setUnchecked(validNewValue)
	}

	setUnchecked(newValue: OutputType_<S>): void {
		// this._exists = true
		if (newValue === this._subject$.value) return // no change

		// eslint-disable-next-line etc/no-internal
		this._set(newValue, true)

		// eslint-disable-next-line etc/no-internal
		_nestedSubjectUpdateToRoot(this)
	}

	delete(): void {
		if (!this._exists) return

		$assert(this._parent)
		$assert(this._parentKey)
		this._parent.update({
			[this._parentKey]: deleteIt,
		})
	}

	/** @internal */
	_set(newValue: OutputType_<S>, exists: boolean): void {
		if (newValue === this._subject$.value && this._exists === exists) return // no change (prune)

		this._exists = exists

		for (const [key, child] of Object.entries(this._children) as [
			keyof typeof this._children,
			NestedSubjectImpl<$$Schemable>,
		][]) {
			// eslint-disable-next-line etc/no-internal
			child._set(
				newValue?.[key as never],
				Boolean(newValue) &&
					Object.prototype.hasOwnProperty.call(newValue, key),
			)
		}

		this._subject$.next(newValue)
	}
}
