import type { InferableLiteral } from '~/Inferable'
import type { CustomLiteral } from './CustomLiteral'

export type Literal<T extends InferableLiteral> = CustomLiteral<{
	Output: T
	Input: T
}>

export interface LiteralConstructor {
	new <L extends InferableLiteral>(...literals: L[]): Literal<L>
	new <L extends InferableLiteral>(literals: Set<L>): Literal<L>
	new <L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal<L>
}
