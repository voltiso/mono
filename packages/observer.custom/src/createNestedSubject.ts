// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ObserverDiContext = {
	schema: s.SchemaFunction
}

export function createNestedSubject<S extends Schemable>(this: ObserverDiContext, schema?: S) {
	return {
		hello: 'world'
	}
}
