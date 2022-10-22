// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

import type { TransformContext } from '~/_'
import { getNodeText } from '~/_'

import { simplifyNode } from './simplifyNode'

export function simplifyAndAddComment(
	ctx: TransformContext,
	originalNode: ts.Node,
): ts.Node {
	let node = simplifyNode(ctx, originalNode)
	if (!node) return originalNode

	const comment = getNodeText(ctx, ts.getOriginalNode(originalNode))

	if (comment)
		node = ts.addSyntheticLeadingComment(
			node,
			ts.SyntaxKind.MultiLineCommentTrivia,
			` ${comment} `,
		)
	return node
}
