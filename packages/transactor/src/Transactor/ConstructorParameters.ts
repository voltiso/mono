// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'

import type { FirestoreLikeModule } from '../DatabaseContext.js'
import type { Options_ } from './Options.js'

export type TransactorConstructorParameters =
	| []
	| [Partial<Options_> | undefined]
	| [Database.Database, FirestoreLikeModule]
	| [Database.Database, FirestoreLikeModule, Partial<Options_> | undefined]

export type TransactorConstructorParametersNoUndefined =
	| []
	| [Partial<Options_>]
	| [Database.Database, FirestoreLikeModule]
	| [Database.Database, FirestoreLikeModule, Partial<Options_>]
