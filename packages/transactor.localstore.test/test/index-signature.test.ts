// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { GetVoltisoEntry } from '@voltiso/transactor'
import { Doc } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor({ checkDecorators: false })

class User extends Doc.with({
	id: s.string,

	public: s
		.object({
			displayName: s.string,
			def: s.string.default('def'),
		})
		.index(s.string, s.string),
}) {}

const users = db('userSig').register(User)

describe('index-signature', function () {
	it('works', async function () {
		expect.hasAssertions()

		await database.doc('userSig/a').delete()

		const user = await users.add({
			id: 'a' as never,
			displayName: 'aa',
			custom: 'test',
		})

		// TODO support strict index signatures - like TS ones - and still support current implementation - i.e. each field has to match at least one vs match all signatures

		// ! no longer supported - indexed things are not checked
		// ;() =>
		// 	users.add({
		// 		id: 'a' as never,
		// 		displayName: 'aa',
		// 		// @ts-expect-error does not match index signature
		// 		custom: 123,
		// 	})

		$Assert<
			IsIdentical<
				typeof user.data,
				{
					[x: string]: string
					// @ts-expect-error does not match signature
					__voltiso: GetVoltisoEntry<{}>
					displayName: string
					def: string
				}
			>
		>()

		expect(user.data.displayName).toBe('aa')
		expect(user.data.def).toBe('def')
	})
})
