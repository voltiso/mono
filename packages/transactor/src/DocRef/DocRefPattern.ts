// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { $assert } from '@voltiso/assertor'
import type { InferableObject, SchemaLike } from '@voltiso/schemar.types'
import { undef } from '@voltiso/util'

import { getGetPathMatches } from '~/common'
import type { DocConstructorLike, DocLike, IDocConstructor } from '~/Doc'
import type { IndexedDoc } from '~/Doc/IndexedDoc'
import type { Method } from '~/Method'
import { concatPath } from '~/Path'
import { DocPattern } from '~/Path/Path'
import type { WithTransactor } from '~/Transactor'
import type { MethodEntry } from '~/Transactor/Entry'
import type {
	AfterTrigger,
	BeforeCommitTrigger,
	OnGetTrigger,
} from '~/Trigger/Trigger'

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
	register<Cls extends DocConstructorLike>(cls: Cls): this {
		const { _ } = cls as unknown as IDocConstructor

		if (Object.keys(_.publicOnCreation).length > 0)
			this.publicOnCreation(_.publicOnCreation as never)

		if (_.suppressMissingSchemaError || Object.keys(_.public).length > 0)
			this.public(_.public as never)

		if (Object.keys(_.private).length > 0) this.private(_.private as never)

		if (Object.keys(_.aggregates).length > 0)
			this.aggregates(_.aggregates as never)

		if (_.id !== undefined) {
			this.id(_.id as never)
		}

		for (const after of _.afters) this.after(after)

		for (const beforeCommit of _.beforeCommits) this.beforeCommit(beforeCommit)

		for (const onGet of _.onGets) this.onGet(onGet)

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

	publicOnCreation(schema: InferableObject) {
		this.context.transactor._allPublicOnCreationSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			schema,
		})
		return this
	}

	public(schema: InferableObject) {
		// assertZod()
		this.context.transactor._allPublicSchemas.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			schema,
		})
		return this
	}

	private(schema: InferableObject) {
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

	after<D extends DocLike = IndexedDoc>(trigger: AfterTrigger<D>) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger: trigger as any,
		})
		return this
	}

	afterCreateOrUpdate<D extends DocLike = IndexedDoc>(
		trigger: AfterTrigger<D, D, boolean, true>,
	) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),

			trigger(p: Parameters<AfterTrigger>[0]) {
				const { doc, after, ...rest } = p

				if (this) {
					$assert(doc)
					$assert(after)
					return (trigger as unknown as AfterTrigger).call(this, {
						doc,
						after,
						...rest,
					})
				} else return undef
			},
		})
		return this
	}

	afterCreate<D extends DocLike = IndexedDoc>(
		trigger: AfterTrigger<D, D, false, true>,
	) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),

			trigger(p) {
				const { doc, before, after, ...rest } = p

				if (!before) {
					$assert(after)
					$assert(this)
					$assert(doc)
					return (trigger as unknown as AfterTrigger).call(this, {
						doc,
						before,
						after,
						...rest,
					})
				} else return undef
			},
		})
		return this
	}

	afterDelete<D extends DocLike = IndexedDoc>(
		trigger: AfterTrigger<D, null, true, false>,
	) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),

			trigger(p) {
				const { doc, before, after, ...rest } = p

				if (!after) {
					$assert(before)
					$assert(this === null)
					$assert(doc === null)
					return (trigger as unknown as AfterTrigger).call(this, {
						doc,
						before,
						after,
						...rest,
					})
				} else return undef
			},
		})
	}

	beforeCommit<D extends DocLike = IndexedDoc>(
		trigger: BeforeCommitTrigger<D>,
	) {
		this.context.transactor._allBeforeCommits.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger: trigger as unknown as BeforeCommitTrigger,
		})
		return this
	}

	onGet<D extends DocLike = IndexedDoc>(trigger: OnGetTrigger<D>) {
		this.context.transactor._allOnGets.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger: trigger as any,
		})
	}

	method<
		D extends DocLike = IndexedDoc,
		ARGS extends unknown[] = unknown[],
		R = unknown,
	>(name: string, method: Method<D, ARGS, R>) {
		// , argSchema?: SchemaObject
		const methodEntry: MethodEntry = {
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			name,
			method: method as unknown as Method,
		}
		// if (argSchema) methodEntry.argSchema = schemas.object.keys(argSchema)
		this.context.transactor._allMethods.push(methodEntry)
		return this
	}
}