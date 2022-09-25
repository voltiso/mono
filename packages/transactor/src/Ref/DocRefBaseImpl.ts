// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type * as FirestoreLike from '@voltiso/firestore-like'
import type {
	InferableObject,
	ISchema,
	SchemaLike,
} from '@voltiso/schemar.types'
import type { If } from '@voltiso/util'
import { lazyPromise, omit, protoLink } from '@voltiso/util'

import type { InferMethods } from '~/CollectionRef/InferMethods'
import type { RefEntry } from '~/common'
import type { Id, WithId } from '~/Data'
import { withoutId } from '~/Data'
import type { DocLike, IDoc } from '~/Doc'
import { DTI } from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type { GetData, GetPublicCreationInputData } from '~/Doc/_/GData'
import { deleteIt, replaceIt } from '~/it'
import type { Method } from '~/Method'
import { DocPath } from '~/Path'
import type {
	DeepPartialIntrinsicFieldsSchema,
	IntrinsicFieldsSchema,
} from '~/schemas/sIntrinsicFields'
import type { AfterTrigger, BeforeCommitTrigger, OnGetTrigger } from '~/Trigger'

import { getAggregateSchemas } from './_'
import type { CallMethodOptions } from './_/callMethod'
import { callMethod } from './_/callMethod'
import type { DocRefContext, DocRefParentContext } from './_/Context'
import type { MethodEntry, TriggerEntry } from './_/data'
import { getMethods } from './_/getMethods'
import { getIdSchemas } from './_/getSchema'
import type { NestedPromise } from './_/NestedPromise'
import { dataOrNestedPromise } from './_/NestedPromise'
import { DocFieldPath } from './DocFieldPath'
import { IS_DOC_REF } from './IRef'
import { get, update } from './methods'
import type { RefBase } from './RefBase'
import { StrongDocRef } from './StrongDocRef'
import { WeakDocRef } from './WeakDocRef'

// @staticImplements<DocRefConstructor>()
export class DocRefBaseImpl<
	D extends DocLike = IDoc,
	Exists extends boolean = boolean,
	_Ctx extends ExecutionContext = 'outside',
> implements RefBase<D, Exists>
{
	[IS_DOC_REF] = true as const

	/** Type-only field */
	declare Exists: Exists;

	declare [DTI]: D[DTI]

	// eslint-disable-next-line unicorn/no-thenable
	declare then: RefBase<D, Exists>['then']

	_context: DocRefContext
	_ref: FirestoreLike.ServerDocumentReference
	_path: DocPath<D[DTI]['tag']>

	get path(): DocPath<D[DTI]['tag']> {
		return this._path
	}

	get id(): Id<D> {
		$assert(this._path.id)
		return this._path.id as never
	}

	_methods?: MethodEntry[] = undefined

	_afterTriggers?: TriggerEntry<AfterTrigger>[] = undefined
	_beforeCommits?: TriggerEntry<BeforeCommitTrigger>[] = undefined
	_onGets?: TriggerEntry<OnGetTrigger>[] = undefined

	_idSchemas?: ISchema<string>[] = undefined
	_aggregateSchemas?: Record<string, SchemaLike> = undefined

	_schema:
		| {
				final: IntrinsicFieldsSchema
				partial: DeepPartialIntrinsicFieldsSchema
		  }
		| null // null -> no schema
		| undefined = undefined // undefined -> unknown yet

	_publicOnCreationSchema?: InferableObject = undefined
	_privateSchema?: InferableObject = undefined

	methods: D[DTI]['methods'] & InferMethods<D> = {} as D[DTI]['methods'] &
		InferMethods<D>

	_isStrong: boolean

	get aggregateSchemas(): never {
		return getAggregateSchemas(this) as never
	}

	get asStrongRef() {
		return new StrongDocRef<D>(
			omit(this._context, 'docRef'),
			this._path.toString(),
		)
	}

	get asWeakRef() {
		return new WeakDocRef<D>(
			omit(this._context, 'docRef'),
			this._path.toString(),
		)
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
					// if (p === 'then') {
					// 	return Zone.current.wrap((target as any).then, 'DocRef')
					// } else
					if (typeof p === 'symbol' || p in target) {
						return Reflect.get(target, p, receiver) as unknown
					} else return new DocFieldPath(this._context, [p])
				},
			},
		) as never
	}

	// clone(): this {
	// 	return clone(this)
	// }

	toJSON(): RefEntry {
		return {
			__target: this._ref,
			__isStrong: this._isStrong,
		}
	}

	/** @returns `PromiseLike`! (`then`-only) */
	get(): PromiseLike<If<Exists, D, null>> {
		return get(this._context) as never
	}

	/** @returns `PromiseLike`! (`then`-only) */
	set(data?: GetPublicCreationInputData<D[DTI], D>): PromiseLike<D> | any {
		const dataWithoutId = withoutId(data || null, this.id) || {}

		const idSchemas = getIdSchemas(this)

		for (const idSchema of idSchemas) {
			idSchema.validate(this.id)
		}

		return update(
			this._context,
			replaceIt(dataWithoutId as never) as never,
		) as never // don't chain anything here - we're returning a magic promise to the client code that is aware of being awaited or not
	}

	/** @returns `PromiseLike`! (`then`-only) */
	update(updates: any): any {
		return update(this._context, updates as never) as any // don't chain anything here - we're returning a magic promise to the client code that is aware of being awaited or not
	}

	/** @returns `PromiseLike`! (`then`-only) */
	delete(): PromiseLike<null> {
		return this.update(deleteIt()) as never // don't chain anything here - we're returning a magic promise to the client code that is aware of being awaited or not
	}

	/** - TODO: Detect floating promises */
	get data(): NestedPromise<GetData<D[DTI]>, Exists> {
		return this.dataWithoutId()
	}

	/** - TODO: Detect floating promises */
	dataWithId(): NestedPromise<WithId<GetData<D[DTI]>, D>, Exists> {
		return dataOrNestedPromise(
			this as never,
			// eslint-disable-next-line promise/prefer-await-to-then
			() => this.get().then(doc => (doc ? doc.dataWithId() : null)) as never,
		) as never
	}

	/** - TODO: Detect floating promises */
	dataWithoutId(): NestedPromise<GetData<D[DTI]>, Exists> {
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

	_getMethods(): MethodEntry[] {
		return getMethods.call(this as never)
	}
}
