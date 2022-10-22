// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'
import type { OmitCall, Tail } from '@voltiso/util'
import { assumeType, staticImplements, undef } from '@voltiso/util'

import { checkEnv } from '~/checkEnv'
import type { CollectionRef } from '~/CollectionRef'
import type { DatabaseContext, FirestoreLikeModule } from '~/DatabaseContext'
import { Db } from '~/Db/Db'
import type { IDocConstructorNoBuilder, IndexedDoc } from '~/Doc'
import { TransactorError } from '~/error'
import type { AfterTrigger, BeforeCommitTrigger, OnGetTrigger } from '~/Trigger'

import type {
	TransactorConstructorParameters,
	TransactorConstructorParametersNoUndefined,
} from './ConstructorParameters'
import type { TransactorContext } from './Context'
import type {
	IdSchemaEntry,
	MethodEntry,
	SchemaEntry,
	TriggerEntry,
} from './Entry'
import type { TransactionBody } from './methods'
import { runTransaction } from './methods'
import { Options_ } from './Options'
import type { Transactor as ITransactor } from './Transactor'
import type { TransactorConstructor } from './TransactorConstructor'

// import { AsyncLocalStorage } from 'async_hooks'

@staticImplements<TransactorConstructor<TransactorImpl>>()
export class TransactorImpl extends Db implements OmitCall<ITransactor> {
	declare _context: TransactorContext

	_databaseContext: DatabaseContext | undefined = undef

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

	init(database: FirestoreLike.Database, module: FirestoreLikeModule): void {
		checkEnv()
		this._databaseContext = {
			database,
			module,
		}
		// this._options.module = module
	}

	_options: Options_

	_allMethods: MethodEntry[] = []

	_allIdSchemas: IdSchemaEntry[] = []

	_allPublicOnCreationSchemas: SchemaEntry[] = []
	_allPublicSchemas: SchemaEntry[] = []
	_allPrivateSchemas: SchemaEntry[] = []

	_allAggregateSchemas: SchemaEntry[] = []

	_allAfterTriggers: TriggerEntry<AfterTrigger>[] = []
	_allBeforeCommits: TriggerEntry<BeforeCommitTrigger>[] = []
	_allOnGets: TriggerEntry<OnGetTrigger>[] = []

	// _transactionLocalStorage: AsyncLocalStorage<ContextOverride>

	constructor(...args: TransactorConstructorParameters) {
		super({ transactor: undef as unknown as TransactorImpl }) // hack
		this._context.transactor = this

		let database: FirestoreLike.Database | undefined
		let myModule: FirestoreLikeModule | undefined
		let partialOptions: Partial<Options_> = {}

		while (args.length > 0 && args.at(-1) === undef) args.pop()

		assumeType<TransactorConstructorParametersNoUndefined, typeof args>(args)

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

		this._options = new Options_(partialOptions)

		if (database) {
			$assert(myModule)
			this.init(database, myModule)
		}

		Object.seal(this)
	}

	register<Cls extends IDocConstructorNoBuilder>(cls: Cls): any {
		if (cls._.tag === 'untagged')
			throw new TransactorError('db.register(Cls) requires a class tag')

		const collection = this._context.db(
			cls._.tag,
		) as unknown as CollectionRef<IndexedDoc>
		return collection.register(cls)
	}

	runTransaction<R>(
		body: TransactionBody<R>,
		...args: Tail<Tail<Parameters<typeof runTransaction>>>
	) {
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
