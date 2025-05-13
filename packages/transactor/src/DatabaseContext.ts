// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'

export interface FirestoreLikeModule {
	FieldValue: Database.TypeofFieldValue
	// Timestamp: Database.TypeofTimestamp
}

export interface DatabaseContext {
	module: FirestoreLikeModule
	database: Database.Database
}
