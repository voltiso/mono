// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import { $fastAssert, lazyConstructor, lazyObject } from '@voltiso/util'

import type { CustomInstance, CustomInstance$ } from './CustomInstance'
import { InstanceImpl } from './InstanceImpl'

export type Instance<TInstance extends object> = CustomInstance<{
	// constructor: abstract new (...args: any) => TInstance
	Output: TInstance
	Input: TInstance
}>

export type Instance$<TInstance extends object> = CustomInstance$<{
	// constructor: abstract new (...args: any) => TInstance
	Output: TInstance
	Input: TInstance
}>

//

export const Instance$ = lazyConstructor(
	() => InstanceImpl,
) as unknown as Instance$Constructor

//

export type UnknownInstance = <TInstance extends object>(
	// biome-ignore lint/suspicious/noShadowRestrictedNames: .
	constructor: abstract new (...args: any) => TInstance,
) => Instance<TInstance>

export type UnknownInstance$ = <TInstance extends object>(
	// biome-ignore lint/suspicious/noShadowRestrictedNames: .
	constructor: abstract new (...args: any) => TInstance,
) => Instance$<TInstance>

//

export type Instance$Constructor = new <Inst extends object>(
	Constructor: abstract new (...args: any[]) => Inst,
) => Instance$<Inst>

//

export function instance<T extends object>(
	Constructor: abstract new (...args: any) => T,
): Instance$<T> {
	$fastAssert(Constructor)
	return new Instance$(Constructor)
}

export const date = lazyObject(() => instance(Date))
