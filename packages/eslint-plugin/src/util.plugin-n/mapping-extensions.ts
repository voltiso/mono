// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

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

export default mappingExtensions
