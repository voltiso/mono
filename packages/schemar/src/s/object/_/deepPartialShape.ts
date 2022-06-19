import { getEntries } from '@voltiso/ts-util/object'
import { InferableObject, ISchema } from '../../../schema'
import { IObject, isObject } from '../IObject'
import { GetSchema_ } from '../../unknownSchema/_/getSchema'
import * as s from '../..'

type ProcessEntry<S extends ISchema> = S extends IObject
	? S['deepPartial']['optional']
	: S['optional']

export type DeepPartialShape<O extends InferableObject> = {
	[k in keyof O]: ProcessEntry<GetSchema_<O[k]>>
}

export function deepPartialShape<O extends InferableObject>(
	o: O
): DeepPartialShape<O> {
	const shape = { ...o } as InferableObject
	for (const [key, schemable] of getEntries(shape)) {
		let schema = s.schema(schemable)
		if (isObject(schema)) schema = schema.deepPartial
		shape[key] = schema.optional
	}
	return shape as never
}
