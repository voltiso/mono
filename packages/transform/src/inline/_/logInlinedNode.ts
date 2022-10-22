// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import chalk from 'chalk'
import type * as ts from 'typescript'

import type { TransformContext } from '~/_'
import { getNodePositionStr, getNodeText } from '~/_'

const moduleIcon = '🤗'

let helloPrinted = false

/** @internal */
function _helloOnce() {
	if (helloPrinted) return

	// eslint-disable-next-line no-console
	console.log(moduleIcon, chalk.gray('@voltiso/transform/inline'))
	helloPrinted = true
}

export function logInlinedNode(
	ctx: TransformContext,
	node: ts.Node,
	options: { type: 'expression' | 'alias' },
) {
	// eslint-disable-next-line etc/no-internal
	_helloOnce()

	// eslint-disable-next-line no-console
	console.log(
		moduleIcon,
		'inline type',
		options.type,
		chalk.blue(getNodeText(ctx, node)),
		chalk.gray('\n  @'),
		chalk.green(getNodePositionStr(node)),
		'\n',
	)
}
