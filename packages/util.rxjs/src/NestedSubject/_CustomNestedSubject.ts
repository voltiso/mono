// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type { $$Schemable, Schemable } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type { IsOptional, PatchFor, PatchOptions } from '@voltiso/util'
import {
	assertNotPolluting,
	defaultPatchOptions,
	deleteIt,
	hasOwnProperty,
	isPolluting,
	patch,
} from '@voltiso/util'
import { Subject } from 'rxjs'

import type {
	_NestedSubjectChildOptions,
	NestedSubjectOptions,
	NestedSubjectTypeOptions,
} from '~'
import { _updateToRoot, _validate, isNestedSubjectChildOptions } from '~'

//

//

export class _CustomNestedSubject<
	TO extends NestedSubjectTypeOptions = NestedSubjectTypeOptions,
> {
	constructor(
		options: // eslint-disable-next-line etc/no-internal
		Partial<NestedSubjectOptions> | _NestedSubjectChildOptions,
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

		// eslint-disable-next-line etc/no-internal
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

			if (options.parent.hasSchema) {
				const childSchema: Schemable = s.getSchemableChild(
					options.parent.schema,
					options.key as never,
				)

				// console.log({ childSchema })

				this._schema = s.infer(childSchema as $$Schemable) as never
			}

			this._value = options.parent._value?.[options.key as never] as never

			this._subject$ = new Subject()

			this._exists =
				typeof options.parent._value === 'object' &&
				Object.prototype.hasOwnProperty.call(options.parent._value, options.key)

			const self = new Proxy(this, proxyHandlers)

			$assert(!hasOwnProperty(options.parent._children, options.key))
			$assert(this._parent)
			this._parent._children[options.key as never] = self as never
			// eslint-disable-next-line no-constructor-return
			return self as never
		} else {
			// eslint-disable-next-line no-param-reassign
			options = { ...options }

			if (!options.dependencies) options.dependencies = { inferSchema: s.infer }

			// console.log('NestedSubject constructor root', options.initialValue)
			this._dependencies = options.dependencies

			// console.log('options.schema', options.schema)

			this._schema = options.schema as never

			// eslint-disable-next-line etc/no-internal
			this._value = _validate({
				dependencies: this._dependencies,
				schemable: this._schema,

				value: options.initialValue,
			}) as never

			this._subject$ = new Subject() as never

			this._exists = true

			const self = new Proxy(this, proxyHandlers)
			// eslint-disable-next-line no-constructor-return
			return self as never
		}
	}

	readonly _dependencies: NestedSubjectOptions.Dependencies | undefined

	readonly _parent: _CustomNestedSubject | null = null
	readonly _parentKey: keyof any | null = null

	readonly _schema:
		| (s.Schema & { Output: TO['Output']; Input: TO['Input'] })
		| undefined = undefined

	// eslint-disable-next-line rxjs/no-exposed-subjects
	readonly _subject$: Subject<TO['Output']>

	_value: TO['Output'] | undefined
	_exists: boolean

	get value(): TO['Output'] {
		if (!this._exists)
			throw new Error('.value called on NestedSubject without value')

		return this._value as TO['Output']
	}

	get maybeValue(): TO['Output'] | undefined {
		return this._value
	}

	get exists() {
		return this._exists
	}

	readonly _children: {
		[k in keyof TO['Output']]?: _CustomNestedSubject<{
			Output: TO['Output'][k]
			Input: TO['Input'][k]

			IsOptional: IsOptional<TO['Output'], k>
			IsAncestorOptional: TO['IsAncestorOptional'] extends true
				? true
				: TO['IsOptional'] extends true
				? true
				: false
		}>
	} = {}

	get schema(): Exclude<this['_schema'], undefined> {
		if (!this._schema) throw new Error('No schema')
		return this._schema as never
	}

	get maybeSchema(): this['_schema'] | undefined {
		return this._schema
	}

	get hasSchema(): boolean {
		return !!this._schema
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
					return new _CustomNestedSubject({
						parent: this as never,
						key,
					}) as never
				}
			},
		},
	) as object

	//

	//

	// update(updates: PatchFor<Input<S>>) {
	// 	const newValue = patch(this._subject$.value, updates as never, { depth: 1 })
	// 	this.set(newValue)
	// }

	// updateUnchecked(updates: PatchFor<Output<S>>) {
	// 	const newValue = patch(this._subject$.value, updates, { depth: 1 })
	// 	this.setUnchecked(newValue)
	// }

	patch(
		patchValue: PatchFor<TO['Input']>,
		options: PatchOptions = defaultPatchOptions,
	) {
		const newValue = patch(this._value, patchValue as never, options)
		this.set(newValue)
	}

	patchUnchecked(
		patchValue: PatchFor<TO['Output']>,
		options: PatchOptions = defaultPatchOptions,
	) {
		const newValue = patch(this._value, patchValue as never, options)
		this.setUnchecked(newValue)
	}

	next(newValue: TO['Input']): void {
		this.set(newValue)
	}

	set(newValue: TO['Input']): void {
		if (newValue === this._value) return // no change

		// console.log('this._schema', this._schema)

		// eslint-disable-next-line etc/no-internal
		const validNewValue = _validate({
			dependencies: this._dependencies,
			schemable: this._schema,
			value: newValue,
		})

		this.setUnchecked(validNewValue)
	}

	setUnchecked(newValue: TO['Output']): void {
		// this._exists = true
		if (newValue === this._value) return // no change

		// eslint-disable-next-line etc/no-internal
		this._set(newValue, true)

		// eslint-disable-next-line etc/no-internal
		_updateToRoot(this)
	}

	delete(): void {
		if (!this._exists) return

		if (this._parent) {
			$assert(this._parentKey)

			this._parent.patch({
				[this._parentKey]: deleteIt,
			} as never)
		} else {
			// eslint-disable-next-line etc/no-internal
			this._set(undefined, false)
		}
	}

	/** @internal */
	_set(newValue: TO['Output'], exists: boolean): void {
		if (newValue === this._value && this._exists === exists) return // no change (prune)

		this._exists = exists

		for (const [key, child] of Object.entries(this._children) as [
			keyof typeof this._children,
			_CustomNestedSubject,
		][]) {
			// eslint-disable-next-line etc/no-internal
			child._set(
				// eslint-disable-next-line security/detect-object-injection
				newValue?.[key] as never,
				exists && Object.prototype.hasOwnProperty.call(newValue || {}, key),
			)
		}

		this._value = newValue as never
		this._subject$.next(this._value)
	}
}
