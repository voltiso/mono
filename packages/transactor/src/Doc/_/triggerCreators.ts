// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType, createPatch, fastAssert } from '@voltiso/util'
import * as pc from 'picocolors'

import type { Doc } from '~/Doc'
import type { DocDerivedData } from '~/DocConstructor'
import type {
	AfterTrigger,
	AfterTriggerParams,
	Trigger,
	TriggerParams,
} from '~/Trigger'
import { dump } from '~/util'

function assertBefore(
	x: AfterTriggerParams,
) /* : asserts x is AfterTriggerParams<D, true, boolean> */ {
	// assumeType<AfterTriggerParams<D>>(x)
	fastAssert(x.before)
}

function assertNotBefore(
	x: AfterTriggerParams,
) /* : asserts x is AfterTriggerParams<D, false, boolean> */ {
	// assumeType<AfterTriggerParams<D>>(x)
	fastAssert(!x.before)
}

//

function assertAfter(
	x: AfterTriggerParams,
) /* : asserts x is AfterTriggerParams<D, boolean, true> */ {
	// assumeType<AfterTriggerParams<D>>(x)
	fastAssert(x.doc)
	fastAssert(x.after)
}

function assertNotAfter(
	x: AfterTriggerParams,
) /* : asserts x is AfterTriggerParams<D, boolean, false> */ {
	// assumeType<AfterTriggerParams<D>>(x)
	fastAssert(!x.doc)
	fastAssert(!x.after)
}

function logTrigger(
	name: string,
	when: 'before' | 'after' | 'on',
	event: string,
	params: AfterTriggerParams,
): void {
	// $AssumeType<AfterTriggerParams<D>>(params)
	if (!params.transactor._options.log) return

	console.log(
		pc.gray(params.path.toString()),
		pc.inverse(`${when} ${event}`),
		pc.blueBright(name),
		'\n',
		pc.green(dump(createPatch(params.before, params.after))),
		'\n',
	)
}

//

export function createAfterTrigger<TI extends DocDerivedData>(
	mutableMetadata: TI,
	name: string,
	trigger: Trigger,
	// f: TI extends any ? GI<TI> extends any ? AfterTrigger<GI<TI>> : never : never,
): void {
	$AssumeType<{ afters: AfterTrigger[] }>(mutableMetadata)

	mutableMetadata.afters.push(function (
		this: Doc | null,
		params: AfterTriggerParams,
	) {
		logTrigger(name, 'after', 'ANY', params)
		return Function.prototype.call.call(trigger, this, params) as never
	})
}

export function withAfter<TI extends DocDerivedData>(
	oldData: TI,
	name: string,
	trigger: Trigger,
	// f: TI extends any ? GI<TI> extends any ? AfterTrigger<GI<TI>> : never : never,
): TI {
	const newData = { ...oldData, afters: [...oldData.afters] }
	createAfterTrigger(newData, name, trigger)
	return newData
}

//

export function createAfterUpdateTrigger<TI extends DocDerivedData>(
	mutableMetadata: TI,
	name: string,
	trigger: Trigger,
): void {
	$AssumeType<{ afters: AfterTrigger[] }>(mutableMetadata)

	mutableMetadata.afters.push(function (
		this: Doc | null,
		params: AfterTriggerParams,
	) {
		if (params.before && this) {
			logTrigger(name, 'after', 'UPDATE', params)
			assertBefore(params)
			assertAfter(params)
			return Function.prototype.call.call(trigger, this, params) as never
		} else return undefined
	})
}

export function withAfterUpdate<TI extends DocDerivedData>(
	oldData: TI,
	name: string,
	trigger: Trigger,
): TI {
	const newData = { ...oldData, afters: [...oldData.afters] }
	createAfterUpdateTrigger(newData, name, trigger)
	return newData
}

//

export function createAfterDeleteTrigger<TI extends DocDerivedData>(
	mutableMetadata: TI,
	name: string,
	trigger: Trigger,
): void {
	$AssumeType<{ afters: AfterTrigger[] }>(mutableMetadata)

	mutableMetadata.afters.push(function (
		this: Doc | null,
		params: AfterTriggerParams,
	) {
		if (!this) {
			logTrigger(name, 'after', 'DELETE', params)
			assertBefore(params)
			assertNotAfter(params)
			return Function.prototype.call.call(trigger, this, params) as never
		} else return undefined
	})
}

export function withAfterDelete<TI extends DocDerivedData>(
	oldData: TI,
	name: string,
	trigger: Trigger,
): TI {
	const newData = { ...oldData, afters: [...oldData.afters] }
	createAfterDeleteTrigger(newData, name, trigger)
	return newData
}

//

export function createAfterCreateOrUpdateTrigger<TI extends DocDerivedData>(
	mutableMetadata: TI,
	name: string,
	trigger: Trigger,
): void {
	$AssumeType<{ afters: AfterTrigger[] }>(mutableMetadata)

	mutableMetadata.afters.push(function (
		this: Doc | null,
		params: AfterTriggerParams,
	) {
		if (this) {
			logTrigger(name, 'after', 'CREATE or UPDATE', params)
			assertAfter(params)
			return Function.prototype.call.call(trigger, this, params) as never
		} else return undefined
	})
}

export function withAfterCreateOrUpdate<TI extends DocDerivedData>(
	oldData: TI,
	name: string,
	trigger: Trigger,
): TI {
	const newData = { ...oldData, afters: [...oldData.afters] }
	createAfterCreateOrUpdateTrigger(newData, name, trigger)
	return newData
}

//

export function createAfterCreateTrigger<TI extends DocDerivedData>(
	mutableMetadata: TI,
	name: string,
	trigger: Trigger,
): void {
	$AssumeType<{ afters: AfterTrigger[] }>(mutableMetadata)

	mutableMetadata.afters.push(function (
		this: Doc | null,
		params: AfterTriggerParams,
	) {
		if (!params.before && params.after) {
			logTrigger(name, 'after', 'CREATE', params)
			fastAssert(this)
			assertNotBefore(params)
			assertAfter(params)
			return Function.prototype.call.call(trigger, this, params) as never
		} else return undefined
	})
}

export function withAfterCreate<TI extends DocDerivedData>(
	oldData: TI,
	name: string,
	trigger: Trigger,
): TI {
	const newData = { ...oldData, afters: [...oldData.afters] }
	createAfterCreateTrigger(newData, name, trigger)
	return newData
}

//

export function createBeforeCommitTrigger<TI extends DocDerivedData>(
	mutableMetadata: TI,
	name: string,
	trigger: Trigger,
): void {
	$AssumeType<{ beforeCommits: unknown[] }>(mutableMetadata)

	mutableMetadata.beforeCommits.push(function (
		this: Doc | null,
		p: TriggerParams.BeforeCommit,
	) {
		const before = this?.dataWithId() || null
		const after = this?.dataWithId() || null
		logTrigger(name, 'before', 'COMMIT', {
			...p,
			before,
			after,
		})
		return Function.prototype.call.call(trigger, this, p) as never
	})
}

export function withBeforeCommit<TI extends DocDerivedData>(
	oldData: TI,
	name: string,
	trigger: Trigger,
): TI {
	const newData = { ...oldData, beforeCommits: [...oldData.beforeCommits] }
	createBeforeCommitTrigger(newData, name, trigger)
	return newData
}

//

export function createOnGetTrigger<TI extends DocDerivedData>(
	mutableMetadata: TI,
	name: string,
	trigger: Trigger,
): void {
	$AssumeType<{ onGets: unknown[] }>(mutableMetadata)

	mutableMetadata.onGets.push(function (this: Doc | null, p: TriggerParams) {
		const before = this?.dataWithId() || null
		const after = this?.dataWithId() || null
		logTrigger(name, 'on', 'GET', {
			...p,
			before,
			after,
		})
		return Function.prototype.call.call(trigger, this, p) as never
	})
}

export function withOnGet<TI extends DocDerivedData>(
	oldData: TI,
	name: string,
	trigger: Trigger,
): TI {
	const newData = { ...oldData, onGets: [...oldData.onGets] }
	createOnGetTrigger(newData, name, trigger)
	return newData
}
