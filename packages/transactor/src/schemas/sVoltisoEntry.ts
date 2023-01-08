// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Input_, Output_ } from '@voltiso/schemar'

import { isEqual } from '~/util'

import { sTimestamp } from './sTimestamp'

//

//

export const _sVoltisoEntryAggregateTargetEntry = s.object({
	value: s.any.optional, // s.unknown.Narrow<NestedData>(),
	numSources: s.number.default(0),
})

export const sVoltisoEntryAggregateTargetEntry =
	_sVoltisoEntryAggregateTargetEntry
		.CastOutput<VoltisoEntry.AggregateTarget.Entry>()
		.CastInput<VoltisoEntry.AggregateTarget.Entry.Input>()

//

export const _sVoltisoEntryAggregateTarget = s.object.plain.index(
	s.string,
	sVoltisoEntryAggregateTargetEntry,
)

export const sVoltisoEntryAggregateTarget = _sVoltisoEntryAggregateTarget
	.CastOutput<VoltisoEntry.AggregateTarget>()
	.CastInput<VoltisoEntry.AggregateTarget.Input>()

//

export const _sVoltisoEntryMigration = s.object({
	migratedAt: sTimestamp,
})

export const sVoltisoEntryMigration = _sVoltisoEntryMigration
	.CastOutput<VoltisoEntry.Migration>()
	.CastInput<VoltisoEntry.Migration.Input>()

//

export const _sVoltisoEntryMigrations = s.record(
	s.string,
	sVoltisoEntryMigration,
)

export const sVoltisoEntryMigrations = _sVoltisoEntryMigrations
	.CastOutput<VoltisoEntry.Migrations>()
	.CastInput<VoltisoEntry.Migrations.Input>()

//

//

export const _sVoltisoEntry = s
	.infer({
		numRefs: s.number.default(0),

		aggregateTarget: sVoltisoEntryAggregateTarget.default({}),

		aggregateSource: s.record(s.string, s.record(s.string, true)).default({}),

		migrations: sVoltisoEntryMigrations.default({}),

		numMigrations: s.number.default(0), // overrode by `fix` below
		migratedAt: sTimestamp.default(new Date(0)),

		createdAt: sTimestamp.default(new Date(0)), // default only for existing non-transactor documents
		updatedAt: sTimestamp.default(new Date(0)), // default only for existing non-transactor documents
	})
	.fix(entry => {
		// update `numMigrations`
		const numMigrations = Object.keys(entry.migrations).length
		if (entry.numMigrations === numMigrations) return entry
		return { ...entry, numMigrations }
	})
	.fix(entry => {
		// update `migratedAt`
		let migratedAt = new Date(0)
		for (const migration of Object.values(entry.migrations)) {
			if (migration.migratedAt > migratedAt) migratedAt = migration.migratedAt
		}
		if (!isEqual(migratedAt, entry.migratedAt)) return { ...entry, migratedAt }
		return entry
	})
// .simple.default({})

export const sVoltisoEntry = _sVoltisoEntry
	.CastOutput<VoltisoEntry>()
	.CastInput<VoltisoEntry.Input>()

//

//

export interface VoltisoEntry extends Output_<typeof _sVoltisoEntry> {}

export namespace VoltisoEntry {
	export interface Input extends Input_<typeof _sVoltisoEntry> {}

	//

	//

	export interface Migration extends Output_<typeof _sVoltisoEntryMigration> {}

	export namespace Migration {
		export interface Input extends Input_<typeof _sVoltisoEntryMigration> {}
	}

	//

	export interface Migrations
		extends Output_<typeof _sVoltisoEntryMigrations> {}

	export namespace Migrations {
		export interface Input extends Input_<typeof _sVoltisoEntryMigrations> {}
	}

	//

	//

	export interface AggregateTarget
		extends Output_<typeof _sVoltisoEntryAggregateTarget> {}

	export namespace AggregateTarget {
		export interface Input
			extends Input_<typeof _sVoltisoEntryAggregateTarget> {}

		//

		export interface Entry
			extends Output_<typeof _sVoltisoEntryAggregateTargetEntry> {}

		export namespace Entry {
			export interface Input
				extends Input_<typeof _sVoltisoEntryAggregateTargetEntry> {}
		}
	}
}

export function getDefaultVoltisoEntry(date: Date) {
	return sVoltisoEntry.validate({
		createdAt: date,
		updatedAt: date,
	})
}
