// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { isPlainObject, lazyConstructor, omit } from '@voltiso/util'

import type { WithId } from '~/Data'
import { withId } from '~/Data'
import type { Db } from '~/Db'
import { immutabilize } from '~/immutabilize'
import type { Method } from '~/Method'
import type { DocPath } from '~/Path'
import type { StrongRef } from '~/Ref'
import { StrongDocRef, StrongDocRefImpl } from '~/Ref'
import type { DocRefContext } from '~/Ref/_/Context'
import type { Updates } from '~/updates'

import type { GetData } from './_/GData'
import type { Doc } from './Doc'
import { DocConstructor_ } from './DocConstructor'
import type { DocContext } from './DocContext'
import type { IDocTI } from './DocTI'
import { DTI } from './DocTI'
import type { IDoc, IDoc_ } from './IDoc'

function patchContextInRefs<X>(x: X, ctx: DocRefContext): X {
	if (isPlainObject(x)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const r = {} as any

		for (const [k, v] of Object.entries(x)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
			r[k] = patchContextInRefs(v, ctx)
		}

		return r as never
	} else if (x instanceof StrongDocRefImpl) {
		return new StrongDocRefImpl(ctx as never, x.path.pathString) as never
	}

	return x
}

export class Doc_<TI extends IDocTI = IDocTI>
	extends lazyConstructor(() => DocConstructor_)
	implements IDoc_
{
	declare [DTI]: TI

	methods: Record<string, Method> = {}

	constructor(context: DocContext, raw: GetData<TI>) {
		super()

		// eslint-disable-next-line no-param-reassign
		raw = patchContextInRefs(raw, context)

		this._context = context
		this._setRaw(raw)

		// assert the ! members
		$assert(this._raw)
		$assert(this._rawProxy)

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
				// eslint-disable-next-line security/detect-object-injection
				;(this as unknown as Record<string, Method>)[name] = docMethod
			}

			// eslint-disable-next-line security/detect-object-injection
			this.methods[name] = docMethod
		}

		// Object.freeze(this)
		Object.seal(this)
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get: (target, p, receiver: unknown) => {
				if (p in target) return Reflect.get(target, p, receiver) as never
				else return Reflect.get(this._rawProxy, p) as never
			},

			set: (target, p, value, receiver: unknown) => {
				if (p in target) return Reflect.set(target, p, value, receiver)
				else return Reflect.set(this._rawProxy, p, value)
			},

			deleteProperty: (_target, p) => Reflect.deleteProperty(this._rawProxy, p),
		})
	}

	_context: DocContext

	_raw!: GetData<TI>
	_rawProxy!: GetData<TI>

	_setRaw(raw: GetData<TI>) {
		this._raw = raw
		this._rawProxy = this._context.transaction
			? raw
			: immutabilize(
					raw,
					'non-transaction document object is immutable (would not commit changes - possible bug)',
			  )
	}

	get id() {
		return this._context.docRef.id
	}

	get path(): DocPath<TI['tag']> {
		return this._context.docRef.path as never
	}

	get ref(): StrongRef<this> {
		return new StrongDocRef(
			omit(this._context, 'docRef'),
			this.path.pathString,
		) as never
	}

	get data(): GetData<TI> {
		return this._raw as never
	}

	dataWithoutId(): GetData<TI> {
		return this._raw as never
	}

	dataWithId(): WithId<GetData<TI>, IDoc> {
		return withId(this._raw, this.id) as never
	}

	get db(): Db {
		return this._context.db
	}

	// async update(updates: _<GUpdates_Update<Fields<TI, Ctx>>>): Promise<GDoc<TI, Ctx> | undefined>
	// async update(updates: _<GUpdates_Replace<Fields<TI, Ctx>>>): Promise<GDoc<TI, Ctx>>
	// async update(updates: GUpdates_Delete): Promise<null>

	async update(
		updates: Updates,
	): Promise<Doc<TI, 'outside'> | null | undefined> {
		return (await this._context.docRef.update(updates as any)) as never
	}

	async delete() {
		return (await this._context.docRef.delete()) as never
	}
}

export interface DocTI extends IDocTI {
	tag: 'untagged'
}
