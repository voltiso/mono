// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jest/no-export */

import { equals } from '@voltiso/util'

import type { Input_, Output_ } from '~'
import * as s from '~'

//

const sTimestamp = s.instance(Date)

//

const _sVoltisoEntryAggregateTargetEntry = s.object({
	value: s.any.optional, // s.unknown.Narrow<NestedData>(),
	numSources: s.number.default(0),
})

const sVoltisoEntryAggregateTargetEntry = _sVoltisoEntryAggregateTargetEntry
	.name('VoltisoEntry.AggregateTarget.Entry')
	.CastOutput<VoltisoEntry.AggregateTarget.Entry>()
	.CastInput<VoltisoEntry.AggregateTarget.Entry.Input>()

//

const _sVoltisoEntryAggregateTarget = s.object.plain.index(
	s.string,
	sVoltisoEntryAggregateTargetEntry,
)

const sVoltisoEntryAggregateTarget = _sVoltisoEntryAggregateTarget
	.name('VoltisoEntry.AggregateTarget')
	.CastOutput<VoltisoEntry.AggregateTarget>()
	.CastInput<VoltisoEntry.AggregateTarget.Input>()

//

const _sVoltisoEntryMigration = s.object({
	migratedAt: sTimestamp,
})

const sVoltisoEntryMigration = _sVoltisoEntryMigration
	.name('VoltisoEntry.Migration')
	.CastOutput<VoltisoEntry.Migration>()
	.CastInput<VoltisoEntry.Migration.Input>()

//

const _sVoltisoEntryMigrations = s.record(s.string, sVoltisoEntryMigration)

const sVoltisoEntryMigrations = _sVoltisoEntryMigrations
	.name('VoltisoEntry.Migrations')
	.CastOutput<VoltisoEntry.Migrations>()
	.CastInput<VoltisoEntry.Migrations.Input>()

//

const _sVoltisoEntryAggregateSource = s.record(
	s.string,
	s.record(s.string, true),
)

const sVoltisoEntryAggregateSource = _sVoltisoEntryAggregateSource
	.name('VoltisoEntry.AggregateSource')
	.CastOutput<VoltisoEntry.AggregateSource>()
	.CastInput<VoltisoEntry.AggregateSource.Input>()

//

const _sVoltisoEntry = s
	.infer({
		numRefs: s.number.default(0),

		aggregateTarget: sVoltisoEntryAggregateTarget.default({}),
		aggregateSource: sVoltisoEntryAggregateSource.default({}),

		migrations: sVoltisoEntryMigrations.default({}),

		numMigrations: s.number.default(0), // overrode by `fix` below
		migratedAt: sTimestamp.default(new Date(0)),

		createdAt: sTimestamp.default(new Date(0)), // default only for existing non-transactor documents
		updatedAt: sTimestamp.default(new Date(0)), // default only for existing non-transactor documents
	})
	.map(entry => {
		// update `numMigrations`
		const numMigrations = Object.keys(entry.migrations).length
		if (entry.numMigrations === numMigrations) return entry
		return { ...entry, numMigrations }
	})
	.map(entry => {
		// update `migratedAt`
		let migratedAt = new Date(0)
		for (const migration of Object.values(entry.migrations)) {
			if (migration.migratedAt > migratedAt) migratedAt = migration.migratedAt
		}
		if (!equals(migratedAt, entry.migratedAt)) return { ...entry, migratedAt }
		return entry
	})

const sVoltisoEntry = _sVoltisoEntry
	.name('VoltisoEntry')
	.CastOutput<VoltisoEntry>()
	.CastInput<VoltisoEntry.Input>()

//

//

interface VoltisoEntry extends Output_<typeof _sVoltisoEntry> {}

namespace VoltisoEntry {
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

	export interface AggregateSource
		extends Output_<typeof _sVoltisoEntryAggregateSource> {}

	export namespace AggregateSource {
		export interface Input
			extends Input_<typeof _sVoltisoEntryAggregateSource> {}
	}

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

describe('object', () => {
	describe('transactor', () => {
		it('works', () => {
			const a = sVoltisoEntry.default({}).validate(undefined)

			expect(a).toMatchObject({ numRefs: 0 })
		})

		it('works with dates override', () => {
			const a = sVoltisoEntry.validate({
				createdAt: new Date(2022),
				updatedAt: new Date(2023),
			})

			expect(a).toMatchObject({ numRefs: 0 })
		})
	})
})
