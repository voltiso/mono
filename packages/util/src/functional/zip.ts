// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

export type GetZipTypeImpl<
	TArrays,
	Acc extends readonly unknown[],
> = TArrays extends readonly []
	? Acc
	: TArrays extends [readonly (infer HH)[], ...infer T]
		? GetZipTypeImpl<T, [...Acc, HH]>
		: never

export type GetZipType<TArrays extends readonly (readonly unknown[])[]> =
	GetZipTypeImpl<TArrays, []>

//

export type ZipIteratorNext<TArrays extends readonly (readonly unknown[])[]> =
	| IteratorYieldResult<GetZipType<TArrays>>
	| IteratorReturnResult<never>

export class ZipIterator<TArrays extends readonly (readonly unknown[])[]> {
	_arrays: TArrays
	_idx = 0
	_length: number

	constructor(arrays: TArrays) {
		this._arrays = arrays

		let length = 0
		for (const array of arrays) length = Math.max(length, array.length)
		this._length = length
	}

	next(): ZipIteratorNext<TArrays> {
		if (this._idx >= this._length)
			return { done: true, value: undefined as never }

		const value = [] as GetZipType<TArrays>

		for (const array of this._arrays) {
			value.push(array[this._idx] as never)
		}

		this._idx += 1

		return { done: false, value }
	}
}

export function zip<TArrays extends readonly (readonly unknown[])[]>(
	...arrays: TArrays
): Iterable<GetZipType<TArrays>> {
	return {
		[Symbol.iterator]() {
			return new ZipIterator(arrays)
		},
	}
}
