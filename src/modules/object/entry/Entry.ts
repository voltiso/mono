import { UnknownProperty } from '../UnknownProperty'
import { Value } from '../value'

export type IEntry = [UnknownProperty, unknown]

export type Entry<O extends object> = O extends unknown
	? {
			[k in keyof O]-?: [k, Value<O, k>]
	  }[keyof O]
	: never
