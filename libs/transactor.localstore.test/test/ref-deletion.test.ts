// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { TriggerParams } from '@voltiso/transactor'
import { after, Doc, sStrongRef } from '@voltiso/transactor'
import { describe, expect, it } from 'vitest'

import { createTransactor, database } from './common'

const db = createTransactor()

const slug = s.string
	.lengthRange(1, 255)
	.regex(
		/^[\da-z]+(-[\da-z]+)*$/u,
		'Slug must be lowercase with single hyphen separators',
	)
	.check(
		s => !['add'].includes(s),
		s => `Slug cannot equal '${s}'`,
	)

class Banana extends Doc('banana').with({
	id: s.string,

	public: {
		name: s.string,
		slug,
	},
}) {
	@after
	async updateSlug(p: TriggerParams.After<Banana>) {
		if (p.before?.slug !== p.after?.slug) {
			if (p.before) {
				await bananaSlugs(p.before.slug).delete()
			}

			if (p.after) {
				assert(p.doc)
				await bananaSlugs.add({
					id: p.after.slug as never,
					banana: p.doc.ref,
				})
			}
		}
	}
}

class BananaSlug extends Doc('bananaSlug').with({
	id: s.string,

	public: {
		banana: sStrongRef<'banana'>(),
	},
}) {}

declare module '@voltiso/transactor' {
	interface DocTypes {
		banana: Banana
		bananaSlug: BananaSlug
	}
}

const bananas = db.register(Banana)
const bananaSlugs = db.register(BananaSlug)

describe('ref - deletion', () => {
	it('checks numRefs on delete', async () => {
		expect.hasAssertions()

		await database.doc('banana/b').delete()
		const b = await bananas.add({
			name: 'd',
			slug: 'my-banana',
		})

		const bs = await bananaSlugs('my-banana').data.banana

		expect(bs.id).toBe(b.id)

		await b.delete()
	})

	it('cannot be named `add`', async () => {
		expect.hasAssertions()

		await database.doc('banana/b').delete()

		await expect(
			bananas.add({
				name: 'd',
				slug: 'add',
			}),
		).rejects.toThrow('add')
	})
})
