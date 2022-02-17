import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { Flatten } from './flatten/Flatten'

export type PartialFromUndefined<T> = Flatten<
	{
		[key in keyof T as undefined extends T[key] ? never : key]: T[key]
	} & {
		[key in keyof T as undefined extends T[key] ? key : never]?: Exclude<T[key], undefined>
	}
>

Assert<
	IsIdentical<
		PartialFromUndefined<{
			a: number
			b: string | undefined
			c?: string
			d?: string | undefined
		}>,
		{ a: number; b?: string; c?: string; d?: string }
	>
>()

Assert<
	IsIdentical<
		PartialFromUndefined<{
			a: undefined
		}>,
		{ a?: never }
	>
>()
