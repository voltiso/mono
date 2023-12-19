// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StripTransformOptions } from '../stripTransform'

export function printInitInfo(pluginOptions: StripTransformOptions) {
	// eslint-disable-next-line n/no-process-env, turbo/no-undeclared-env-vars
	const isEnabled = !process.env['VOLTISO_STRIP_DISABLE']

	if (isEnabled) {
		if (pluginOptions.symbols?.length)
			// eslint-disable-next-line no-console
			console.log(
				`[@voltiso/transform/strip] stripping tokens: ${pluginOptions.symbols.join(
					', ',
				)}`,
			)

		if (pluginOptions.modules?.length)
			// eslint-disable-next-line no-console
			console.log(
				`[@voltiso/transform/strip] stripping module imports: ${pluginOptions.modules.join(
					', ',
				)}`,
			)
	} /* isEnabled === false */ else {
		// eslint-disable-next-line no-lonely-if
		if (pluginOptions.symbols?.length)
			// eslint-disable-next-line no-console
			console.warn(
				'[@voltiso/transform/strip] TOKENS WILL NOT BE STRIPPED! (VOLTISO_STRIP_DISABLE env variable is set)',
			)
	}
}
