// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant, Bivariant_ } from '@voltiso/util'

import type { Handler } from './Handler'

//

export type GetSignature<H extends Handler> = H['Signature']

export type GetSignature_<H> = 'Signature' extends keyof H
	? H['Signature']
	: never

//

export type GetBivariantSignature<H extends Handler> = Bivariant<H['Signature']>

export type GetBivariantSignature_<H> = 'Signature' extends keyof H
	? Bivariant_<H['Signature']>
	: never

//

export type NestedHandlers = {
	[k: string]: HandlersTree
}
export type HandlersTree = Handler | ((...args: any) => any) | NestedHandlers

//

export type GetSignatures<Hs extends HandlersTree> = GetSignatures_<Hs>

export type GetSignatures_<Hs> = Hs extends Handler
	? GetSignature<Hs>
	: Hs extends (...args: any) => any
		? Hs
		: Hs extends object
			? {
					[k in keyof Hs]: GetSignatures_<Hs[k]>
				}
			: Hs

//

export type GetBivariantSignatures<Hs extends HandlersTree> =
	GetBivariantSignatures_<Hs>

export type GetBivariantSignatures_<Hs> = Hs extends Handler
	? GetBivariantSignature<Hs>
	: Hs extends (...args: any) => any
		? Hs
		: Hs extends object
			? {
					[k in keyof Hs]: GetBivariantSignatures_<Hs[k]>
				}
			: Hs
