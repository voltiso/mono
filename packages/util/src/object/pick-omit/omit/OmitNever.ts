// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Pick_ } from '~/object'

export type OmitNever_<O> = [
	[
		Pick_<
			O,
			{
				[k in keyof O]: O extends { readonly [kk in k]?: never } ? never : k
			}[keyof O]
		>,
	][0],
][0]

export type OmitNever<O extends object> = OmitNever_<O>

export type $OmitNever_<O> = O extends any ? OmitNever_<O> : never

export type $OmitNever<O extends object> = $OmitNever_<O>
