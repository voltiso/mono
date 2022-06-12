import { _ } from '../../flatten'
import { OmitSignatures } from '../omit'

export type PickPrecise_<O, K> = _<
	Pick<OmitSignatures<O>, K & keyof OmitSignatures<O>> &
		(string extends keyof O
			? string extends K
				? {
						[k: string]: O[string]
				  }
				: unknown
			: unknown) &
		(number extends keyof O
			? number extends K
				? {
						[k: number]: O[number]
				  }
				: unknown
			: unknown) &
		(symbol extends keyof O
			? symbol extends K
				? {
						[k: symbol]: O[symbol]
				  }
				: unknown
			: unknown)
>

export type PickPrecise<O extends object, K extends keyof O> = PickPrecise_<
	O,
	K
>
