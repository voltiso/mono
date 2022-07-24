// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line n/file-extension-in-import
import * as s from '@voltiso/schemar'

export function getArrayValues<S extends s.IObject>(
	schema: S,
	field: keyof S['getShape'] & string,
): string[] {
	// eslint-disable-next-line security/detect-object-injection
	const value = s.schema(schema.getShape[field])

	if (!s.isLiteral(value)) {
		throw new Error(
			`useForm: getArrayValues: schema field '${field}' is not literal`,
		)
	}

	return [...value.getValues] as string[]
}
