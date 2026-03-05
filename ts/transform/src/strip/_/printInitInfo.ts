// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StripTransformOptions } from '../stripTransform.js'

export function printInitInfo(pluginOptions: StripTransformOptions): void {
	const isEnabled = !process.env['VOLTISO_STRIP_DISABLE']

	if (isEnabled) {
		if (pluginOptions.symbols?.length)
			console.log(
				`[@voltiso/transform/strip] stripping tokens: ${pluginOptions.symbols.join(
					', ',
				)}`,
			)

		if (pluginOptions.modules?.length)
			console.log(
				`[@voltiso/transform/strip] stripping module imports: ${pluginOptions.modules.join(
					', ',
				)}`,
			)
	} /* isEnabled === false */ else {
		if (pluginOptions.symbols?.length)
			console.warn(
				'[@voltiso/transform/strip] TOKENS WILL NOT BE STRIPPED! (VOLTISO_STRIP_DISABLE env variable is set)',
			)
	}
}
