// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { assertZod } from '~/assertZod'
import type { InferableObject } from '@voltiso/schemar.types'
import type { $Decrement, IsCompatible, Length } from '@voltiso/util'
import { at, BoundCallable, CALL } from '@voltiso/util'

import type { ApplyUnknownPathTokens, GetUnknownPathTokens } from '~/common'
import {
	applyUnknownPathTokens,
	getGetPathMatches,
	getUnknownPathTokens,
} from '~/common'
import type { WithDb } from '~/Db'
import type { $$Doc, $$DocConstructor, GetDocTag, IndexedDoc } from '~/Doc'
import type { CustomDocRef } from '~/DocRef'
import { DocRef } from '~/DocRef'
import type { Method } from '~/Method'
import type { WithTransactor } from '~/Transactor'
import type { MethodEntry } from '~/Transactor/Entry'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger/Trigger'

import { CollectionRef } from './CollectionRef'

type Context = WithTransactor & WithDb

export type _ConsumeTokens<
	UnknownTokens extends readonly unknown[],
	Tokens extends readonly unknown[],
> = Tokens extends readonly []
	? UnknownTokens
	: Tokens extends readonly [unknown, ...infer TokensTail]
	? UnknownTokens extends readonly [unknown, ...infer UnknownTokensTail]
		? _ConsumeTokens<UnknownTokensTail, TokensTail>
		: never
	: never

export interface CollectionRefPattern<
	Pattern extends string = string,
	Doc extends $$Doc = IndexedDoc,
> {
	// [CALL]
	<Tokens extends string[]>(...tokens: Tokens): IsCompatible<
		Length<Tokens>,
		Length<GetUnknownPathTokens<Pattern>>
	> extends true
		? CollectionRef<Doc>
		: IsCompatible<
				$Decrement<Length<Tokens>>,
				Length<GetUnknownPathTokens<Pattern>>
		  > extends true
		? CustomDocRef<{ doc: GetDocTag<Doc> }> // WeakDocRef<Doc>
		: CollectionRefPattern<ApplyUnknownPathTokens<Pattern, Tokens>, Doc>
}

export class CollectionRefPattern<
	Pattern extends string = string,
	Doc extends $$Doc = IndexedDoc,
> {
	/** Type-only */
	declare Doc: Doc

	readonly context: Context
	readonly pattern: string
	readonly patternUnknownTokens: GetUnknownPathTokens<Pattern>

	constructor(context: Context, pattern: Pattern) {
		this.context = context
		this.pattern = pattern
		this.patternUnknownTokens = getUnknownPathTokens(pattern)

		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	[CALL]<Tokens extends string[]>(...tokens: Tokens): never {
		const newPath = applyUnknownPathTokens(this.pattern, tokens)
		if (tokens.length === this.patternUnknownTokens.length)
			return new CollectionRef(this.context, newPath) as never
		else if (tokens.length === this.patternUnknownTokens.length + 1) {
			return new DocRef(this.context, `${newPath}/${at(tokens, -1)}`, {
				isStrong: false,
			}) as never
		} else return new CollectionRefPattern(this.context, newPath) as never
	}

	/** Register Doc class/type for these Collections */
	register<Cls extends $$DocConstructor>(cls: Cls): this {
		const { db } = this.context
		const docPattern = db.docPattern(this.pattern, '*')

		docPattern.register(cls)

		return this
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
