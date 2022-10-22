import { getNodeFullText, TransformContext } from '~/_'
import * as ts from 'typescript'

export function hasNodeInlineComment(
	ctx: TransformContext,
	node: ts.Node,
): boolean {
	const nodeFullText = getNodeFullText(ctx, node)
	if (nodeFullText === undefined) return false

	const commentRanges = ts.getLeadingCommentRanges(nodeFullText, 0) || []
	for (const commentRange of commentRanges) {
		if (commentRange.kind !== ts.SyntaxKind.MultiLineCommentTrivia) continue
		// eslint-disable-next-line unicorn/prefer-set-has
		const comment = nodeFullText.slice(commentRange.pos, commentRange.end)
		// console.log(`COMMENT: "${comment}"`)
		const validInlineComments = ['@inline', '@__INLINE__', '#__INLINE__']
		for (const validInlineComment of validInlineComments)
			if (comment.includes(validInlineComment)) return true
	}
	return false
}
