// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { $assert } from '@voltiso/assertor'
import type { InferableObject, ISchemaLike } from '@voltiso/schemar'
import { undef } from '@voltiso/util'

import { getGetPathMatches } from '~/common/PathMatches'
import type { IDoc } from '~/Doc'
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

	id(schema: ISchemaLike<string>) {
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

	after<D extends IDoc = IndexedDoc>(trigger: AfterTrigger<D>) {
		this.context.transactor._allAfterTriggers.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger: trigger as any,
		})
		return this
	}

	afterCreateOrUpdate<D extends IDoc = IndexedDoc>(
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

	afterCreate<D extends IDoc = IndexedDoc>(
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

	afterDelete<D extends IDoc = IndexedDoc>(
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

	beforeCommit<D extends IDoc = IndexedDoc>(trigger: BeforeCommitTrigger<D>) {
		this.context.transactor._allBeforeCommits.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger: trigger as unknown as BeforeCommitTrigger,
		})
		return this
	}

	onGet<D extends IDoc = IndexedDoc>(trigger: OnGetTrigger<D>) {
		this.context.transactor._allOnGets.push({
			getPathMatches: getGetPathMatches(this.pattern.toString()),
			trigger: trigger as any,
		})
	}

	method<
		D extends IDoc = IndexedDoc,
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
