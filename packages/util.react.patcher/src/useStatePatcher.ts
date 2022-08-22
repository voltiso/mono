// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/patcher'
import { patch, patchSet, patchUpdate, replaceIt } from '@voltiso/patcher'
import {
	CALL,
	callableInstance,
	forwardGetOwnPropertyDescriptor,
	forwardOwnKeys,
	hasOwnProperty,
} from '@voltiso/util'
import { useUpdate } from '@voltiso/util.react'
import { useMemo } from 'react'

type State = unknown
type StateObject = Record<string, State>

// //

// type StateProxySet<S extends State> =
// 	| ((newValue: S) => void)
// 	| (S extends StateObject
// 			? {
// 					[key in keyof S]: StateProxySet<S[key]>
// 			  }
// 			: never)

// //

// type Updates<S extends StateObject> = Partial<S>

// type StateProxyMerge<S extends StateObject> =
// 	| ((updates: Updates<S>) => void)
// 	| {
// 			[key in keyof S]: S[key] extends StateObject
// 				? StateProxyMerge<S[key]>
// 				: never
// 	  }

// //

// type DeepUpdates<S extends StateObject> = DeepPartial<S>

// type StateProxyDeepMerge<S extends StateObject> =
// 	| ((deepUpdates: DeepUpdates<S>) => void)
// 	| {
// 			[key in keyof S]: S[key] extends StateObject
// 				? StateProxyDeepMerge<S[key]>
// 				: never
// 	  }

// //

// type HookInterface<S extends StateObject> = {
// 	readonly set: StateProxySet<S>
// 	readonly merge: StateProxyMerge<S>
// 	readonly deepMerge: StateProxyDeepMerge<S>
// }

// type StateProxyCall<S extends StateObject> = {}

// type StateProxy<S extends StateObject> = S & StateProxyCall<S>

class StatePatcher_<S extends StateObject> {
	/** Here we keep a reference to the update() hook, to force-update the React component */
	private readonly _forceUpdate: () => void

	/**
	 * Our raw state is actually here
	 *
	 * - Lifetime: from update to update
	 */
	private _rawState: S

	get raw() {
		return this._rawState
	}

	/** Modifies `initialState`! */
	constructor(initialState: S, forceUpdate: () => void) {
		this._rawState = initialState
		this._forceUpdate = forceUpdate

		this._swapProto()

		// eslint-disable-next-line no-constructor-return
		return callableInstance(this)
	}

	private _swapProto() {
		Object.setPrototypeOf(this._rawState, StatePatcher_.prototype)
		Object.setPrototypeOf(this, this._rawState)
	}

	private _update(newValue: S): void {
		if (newValue !== this._rawState) {
			this._rawState = newValue
			this._swapProto()
			this._forceUpdate()
		}
	}

	/**
	 * Deep merge by default
	 *
	 * - Can use `replaceIt`, `deleteIt` sentinels
	 */
	patch(patchValue: PatchFor<S>): void {
		this._update(patch(this._rawState, patchValue))
	}

	/**
	 * Similar to `.patch()`, but uses shallow merge by default
	 *
	 * - (like React's .update() on class components)
	 */
	update(updateValue: PatchFor<S>): void {
		this._update(patchUpdate(this._rawState, updateValue))
	}

	/** Similar to `.patch()`, but uses `replaceIt` by default */
	set(newValue: S): void {
		this._update(patchSet(this._rawState, newValue))
	}

	/** Same as .update() */
	[CALL](updateValue: PatchFor<S>): void {
		return this.update(updateValue)
	}
}

//

export type StatePatcher<S extends StateObject> = StatePatcher_<S> &
	StatePatcher_<S>[CALL] &
	S
// & {
// 	[key in keyof S]: DeepReadonly<S[key]>
// }

export const StatePatcher = StatePatcher_ as StatePatcherConstructor

export type StatePatcherConstructor = new <S extends StateObject>(
	initialState: S,
	forceUpdate: () => void,
) => StatePatcher<S>

//

export function useStatePatcher<S extends StateObject>(
	initialState: S | (() => S),
): StatePatcher<S> {
	const forceUpdate = useUpdate()

	const statePatcher = useMemo(
		() => {
			const state =
				typeof initialState === 'function' ? initialState() : initialState

			return new StatePatcher(state, forceUpdate)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	)

	const handler: ProxyHandler<StatePatcher<S>> = useMemo(
		() => ({
			set(t, p, v, r) {
				if (hasOwnProperty(t, p)) {
					return Reflect.set(t, p, v, r)
				} else {
					t.patch({ [p]: replaceIt(v) } as never)
					return true
				}
			},

			ownKeys(target) {
				return forwardOwnKeys(statePatcher.raw, target)
				// return Reflect.ownKeys(statePatcher.raw)
			},

			getOwnPropertyDescriptor(target, property) {
				return forwardGetOwnPropertyDescriptor(
					statePatcher.raw,
					target,
					property,
				)
				// return Reflect.getOwnPropertyDescriptor(statePatcher.raw, p)
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	)

	// let's pretend we're immutable
	return useMemo(
		() => new Proxy(statePatcher, handler),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[statePatcher.raw],
	)
}
