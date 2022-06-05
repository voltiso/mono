/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../AlsoAccept'

export type VOmit_<T, K> = T extends object
	? {
			[k in keyof T as k extends K ? never : k]: T[k]
	  }
	: never

export type VOmit<
	T extends object,
	K extends keyof T | AlsoAccept<keyof any>
> = VOmit_<T, K>
