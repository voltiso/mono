// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsReactNative } from '~/IsReactNative'
import type { Props } from '~/react-types'
import type { InnerProps } from '~/Stylable/InnerProps'

type StylableIntrinsic<P extends Props> = IsReactNative extends false
	? {
			[k in keyof JSX.IntrinsicElements]: Required<
				JSX.IntrinsicElements[k]
			> extends Omit<P, 'ref'> & Required<InnerProps>
				? k
				: never
	  }[keyof JSX.IntrinsicElements]
	: never

export type { StylableIntrinsic as StylableIntrinsic_ }

//

export type IStylableIntrinsic = IsReactNative extends false
	? {
			[k in keyof JSX.IntrinsicElements]: Required<
				JSX.IntrinsicElements[k]
			> extends Required<InnerProps>
				? k
				: never
	  }[keyof JSX.IntrinsicElements]
	: never
