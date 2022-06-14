/* eslint-disable @typescript-eslint/ban-types */
export type DeepReadonly<T> = T extends Function
	? T
	: T extends object
	? {
			readonly [k in keyof T]: DeepReadonly<T[k]>
	  }
	: T
