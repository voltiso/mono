// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { assertZod } from '~/assertZod'
import type { InferableObject } from '@voltiso/schemar.types'

import { getGetPathMatches } from '~/common/PathMatches'
import type { Method } from '~/Method'
import type { WithTransactor } from '~/Transactor'
import type { MethodEntry } from '~/Transactor/Entry'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger/Trigger'

type Context = WithTransactor

export class CollectionRefPattern {
	context: Context
	pattern: string

	constructor(context: Context, pattern: string) {
		this.context = context
		this.pattern = pattern
	}

	publicOnCreation(schema: InferableObject) {
		// assertZod()
		this.context.transactor._allPublicOnCreationSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern),
			schema,
		})
	}

	public(schema: InferableObject) {
		// assertZod()
		this.context.transactor._allPublicSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern),
			schema,
		})
	}

	private(schema: InferableObject) {
		// assertZod()
		this.context.transactor._allPrivateSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern),
			schema,
		})
	}

	trigger(trigger: AfterTrigger) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern),
			trigger,
		})
	}

	beforeCommit(trigger: BeforeCommitTrigger) {
		this.context.transactor._allBeforeCommits.push({
			getPathMatches: getGetPathMatches(this.pattern),
			trigger,
		})
	}

	method(name: string, method: Method) {
		// , argSchemaObject?: object
		const methodEntry: MethodEntry = {
			getPathMatches: getGetPathMatches(this.pattern),
			name,
			method,
		}

		// if (argSchemaObject) methodEntry.argSchema = schemas.object.keys(argSchemaObject)

		this.context.transactor._allMethods.push(methodEntry)
	}
}
