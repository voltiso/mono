// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type {
	InferableObjectLike,
	ISchema,
	Schemable,
} from '@voltiso/schemar.types'
import type { OmitCall } from '@voltiso/util'
import { assertNotPolluting } from '@voltiso/util'
import { callableClass, staticImplements } from '@voltiso/util'

import type { DocConstructor, IAggregatorHandlers, NestedData } from '~'
import { isStrongDocRef, isWeakDocRef } from '~'
import { TransactorError } from '~'
import { DocCall, DTI } from '~/Doc'
import type { GI } from '~/Doc/_/GDoc'
import type { NewFields } from '~/Doc/_/NewFields'
import {
	withAfter,
	withAfterCreate,
	withAfterCreateOrUpdate,
	withAfterDelete,
	withAfterUpdate,
	withBeforeCommit,
} from '~/Doc/_/triggerCreators'
import type { DocTI } from '~/Doc/DocTI'
import type { DocTag } from '~/DocTypes'
import type { Method } from '~/Method'
import { sIntrinsicFields } from '~/schemas'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger/Trigger'

import type { DocDerivedData } from './_/DocDerivedData'
import { defaultDocDerivedData } from './_/DocDerivedData'
import type { IDocConstructor } from './IDocConstructor'

@staticImplements<OmitCall<IDocConstructor>>()
export class DocConstructorImpl {
	declare static [DTI]: DocTI

	static readonly _: DocDerivedData = defaultDocDerivedData

	static tag<Tag extends DocTag>(tag: Tag): any {
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = { ...super._, tag }
			},
			DocCall,
		)
	}

	//

	static id<S extends ISchema<string>>(schema: S): any {
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = {
					...super._,
					id: schema,
				}
			},
			DocCall,
		)
	}

	static publicOnCreation<F extends Record<string, Schemable>>(schema: F): any {
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = {
					...super._,
					publicOnCreation: { ...super._.publicOnCreation, ...schema },
				}
			},
			DocCall,
		)
	}

	static public<F extends Record<string, Schemable>>(schema: F): any {
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = {
					...super._,
					public: { ...super._.public, ...schema },
				}
			},
			DocCall,
		)
	}

	static private<F extends Record<string, Schemable>>(schema: F): any {
		return callableClass(
			class extends this {
				static override readonly _ = {
					...super._,
					private: { ...super._.private, ...schema },
				} as never
			},
			DocCall,
		)
	}

	static aggregate(
		targetDocConstructor: DocConstructor,
		name: string,
		handlers: IAggregatorHandlers,
	): any {
		assertNotPolluting(name)
		return this.after(
			`aggregate<${targetDocConstructor._.tag}.${name}>`,
			async ({ before, after, path }) => {
				const data = before || after
				$assert(data)
				$assert(data.__voltiso)

				if (handlers.filter) {
					const filterResult = await handlers.filter.call(data)
					if (!filterResult) return
				}

				const targetHandlerResult = handlers.target.call(data)
				let target = await targetHandlerResult

				if (!target) {
					const handlerReturnedRef =
						isWeakDocRef(targetHandlerResult) ||
						isStrongDocRef(targetHandlerResult)

					if (handlerReturnedRef && handlers.autoCreateTarget) {
						try {
							target = await targetHandlerResult.set()
						} catch (error) {
							// eslint-disable-next-line no-console
							console.error(
								`aggregate trigger for source '${path.toString()}': unable to auto-create target: ${targetHandlerResult.path.toString()}`,
							)
							throw error
						}
					} else {
						let additionalInfo = ''
						if (!handlers.autoCreateTarget)
							additionalInfo =
								' - hint: pass `autoCreateTarget: true` to your aggregator options if this would not violate your constraints'

						const targetDescription = handlerReturnedRef
							? targetHandlerResult.path.toString()
							: `null - for more info, return DocRef instead of null Doc from your target() handler - this will also make it possible to auto-create target document if 'autoCreateTarget' is set (note: your target() function must not be async, because DocRef is derived from PromiseLike and is automatically unwrapped when awaited)${additionalInfo}`

						throw new TransactorError(
							`aggregate trigger for source '${path.toString()}': target does not exist: '${targetDescription}'${additionalInfo}`,
						)
					}
				}

				if (before && after)
					$assert(
						// eslint-disable-next-line security/detect-object-injection
						before.__voltiso?.aggregateSource[name] ===
							// eslint-disable-next-line security/detect-object-injection
							after.__voltiso?.aggregateSource[name],
						'hmmm',
					)

				// eslint-disable-next-line security/detect-object-injection
				const sourceInfo = data.__voltiso.aggregateSource[name]

				// eslint-disable-next-line security/detect-object-injection
				const targetInfo = target.data.__voltiso?.aggregateTarget[name] || {
					value: handlers.initialValue as NestedData,
					numSources: 0,
				}

				const wasAlreadyProcessed = sourceInfo

				if (before && wasAlreadyProcessed) {
					targetInfo.value = (await handlers.exclude.call(
						before,
						targetInfo.value,
					)) as never
					targetInfo.numSources -= 1
				}

				$assert(targetInfo.numSources >= 0)

				if (after) {
					targetInfo.value = (await handlers.include.call(
						after,
						targetInfo.value,
					)) as never
					targetInfo.numSources += 1

					// update source
					$assert(after.__voltiso)
					// eslint-disable-next-line security/detect-object-injection
					after.__voltiso.aggregateSource[name] = true
				}

				// update target
				$assert(target.data.__voltiso)
				// eslint-disable-next-line security/detect-object-injection
				target.data.__voltiso.aggregateTarget[name] = targetInfo as never
			},
		)
	}

	//

	static fields<F extends NewFields>(f: F): any {
		return callableClass(
			class extends this {
				static override readonly _ = {
					...super._,

					id: 'id' in f ? f.id : (super._.id as never),

					publicOnCreation: {
						...super._.publicOnCreation,
						...f.publicOnCreation,
					},

					public: { ...super._.public, ...f.public },
					private: { ...super._.private, ...f.private },

					suppressMissingSchemaError: true,
				} as never
			},
			DocCall,
		)
	}

	static get schemableWithoutId(): InferableObjectLike {
		return {
			...this._.publicOnCreation,
			...this._.public,
			...this._.private,
			...sIntrinsicFields.getShape,
		} as never
	}

	static get schemableWithId(): InferableObjectLike {
		return { ...this.schemableWithoutId, id: s.string } as InferableObjectLike
	}

	static get schemaWithoutId() {
		return s.schema(this.schemableWithoutId)
	}

	static get schemaWithId() {
		return s.schema(this.schemableWithId)
	}

	// static after(trigger: Trigger<Doc>): void
	// static after(name: string, trigger: Trigger<Doc>): void

	static after<TI extends DocDerivedData>(
		...args: [AfterTrigger<GI<TI>>] | [string, AfterTrigger<GI<TI>>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''

		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = withAfter(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},
			DocCall,
		)
	}

	// static afterUpdate(trigger: Trigger<Doc, Doc>): void
	// static afterUpdate(name: string, trigger: Trigger<Doc, Doc>): void

	static afterUpdate<TI extends DocDerivedData>(
		...args:
			| [AfterTrigger<GI<TI>, GI<TI>, true, true>]
			| [string, AfterTrigger<GI<TI>, GI<TI>, true, true>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = withAfterUpdate<TI>(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},
			DocCall,
		)
	}

	// static afterCreateOrUpdate(trigger: Trigger<Doc, Doc>): void
	// static afterCreateOrUpdate(name: string, trigger: Trigger<Doc, Doc>): void

	static afterCreateOrUpdate<TI extends DocDerivedData>(
		...args:
			| [AfterTrigger<GI<TI>, GI<TI>, boolean, true>]
			| [string, AfterTrigger<GI<TI>, GI<TI>, boolean, true>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = withAfterCreateOrUpdate(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},
			DocCall,
		)
	}

	// static afterCreate(trigger: Trigger<Doc, Doc, false, true>): void
	// static afterCreate(name: string, trigger: Trigger<Doc, Doc, false, true>): void

	static afterCreate<TI extends DocDerivedData>(
		...args:
			| [AfterTrigger<GI<TI>, GI<TI>, false, true>]
			| [string, AfterTrigger<GI<TI>, GI<TI>, false, true>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = withAfterCreate(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},
			DocCall,
		)
	}

	// static afterDelete(trigger: Trigger<Doc, null>): void
	// static afterDelete(name: string, trigger: Trigger<Doc, null>): void

	static afterDelete<TI extends DocDerivedData>(
		...args:
			| [AfterTrigger<GI<TI>, null, true, false>]
			| [string, AfterTrigger<GI<TI>, null, true, false>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = withAfterDelete(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},
			DocCall,
		)
	}

	// static beforeCommit(trigger: BeforeCommitTrigger<Doc>): void
	// static beforeCommit(name: string, trigger: BeforeCommitTrigger<Doc>): void

	static beforeCommit<TI extends DocDerivedData>(
		...args:
			| [BeforeCommitTrigger<GI<TI>>]
			| [string, BeforeCommitTrigger<GI<TI>>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = withBeforeCommit(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},
			DocCall,
		)
	}

	static method<N extends string, M extends Method>(name: N, m: M): any {
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = {
					...super._,

					methods: {
						...super._.methods,
						[name]: m,
					},
				}
			},
			DocCall,
		)
	}
}
