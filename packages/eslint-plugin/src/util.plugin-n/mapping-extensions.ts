// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const mappingExtensions = (ext: string, mapping: Record<string, string>) => {
	if (mapping[ext]) {
		return mapping[ext]
	}

	return ext
}

mappingExtensions.schema = { type: 'object' }

mappingExtensions.mappingDefault = {
	'.ts': '.js',
	'.tsx': '.js',
}

// eslint-disable-next-line import/no-default-export
export default mappingExtensions
