// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'

import type { FirestoreLikeModule } from '~/DatabaseContext'

import type { TransactorOptions } from './TransactorOptions'

export type TransactorConstructorParameters =
	| []
	| [Partial<TransactorOptions> | undefined]
	| [Database.Database, FirestoreLikeModule]
	| [
			Database.Database,
			FirestoreLikeModule,
			Partial<TransactorOptions> | undefined,
	  ]

export type TransactorConstructorParametersNoUndefined =
	| []
	| [Partial<TransactorOptions>]
	| [Database.Database, FirestoreLikeModule]
	| [Database.Database, FirestoreLikeModule, Partial<TransactorOptions>]
