/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../AlsoAccept'
import { _ } from '../flatten'
import {
	HasNumberIndexSignature,
	HasStringIndexSignature,
	HasSymbolIndexSignature,
} from '../HasIndexSignature'
import { OmitSignatures } from './OmitSignatures'

type VOmitPrecise_<O, K> = O extends object
	? _<
			Pick<O, Exclude<keyof OmitSignatures<O>, K>> &
				(HasSymbolIndexSignature<O> extends true
					? symbol extends K
						? unknown
						: {
								[k: symbol]: symbol extends keyof O ? O[symbol] : never
						  }
					: unknown) &
				(HasStringIndexSignature<O> extends true
					? string extends K
						? unknown
						: {
								[k: string]: string extends keyof O ? O[string] : never
						  }
					: unknown) &
				(HasNumberIndexSignature<O> extends true
					? number extends K
						? unknown
						: {
								[k: number]: number extends keyof O ? O[number] : never
						  }
					: unknown)
	  >
	: never

type VOmitSimple_<O, K> = O extends object
	? Pick<O, Exclude<keyof OmitSignatures<O>, K>>
	: never

export type VOmit_<O, K> = string extends keyof O
	? VOmitPrecise_<O, K>
	: number extends keyof O
	? VOmitPrecise_<O, K>
	: symbol extends keyof O
	? VOmitPrecise_<O, K>
	: VOmitSimple_<O, K>

export type VOmit<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = VOmit_<O, K>
