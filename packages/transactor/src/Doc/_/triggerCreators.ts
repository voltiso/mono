// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { undef } from '@voltiso/util'
import chalk from 'chalk'

import type { IDoc } from '~/Doc'
import type { DocDerivedData } from '~/Doc/DocConstructor/_/DocDerivedData'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger'
import type {
	AfterTriggerParams,
	BeforeCommitTriggerParams,
	TriggerParams,
} from '~/Trigger/TriggerParams'
import { dump } from '~/util'

import type { GI } from './GDoc'

function assertBefore<D extends IDoc>(
	x: AfterTriggerParams<D>,
): asserts x is AfterTriggerParams<D, D | null, true, boolean> {
	$assert(x.before)
}

function assertNotBefore<D extends IDoc>(
	x: AfterTriggerParams<D>,
): asserts x is AfterTriggerParams<D, D | null, false, boolean> {
	$assert(!x.before)
}

function assertAfter<D extends IDoc>(
	x: AfterTriggerParams<D>,
): asserts x is AfterTriggerParams<D, D, boolean, true> {
	$assert(x.doc)
	$assert(x.after)
}

function assertNotAfter<D extends IDoc>(
	x: AfterTriggerParams<D>,
): asserts x is AfterTriggerParams<D, null, boolean, false> {
	$assert(!x.doc)
	$assert(!x.after)
}

function logTrigger<TI extends DocDerivedData>(
	name: string,
	when: 'before' | 'after' | 'on',
	event: string,
	p: AfterTriggerParams<GI<TI>>,
) {
	// eslint-disable-next-line no-console
	console.log(
		'\n',
		chalk.inverse(when, event, 'trigger'),
		chalk.blueBright(name),
		'\n',
		p.path.pathString,
		'\n',
		'\n',
		chalk.red(dump(p.before)),
		'\n',
		chalk.green(dump(p.after)),
	)
}

export function withAfter<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>>,
): TI {
	return {
		..._,

		afters: [
			..._.afters,
			function (this: GI<TI> | null, params: AfterTriggerParams<GI<TI>>) {
				logTrigger(name, 'after', 'ANY', params)
				return f.call(this, params) as never
			},
		],
	}
}

export function withAfterUpdate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>, GI<TI>, true, true>,
): TI {
	return {
		..._,

		afters: [
			..._.afters,
			function (this: GI<TI> | null, params: AfterTriggerParams<GI<TI>>) {
				if (params.before && this) {
					logTrigger(name, 'after', 'UPDATE', params)
					assertBefore(params)
					assertAfter(params)
					return f.call(this, params) as never
				} else return undef
			},
		],
	}
}

export function withAfterDelete<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>, null, true, false>,
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
				} else return undef
			},
		],
	}
}

export function withAfterCreateOrUpdate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>, GI<TI>, boolean, true>,
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
				} else return undef
			},
		],
	}
}

export function withAfterCreate<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: AfterTrigger<GI<TI>, GI<TI>, false, true>,
): TI {
	return {
		..._,

		afters: [
			..._.afters,
			function (this: GI<TI> | null, p: AfterTriggerParams<GI<TI>>) {
				if (!p.before && p.after) {
					logTrigger(name, 'after', 'CREATE', p)
					$assert(this)
					assertNotBefore(p)
					assertAfter(p)
					return f.call(this, p) as never
				} else return undef
			},
		],
	}
}

export function withBeforeCommit<TI extends DocDerivedData>(
	_: TI,
	name: string,
	f: BeforeCommitTrigger<GI<TI>>,
): TI {
	return {
		..._,

		beforeCommits: [
			..._.beforeCommits,
			function (this: GI<TI> | null, p: BeforeCommitTriggerParams<GI<TI>>) {
				const before = this?.dataWithId() || null
				const after = this?.dataWithId() || null
				logTrigger(name, 'before', 'COMMIT', {
					...p,
					before: before as never, // :(
					after: after as never, // :(
				})
				return f.call(this, p) as never
			},
		],
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
				})
				return f.call(this, p) as never
			},
		],
	}
}
