// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { describe, expect, it } from 'vitest'

import { Doc } from '~/Doc'

class MyDoc extends Doc.with({
	public: {
		test: s.number,
	},

	publicOnCreation: {
		test2: s.number,
	},

	private: {
		test3: s.number,
	},
}) {}

describe('Trigger', () => {
	it('implicit params', () => {
		expect.assertions(0)

		MyDoc.afterUpdate(async function (p) {
			void p.before.id
			void p.before.test
			void p.after.test
			void p.after.id
			this.aggregateSchemas
		})

		void MyDoc
	})

	// it('explicit params', () => {
	// 	expect.assertions(0)

	// 	MyDoc.afterUpdate(async function (p: TriggerParams.AfterUpdate<MyDoc>) {
	// 		void p.before.id
	// 		void p.before.test
	// 		void p.after.test
	// 		void p.after.id
	// 	})

	// 	void MyDoc
	// })
})
