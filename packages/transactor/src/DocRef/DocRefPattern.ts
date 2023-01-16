// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { assert } from '@voltiso/assertor'
import type {
	$$SchemableObject,
	InferableObject,
	SchemaLike,
} from '@voltiso/schemar'

import { getGetPathMatches } from '~/common'
import type { $$Doc } from '~/Doc'
import type { IndexedDoc } from '~/Doc/IndexedDoc'
import type { $$DocConstructor, DocConstructor } from '~/DocConstructor'
import type { Method } from '~/Method'
import { concatPath } from '~/Path'
import { DocPattern } from '~/Path/Path'
import type { WithTransactor } from '~/Transactor'
import type { TransactorMethodEntry } from '~/Transactor/Entry'
import type { AfterTrigger, OnGetTrigger, Trigger } from '~/Trigger'

type Context = WithTransactor

export class DocRefPattern {
	context: Context
	pattern: DocPattern

	constructor(context: Context, ...args: string[]) {
		this.context = context
		this.pattern = new DocPattern(concatPath(args))
		// this.pattern = createDocPatternWithPrefix.call(this.context, args)
	}

	/** High-level API */
	register<Cls extends $$DocConstructor>(cls: Cls): this {
		const { _ } = cls as unknown as DocConstructor

		// if (_.publicOnCreation !== emptyDocDerivedSchema)
		this.publicOnCreation(_.publicOnCreation as never)

		// if (_.suppressMissingSchemaError || _.public !== emptyDocDerivedSchema)
		this.public(_.public as never)

		// if (_.private !== emptyDocDerivedSchema)
		this.private(_.private as never)

		if (Object.keys(_.aggregates).length > 0)
			this.aggregates(_.aggregates as never)

		// if (_.id !== undefined)
		this.id(_.id as never)

		for (const after of _.afters) this.after(after as never)

		for (const beforeCommit of _.beforeCommits) this.beforeCommit(beforeCommit)

		for (const onGet of _.onGets) this.onGet(onGet as never)

		for (const [name, method] of Object.entries(_.methods))
			this.method(name, method as never)

		return this
	}

	id(schema: SchemaLike<string>) {
		this.context.transactor._allIdSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			schema,
		})
		return this
	}

	publicOnCreation(schema: $$SchemableObject) {
		this.context.transactor._allPublicOnCreationSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			schema,
		})
		return this
	}

	public(schema: $$SchemableObject) {
		this.context.transactor._allPublicSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			schema,
		})
		return this
	}

	private(schema: $$SchemableObject) {
		// assertZod()
		this.context.transactor._allPrivateSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			schema,
		})
		return this
	}

	aggregates(schema: InferableObject) {
		this.context.transactor._allAggregateSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			schema,
		})
		return this
	}

	//

	after<D extends $$Doc = IndexedDoc>(trigger: AfterTrigger<D>) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger: trigger as any,
		})
		return this
	}

	afterCreateOrUpdate<D extends $$Doc = IndexedDoc>(
		trigger: AfterTrigger<D, boolean, true>,
	) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),

			// eslint-disable-next-line consistent-return
			trigger(p: Parameters<AfterTrigger>[0]) {
				const { doc, after, ...rest } = p

				if (this) {
					assert(doc)
					assert(after)
					return (trigger as unknown as AfterTrigger).call(this, {
						doc,
						after,
						...rest,
					})
				}
			},
		})
		return this
	}

	afterCreate<D extends $$Doc = IndexedDoc>(
		trigger: AfterTrigger<D, false, true>,
	) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),

			// eslint-disable-next-line consistent-return
			trigger(p) {
				const { doc, before, after, ...rest } = p

				if (!before) {
					assert(after)
					assert(this)
					assert(doc)
					return (trigger as unknown as AfterTrigger).call(this, {
						doc,
						before,
						after,
						...rest,
					})
				}
			},
		})
		return this
	}

	afterDelete<D extends $$Doc = IndexedDoc>(
		trigger: AfterTrigger<D, true, false>,
	) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),

			// eslint-disable-next-line consistent-return
			trigger(p) {
				const { doc, before, after, ...rest } = p

				if (!after) {
					assert(before)

					assert(this === null)
					assert(doc === null)
					return (trigger as unknown as AfterTrigger).call(this, {
						doc,
						before,
						after,
						...rest,
					})
				}
			},
		})
	}

	beforeCommit<D extends $$Doc = IndexedDoc>(trigger: Trigger.BeforeCommit<D>) {
		this.context.transactor._allBeforeCommits.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger,
		})
		return this
	}

	onGet<D extends $$Doc = IndexedDoc>(trigger: OnGetTrigger<D>) {
		this.context.transactor._allOnGets.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger: trigger as any,
		})
	}

	method<
		D extends $$Doc = IndexedDoc,
		ARGS extends unknown[] = unknown[],
		R = unknown,
	>(name: string, method: Method<D, ARGS, R>) {
		// , argSchema?: SchemaObject
		const methodEntry: TransactorMethodEntry = {
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			name,
			method: method as unknown as Method,
		}
		// if (argSchema) methodEntry.argSchema = schemas.object.keys(argSchema)
		this.context.transactor._allMethods.push(methodEntry)
		return this
	}
}
