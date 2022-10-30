// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'
import type {
	IObject,
	ISchema,
	Schema,
	SchemaLike,
} from '@voltiso/schemar.types'
import type { If } from '@voltiso/util'
import { assert, lazyPromise, omit, protoLink } from '@voltiso/util'

import type { InferTIFromDoc } from '~/CollectionRef'
import type { DocRefDatabase, DocRefJson } from '~/common'
import type { $WithId, Id } from '~/Data'
import { withoutId } from '~/Data'
import type {
	$$Doc,
	Doc,
	GDocFields_,
	GetDocTag,
	GetDocTI,
	GetMethodPromises_,
	IDoc,
	UpdatesFromData,
} from '~/Doc'
import { DTI } from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type {
	GetData,
	GetPublicCreationInputData,
	GetUpdateDataByCtx,
} from '~/Doc/_/GData'
import { TransactorError } from '~/error/TransactorError'
import type { DeleteIt, ReplaceIt } from '~/it'
import { deleteIt, replaceIt } from '~/it'
import type { Method } from '~/Method'
import { DocPath } from '~/Path'
import type {
	DeepPartialIntrinsicFieldsSchema,
	IntrinsicFieldsSchema,
} from '~/schemas/sIntrinsicFields'
import type { AfterTrigger, BeforeCommitTrigger, OnGetTrigger } from '~/Trigger'

import type { Null } from './_'
import { getAggregateSchemas } from './_'
import type { CallMethodOptions } from './_/callMethod'
import { callMethod } from './_/callMethod'
import type { DocRefContext, DocRefParentContext } from './_/Context'
import type { DocRefMethodEntry, DocRefTriggerEntry } from './_/data'
import { getMethods } from './_/getMethods'
import { getIdSchemas, getSchema } from './_/getSchema'
import type { NestedPromise } from './_/NestedPromise'
import { dataOrNestedPromise } from './_/NestedPromise'
import { DocFieldPath } from './DocFieldPath'
import { IS_DOC_REF } from './IRef'
import { get, update } from './methods'
import { StrongDocRef } from './StrongDocRef'
import { WeakDocRef } from './WeakDocRef'

/**
 * Base class constructor for `WeakDocRef` and `StrongDocRef` (do not use
 * directly)
 */
export class UnknownDocRefBase<
	D extends $$Doc = Doc,
	Exists extends boolean = boolean,
	_Ctx extends ExecutionContext = 'outside',
> implements PromiseLike<D | Null<Exists>>
{
	[IS_DOC_REF] = true as const

	/** Type-only field */
	declare Exists: Exists;

	declare [DTI]: GetDocTI<D>

	// eslint-disable-next-line unicorn/no-thenable
	declare then: ReturnType<this['get']>['then']
	declare readonly __voltiso: GDocFields_<InferTIFromDoc<D>>['__voltiso']

	_context: DocRefContext
	_ref: FirestoreLike.ServerDocumentReference
	_path: DocPath<GetDocTag<D>>

	get path(): DocPath<GetDocTag<D>> {
		return this._path
	}

	get id(): Id<D> {
		assert(this._path.id)
		return this._path.id as unknown as Id<D>
	}

	_methods?: DocRefMethodEntry[] = undefined

	_afterTriggers?: DocRefTriggerEntry<AfterTrigger>[] = undefined
	_beforeCommits?: DocRefTriggerEntry<BeforeCommitTrigger>[] = undefined
	_onGets?: DocRefTriggerEntry<OnGetTrigger>[] = undefined

	_idSchemas?: ISchema<string>[] = undefined
	_aggregateSchemas?: Record<string, SchemaLike> = undefined

	_schema:
		| {
				final: IntrinsicFieldsSchema
				partial: DeepPartialIntrinsicFieldsSchema
		  }
		| null // null -> no schema
		| undefined = undefined // undefined -> unknown yet

	_publicOnCreationSchema?: IObject = undefined
	_privateSchema?: IObject = undefined

	readonly methods = {} as GetMethodPromises_<InferTIFromDoc<D>>

	_isStrong: [Exists] extends [true] ? true : boolean

	get isStrong(): [Exists] extends [true] ? true : boolean {
		return this._isStrong
	}

	// eslint-disable-next-line class-methods-use-this
	get schemaWithoutId(): Schema<GetData<GetDocTI<D>>> | undefined {
		throw new TransactorError('not implemented')
	}

	get schemaWithId(): Schema<$WithId<GetData<GetDocTI<D>>>> | undefined {
		return getSchema(this)?.final as never
	}

	get aggregateSchemas(): GetDocTI<D>['aggregates'] {
		return getAggregateSchemas(this)
	}

	get asStrongRef(): StrongDocRef<D> {
		return new StrongDocRef<D>(
			omit(this._context, 'docRef'),
			this._path.toString(),
		)
	}

	get asWeakRef(): WeakDocRef<D> {
		return new WeakDocRef<D>(
			omit(this._context, 'docRef'),
			this._path.toString(),
		) as never
	}

	constructor(
		context: DocRefParentContext,
		path: string,
		isStrong: [Exists] extends [true] ? true : false,
	) {
		this._context = { ...context, docRef: this as never }
		this._path = new DocPath(path)
		this._ref = context.transactor._database.doc(this._path.toString())
		this._isStrong = isStrong

		const methods = this._getMethods()

		for (const { name, method, pathMatches } of methods) {
			const f = (...args: unknown[]) =>
				this._callMethod(method as never, args, { name, ...pathMatches })
			// eslint-disable-next-line security/detect-object-injection
			;(this as unknown as Record<string, Method>)[name] = f
			// eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
			;(this.methods as any)[name] = f
		}

		void Object.seal(this)
		// void Object.freeze(this)

		// eslint-disable-next-line no-constructor-return
		return new Proxy(
			protoLink(
				lazyPromise(() => this.get()),
				this,
			),
			{
				get: (target, p, receiver) => {
					if (typeof p === 'symbol' || p in target) {
						return Reflect.get(target, p, receiver) as unknown
					} else return new DocFieldPath(this._context, [p])
				},
			},
		) as never
	}

	toJSON(): DocRefJson {
		return {
			__voltiso: { type: 'Ref' },
			path: this._ref.path,
			isStrong: this._isStrong,
		}
	}

	toDatabase(): DocRefDatabase {
		return {
			__voltiso: { type: 'Ref' },
			ref: this._ref,
			isStrong: this._isStrong,
		}
	}

	/** @returns `PromiseLike`! (`then`-only) */
	get(): PromiseLike<If<Exists, D, null>> {
		return get(this._context) as never
	}

	/** @returns `PromiseLike`! (`then`-only) */
	set(data?: GetPublicCreationInputData<GetDocTI<D>, D>): PromiseLike<D> {
		const dataWithoutId = withoutId(data || null, this.id) || {}

		const idSchemas = getIdSchemas(this)

		for (const idSchema of idSchemas) {
			idSchema.validate(this.id)
		}

		/**
		 * Don't chain anything here - we're returning a magic promise to the client
		 * code that is aware of being awaited or not
		 */
		return update(
			this._context,
			replaceIt(dataWithoutId as never) as never,
		) as never
	}

	//

	/** @returns `PromiseLike`! (`then`-only) */
	update(
		updates: UpdatesFromData.Update<
			GetUpdateDataByCtx<GetDocTI<D>, 'outside'>,
			GetData<GetDocTI<D>>
		>,
	): PromiseLike<D | undefined>

	update(
		updates: ReplaceIt<GetUpdateDataByCtx<GetDocTI<D>, 'outside'>>,
	): PromiseLike<D>

	update(
		updates: undefined extends GetData<GetDocTI<D>> ? DeleteIt : never,
	): PromiseLike<null>

	update(
		updates: UpdatesFromData<
			GetUpdateDataByCtx<GetDocTI<D>, 'outside'>,
			GetData<GetDocTI<D>>
		>,
	): PromiseLike<D | null | undefined> {
		/**
		 * Don't chain anything here - we're returning a magic promise to the client
		 * code that is aware of being awaited or not
		 */
		return update(this._context, updates as never) as never
	}

	//

	//

	/** @returns `PromiseLike`! (`then`-only) */
	delete(): PromiseLike<null> {
		/**
		 * Don't chain anything here - we're returning a magic promise to the client
		 * code that is aware of being awaited or not
		 */
		return this.update(deleteIt() as never) as never
	}

	/** - TODO: Detect floating promises */
	get data(): NestedPromise<GetData<GetDocTI<D>>, Exists> {
		return this.dataWithoutId()
	}

	/** - TODO: Detect floating promises */
	dataWithId(): NestedPromise<$WithId<GetData<GetDocTI<D>>, D>, Exists> {
		return dataOrNestedPromise(
			this as never,
			() =>
				// eslint-disable-next-line promise/prefer-await-to-then
				this.get().then(doc =>
					doc ? ((doc as Doc).dataWithId() as never) : null,
				) as never,
		) as never
	}

	/** - TODO: Detect floating promises */
	dataWithoutId(): NestedPromise<GetData<GetDocTI<D>>, Exists> {
		return dataOrNestedPromise(
			this as never,
			() =>
				// eslint-disable-next-line promise/prefer-await-to-then
				this.get().then(doc =>
					doc ? (doc as IDoc).dataWithoutId() : null,
				) as never,
		) as never
	}

	/** - TODO: Detect floating promises */
	_callMethod<ARGS extends unknown[], R>(
		method: Method<D, ARGS, R>,
		args: ARGS,
		options: CallMethodOptions,
	): Promise<R> {
		return callMethod(this._context, method as never, args, options)
	}

	_getMethods(): DocRefMethodEntry[] {
		return getMethods.call(this as never) as never
	}
}
