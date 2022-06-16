import { Flatten } from '../flatten'

export type OptionalFromUndefined<T> = Flatten<
	{
		[key in keyof T as undefined extends T[key] ? never : key]: T[key]
	} & {
		[key in keyof T as undefined extends T[key] ? key : never]?: Exclude<
			T[key],
			undefined
		>
	}
>
