// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getNodePositionStr, getNodeText } from '@voltiso/transform.lib'
import chalk from 'chalk'
import type * as ts from 'typescript'

import type { CompatTransformContext } from '../compatTransform'
import type { CompatFeature } from './CompatTransformOptions'

const moduleIcon = '🧩'

let helloPrinted = false

/** @internal */
function _helloOnce() {
	if (helloPrinted) return

	// eslint-disable-next-line no-console
	console.log(moduleIcon, chalk.gray('@voltiso/transform/compat'))
	helloPrinted = true
}

const rightArrow = '➡️ '

// eslint-disable-next-line @typescript-eslint/max-params
export function logCompatTransformNode(
	ctx: CompatTransformContext,
	node: ts.Node,
	newNodeStr: string,
	options: { feature: CompatFeature },
) {
	// eslint-disable-next-line etc/no-internal
	_helloOnce()

	// eslint-disable-next-line no-console
	console.log(
		moduleIcon,
		options.feature,
		chalk.blue(getNodeText(ctx, node)),
		rightArrow,
		chalk.blue(newNodeStr),
		chalk.gray('\n  @'),
		chalk.green(getNodePositionStr(node, ctx.sourceFile)),
		'\n',
	)
}
