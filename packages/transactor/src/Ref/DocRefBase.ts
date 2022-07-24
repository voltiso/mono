// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type * as FirestoreLike from '@voltiso/firestore-like'
import type * as s from '@voltiso/schemar'
import type { If } from '@voltiso/util'
import { clone, lazyPromise, protoLink, undef } from '@voltiso/util'

import type { InferMethods } from '../CollectionRef/InferMethods'
import type { RefEntry } from '../common'
import type { Data, DataWithId, DataWithoutId, Id } from '../Data'
import { withoutId } from '../Data'
import type { IDoc } from '../Doc'
import { DTI } from '../Doc'
import type { ExecutionContext, GData, GDataPublicInput } from '../Doc/_'
import { deleteIt, replaceIt } from '../it'
import type { Method } from '../Method'
import { DocPath } from '../Path'
import type {
	AfterTrigger,
	BeforeCommitTrigger,
	OnGetTrigger,
} from '../Trigger'
import type {
	CallMethodOptions,
	DocRefContext,
	DocRefParentContext,
	MethodEntry,
	NestedPromise,
	TriggerEntry,
} from './_'
import { callMethod, dataOrNestedPromise, getMethods } from './_'
import { DocFieldPath } from './DocFieldPath'
import { IS_DOC_REF } from './IRef.js'
import { get, update } from './methods'
import type { RefBase } from './RefBase'

// @staticImplements<DocRefConstructor>()
export class DocRefBase_<
	D extends IDoc = IDoc,
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
	_ref: FirestoreLike.DocumentReference
	_path: DocPath<D[DTI]['tag']>

	get path(): DocPath<D[DTI]['tag']> {
		return this._path
	}

	get id(): Id<D> {
		assert(this._path.id)
		return this._path.id as never
	}

	_methods?: MethodEntry[] = undef

	_afterTriggers?: TriggerEntry<AfterTrigger>[] = undef
	_beforeCommits?: TriggerEntry<BeforeCommitTrigger>[] = undef
	_onGets?: TriggerEntry<OnGetTrigger>[] = undef

	_schema:
		| {
				final: s.Schema<object>
				partial: s.Schema<object>
		  }
		| null // null -> no schema
		| undefined = // undefined -> unknown yet
		undef

	_constSchema?: s.InferableObject = undef
	_privateSchema?: s.InferableObject = undef
	_protectedSchema?: s.InferableObject = undef

	methods: D[DTI]['methods'] & InferMethods<D> = {} as D[DTI]['methods'] &
		InferMethods<D>

	_isStrong: boolean

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

	clone(): this {
		return clone(this)
	}

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
	set(data?: Data<GDataPublicInput<D[DTI]>>): PromiseLike<D> | any {
		const dataWithoutId = withoutId(data || null, this.id)
		return update(this._context, replaceIt(dataWithoutId) as any) as never // don't chain anything here - we're returning a magic promise to the client code that is aware of being awaited or not
	}

	/** @returns `PromiseLike`! (`then`-only) */
	update(updates: any): any {
		return update(this._context, updates) as any // don't chain anything here - we're returning a magic promise to the client code that is aware of being awaited or not
	}

	/** @returns `PromiseLike`! (`then`-only) */
	delete(): PromiseLike<null> {
		return this.update(deleteIt()) as never // don't chain anything here - we're returning a magic promise to the client code that is aware of being awaited or not
	}

	/** - TODO: Detect floating promises */
	get data(): NestedPromise<DataWithoutId<GData<D[DTI]>>, Exists> {
		return this.dataWithoutId()
	}

	/** - TODO: Detect floating promises */
	dataWithId(): NestedPromise<DataWithId<GData<D[DTI]>>, Exists> {
		return dataOrNestedPromise(
			this as never,
			// eslint-disable-next-line promise/prefer-await-to-then
			() => this.get().then(doc => (doc ? doc.dataWithId() : null)) as never,
		) as never
	}

	/** - TODO: Detect floating promises */
	dataWithoutId(): NestedPromise<DataWithoutId<GData<D[DTI]>>, Exists> {
		return dataOrNestedPromise(
			this as never,
			// eslint-disable-next-line promise/prefer-await-to-then
			() => this.get().then(doc => (doc ? doc.dataWithoutId() : null)) as never,
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
