// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IObject, SchemaLike } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { CallableConstructor, staticImplements } from '@voltiso/util'

import type { IAggregatorHandlers } from '~/Aggregator'
import { aggregate } from '~/Aggregator'
import type { $$Doc, DocBuilderPlugin } from '~/Doc'
import { DocCall, DTI, IS_DOC } from '~/Doc'
import type { GI } from '~/Doc/_/GDoc'
import type { $$PartialDocOptions } from '~/Doc/_/NewFields'
import {
	withAfter,
	withAfterCreate,
	withAfterCreateOrUpdate,
	withAfterDelete,
	withAfterUpdate,
	withBeforeCommit,
} from '~/Doc/_/triggerCreators'
import type { $$DocTI, DocTI } from '~/Doc/DocTI'
import type { AnyDoc, DocTag } from '~/DocTypes'
import type { Method } from '~/Method'
import { sIntrinsicFields } from '~/schemas'
import type { AfterTrigger, Trigger } from '~/Trigger/Trigger'

import type { DocDerivedData } from './_/DocDerivedData'
import { defaultDocDerivedData } from './_/DocDerivedData'
import type { $$DocConstructor } from './IDocConstructor'
import { IS_DOC_CONSTRUCTOR } from './IDocConstructor'

// function mergeSchemas(
// 	a: Record<string, Schemable> | ObjectLike,
// 	b: Record<string, Schemable> | ObjectLike,
// ): Record<string, Schemable> | ObjectLike {
// 	if (a === emptyDocDerivedSchema) return b

// 	if (isObject(a) && isObject(b)) {
// 		throw new TransactorError(
// 			`merging Object schemas not implemented: ${a.toString()} and ${b.toString()}`,
// 		)
// 	}

// 	if (!isObject(a) && !isObject(b)) {
// 		return { ...a, ...b }
// 	}

// 	if (isObject(a)) {
// 		assert(!isObject(b))
// 		return a.and(b as InferableObjectLike) as never
// 	}

// 	assert(isPlainObject(a))
// 	assert(isObject(b))

// 	return b.and(a as InferableObjectLike) as never
// }

@staticImplements<$$DocConstructor>()
export class DocConstructorImpl implements $$Doc {
	declare static [DTI]: DocTI

	static readonly [IS_DOC_CONSTRUCTOR] = true as const;
	readonly [IS_DOC] = true as const

	static _: DocDerivedData = defaultDocDerivedData

	static tag<Tag extends DocTag | AnyDoc>(tag: Tag): any {
		return CallableConstructor({
			constructor: class extends this {
				static override readonly _: DocDerivedData = { ...super._, tag }
			},

			call: DocCall,
		})
	}

	//

	// static id<S extends ISchema<string>>(schema: S): any {
	// 	return CallableConstructor({
	// 		constructor: class extends this {
	// 			static override readonly _: DocDerivedData = {
	// 				...super._,
	// 				id: schema,
	// 			}
	// 		},

	// 		call: DocCall,
	// 	})
	// }

	// static publicOnCreation<F extends Record<string, Schemable> | $$Object>(
	// 	schema: F,
	// ): any {
	// 	return CallableConstructor({
	// 		constructor: class extends this {
	// 			static override readonly _: DocDerivedData = {
	// 				...super._,

	// 				publicOnCreation: super._.publicOnCreation.and(schema) as never,
	// 				// publicOnCreation: { ...super._.publicOnCreation, ...shape },
	// 			}
	// 		},

	// 		call: DocCall,
	// 	})
	// }

	// static public<F extends Record<string, Schemable>>(schema: F): any {
	// 	return CallableConstructor({
	// 		constructor: class extends this {
	// 			static override readonly _: DocDerivedData = {
	// 				...super._,
	// 				public: super._.public.and(schema) as never,
	// 				// public: { ...super._.public, ...schema },
	// 			}
	// 		},

	// 		call: DocCall,
	// 	})
	// }

	// static private<F extends Record<string, Schemable>>(schema: F): any {
	// 	return CallableConstructor({
	// 		constructor: class extends this {
	// 			static override readonly _ = {
	// 				...super._,
	// 				private: super._.private.and(schema) as never,
	// 				// private: { ...super._.private, ...schema },
	// 			} as never
	// 		},

	// 		call: DocCall,
	// 	})
	// }

	static withPlugin(plugin: DocBuilderPlugin<any>) {
		return plugin.run(this as never)
	}

	static aggregateInto(
		_target: any,
		aggregateName: string,
		handlers: IAggregatorHandlers,
	) {
		// console.log({ aggregateName, handlers })
		return aggregate(0 as never)
			.into(0 as never, aggregateName as never, handlers as never)
			.run(this)
	}

	//

	static with<F extends $$PartialDocOptions>(f: F): any {
		return CallableConstructor({
			constructor: class extends this {
				static override readonly _ = {
					...super._,

					// tag: 'tag' in f ? f.tag : super._.tag, // ! temporarily disable to clean up lib api

					id: 'id' in f ? f.id : (super._.id as never),

					publicOnCreation: f.publicOnCreation
						? (super._.publicOnCreation.and(f.publicOnCreation) as never)
						: super._.publicOnCreation,

					public: f.public
						? (super._.public.and(f.public) as never)
						: super._.public,

					private: f.private
						? (super._.private.and(f.private) as never)
						: super._.private,

					aggregates: {
						...super._.aggregates,
						...f.aggregates,
					},

					suppressMissingSchemaError: true,
				} as never
			},

			call: DocCall,
		})
	}

	// static get schemableWithoutId(): InferableObjectLike {
	// 	return {
	// 		...this._.publicOnCreation,
	// 		...this._.public,
	// 		...this._.private,
	// 		...sIntrinsicFields.getShape,
	// 	} as never
	// }

	// static get schemableWithId(): InferableObjectLike {
	// 	return {
	// 		...this.schemableWithoutId,
	// 		id: this.idSchema,
	// 	} as InferableObjectLike
	// }

	static get idSchema(): SchemaLike<string> {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		return (this._.id as never) || s.string
	}

	static get schemaWithoutId(): IObject {
		return (
			(this._.publicOnCreation.and(this._.public) as IObject).and(
				this._.private,
			) as IObject
		).and(sIntrinsicFields) as never
	}

	static get schemaWithId() {
		return this.schemaWithoutId.and({ id: this.idSchema }) as never
	}

	static get aggregateSchemables() {
		// console.log('this', this)
		// console.log('this._', this._)
		return this._.aggregates as never
	}

	// static after(trigger: Trigger<Doc>): void
	// static after(name: string, trigger: Trigger<Doc>): void

	static after<TI extends DocDerivedData & $$DocTI>(
		...args: [AfterTrigger<GI<TI>>] | [string, AfterTrigger<GI<TI>>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''

		return CallableConstructor({
			constructor: class extends this {
				static override readonly _: DocDerivedData = withAfter(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},

			call: DocCall,
		})
	}

	// static afterUpdate(trigger: Trigger<Doc, Doc>): void
	// static afterUpdate(name: string, trigger: Trigger<Doc, Doc>): void

	static afterUpdate<TI extends DocDerivedData & $$DocTI>(
		...args:
			| [AfterTrigger<GI<TI>, true, true>]
			| [string, AfterTrigger<GI<TI>, true, true>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return CallableConstructor({
			constructor: class extends this {
				static override readonly _: DocDerivedData = withAfterUpdate<TI>(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},

			call: DocCall,
		})
	}

	// static afterCreateOrUpdate(trigger: Trigger<Doc, Doc>): void
	// static afterCreateOrUpdate(name: string, trigger: Trigger<Doc, Doc>): void

	static afterCreateOrUpdate<TI extends DocDerivedData & $$DocTI>(
		...args:
			| [AfterTrigger<GI<TI>, boolean, true>]
			| [string, AfterTrigger<GI<TI>, boolean, true>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return CallableConstructor({
			constructor: class extends this {
				static override readonly _: DocDerivedData = withAfterCreateOrUpdate(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},

			call: DocCall,
		})
	}

	// static afterCreate(trigger: Trigger<Doc, Doc, false, true>): void
	// static afterCreate(name: string, trigger: Trigger<Doc, Doc, false, true>): void

	static afterCreate<TI extends DocDerivedData & $$DocTI>(
		...args:
			| [AfterTrigger<GI<TI>, false, true>]
			| [string, AfterTrigger<GI<TI>, false, true>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return CallableConstructor({
			constructor: class extends this {
				static override readonly _: DocDerivedData = withAfterCreate(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},

			call: DocCall,
		})
	}

	// static afterDelete(trigger: Trigger<Doc, null>): void
	// static afterDelete(name: string, trigger: Trigger<Doc, null>): void

	static afterDelete<TI extends DocDerivedData & $$DocTI>(
		...args:
			| [AfterTrigger<GI<TI>, true, false>]
			| [string, AfterTrigger<GI<TI>, true, false>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return CallableConstructor({
			constructor: class extends this {
				static override readonly _: DocDerivedData = withAfterDelete(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},

			call: DocCall,
		})
	}

	// static beforeCommit(trigger: BeforeCommitTrigger<Doc>): void
	// static beforeCommit(name: string, trigger: BeforeCommitTrigger<Doc>): void

	static beforeCommit<TI extends DocDerivedData & $$DocTI>(
		...args:
			| [Trigger.BeforeCommit<GI<TI>>]
			| [string, Trigger.BeforeCommit<GI<TI>>]
	): any {
		const f = args.length === 2 ? args[1] : args[0]
		const name = args.length === 2 ? args[0] : ''
		return CallableConstructor({
			constructor: class extends this {
				static override readonly _: DocDerivedData = withBeforeCommit(
					super._ as unknown as TI,
					name,
					f as never,
				)
			},

			call: DocCall,
		})
	}

	static method<N extends string, M extends Method>(name: N, m: M): any {
		return CallableConstructor({
			constructor: class extends this {
				static override readonly _: DocDerivedData = {
					...super._,

					methods: {
						...super._.methods,
						[name]: m,
					},
				}
			},

			call: DocCall,
		})
	}
}
