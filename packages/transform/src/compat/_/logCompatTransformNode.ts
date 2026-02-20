// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getNodePositionStr, getNodeText } from '@voltiso/transform.lib'
import * as pc from 'picocolors'
import type * as ts from 'typescript'

import type { CompatTransformContext } from '../compatTransform.js'
import type { CompatFeature } from './CompatTransformOptions.js'

const moduleIcon = '🧩'

let helloPrinted = false

/** @internal */
function _helloOnce() {
	if (helloPrinted) return

	console.log(moduleIcon, pc.gray('@voltiso/transform/compat'))
	helloPrinted = true
}

const rightArrow = '➡️ '

export function logCompatTransformNode(
	ctx: CompatTransformContext,
	node: ts.Node,
	newNodeStr: string,
	options: { feature: CompatFeature },
): void {
	if (ctx.options.silent) return

	_helloOnce()

	console.log(
		moduleIcon,
		options.feature,
		pc.blue(getNodeText(ctx, node)),
		rightArrow,
		pc.blue(newNodeStr),
		pc.gray('\n  @'),
		pc.green(getNodePositionStr(node, ctx.sourceFile)),
		'\n',
	)
}
