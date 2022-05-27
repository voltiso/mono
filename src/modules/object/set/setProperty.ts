import { assertNotPolluting } from '../isPolluting'
import { UnknownProperty } from '../UnknownProperty'
import { Value } from '../value'

type AllowedValue<
	Obj extends object,
	K extends keyof Obj | UnknownProperty
> = K extends keyof Obj ? Value<Obj, K> : unknown

export function setProperty<
	Obj extends object,
	K extends keyof Obj | UnknownProperty,
	V extends AllowedValue<Obj, K>
>(obj: Obj, property: K, value: V) {
	assertNotPolluting(obj, property)
	obj[property as keyof Obj] = value as never
}
