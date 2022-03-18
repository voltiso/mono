import { Flatten } from './flatten/Flatten'

export type PartialFromUndefined<T> = Flatten<
	{
		[key in keyof T as undefined extends T[key] ? never : key]: T[key]
	} & {
		[key in keyof T as undefined extends T[key] ? key : never]?: Exclude<T[key], undefined>
	}
>
