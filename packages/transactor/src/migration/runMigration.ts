// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType, fastAssert } from '@voltiso/util'

import type { $$Doc, Doc } from '~/Doc'
import type { WithTransactor } from '~/Transactor'

import type { Migration } from './Migration'

export async function runMigration<D extends $$Doc>(
	ctx: WithTransactor,
	doc: D,
	migration: Migration<D>,
): Promise<void> {
	if (!doc) return
	$AssumeType<Doc>(doc)

	if (doc.data.__voltiso.migrations[migration.migrationName]) return // already done

	await ctx.transactor.runTransaction(async () => {
		await migration(doc)

		doc.data.__voltiso.migrations[migration.migrationName] = {
			migratedAt: new Date(),
		}
	})
}

export async function runMigrations<D extends $$Doc>(
	ctx: WithTransactor,
	doc: D,
	migrations: Migration<D>[],
): Promise<void> {
	if (!doc) return

	for (const migration of migrations) {
		fastAssert(migration.migrationName)

		await runMigration(ctx, doc, migration)
	}
}
