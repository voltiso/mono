// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type { $$Schemable, Schemable } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type { IsOptional, PatchFor, PatchOptions } from '@voltiso/util'
import {
	assertNotPolluting,
	defaultPatchOptions,
	deleteIt,
	// biome-ignore lint/suspicious/noShadowRestrictedNames: TODO rename?
	hasOwnProperty,
	isPolluting,
	patch,
} from '@voltiso/util'
import { Subject } from 'rxjs'

import { _updateToRoot } from './_/_updateToRoot'
import { _validate } from './_/_validate'
import type { SubjectTreeTypeOptions } from './options/type-options'
import type {
	_SubjectTreeChildOptions,
	SubjectTreeOptions,
} from './SubjectTreeOptions'
import {
	defaultSubjectTreeOptions,
	isSubjectTreeChildOptions,
} from './SubjectTreeOptions'

//

export class _CustomSubjectTree<
	TO extends SubjectTreeTypeOptions = SubjectTreeTypeOptions,
> {
	constructor(options: Partial<SubjectTreeOptions> | _SubjectTreeChildOptions) {
		const proxyHandlers = {
			get: (_target: object, key: keyof any, receiver: unknown) => {
				if (key in this || isPolluting(key))
					return Reflect.get(this, key, receiver) as never
				else if (key in this._subject$ || typeof key !== 'string') {
					const result = Reflect.get(this._subject$, key, receiver) as unknown
					if (typeof result === 'function')
						return result.bind(this._subject$) as never
					else return result
				} else return Reflect.get(this._, key, receiver) as never // ! currently internal!
			},
		}

		if (isSubjectTreeChildOptions(options)) {
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
				// biome-ignore lint/style/noNonNullAssertion: good?
				Object.hasOwn(options.parent._value!, options.key)

			const self = new Proxy(this, proxyHandlers)

			$assert(!hasOwnProperty(options.parent._children, options.key))
			$assert(this._parent)
			this._parent._children[options.key as never] = self as never

			// biome-ignore lint/correctness/noConstructorReturn: .
			return self as never
		} else {
			options = { ...defaultSubjectTreeOptions, ...options }

			this._dependencies = options.dependencies

			// console.log('options.schema', options.schema)

			this._schema = options.schema as never

			this._value = _validate({
				dependencies: this._dependencies,
				schemable: this._schema,

				value: options.initialValue,
			}) as never

			this._subject$ = new Subject() as never

			this._exists = true

			const self = new Proxy(this, proxyHandlers)

			// biome-ignore lint/correctness/noConstructorReturn: hacky
			return self as never
		}
	}

	readonly _dependencies: SubjectTreeOptions.Dependencies | undefined

	readonly _parent: _CustomSubjectTree | null = null
	readonly _parentKey: keyof any | null = null

	readonly _schema:
		| (s.Schema & { Output: TO['Output']; Input: TO['Input'] })
		| undefined = undefined

	readonly _subject$: Subject<TO['Output']>

	_value: TO['Output'] | undefined
	_exists: boolean

	get value(): TO['Output'] {
		if (!this._exists)
			throw new Error('.value called on SubjectTree without value')

		// biome-ignore lint/style/noNonNullAssertion: .
		return this._value!
	}

	get maybeValue(): TO['Output'] | undefined {
		return this._value
	}

	get exists(): boolean {
		return this._exists
	}

	readonly _children: {
		[k in keyof TO['Output']]?: _CustomSubjectTree<{
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

	// ! currently internal!
	/** Access entries with names shadowed by `SubjectTree` members */
	_ = new Proxy(
		{},
		{
			get: (target, property, receiver) => {
				if (isPolluting(property) || typeof property !== 'string') {
					return Reflect.get(target, property, receiver) as never
				}
				// $assert.string(property)

				const key = property.endsWith('$') ? property.slice(0, -1) : property

				assertNotPolluting(key)

				if (!hasOwnProperty(this._children, key)) {
					new _CustomSubjectTree({
						parent: this as never,
						key,
					}) as never
				}

				const child: _CustomSubjectTree = this._children[key as never]
				$assert(child)

				if (property.endsWith('$')) {
					return child
				} else {
					return child.maybeValue
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
	): void {
		const newValue = patch(this._value, patchValue as never, options)
		this.set(newValue)
	}

	patchUnchecked(
		patchValue: PatchFor<TO['Output']>,
		options: PatchOptions = defaultPatchOptions,
	): void {
		const newValue = patch(this._value, patchValue as never, options)
		this.setUnchecked(newValue)
	}

	next(newValue: TO['Input']): void {
		this.set(newValue)
	}

	set(newValue: TO['Input']): void {
		if (Object.is(newValue, this._value)) return // no change

		// console.log('this._schema', this._schema)

		const validNewValue = _validate({
			dependencies: this._dependencies,
			schemable: this._schema,
			value: newValue,
		})

		this.setUnchecked(validNewValue)
	}

	setUnchecked(newValue: TO['Output']): void {
		// this._exists = true

		if (Object.is(newValue, this._value)) return // no change

		this._set(newValue, true)

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
			this._set(undefined, false)
		}
	}

	/** @internal */
	_set(newValue: TO['Output'], exists: boolean): void {
		if (Object.is(newValue, this._value) && this._exists === exists) return // no change (prune)

		this._exists = exists

		for (const [key, child] of Object.entries(this._children) as [
			keyof typeof this._children,
			_CustomSubjectTree,
		][]) {
			child._set(
				newValue?.[key] as never,
				exists && Object.hasOwn(newValue || {}, key),
			)
		}

		this._value = newValue as never
		this._subject$.next(this._value)
	}

	get asRequired(): this {
		return this
	}

	get Final(): this {
		return this
	}
}
