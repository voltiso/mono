// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '../../../type'
import type { _ } from '../../flatten'
import type {
	HasNumberIndexSignature,
	HasStringIndexSignature,
	HasSymbolIndexSignature,
} from '../../index-signature'
import type { Pick_ } from '../pick'
import type { OmitSignatures } from './OmitSignatures.js'

export type OmitPrecise_<O, K> = O extends object
	? _<
			Pick_<O, Exclude<keyof OmitSignatures<O>, K>> &
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

export type OmitPrecise<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
> = OmitPrecise_<O, K>
