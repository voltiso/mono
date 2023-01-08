// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StripTransformContext } from '../stripTransform'

export function shouldStripModule(
	ctx: StripTransformContext,
	moduleToStrip: string,
): boolean {
	for (const moduleName of ctx.options.modules || [])
		if (moduleToStrip.startsWith(moduleName)) return true

	return false
}
