// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

import type * as t from '@voltiso/schemar'
import {
	deepFrozen,
	fastAssert,
	isPlainObject,
	lazyConstructor,
	omit,
	OPTIONS,
	stringFrom,
} from '@voltiso/util'

import type { $WithId } from '~/Data'
import { withId } from '~/Data'
import type { Db } from '~/Db'
import type { DocRefContext, WeakDocRef } from '~/DocRef'
import { CustomDocRef, isStrongDocRef } from '~/DocRef'
import type { ANY_DOC } from '~/DocTypes'
import { TransactorError } from '~/error/TransactorError'
import type { Method } from '~/Method'
import type { CustomDocPath } from '~/Path'
import type { IntrinsicFields } from '~/schemas'
import type { Updates } from '~/updates'

import { DocConstructorImpl } from '../DocConstructor'
import type { GetData } from './_/GetData'
import type { Doc } from './Doc'
import type { DocContext } from './DocContext'
import type { DocTI } from './DocTI'
import { DTI } from './DocTI'

function patchContextInRefs<X>(x: X, ctx: DocRefContext): X {
	if (isPlainObject(x)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const r = {} as any

		for (const [k, v] of Object.entries(x)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			r[k] = patchContextInRefs(v as never, ctx)
		}

		return r as never
	} else if (x instanceof CustomDocRef) {
		return new CustomDocRef(
			ctx as never,
			x.path.toString(),
			x[OPTIONS],
		) as never
	}

	return x
}

export class DocImpl<TI extends DocTI = DocTI> extends lazyConstructor(
	() => DocConstructorImpl,
) {
	declare [DTI]: TI

	methods: Record<string, Method> = {}

	_ref?: WeakDocRef = undefined

	constructor(context: DocContext, raw: IntrinsicFields) {
		super()

		fastAssert(raw.__voltiso)

		// eslint-disable-next-line no-param-reassign
		raw = patchContextInRefs(raw, context)

		this._context = context
		this._setRaw(raw)

		// assert the ! members
		fastAssert(this._raw)
		fastAssert(this._rawProxy)

		// add methods
		const { docRef } = this._context
		const methods = docRef._getMethods()

		for (const { name, method, ...pathMatches } of methods) {
			const docMethod = (...args: unknown[]) =>
				docRef._callMethod(method as never, args, {
					localDoc: this as never,
					name,
					...pathMatches,
				})

			// Reflect.set(this, name, docMethod, null) // null receiver - hack - see createClassInterface implementation

			if (!(name in this)) {
				;(this as unknown as Record<string, Method>)[name] = docMethod
			}

			this.methods[name] = docMethod
		}

		if (isStrongDocRef(docRef as never)) this._ref = docRef as never

		// Object.freeze(this)
		Object.seal(this)
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get: (target, p, receiver: unknown) => {
				if (p === 'aggregates') return this._raw.__voltiso.aggregateTarget
				else if (p in target) return Reflect.get(target, p, receiver) as never
				else if (p in this._raw.__voltiso.aggregateTarget)
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					return (this._raw.__voltiso.aggregateTarget as any)[p].value as never
				else return Reflect.get(this._rawProxy, p) as never
			},

			// eslint-disable-next-line @typescript-eslint/max-params
			set: (target, p, value, receiver: unknown) => {
				if (typeof p !== 'string' || p in target)
					return Reflect.set(target, p, value, receiver)

				if (p in this._raw.__voltiso.aggregateTarget)
					throw new TransactorError(
						`cannot set aggregate ${p} to a new value ${stringFrom(value)}`,
					)

				return Reflect.set(this._rawProxy, p, value)
			},

			deleteProperty: (_target, p) => Reflect.deleteProperty(this._rawProxy, p),
		})
	}

	_context: DocContext

	_raw!: IntrinsicFields
	_rawProxy!: IntrinsicFields

	_setRaw(raw: IntrinsicFields): void {
		this._raw = raw

		// freeze if outside transaction, but don't freeze if inside @onGet trigger
		const shouldFreeze =
			!this._context.transaction &&
			!this._context.transactor._isInsideOnGetNoTransaction.tryGetValue

		this._rawProxy = shouldFreeze ? deepFrozen(raw) : raw
		// immutabilize(
		// 		raw,
		// 		'non-transaction document object is immutable (would not commit changes - possible bug)',
		//   )
	}

	get id(): never {
		return this._context.docRef.id as never
	}

	get path(): CustomDocPath<{ doc: TI['tag'] }> {
		return this._context.docRef.path as never
	}

	get ref(): CustomDocRef<{ docTag: TI['tag']; isStrong: true }> {
		if (!this._ref)
			this._ref = new CustomDocRef(
				omit(this._context, 'docRef'),
				this.path.toString(),
				{ isStrong: true },
			) as never
		return this._ref as never
	}

	get data(): GetData<TI> {
		return this._rawProxy as never
	}

	dataWithoutId(): GetData<TI> {
		return this._raw as never
	}

	dataWithId(): $WithId<GetData<TI>, TI> {
		return withId(this._raw, this.id) as never
	}

	get db(): Db {
		return this._context.db
	}

	async update(updates: Updates): Promise<Doc<TI> | null | undefined> {
		return (await this._context.docRef.update(updates as never)) as never
	}

	async delete(): Promise<never> {
		return (await this._context.docRef.delete()) as never
	}

	get schema(): t.Schema<GetData<TI>> | undefined {
		return this.ref.schema as never
	}

	get schemaWithId(): t.Schema<$WithId<GetData<TI>>> | undefined {
		return this.ref.schemaWithId as never
	}

	get aggregateSchemas(): {} {
		return this.ref.aggregateSchemas
	}
}

//

export interface DefaultDocTI extends DocTI {
	tag: ANY_DOC

	// publicOnCreation: t.Object<{
	// 	[DOC_SHAPE_NON_EMPTY_HACK]?: never
	// }>

	// public: t.Object<{
	// 	[DOC_SHAPE_NON_EMPTY_HACK]?: never
	// }>

	// private: t.Object<{
	// 	[DOC_SHAPE_NON_EMPTY_HACK]?: never
	// }>
}
