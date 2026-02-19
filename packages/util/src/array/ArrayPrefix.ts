// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @internal */
export type _ArrayPrefixRec<T extends unknown[], acc extends unknown[]> = [
	| acc
	| (T extends []
			? never
			: T extends [infer H, ...infer Ts]
				? _ArrayPrefixRec<Ts, [...acc, H]>
				: // : T extends MultiHead<infer H, infer Ts>
					// ? { inferred: [H, Ts] } // _ArrayPrefixRec<Ts, [...acc, ...H[]]>
					never),
][0]

export type ArrayPrefix<T extends unknown[]> = _ArrayPrefixRec<T, []>
