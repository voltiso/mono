// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createPatch, fastAssert } from '@voltiso/util'
import chalk from 'chalk'

import type { Doc } from '~/Doc'
import type { DocDerivedData } from '~/DocConstructor'
import type { AfterTriggerParams, Trigger, TriggerParams } from '~/Trigger'
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

	// eslint-disable-next-line no-console
	console.log(
		chalk.gray(params.path.toString()),
		chalk.inverse(when, event),
		chalk.blueBright(name),
		'\n',
		chalk.green(dump(createPatch(params.before, params.after))),
		'\n',
	)
}

//

export function withAfter<TI extends DocDerivedData>(
	_: TI,
	name: string,
	trigger: Trigger,
	// f: TI extends any ? GI<TI> extends any ? AfterTrigger<GI<TI>> : never : never,
): TI {
	// $AssumeType<AfterTrigger<GI<TI>>>(trigger)
	return {
		..._,

		afters: [
			..._.afters,
			function (this: Doc | null, params: AfterTriggerParams) {
				logTrigger(name, 'after', 'ANY', params)
				return Function.prototype.call.call(trigger, this, params) as never
			},
		],
	}
}

//

export function withAfterUpdate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	trigger: Trigger,
): TI {
	// $AssumeType<AfterTrigger<GI<TI>, true, true>>(trigger)
	return {
		..._,

		afters: [
			..._.afters,
			function (this: Doc | null, params: AfterTriggerParams) {
				if (params.before && this) {
					logTrigger(name, 'after', 'UPDATE', params)
					assertBefore(params)
					assertAfter(params)
					return Function.prototype.call.call(trigger, this, params) as never
				} else return undefined
			},
		],
	}
}

export function withAfterDelete<TI extends DocDerivedData>(
	_: TI,
	name: string,
	trigger: Trigger,
): TI {
	// $AssumeType<AfterTrigger<GI<TI>, true, false>>(trigger)
	return {
		..._,

		afters: [
			..._.afters,
			function (this: Doc | null, params: AfterTriggerParams) {
				// eslint-disable-next-line unicorn/no-negated-condition
				if (!this) {
					logTrigger(name, 'after', 'DELETE', params)
					assertBefore(params)
					assertNotAfter(params)
					return Function.prototype.call.call(trigger, this, params) as never
				} else return undefined
			},
		],
	}
}

export function withAfterCreateOrUpdate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	trigger: Trigger,
): TI {
	// $AssumeType<AfterTrigger<GI<TI>, boolean, true>>(trigger)
	return {
		..._,

		afters: [
			..._.afters,
			function (this: Doc | null, params: AfterTriggerParams) {
				if (this) {
					logTrigger(name, 'after', 'CREATE or UPDATE', params)
					assertAfter(params)
					return Function.prototype.call.call(trigger, this, params) as never
				} else return undefined
			},
		],
	}
}

export function withAfterCreate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	trigger: Trigger,
): TI {
	// $AssumeType<AfterTrigger<GI<TI>, false, true>>(trigger)
	return {
		..._,

		afters: [
			..._.afters,
			function (this: Doc | null, params: AfterTriggerParams) {
				if (!params.before && params.after) {
					logTrigger(name, 'after', 'CREATE', params)
					fastAssert(this)
					assertNotBefore(params)
					assertAfter(params)
					return Function.prototype.call.call(trigger, this, params) as never
				} else return undefined
			},
		],
	}
}

export function withBeforeCommit<TI extends DocDerivedData>(
	_: TI,
	name: string,
	trigger: Trigger,
): TI {
	// $AssumeType<Trigger.BeforeCommit<CustomDoc<TI, 'inside'>>>(trigger)
	return {
		..._,

		beforeCommits: [
			..._.beforeCommits,
			function (this: Doc | null, p: TriggerParams.BeforeCommit) {
				const before = this?.dataWithId() || null
				const after = this?.dataWithId() || null
				logTrigger(name, 'before', 'COMMIT', {
					...p,
					before,
					after,
				})
				return Function.prototype.call.call(trigger, this, p) as never
			},
		],
	}
}

export function withOnGet<TI extends DocDerivedData>(
	_: TI,
	name: string,
	trigger: Trigger,
): TI {
	// $AssumeType<Trigger.BeforeCommit<GI<TI>>>(trigger)
	return {
		..._,

		onGets: [
			..._.onGets,
			function (this: Doc | null, p: TriggerParams) {
				const before = this?.dataWithId() || null
				const after = this?.dataWithId() || null
				logTrigger(name, 'on', 'GET', {
					...p,
					before,
					after,
				})
				return Function.prototype.call.call(trigger, this, p) as never
			},
		],
	}
}
