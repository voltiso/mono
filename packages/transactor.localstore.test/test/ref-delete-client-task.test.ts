// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { DocIdString, TriggerParams } from '@voltiso/transactor'
import {
	after,
	afterCreate,
	afterDelete,
	beforeCommit,
	Doc,
	sStrongRef,
} from '@voltiso/transactor'
import { describe, expect, it } from 'vitest'

import { createTransactor } from './common'

const db = createTransactor()

class Client extends Doc('refDelete_client').with({
	id: s.string,

	public: {
		displayName: s.string.lengthRange(1, 255),
		slug: s.string,
	},

	private: {
		rootTask: sStrongRef<'refDelete_task'>().optional,
	},
}) {
	@beforeCommit
	async checkIfValid(p: TriggerParams.BeforeCommit<Client>) {
		if (p.doc) assert(p.doc.data.rootTask, 'rootTask should be present')
	}

	@afterDelete
	async deleteRootTask(p: TriggerParams.AfterDelete<Client>) {
		assert(p.before.rootTask)
		await p.before.rootTask.delete()
	}

	@after
	async updateSlug(p: TriggerParams.After<Client>) {
		if (p.before?.slug !== p.after?.slug) {
			if (p.before) await clientSlugs(p.before.slug).delete()

			if (p.after) {
				assert(p.doc)
				await clientSlugs.add({
					id: p.after.slug as never,
					client: p.doc.ref,
				})
			}
		}
	}

	@afterCreate
	async createRootTask(this: Client) {
		// ! TODO it should work with polymorphic `this`
		assert(this.data.rootTask === undefined)

		// type A = StrongRef<this>['id']

		const task = await tasks.add({
			id: this.id as unknown as DocIdString<'refDelete_task'>,
			client: this.ref,
			displayName: '_ROOT',
		})
		this.data.rootTask = task.ref
	}
}

// type IdClient = Id<Client>

class ClientSlug extends Doc('refDelete_clientSlug').with({
	id: s.string,

	publicOnCreation: {
		client: sStrongRef<'refDelete_client'>(),
	},
}) {}

const clients = db.register(Client)
const clientSlugs = db.register(ClientSlug)

class Task extends Doc('refDelete_task').with({
	publicOnCreation: {
		parentTask: sStrongRef<'refDelete_task'>().optional,
		client: sStrongRef<'refDelete_client'>(),
	},

	public: {
		displayName: s.string,

		// budgetLimit: number,
		// budgetEstimate: number.allow(null).default(null),
		// budgetUsed: number.default(0),

		// progress: number.default(0).min(0).max(1),
		// isApproved: boolean.default(false),
		// incentivesRatio: number.default(0).min(0).max(1),
		// incentivesSuggested: object.pattern(userId, {
		// 	amount: number.required(),
		// }),
		// incentivesPaid: object
		// 	.pattern(userId, {
		// 		amount: number.required(),
		// 	})
		// 	.default(null),

		// priority: number,
	},

	private: {
		// reservations: object.pattern(autoId, any).default({}),
	},
}) {}

const tasks = db.register(Task)

declare module '@voltiso/transactor' {
	interface DocTypes {
		refDelete_client: Client
		refDelete_clientSlug: ClientSlug
		refDelete_task: Task
	}
}

describe('ref - delete client-task', () => {
	it('works', async () => {
		expect.hasAssertions()

		const client = await clients.add({ displayName: 'vmi', slug: 'vmi' })

		expect(client.__voltiso.numRefs).toBe(2)

		await client.delete()

		await expect(clients(client.id)).resolves.toBeNull()
	})
})
