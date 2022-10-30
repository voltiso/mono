// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface IncrementIt<By extends number | bigint = number | bigint> {
	__incrementIt: By
}

export function incrementIt<Amount extends number | bigint>(
	incrementBy: Amount,
): IncrementIt<Amount> {
	return {
		__incrementIt: incrementBy,
	}
}

export function isIncrementIt(x: any): x is IncrementIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__incrementIt')
}
