// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type { OmitCall } from '@voltiso/util'
import { callableClass, staticImplements } from '@voltiso/util'

import type { DocTag } from '../../DocTypes'
import type { Method } from '../../Method'
import { intrinsicFields } from '../../schemas'
import type { AfterTrigger, BeforeCommitTrigger } from '../../Trigger/Trigger'
import { DocCall } from '..'
import type { GI } from '../_'
import type { IDocTI } from '../DocTI'
import { DTI } from '../DocTI'
import type { DocDerivedData, NewFields } from './_'
import {
	after,
	afterCreate,
	afterCreateOrUpdate,
	afterDelete,
	afterUpdate,
	beforeCommit,
	defaultDocDerivedData,
} from './_'
import type { IDocConstructor } from './IDocConstructor'

@staticImplements<OmitCall<IDocConstructor>>()
class DocConstructor {
	declare static [DTI]: IDocTI

	static readonly _: DocDerivedData = defaultDocDerivedData

	static tag<Tag extends DocTag>(tag: Tag): any {
		return callableClass(
			class extends this {
				static override readonly _ = { ...super._, tag }
			},
			DocCall,
		)
	}

	static const<F extends Record<string, Schemable>>(schema: F): any {
		return callableClass(
			class extends this {
				static override readonly _: DocDerivedData = {
					...super._,
					const: { ...super._.const, ...schema },
				}
			},
			DocCall,
		)
	}

	static public<F extends Record<string, Schemable>>(schema: F): any {
		return callableClass(
			class extends this {
				static override readonly _ = {
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
				}
			},
			DocCall,
		)
	}

	static protected<F extends Record<string, Schemable>>(schema: F): any {
		return callableClass(
			class extends this {
				static override readonly _ = {
					...super._,
					protected: { ...super._.protected, ...schema },
				}
			},
			DocCall,
		)
	}

	static fields<F extends NewFields>(f: F): any {
		return callableClass(
			class extends this {
				static override readonly _ = {
					...super._,
					const: { ...super._.const, ...f.const },
					public: { ...super._.public, ...f.public },
					private: { ...super._.private, ...f.private },
					protected: { ...super._.protected, ...f.protected },
				}
			},
			DocCall,
		)
	}

	static get schemableWithoutId() {
		return {
			...this._.const,
			...this._.private,
			...this._.protected,
			...this._.public,
			...intrinsicFields,
		}
	}

	static get schemableWithId() {
		return { ...this.schemableWithoutId, id: s.string }
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
				static override readonly _ = after(super._ as unknown as TI, name, f)
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
				static override readonly _ = afterUpdate<TI>(
					super._ as unknown as TI,
					name,
					f,
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
				static override readonly _ = afterCreateOrUpdate(
					super._ as unknown as TI,
					name,
					f,
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
				static override readonly _ = afterCreate(
					super._ as unknown as TI,
					name,
					f,
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
				static override readonly _ = afterDelete(
					super._ as unknown as TI,
					name,
					f,
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
				static override readonly _ = beforeCommit(
					super._ as unknown as TI,
					name,
					f,
				)
			},
			DocCall,
		)
	}

	static method<N extends string, M extends Method>(name: N, m: M): any {
		return callableClass(
			class extends this {
				static override readonly _ = {
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

export { DocConstructor as DocConstructor_ }
