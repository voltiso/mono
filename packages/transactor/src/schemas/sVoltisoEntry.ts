// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Output_ } from '@voltiso/schemar.types'

import { isEqual } from '~/util'

import { sTimestamp } from './sTimestamp'

export const sAggregateTargetEntry = s.object({
	value: s.any.optional, // s.unknown.Narrow<NestedData>(),
	numSources: s.number.default(0),
})

export type AggregateTargetEntry =
	/** @inline */ typeof sAggregateTargetEntry.Output

export const sVoltisoEntry = s
	.object({
		numRefs: s.number.default(0),

		aggregateTarget: s.object.plain
			.index(s.string, sAggregateTargetEntry)
			.default({}),

		aggregateSource: s.record(s.string, s.record(s.string, true)).default({}),

		migrations: s
			.record(s.string, {
				migratedAt: sTimestamp,
			})
			.default({}),

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
	}).simple
// .default({}) // ! do not export schemas that apply defaults

export type VoltisoEntry = /** @inline */ Output_<typeof sVoltisoEntry>

export function getDefaultVoltisoEntry(date: Date) {
	return sVoltisoEntry.validate({
		createdAt: date,
		updatedAt: date,
	})
}
