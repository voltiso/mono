// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import { getNodeText } from '@voltiso/transform.lib'
import * as ts from 'typescript'

import { fixNamespaces } from './fixNamespaces'
import { simplifyNode } from './simplifyNode'

export function simplifyAndAddComment(
	ctx: TransformContext,
	originalNode: ts.Node,
): ts.Node {
	let node = simplifyNode(ctx, originalNode)
	if (!node) return originalNode

	const comment = getNodeText(ctx, ts.getOriginalNode(originalNode))

	if (comment) {
		node = ts.addSyntheticLeadingComment(
			node,
			ts.SyntaxKind.MultiLineCommentTrivia,
			` ${comment} `,
		)
	}

	node = fixNamespaces(ctx, node)

	return node
}
