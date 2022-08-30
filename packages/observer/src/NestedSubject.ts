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
import { assertNotPolluting } from '@voltiso/util'
import { BehaviorSubject } from 'rxjs'

import type { ObserverDiContext } from './createNestedSubject'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NestedSubject {
	export type RootOptions<S> = {
		diContext: ObserverDiContext
		schemable: S
		initialValue?: unknown
	}
	export type ChildOptions = {
		parent: NestedSubjectImpl<any>
		key: string
	}
}

export function isNestedSubjectChildOptions(
	x: unknown,
): x is NestedSubject.ChildOptions {
	return Boolean((x as NestedSubject.ChildOptions | null)?.parent)
}

export type NestedSubject<S extends SchemableLike> = {
	get schemable(): S

	set(x: InputType_<S>): void
	setUnchecked(x: OutputType_<S>): void

	patch(x: PatchFor<InputType_<S>>): void
	patchUnchecked(x: PatchFor<OutputType_<S>>): void

	update(x: PatchFor<InputType_<S>>): void
	updateUnchecked(x: PatchFor<OutputType_<S>>): void
} & BehaviorSubject<Type_<S>> & {
		[k in keyof GetShape_<S>]: NestedSubject<GetShape_<S>[k]>
	}

export class NestedSubjectImpl<S extends SchemableLike> {
	_diContext: ObserverDiContext
	_parent: NestedSubjectImpl<Schemable> | null = null
	_parentKey: keyof any | null = null

	_schemable: S
	_subject: BehaviorSubject<Type_<S>>

	_children: {
		[k in keyof GetShape_<S>]?: NestedSubjectImpl<GetShape_<S>[k]>
	} = {}

	get schemable(): S {
		return this._schemable
	}

	constructor(options: NestedSubject.RootOptions<S>)
	constructor(options: NestedSubject.ChildOptions)

	constructor(
		options: NestedSubject.RootOptions<S> | NestedSubject.ChildOptions,
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
			this._subject = new BehaviorSubject(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				options.parent._subject.value?.[options.key],
			) as never

			const self = new Proxy(this._subject, proxyHandlers)

			$assert(!(options.key in options.parent._children))
			this._parent._children[options.key as never] = self as never
			// eslint-disable-next-line no-constructor-return
			return self as never
		} else {
			this._diContext = options.diContext
			this._schemable = options.schemable
			this._subject = new BehaviorSubject(
				options.diContext
					.schema(options.schemable)
					.validate(options.initialValue),
			) as never

			const self = new Proxy(this._subject, proxyHandlers)
			// eslint-disable-next-line no-constructor-return
			return self as never
		}
	}

	update(updates: PatchFor<InputType_<S>>) {
		const newValue = patchUpdate(this._subject.value, updates as never)
		this.set(newValue)
	}

	updateUnchecked(updates: PatchFor<OutputType_<S>>) {
		const newValue = patchUpdate(this._subject.value, updates)
		this.setUnchecked(newValue)
	}

	patch(patchValue: PatchFor<InputType_<S>>) {
		const newValue = patch(this._subject.value, patchValue as never)
		this.set(newValue)
	}

	patchUnchecked(patchValue: PatchFor<OutputType_<S>>) {
		const newValue = patch(this._subject.value, patchValue)
		this.setUnchecked(newValue)
	}

	set(newValue: InputType_<S>): void {
		if (newValue === this._subject.value) return // no change

		const validNewValue = this._diContext
			.schema(this._schemable)
			.validate(newValue) as OutputType_<S>

		this.setUnchecked(validNewValue)
	}

	setUnchecked(newValue: OutputType_<S>): void {
		if (newValue === this._subject.value) return // no change

		// eslint-disable-next-line etc/no-internal
		this._set(newValue)

		// eslint-disable-next-line etc/no-internal
		_nestedSubjectUpdateToRoot(this)
	}

	/** @internal */
	_set(newValue: OutputType_<S>): void {
		if (newValue === this._subject.value) return // no change (prune)

		for (const [key, child] of Object.entries(this._children) as [
			keyof typeof this._children,
			NestedSubjectImpl<SchemableLike>,
		][]) {
			// eslint-disable-next-line etc/no-internal
			child._set(newValue?.[key as never])
		}

		this._subject.next(newValue)
	}
}

/** @internal */
export function _nestedSubjectUpdateToRoot(node: NestedSubjectImpl<any>) {
	while (node._parent) {
		let parentValue = node._parent._subject.value as object
		if (Array.isArray(parentValue)) {
			const newParentValue = [...(parentValue as unknown[])]
			newParentValue[node._parentKey as never] = node._subject.value
			parentValue = newParentValue
		} else {
			parentValue = {
				...parentValue,
				[node._parentKey as never]: node._subject.value as never,
			}
		}

		node._parent._subject.next(parentValue)
		// eslint-disable-next-line no-param-reassign
		node = node._parent as never
	}
}
