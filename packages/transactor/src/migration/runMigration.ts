// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType, assert } from '@voltiso/util'

import type { $$Doc, Doc } from '~/Doc'
import type { WithTransactor } from '~/Transactor'

import type { Migration } from './Migration'

export async function runMigration<D extends $$Doc>(
	ctx: WithTransactor,
	doc: D,
	migration: Migration<D>,
) {
	$AssumeType<Doc>(doc)

	if (doc.data.__voltiso.migrations[migration.migrationName]) return // already done

	await ctx.transactor.runTransaction(async () => {
		await migration(doc)

		// eslint-disable-next-line require-atomic-updates
		doc.data.__voltiso.migrations[migration.migrationName] = {
			migratedAt: new Date(),
		}
	})
}

export async function runMigrations<D extends $$Doc>(
	ctx: WithTransactor,
	doc: D,
	migrations: Migration<D>[],
) {
	for (const migration of migrations) {
		assert(migration.migrationName)

		// eslint-disable-next-line no-await-in-loop
		await runMigration(ctx, doc, migration)
	}
}
