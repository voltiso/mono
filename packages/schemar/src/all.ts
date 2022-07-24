// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export * from './_/internal'
// export { default } from './__defaultExport.ts__'
export { SchemarError, ValidationError } from './error'
export type { GetInputType, GetOutputType, GetType } from './GetType'
export * from './s'
export type {
	InferableMutableTuple,
	InferableObject,
	InferableReadonlyTuple,
	InferableTuple,
	IRootSchema,
	ISchema,
	MergeOptions,
	RootSchemable,
	Schemable,
} from './schema'
