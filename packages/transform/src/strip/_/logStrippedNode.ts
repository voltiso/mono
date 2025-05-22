// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import { getNodePositionStr } from '@voltiso/transform.lib'
import chalk from 'chalk'
import type * as ts from 'typescript'

export const moduleIcon = '👗'

let initialLogDone = false

function beforeLog() {
	if (initialLogDone) return

	// eslint-disable-next-line no-console
	console.log(moduleIcon, chalk.gray('[@voltiso/transform/strip]'))
	initialLogDone = true
}

export function logStrippedNode(ctx: TransformContext, node: ts.Node): void {
	if (ctx.options.silent) return

	beforeLog()
	// eslint-disable-next-line no-console
	console.log(
		moduleIcon,
		'strip',
		chalk.blue(node.getText()),
		chalk.gray('\n  @'),
		chalk.green(getNodePositionStr(node)),
		'\n',
	)
}
