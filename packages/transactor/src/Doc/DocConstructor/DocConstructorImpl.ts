// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type {
	IObject,
	ISchema,
	ObjectLike,
	Schemable,
	SchemaLike,
} from '@voltiso/schemar.types'
import type { OmitCall } from '@voltiso/util'
import { callableClass, staticImplements } from '@voltiso/util'

import type { IAggregatorHandlers } from '~/Aggregator'
import { aggregate } from '~/Aggregator'
import type { DocBuilderPlugin } from '~/Doc'
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

@staticImplements<OmitCall<IDocConstructor>>()
export class DocConstructorImpl {
	declare static [DTI]: DocTI

	static _: DocDerivedData = defaultDocDerivedData

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

	static publicOnCreation<F extends Record<string, Schemable> | ObjectLike>(
		schema: F,
	): any {
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = {
					...super._,

					publicOnCreation: super._.publicOnCreation.and(schema) as never,
					// publicOnCreation: { ...super._.publicOnCreation, ...shape },
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
					public: super._.public.and(schema) as never,
					// public: { ...super._.public, ...schema },
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
					private: super._.private.and(schema) as never,
					// private: { ...super._.private, ...schema },
				} as never
			},
			DocCall,
		)
	}

	static with(plugin: DocBuilderPlugin<any>) {
		return plugin.run(this as never)
	}

	static aggregateInto(
		_target: any,
		aggregateName: string,
		handlers: IAggregatorHandlers,
	) {
		// console.log({ aggregateName, handlers })
		return aggregate(
			0 as never,
			0 as never,
			aggregateName as never,
			handlers as never,
		).run(this)
	}

	//

	static fields<F extends NewFields>(f: F): any {
		return callableClass(
			class extends this {
				static override readonly _ = {
					...super._,

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
			DocCall,
		)
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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		return this._.publicOnCreation
			.and(this._.public)
			.and(this._.private)
			.and(sIntrinsicFields) as never
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
