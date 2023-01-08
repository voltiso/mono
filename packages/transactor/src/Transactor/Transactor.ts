// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { Context } from '@voltiso/context'
import type * as FirestoreLike from '@voltiso/firestore-like'
import type { IsUnion, Tail, Throw } from '@voltiso/util'
import { $AssumeType, staticImplements, tryAt } from '@voltiso/util'

import { checkEnv } from '~/checkEnv'
import type { CollectionRef } from '~/CollectionRef'
import type { DatabaseContext, FirestoreLikeModule } from '~/DatabaseContext'
import { Db } from '~/Db/Db'
import type { DTI, IndexedDoc } from '~/Doc'
import type { $$DocConstructor, DocConstructor } from '~/DocConstructor'
import type { GetDoc, GetDocTI } from '~/DocRelated'
import type { DocTag } from '~/DocTypes'
import { AnyDoc } from '~/DocTypes'
import { TransactorError } from '~/error'
import type { DbPathFromString } from '~/Path'
import type { AfterTrigger, OnGetTrigger, Trigger } from '~/Trigger'

import type {
	TransactorConstructorParameters,
	TransactorConstructorParametersNoUndefined,
} from './ConstructorParameters'
import type { ContextOverride, TransactorContext } from './Context'
import type {
	TransactorIdSchemaEntry,
	TransactorMethodEntry,
	TransactorSchemaEntry,
	TransactorTriggerEntry,
} from './Entry'
import type { TransactionBody } from './methods'
import { runTransaction } from './methods'
import type { TransactorConstructor } from './TransactorConstructor'
import type { TransactorOptions } from './TransactorOptions'
import { defaultTransactorOptions } from './TransactorOptions'

// import { AsyncLocalStorage } from 'async_hooks'

@staticImplements<TransactorConstructor<Transactor>>()
export class Transactor extends Db {
	declare _context: TransactorContext

	_databaseContext: DatabaseContext | undefined = undefined

	get _database(): FirestoreLike.Database {
		if (!this._databaseContext) {
			throw new TransactorError('please init() first')
		}

		return this._databaseContext.database
	}

	get _databaseModule(): FirestoreLikeModule {
		$assert(this._databaseContext)
		return this._databaseContext.module
	}

	get databaseModule(): DatabaseContext {
		// $assert(this._databaseContext.database)
		// $assert(this._databaseContext.module)
		return this._databaseContext as DatabaseContext
	}

	//

	/**
	 * Lazy-initialize `Transactor`
	 *
	 * @param database - Either Firestore, Localstore, or something compatible
	 * @param module - Object containing helpers for the Firestore-compatible
	 *   database (`FieldValue`, `Timestamp`), required for anything other than
	 *   `Firestore` database
	 */
	init(database: FirestoreLike.Database, module: FirestoreLikeModule): void {
		checkEnv()
		this._databaseContext = {
			database,
			module,
		}
		// this._options.module = module
	}

	//

	_options: TransactorOptions
	_allMethods: TransactorMethodEntry[] = []
	_allIdSchemas: TransactorIdSchemaEntry[] = []
	_allPublicOnCreationSchemas: TransactorSchemaEntry[] = []
	_allPublicSchemas: TransactorSchemaEntry[] = []
	_allPrivateSchemas: TransactorSchemaEntry[] = []
	_allAggregateSchemas: TransactorSchemaEntry[] = []
	_allAfterTriggers: TransactorTriggerEntry<AfterTrigger>[] = []
	_allBeforeCommits: TransactorTriggerEntry<Trigger.BeforeCommit>[] = []
	_allOnGets: TransactorTriggerEntry<OnGetTrigger>[] = []

	_transactionContext: Context<ContextOverride> = new Context<ContextOverride>()

	constructor(...args: TransactorConstructorParameters) {
		super({ transactor: undefined as unknown as Transactor }) // hack
		this._context.transactor = this

		let database: FirestoreLike.Database | undefined
		let myModule: FirestoreLikeModule | undefined
		let partialOptions: Partial<TransactorOptions> = {}

		while (args.length > 0 && tryAt(args, -1) === undefined) args.pop()

		$AssumeType<TransactorConstructorParametersNoUndefined, typeof args>(args)

		switch (args.length) {
			case 1:
				;[partialOptions] = args
				break

			case 2:
				;[database, myModule] = args
				break

			case 3:
				;[database, myModule, partialOptions] = args
				break

			default:
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (args.length > 3)
					throw new TransactorError('expected 0, 1 or 2 arguments')
		}

		for (const option in partialOptions)
			if (!(option in defaultTransactorOptions))
				throw new TransactorError(`Unknown option: ${option}`)

		this._options = {
			...defaultTransactorOptions,
			...partialOptions,
		}

		if (database) {
			$assert(myModule)
			this.init(database, myModule)
		}

		Object.seal(this)
	}

	//

	//

	register<Cls extends { [DTI]: { tag: AnyDoc } }>(
		cls: Cls,
	): Throw<'db.register requires Doc tag'>

	register<Cls extends $$DocConstructor>(
		cls: Cls,
	): IsUnion<GetDocTI<Cls>['tag']> extends true
		? never
		: DbPathFromString<GetDocTI<Cls>['tag'] & DocTag, GetDoc<Cls>> // CollectionRef<InstanceType<Cls>>

	//

	register<Cls extends $$DocConstructor>(cls: Cls): any {
		$AssumeType<DocConstructor>(cls)

		if (cls._.tag === AnyDoc)
			throw new TransactorError(
				'db.register(Cls) requires `Cls` to include DocTag',
			)

		$assert(cls._.tag)

		const collection = this._context.db(
			cls._.tag,
		) as unknown as CollectionRef<IndexedDoc>
		return collection.register(cls)
	}

	//

	//

	runTransaction<R>(
		body: TransactionBody<R>,
		...args: Tail<Tail<Parameters<typeof runTransaction>>>
	): Promise<R> {
		return runTransaction(this, body, ...args)
	}

	get requireSchemas() {
		return this._options.requireSchemas
	}

	set requireSchemas(x) {
		this._options.requireSchemas = x
	}

	get partial() {
		return this._options.partial
	}

	set partial(x: boolean) {
		this._options.partial = x
	}

	get readOnly() {
		return this._options.readOnly
	}

	set readOnly(value: boolean) {
		this._options.readOnly = value
	}

	get refCounters() {
		return this._options.refCounters
	}
}
