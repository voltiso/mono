// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import { getNodePositionStr, getNodeText } from '@voltiso/transform.lib'
import * as pc from 'picocolors'
import type * as ts from 'typescript'

const moduleIcon = '👁️ '

let helloPrinted = false

/** @internal */
function _helloOnce() {
	if (helloPrinted) return

	console.log(moduleIcon, pc.gray('@voltiso/transform/inline'))
	helloPrinted = true
}

export function logInlinedNode(
	ctx: TransformContext,
	node: ts.Node,
	options: { type: 'alias' | 'expression' },
): void {
	if (ctx.options.silent) return

	_helloOnce()

	console.log(
		moduleIcon,
		'inline type',
		options.type,
		pc.blue(getNodeText(ctx, node)),
		pc.gray('\n  @'),
		pc.green(getNodePositionStr(node)),
		'\n',
	)
}
