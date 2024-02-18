// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Doc } from './Doc'
import * as h from './Doc/_/triggerCreators'
import type { DocConstructorImpl } from './DocConstructor'
import type { AfterTrigger, OnGetTrigger, Trigger } from './Trigger'

export function method<
	D extends $$Doc & { [k in Name]: (...args: never[]) => Promise<unknown> },
	Name extends keyof D,
>(doc: D, name: Name) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const ctor = (doc as any).constructor as typeof DocConstructorImpl
	ctor._ = {
		...ctor._,

		methods: {
			...ctor._.methods,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			[name]: (doc as any)[name],
		},
	}
}

export function afterCreateOrUpdate<
	D extends $$Doc & { [k in Name]: AfterTrigger<D, boolean, true> },
	Name extends keyof D & string,
>(doc: D, name: Name): void {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const typeofDoc = (doc as any).constructor as typeof DocConstructorImpl
	typeofDoc._ = h.withAfterCreateOrUpdate(
		typeofDoc._ as never,
		name as never,
		doc[name] as never,
	)
}

export function afterCreate<
	D extends $$Doc & { [k in Name]: AfterTrigger<D, false, true> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const typeofDoc = (doc as any).constructor as typeof DocConstructorImpl
	typeofDoc._ = h.withAfterCreate(
		typeofDoc._ as never,
		name as never,
		doc[name] as never,
	)
}

export function afterDelete<
	D extends $$Doc & { [k in Name]: AfterTrigger<D, true, false> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const typeofDoc = (doc as any).constructor as typeof DocConstructorImpl
	typeofDoc._ = h.withAfterDelete(
		typeofDoc._ as never,
		name,
		doc[name] as never,
	)
}

export function afterUpdate<
	D extends $$Doc & { [k in Name]: AfterTrigger<D, true, true> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const typeofDoc = (doc as any).constructor as typeof DocConstructorImpl
	typeofDoc._ = h.withAfterUpdate(
		typeofDoc._ as never,
		name,
		doc[name] as never,
	)
}

export function after<
	D extends $$Doc & { [k in Name]: AfterTrigger<D> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const typeofDoc = (doc as any).constructor as typeof DocConstructorImpl

	typeofDoc._ = h.withAfter(typeofDoc._ as never, name, doc[name] as never)
}

export function beforeCommit<
	D extends $$Doc & { [k in Name]: Trigger.BeforeCommit<D> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const typeofDoc = (doc as any).constructor as typeof DocConstructorImpl
	typeofDoc._ = h.withBeforeCommit(
		typeofDoc._ as never,
		name as never,
		doc[name] as never,
	)
}

export function onGet<
	D extends $$Doc & { [k in Name]: OnGetTrigger<D> },
	Name extends keyof D & string,
>(doc: D, name: Name) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const typeofDoc = (doc as any).constructor as typeof DocConstructorImpl
	typeofDoc._ = h.withOnGet(
		typeofDoc._ as never,
		name as never,
		doc[name] as never,
	)
}
