/* eslint-disable no-undefined */
import { checkPrototypePollution } from '../../../isConstructorOrProto'
import { Get } from '../GetProperty'

export function getProperty_<O extends object, K extends keyof O>(o: O, k: K): Get<O, K>
export function getProperty_(o: undefined, k: unknown): undefined

export function getProperty_<O extends object, K extends keyof O>(o: O | undefined, k: K): Get<O, K> | undefined

export function getProperty_<O extends object, K extends keyof O>(o: O | undefined, k: K): Get<O, K> | undefined {
	if (!o) return undefined

	checkPrototypePollution(o, k)
	return o[k] as never
}
