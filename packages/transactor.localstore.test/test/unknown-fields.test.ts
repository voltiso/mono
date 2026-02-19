// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { ValidationIssue } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { Doc, sVoltisoEntry } from '@voltiso/transactor'

import { createTransactor, database } from './common'

declare module '@voltiso/transactor' {
	interface DocTypes {
		usersUnknownFields: User
	}
}

// eslint-disable-next-line jest/require-hook
let issues = [] as ValidationIssue[]

class User extends Doc('usersUnknownFields').with({
	id: s.string,

	public: {
		known: s.string.optional,
	},
}) {}

describe('unknown-fields', () => {
	it('default - warning only (or ignore)', async () => {
		await database
			.doc('usersUnknownFields/a')
			.set({ known: 'test', unknown: 'test2' })

		const db = createTransactor({ checkDecorators: false })
		db.register(User)

		const user = await db('usersUnknownFields/a')
		void user
	})

	it('error', async () => {
		await database
			.doc('usersUnknownFields/a')
			.set({ known: 'test', unknown: 'test2' })

		const db = createTransactor({
			checkDecorators: false,
			onUnknownField: 'error',
		})
		db.register(User)

		await expect(db('usersUnknownFields/a')).rejects.toThrow('.unknown')
	})

	it('custom handler', async () => {
		expect.hasAssertions()

		issues = []

		await database
			.doc('usersUnknownFields/a')
			.set({ known: 'test', unknown: 'test2' })

		const db = createTransactor({
			checkDecorators: false,
			onUnknownField: issue => void issues.push(issue),
		})
		db.register(User)

		const user = await db('usersUnknownFields/a')

		expect(user?.data).toStrictEqual({
			known: 'test',
			unknown: 'test2',
			__voltiso: sVoltisoEntry.validate(undefined),
		})

		expect(issues.length).toBeGreaterThan(0)
	})
})
