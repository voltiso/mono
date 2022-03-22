/* eslint-disable @typescript-eslint/ban-types */
export type DeepPartial<T> = T extends Function
	? T
	: T extends object
	? {
			[k in keyof T]?: DeepPartial<T[k]>
	  }
	: T
