// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'
import type {
	IObject,
	ISchema,
	Schema,
	SchemaLike,
} from '@voltiso/schemar.types'
import type { DeleteIt, If, Override, ReplaceIt } from '@voltiso/util'
import {
	assert,
	deleteIt,
	lazyPromise,
	omit,
	OPTIONS,
	protoLink,
	replaceIt,
} from '@voltiso/util'

import type { DocRefDatabase, DocRefJson } from '~/common'
import type { $WithId, DocIdString } from '~/Data'
import { withoutId } from '~/Data'
import type {
	Doc,
	GetDoc,
	GetDocTI,
	GetMethodPromises,
	UpdatesFromData,
} from '~/Doc'
import type {
	GetData,
	GetPublicCreationInputData,
	GetUpdateDataByCtx,
} from '~/Doc/_/GData'
import { TransactorError } from '~/error/TransactorError'
import type { Method } from '~/Method'
import type { DocPath } from '~/Path'
import { CustomDocPath } from '~/Path'
import type {
	DeepPartialIntrinsicFieldsSchema,
	IntrinsicFieldsSchema,
} from '~/schemas/sIntrinsicFields'
import type { AfterTrigger, BeforeCommitTrigger, OnGetTrigger } from '~/Trigger'

import { DocFieldPath } from '../DocFieldPath/DocFieldPath'
import type { DocRefContext } from './_'
import { getAggregateSchemas, getMethods } from './_'
import type { CallMethodOptions } from './_/callMethod'
import { callMethod } from './_/callMethod'
import type { DocRefMethodEntry, DocRefTriggerEntry } from './_/data'
import { getIdSchemas, getSchema } from './_/getSchema'
import type { NestedPromise } from './_/NestedPromise'
import { dataOrNestedPromise } from './_/NestedPromise'
import type { $$DocRef } from './$$DocRef'
import { IS_DOC_REF } from './$$DocRef'
import type { DocRef } from './DocRef'
import { defaultDocRefOptions } from './DocRef'
import type { GetDocRef } from './GetDocRef'
import { get, update } from './methods'

//

/** @internal */
export class _CustomDocRef<O extends DocRef.Options> implements $$DocRef {
	readonly [IS_DOC_REF] = true as const

	_context: DocRefContext
	_ref: FirestoreLike.ServerDocumentReference
	_path: DocPath

	get path(): CustomDocPath<{ doc: O['doc'] }> {
		return this._path as never
	}

	get id(): DocIdString<O['doc']> {
		assert(this._path.id)
		return this._path.id as never
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

	readonly methods = {} as GetMethodPromises<O['doc']>;

	[OPTIONS]: O

	get isStrong(): O['isStrong'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isStrong
	}

	// eslint-disable-next-line class-methods-use-this
	get schemaWithoutId(): Schema<GetData<O['doc']>> | undefined {
		throw new TransactorError('not implemented')
	}

	get schemaWithId(): Schema<$WithId<GetData<O['doc']>>> | undefined {
		return getSchema(this)?.final as never
	}

	get aggregateSchemas(): GetDocTI<O['doc']>['aggregates'] {
		return getAggregateSchemas(this)
	}

	get asStrongRef(): GetDocRef<Override<O, { isStrong: true }>> {
		// eslint-disable-next-line etc/no-internal
		return new _CustomDocRef(
			omit(this._context, 'docRef'),
			this._path.toString(),
			// eslint-disable-next-line security/detect-object-injection
			{ ...this[OPTIONS], isStrong: true },
		) as never
	}

	get asWeakRef(): GetDocRef<Override<O, { isStrong: false }>> {
		// eslint-disable-next-line etc/no-internal
		return new _CustomDocRef(
			omit(this._context, 'docRef'),
			this._path.toString(),
			// eslint-disable-next-line security/detect-object-injection
			{ ...this[OPTIONS], isStrong: false },
		) as never
	}

	constructor(
		context: DocRefContext.Parent,
		path: string,
		partialOptions: Partial<O>,
	) {
		this._context = { ...context, docRef: this as never }
		this._path = new CustomDocPath(path)
		this._ref = context.transactor._database.doc(this._path.toString())

		const options = { ...defaultDocRefOptions, ...partialOptions }

		// eslint-disable-next-line security/detect-object-injection
		this[OPTIONS] = options as never // assume the generic type argument is correct

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
			// eslint-disable-next-line security/detect-object-injection
			isStrong: this[OPTIONS].isStrong,
		}
	}

	toDatabase(): DocRefDatabase {
		return {
			__voltiso: { type: 'Ref' },
			ref: this._ref,
			// eslint-disable-next-line security/detect-object-injection
			isStrong: this[OPTIONS].isStrong,
		}
	}

	/** @returns `PromiseLike`! (`then`-only) */
	get(): PromiseLike<GetDoc<O['doc']> | If<O['isStrong'], never, null>> {
		return get(this._context) as never
	}

	/** @returns `PromiseLike`! (`then`-only) */
	set(
		data?: GetPublicCreationInputData<O['doc']>,
	): PromiseLike<GetDoc<O['doc']>> {
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
			GetUpdateDataByCtx<O['doc'], 'outside'>,
			GetData<O['doc']>
		>,
	): PromiseLike<GetDoc<O['doc']> | undefined>

	update(
		updates: ReplaceIt<GetUpdateDataByCtx<O['doc'], 'outside'>>,
	): PromiseLike<GetDoc<O['doc']>>

	update(
		updates: undefined extends GetData<O['doc']> ? DeleteIt : never,
	): PromiseLike<null>

	update(
		updates: any,
		// UpdatesFromData<
		// 	GetUpdateDataByCtx<GetDoc<O['doc']>, 'outside'>,
		// 	GetData<O['doc']>
		// >,
	): any {
		// PromiseLike<GetDoc<O['doc']> | null | undefined>
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
		return this.update(deleteIt as never) as never
	}

	/** - TODO: Detect floating promises */
	get data(): NestedPromise<
		GetData<O['doc']>,
		O['isStrong'] extends true ? true : boolean
	> {
		return this.dataWithoutId() as never
	}

	/** - TODO: Detect floating promises */
	dataWithId(): NestedPromise<
		$WithId<GetData<O['doc']>, GetDoc<O['doc']>>,
		O['isStrong'] extends true ? true : boolean
	> {
		return dataOrNestedPromise(
			this as never,
			() =>
				// eslint-disable-next-line promise/prefer-await-to-then
				this.get().then(((doc: Doc | null) =>
					doc ? (doc.dataWithId() as never) : null) as never) as never,
		) as never
	}

	/** - TODO: Detect floating promises */
	dataWithoutId(): NestedPromise<
		GetData<O['doc']>,
		O['isStrong'] extends true ? true : boolean
	> {
		return dataOrNestedPromise(
			this as never,
			() =>
				// eslint-disable-next-line promise/prefer-await-to-then
				this.get().then(((doc: Doc | null) =>
					doc ? doc.dataWithoutId() : null
				) as never) as never,
		) as never
	}

	/** - TODO: Detect floating promises */
	_callMethod<ARGS extends unknown[], R>(
		method: Method<GetDoc<O['doc']>, ARGS, R>,
		args: ARGS,
		options: CallMethodOptions,
	): Promise<R> {
		return callMethod(this._context, method as never, args, options)
	}

	_getMethods(): DocRefMethodEntry[] {
		return getMethods(this)
	}
}
