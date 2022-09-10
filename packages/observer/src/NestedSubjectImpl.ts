// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type { PatchFor } from '@voltiso/patcher'
import { patch } from '@voltiso/patcher'
import { patchUpdate } from '@voltiso/patcher'
import type {
	GetShape_,
	InputType_,
	OutputType_,
	Schemable,
	SchemableLike,
	Type_,
} from '@voltiso/schemar.types'
import { getSchemableChild } from '@voltiso/schemar.types'
import { assertNotPolluting, assumeType } from '@voltiso/util'
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

export class NestedSubjectImpl<S extends SchemableLike> {
	readonly _diContext: ObserverDiContext | undefined
	readonly _parent: NestedSubjectImpl<Schemable> | null = null
	readonly _parentKey: keyof any | null = null

	readonly _schemable: S | undefined
	// eslint-disable-next-line rxjs/no-exposed-subjects
	readonly _subject$: BehaviorSubject<Type_<S>>

	readonly _children: {
		[k in keyof GetShape_<S>]?: NestedSubjectImpl<GetShape_<S>[k]>
	} = {}

	get schemable(): S {
		$assert(
			typeof this._schemable !== 'undefined',
			'get schemable() called on NestedSubject without schema',
		)
		return this._schemable
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
			get: (target: object, property: keyof any, receiver: unknown) => {
				if (property in this)
					return Reflect.get(this, property, receiver) as never
				else if (property in target || typeof property !== 'string') {
					const result = Reflect.get(target, property, receiver) as unknown
					if (typeof result === 'function') return result.bind(target) as never
					else return result
				} else {
					assertNotPolluting(property)
					if (property in this._children)
						// eslint-disable-next-line security/detect-object-injection
						return this._children[property] as never
					else
						return new NestedSubjectImpl({
							parent: this,
							key: property,
						}) as never
				}
			},
		}

		if (isNestedSubjectChildOptions(options)) {
			assertNotPolluting(options.key)
			this._diContext = options.parent._diContext
			this._parent = options.parent
			this._parentKey = options.key
			this._schemable = getSchemableChild(
				options.parent.schemable,
				options.key,
			) as never
			this._subject$ = new BehaviorSubject(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				options.parent._subject$.value?.[options.key],
			) as never

			const self = new Proxy(this._subject$, proxyHandlers)

			$assert(!(options.key in options.parent._children))
			this._parent._children[options.key as never] = self as never
			// eslint-disable-next-line no-constructor-return
			return self as never
		} else {
			assumeType<NestedSubjectWithSchemaRootOptions<S>>(options)
			this._diContext = options.diContext
			this._schemable = options.schemable
			this._subject$ = new BehaviorSubject(
				// eslint-disable-next-line etc/no-internal
				_validate({
					diContext: this._diContext,
					schemable: this._schemable,
					value: options.initialValue,
				}),
			) as never

			const self = new Proxy(this._subject$, proxyHandlers)
			// eslint-disable-next-line no-constructor-return
			return self as never
		}
	}

	update(updates: PatchFor<InputType_<S>>) {
		const newValue = patchUpdate(this._subject$.value, updates as never)
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
		if (newValue === this._subject$.value) return // no change

		// eslint-disable-next-line etc/no-internal
		this._set(newValue)

		// eslint-disable-next-line etc/no-internal
		_nestedSubjectUpdateToRoot(this)
	}

	/** @internal */
	_set(newValue: OutputType_<S>): void {
		if (newValue === this._subject$.value) return // no change (prune)

		for (const [key, child] of Object.entries(this._children) as [
			keyof typeof this._children,
			NestedSubjectImpl<SchemableLike>,
		][]) {
			// eslint-disable-next-line etc/no-internal
			child._set(newValue?.[key as never])
		}

		this._subject$.next(newValue)
	}
}
