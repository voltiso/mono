// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type * as t from '@voltiso/schemar'
import type { PatchFor, PatchOptions } from '@voltiso/util'
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
	NestedSubjectDependencies,
	NestedSubjectOptions,
} from '../_'
import { isNestedSubjectChildOptions } from '../_'
import { _nestedSubjectUpdateToRoot } from '../_/_nestedSubjectUpdateToRoot'
import { _validate } from '../_/_validate'

export class NestedSubjectImpl<T> {
	readonly _dependencies: NestedSubjectDependencies | undefined
	readonly _parent: NestedSubjectImpl<t.Schemable> | null = null
	readonly _parentKey: keyof any | null = null

	readonly _schema?: t.Schema<T>
	// eslint-disable-next-line rxjs/no-exposed-subjects
	readonly _subject$: Subject<T>

	_value: T | undefined
	_hasValue: boolean

	get value(): T {
		if (!this._hasValue)
			throw new Error('.value called on NestedSubject without value')

		return this._value as T
	}

	get tryGetValue(): T | undefined {
		return this._value
	}

	get exists() {
		return this._hasValue
	}

	readonly _children: { [k in keyof T]?: NestedSubjectImpl<T[k]> } = {}

	get schema(): t.Schema<T> {
		if (!this._schema) throw new Error('No schema')
		return this._schema
	}

	get maybeSchema(): t.Schema<T> | undefined {
		return this._schema
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
	) as object

	// eslint-disable-next-line etc/no-internal
	constructor(options: NestedSubjectOptions | NestedSubjectChildOptions) {
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
			this._dependencies = options.parent._dependencies
			this._parent = options.parent
			this._parentKey = options.key

			// console.log({ PARENT_IS: options.parent, CHILD_KEY: options.key })

			// console.log({
			// 	PARENT: options.parent._schemable,
			// 	SELF: getSchemableChild(options.parent._schemable, options.key),
			// })

			if (options.parent.schema) {
				$AssumeType<t.Object<{ [k: string]: t.Schema<T> | (T & t.Inferable) }>>(
					options.parent.schema,
				)

				this._schema = t.getSchemableChild(options.parent.schema, options.key)
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			this._value = options.parent._value?.[options.key] as never

			this._subject$ = new Subject()

			this._hasValue =
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
			this._dependencies = options.dependencies

			this._schema = options.schema

			// eslint-disable-next-line etc/no-internal
			this._value = _validate({
				diContext: this._dependencies,
				schemable: this._schema,

				value: options.initialValue === undefined ? {} : options.initialValue,
			}) as never

			this._subject$ = new Subject() as never

			this._hasValue = true

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
			diContext: this._dependencies,
			schemable: this._schema,
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
		if (!this._hasValue) return

		$assert(this._parent)
		$assert(this._parentKey)
		this._parent.patch({
			[this._parentKey]: deleteIt,
		})
	}

	/** @internal */
	_set(newValue: Output<S>, exists: boolean): void {
		if (newValue === this._value && this._hasValue === exists) return // no change (prune)

		this._hasValue = exists

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
