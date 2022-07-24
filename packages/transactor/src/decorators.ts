// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { DocConstructor, IDoc } from './Doc'
import * as h from './Doc/_/triggerCreators.js'
import type { AfterTrigger, BeforeCommitTrigger, OnGetTrigger } from './Trigger'

export function method<
	D extends IDoc & { [k in Name]: (...args: never[]) => Promise<unknown> },
	Name extends keyof D,
>(doc: D, name: Name) {
	const ctor = (doc as any).constructor as DocConstructor
	ctor._ = {
		...ctor._,

		methods: {
			...ctor._.methods,
			[name]: (doc as any)[name],
		},
	}
}

export function afterCreateOrUpdate<
	D extends IDoc & { [k in Name]: AfterTrigger<D, D, boolean, true> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	const typeofDoc = (doc as any).constructor as DocConstructor
	typeofDoc._ = h.afterCreateOrUpdate(typeofDoc._, name, doc[name] as never)
}

export function afterCreate<
	D extends IDoc & { [k in Name]: AfterTrigger<D, D, false, true> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	const typeofDoc = (doc as any).constructor as DocConstructor
	typeofDoc._ = h.afterCreate(typeofDoc._, name, doc[name] as never)
}

export function afterDelete<
	D extends IDoc & { [k in Name]: AfterTrigger<D, null, true, false> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	const typeofDoc = (doc as any).constructor as DocConstructor
	typeofDoc._ = h.afterDelete(typeofDoc._, name, doc[name] as never)
}

export function afterUpdate<
	D extends IDoc & { [k in Name]: AfterTrigger<D, D, true, true> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	const typeofDoc = (doc as any).constructor as DocConstructor
	typeofDoc._ = h.afterUpdate(typeofDoc._, name, doc[name] as never)
}

export function after<
	D extends IDoc & { [k in Name]: AfterTrigger<D> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	const typeofDoc = (doc as any).constructor as DocConstructor
	typeofDoc._ = h.after(typeofDoc._, name, doc[name] as never)
}

export function beforeCommit<
	D extends IDoc & { [k in Name]: BeforeCommitTrigger<D> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	const typeofDoc = (doc as any).constructor as DocConstructor
	typeofDoc._ = h.beforeCommit(typeofDoc._, name, doc[name] as never)
}

export function onGet<
	D extends IDoc & { [k in Name]: OnGetTrigger<D> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	const typeofDoc = (doc as any).constructor as DocConstructor
	typeofDoc._ = h.onGet(typeofDoc._, name, doc[name] as never)
}