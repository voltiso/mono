// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import { getNodePositionStr } from '@voltiso/transform.lib'
import * as pc from 'picocolors'
import type * as ts from 'typescript'

export const moduleIcon = '👗'

let initialLogDone = false

function beforeLog() {
	if (initialLogDone) return

	// eslint-disable-next-line no-console
	console.log(moduleIcon, pc.gray('[@voltiso/transform/strip]'))
	initialLogDone = true
}

export function logStrippedNode(ctx: TransformContext, node: ts.Node): void {
	if (ctx.options.silent) return

	beforeLog()
	// eslint-disable-next-line no-console
	console.log(
		moduleIcon,
		'strip',
		pc.blue(node.getText()),
		pc.gray('\n  @'),
		pc.green(getNodePositionStr(node)),
		'\n',
	)
}
