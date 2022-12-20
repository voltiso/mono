// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type {
	$$Schemable,
	GetDeepShape_,
	GetShape_,
	InferSchema_,
	Input,
	Output,
	Schemable,
	Type_,
} from '@voltiso/schemar.types'
import { getSchemableChild } from '@voltiso/schemar.types'
import type { Assume, PatchFor, PatchOptions } from '@voltiso/util'
import {
	$AssumeType,
	assertNotPolluting,
	defaultPatchOptions,
	deleteIt,
	hasOwnProperty,
	isPolluting,
	patch,
} from '@voltiso/util'
import { Subject } from 'rxjs'

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
	return (x as { getShape: unknown } | undefined)?.getShape !== undefined
}

export function isWithGetDeepShape(x: unknown): x is { getDeepShape: unknown } {
	return (x as { getDeepShape: unknown } | undefined) !== undefined
}

export class NestedSubjectImpl<S extends $$Schemable> {
	readonly _diContext: ObserverDiContext | undefined
	readonly _parent: NestedSubjectImpl<Schemable> | null = null
	readonly _parentKey: keyof any | null = null

	readonly _schemable: S | undefined
	// eslint-disable-next-line rxjs/no-exposed-subjects
	readonly _subject$: Subject<Type_<S>>
	_value: Type_<S>
	_exists: boolean

	get value(): Type_<S> {
		return this._value
	}

	get exists() {
		return this._exists
	}

	readonly _children: {
		[k in keyof GetShape_<S>]?: NestedSubjectImpl<
			Assume<$$Schemable, GetShape_<S>[k]>
		>
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

	/** Access entries with names shadowed by `NestedSubject` members */
	_ = new Proxy(
		{},
		{
			get: (_target, key, _receiver) => {
				// if (isPolluting(key) || typeof key !== 'string') {
				// 	return Reflect.get(_target, key, _receiver) as never
				// }
				$assert.string(key)
				assertNotPolluting(key)
				if (hasOwnProperty(this._children, key))
					return this._children[key as never]
				else {
					return new NestedSubjectImpl({ parent: this, key }) as never
				}
			},
		},
	)

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
			get: (_target: object, key: keyof any, receiver: unknown) => {
				if (key in this || isPolluting(key))
					return Reflect.get(this, key, receiver) as never
				else if (key in this._subject$ || typeof key !== 'string') {
					const result = Reflect.get(this._subject$, key, receiver) as unknown
					if (typeof result === 'function')
						return result.bind(this._subject$) as never
					else return result
				} else return Reflect.get(this._, key, receiver) as never
			},
		}

		if (isNestedSubjectChildOptions(options)) {
			// console.log('NestedSubject constructor child', options.key)

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

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			this._value = options.parent._value?.[options.key] as never

			this._subject$ = new Subject()

			this._exists =
				typeof options.parent._value === 'object' &&
				Object.prototype.hasOwnProperty.call(options.parent._value, options.key)

			const self = new Proxy(this, proxyHandlers)

			$assert(!hasOwnProperty(options.parent._children, options.key))
			this._parent._children[options.key] = self as never
			// eslint-disable-next-line no-constructor-return
			return self as never
		} else {
			$AssumeType<NestedSubjectWithSchemaRootOptions<S>>(options)
			// console.log('NestedSubject constructor root', options.initialValue)
			this._diContext = options.diContext

			this._schemable = options.schemable

			// eslint-disable-next-line etc/no-internal
			this._value = _validate({
				diContext: this._diContext,
				schemable: this._schemable,

				value: options.initialValue === undefined ? {} : options.initialValue,
			}) as never

			this._subject$ = new Subject() as never

			this._exists = true

			const self = new Proxy(this, proxyHandlers)
			// eslint-disable-next-line no-constructor-return
			return self as never
		}
	}

	// update(updates: PatchFor<Input<S>>) {
	// 	const newValue = patch(this._subject$.value, updates as never, { depth: 1 })
	// 	this.set(newValue)
	// }

	// updateUnchecked(updates: PatchFor<Output<S>>) {
	// 	const newValue = patch(this._subject$.value, updates, { depth: 1 })
	// 	this.setUnchecked(newValue)
	// }

	patch(
		patchValue: PatchFor<Input<S>>,
		options: PatchOptions = defaultPatchOptions,
	) {
		const newValue = patch(this._value, patchValue as never, options)
		this.set(newValue)
	}

	patchUnchecked(
		patchValue: PatchFor<Output<S>>,
		options: PatchOptions = defaultPatchOptions,
	) {
		const newValue = patch(this._value, patchValue as never, options)
		this.setUnchecked(newValue)
	}

	next(newValue: Input<S>): void {
		this.set(newValue)
	}

	set(newValue: Input<S>): void {
		if (newValue === this._value) return // no change

		// eslint-disable-next-line etc/no-internal
		const validNewValue = _validate({
			diContext: this._diContext,
			schemable: this._schemable,
			value: newValue,
		}) as Output<S>

		this.setUnchecked(validNewValue)
	}

	setUnchecked(newValue: Output<S>): void {
		// this._exists = true
		if (newValue === this._value) return // no change

		// eslint-disable-next-line etc/no-internal
		this._set(newValue, true)

		// eslint-disable-next-line etc/no-internal
		_nestedSubjectUpdateToRoot(this)
	}

	delete(): void {
		if (!this._exists) return

		$assert(this._parent)
		$assert(this._parentKey)
		this._parent.patch({
			[this._parentKey]: deleteIt,
		})
	}

	/** @internal */
	_set(newValue: Output<S>, exists: boolean): void {
		if (newValue === this._value && this._exists === exists) return // no change (prune)

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

		this._value = newValue as never
		this._subject$.next(this._value)
	}
}
