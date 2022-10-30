// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'
import type { IsUnion, Tail, Throw } from '@voltiso/util'
import { $assert, $AssumeType, staticImplements, tryAt } from '@voltiso/util'

import { checkEnv } from '~/checkEnv'
import type { CollectionRef } from '~/CollectionRef'
import type { DatabaseContext, FirestoreLikeModule } from '~/DatabaseContext'
import { Db } from '~/Db/Db'
import type {
	$$DocConstructor,
	DTI,
	GetDoc,
	GetDocTI,
	IDocConstructorNoBuilder,
	IndexedDoc,
} from '~/Doc'
import { TransactorError } from '~/error'
import type { AfterTrigger, BeforeCommitTrigger, OnGetTrigger } from '~/Trigger'

import type { DbPathFromString } from '..'
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
import type { TransactorConstructor } from './TransactorConstructor'

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
	 * @param firestoreLikeModule - Object containing helpers for the
	 *   Firestore-compatible database (`FieldValue`, `Timestamp`), required for
	 *   anything other than `Firestore` database
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
		super({ transactor: undefined as unknown as Transactor }) // hack
		this._context.transactor = this

		let database: FirestoreLike.Database | undefined
		let myModule: FirestoreLikeModule | undefined
		let partialOptions: Partial<Options_> = {}

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

		this._options = new Options_(partialOptions)

		if (database) {
			$assert(myModule)
			this.init(database, myModule)
		}

		Object.seal(this)
	}

	//

	//

	register<
		// eslint-disable-next-line etc/no-misused-generics
		Cls extends { [DTI]: { tag: 'untagged' } },
	>(cls: Cls): Throw<'db.register requires Doc tag'>

	register<Cls extends $$DocConstructor>(
		cls: Cls,
	): IsUnion<GetDocTI<Cls>['tag']> extends true
		? never
		: DbPathFromString<GetDocTI<Cls>['tag'], GetDoc<Cls>> // CollectionRef<InstanceType<Cls>>

	//

	register<Cls extends IDocConstructorNoBuilder>(cls: Cls): any {
		if (cls._.tag === 'untagged')
			throw new TransactorError('db.register(Cls) requires a class tag')

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
