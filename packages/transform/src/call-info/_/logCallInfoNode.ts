// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import { getNodePositionStr, getNodeText } from '@voltiso/transform.lib'
import chalk from 'chalk'
import type ts from 'typescript'

const moduleIcon = '🖨️ '

let helloPrinted = false

/** @internal */
function _helloOnce() {
	if (helloPrinted) return

	// eslint-disable-next-line no-console
	console.log(moduleIcon, chalk.gray('@voltiso/transform/callInfo'))
	helloPrinted = true
}

export function logCallInfoNode(ctx: TransformContext, node: ts.Node): void {
	if (ctx.options.silent) return

	_helloOnce()

	// eslint-disable-next-line no-console
	console.log(
		moduleIcon,
		chalk.blue(getNodeText(ctx, node)),
		chalk.gray('\n  @'),
		chalk.green(getNodePositionStr(node)),
		'\n',
	)
}
