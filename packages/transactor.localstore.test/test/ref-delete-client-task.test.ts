// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { TriggerParams } from '@voltiso/transactor'
import {
	after,
	afterCreate,
	afterDelete,
	beforeCommit,
	Doc,
} from '@voltiso/transactor'
import * as ss from '@voltiso/transactor/schemas'
import { undef } from '@voltiso/util'

import { createTransactor } from './common'

const db = createTransactor()

class Client extends Doc('refDelete_client')({
	public: {
		displayName: s.string.lengthRange(1, 255),
		slug: s.string,
	},

	private: {
		rootTask: ss.strongRef<'refDelete_task'>().optional,
	},
}) {
	@beforeCommit
	async checkIfValid(p: TriggerParams.BeforeCommit<Client>) {
		if (p.doc) $assert(p.doc.rootTask, 'rootTask should be present')
	}

	@afterDelete
	async deleteRootTask(p: TriggerParams.AfterDelete<Client>) {
		$assert(p.before.rootTask)
		await p.before.rootTask.delete()
	}

	@after
	async updateSlug(p: TriggerParams.After<Client>) {
		if (p.before?.slug !== p.after?.slug) {
			if (p.before) await clientSlugs(p.before.slug).delete()

			if (p.after) {
				$assert(p.doc)
				await clientSlugs.add({
					id: p.after.slug,
					client: p.doc.ref,
				})
			}
		}
	}

	@afterCreate
	async createRootTask(this: Client) {
		//! TODO it should work with polymorphic `this`
		$assert(this.rootTask === undef)

		// type A = StrongRef<this>['id']

		const task = await tasks.add({
			id: this.id,
			client: this.ref,
			displayName: '_ROOT',
		})
		this.rootTask = task.ref
	}
}

// type IdClient = Id<Client>

class ClientSlug extends Doc('refDelete_clientSlug')({
	const: {
		client: ss.strongRef<'refDelete_client'>(),
	},
}) {}

const clients = db.register(Client)
const clientSlugs = db.register(ClientSlug)

class Task extends Doc('refDelete_task')({
	const: {
		parentTask: ss.strongRef<'refDelete_task'>().optional,
		client: ss.strongRef<'refDelete_client'>(),
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

		expect(client.__voltiso?.numRefs).toBe(2)

		await client.delete()

		await expect(clients(client.id)).resolves.toBeNull()
	})
})
