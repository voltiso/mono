// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType, assert } from '@voltiso/util'
import chalk from 'chalk'

import type { $$Doc, CustomDoc } from '~/Doc'
import type { DocDerivedData } from '~/Doc/DocConstructor/_/DocDerivedData'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger'
import type {
	AfterTriggerParams,
	BeforeCommitTriggerParams,
	TriggerParams,
} from '~/Trigger/TriggerParams'
import { dump } from '~/util'

import type { GI } from './GDoc'

function assertBefore<D extends $$Doc>(
	x: AfterTriggerParams<D>,
): asserts x is AfterTriggerParams<D, true, boolean> {
	// assumeType<AfterTriggerParams<D>>(x)
	assert(x.before)
}

function assertNotBefore<D extends $$Doc>(
	x: AfterTriggerParams<D>,
): asserts x is AfterTriggerParams<D, false, boolean> {
	// assumeType<AfterTriggerParams<D>>(x)
	assert(!x.before)
}

//

function assertAfter<D extends $$Doc>(
	x: AfterTriggerParams<D>,
): asserts x is AfterTriggerParams<D, boolean, true> {
	// assumeType<AfterTriggerParams<D>>(x)
	assert(x.doc)
	assert(x.after)
}

function assertNotAfter<D extends $$Doc>(
	x: AfterTriggerParams<D>,
): asserts x is AfterTriggerParams<D, boolean, false> {
	// assumeType<AfterTriggerParams<D>>(x)
	assert(!x.doc)
	assert(!x.after)
}

function logTrigger<D extends $$Doc>(
	name: string,
	when: 'before' | 'after' | 'on',
	event: string,
	params: AfterTriggerParams<D>,
): void {
	$AssumeType<AfterTriggerParams<D>>(params)
	if (!params.transactor._options.log) return

	// eslint-disable-next-line no-console
	console.log(
		'\n',
		chalk.inverse(when, event, 'trigger'),
		chalk.blueBright(name),
		'\n',
		params.path.toString(),
		'\n',
		'\n',
		chalk.red(dump(params.before)),
		'\n',
		chalk.green(dump(params.after)),
	)
}

export function withAfter<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>>,
	// f: TI extends any ? GI<TI> extends any ? AfterTrigger<GI<TI>> : never : never,
): TI {
	return {
		..._,

		afters: [
			..._.afters,
			function (this: GI<TI> | null, params: AfterTriggerParams<GI<TI>>) {
				logTrigger(name, 'after', 'ANY', params)
				return f.call(this, params) as never
			} as never,
		] as never,
	}
}

export function withAfterUpdate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>, true, true>,
): TI {
	return {
		..._,

		afters: [
			..._.afters,
			function (
				this: (TI extends any ? GI<TI> : never) | null,
				params: AfterTriggerParams<GI<TI>>,
			) {
				if (params.before && this) {
					logTrigger(name, 'after', 'UPDATE', params)
					assertBefore(params)
					assertAfter(params)
					return f.call(this, params) as never
				} else return undefined
			} as never,
		],
	}
}

export function withAfterDelete<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>, true, false>,
): TI {
	return {
		..._,

		afters: [
			..._.afters,
			function (this: GI<TI> | null, p: AfterTriggerParams<GI<TI>>) {
				if (!this) {
					logTrigger(name, 'after', 'DELETE', p)
					assertBefore(p)
					assertNotAfter(p)
					return f.call(this, p) as never
				} else return undefined
			} as never,
		],
	}
}

export function withAfterCreateOrUpdate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>, boolean, true>,
): TI {
	return {
		..._,

		afters: [
			..._.afters,
			function (this: GI<TI> | null, params: AfterTriggerParams<GI<TI>>) {
				if (this) {
					logTrigger(name, 'after', 'CREATE or UPDATE', params)
					assertAfter(params)
					return f.call(this, params) as never
				} else return undefined
			} as never,
		],
	}
}

export function withAfterCreate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>, false, true>,
): TI {
	return {
		..._,

		afters: [
			..._.afters,
			function (this: GI<TI> | null, p: AfterTriggerParams<GI<TI>>) {
				if (!p.before && p.after) {
					logTrigger(name, 'after', 'CREATE', p)
					assert(this)
					assertNotBefore(p)
					assertAfter(p)
					return f.call(this, p) as never
				} else return undefined
			} as never,
		],
	}
}

export function withBeforeCommit<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: BeforeCommitTrigger<CustomDoc<TI, 'inside'>>,
): TI {
	return {
		..._,

		beforeCommits: [
			..._.beforeCommits,
			function (
				this: CustomDoc<TI, 'inside'> | null,
				p: BeforeCommitTriggerParams<GI<TI>>,
			) {
				const before = this?.dataWithId() || null
				const after = this?.dataWithId() || null
				logTrigger(name, 'before', 'COMMIT', {
					...p,
					before: before as never, // :(
					after: after as never, // :(
				} as never)
				return f.call(this as never, p as never) as never
			} as never,
		] as never,
	}
}

export function withOnGet<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: BeforeCommitTrigger<GI<TI>>,
): TI {
	return {
		..._,

		onGets: [
			..._.onGets,
			function (this: GI<TI> | null, p: TriggerParams<GI<TI>>) {
				const before = this?.dataWithId() || null
				const after = this?.dataWithId() || null
				logTrigger(name, 'on', 'GET', {
					...p,
					before: before as never,
					after: after as never,
				} as never)
				return f.call(this, p as never) as never
			} as never,
		],
	}
}
