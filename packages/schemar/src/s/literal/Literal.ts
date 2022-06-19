import { Merge2Simple } from '@voltiso/ts-util/object'
import { InferableLiteral } from '../../schema'
import { CustomLiteral } from './CustomLiteral'
import { Literal_ } from './Literal_'
import { DefaultLiteralOptions } from './_/LiteralOptions'

export type Literal<T extends InferableLiteral> = CustomLiteral<
	Merge2Simple<DefaultLiteralOptions, { values: Set<T>; _out: T; _in: T }>
>

export const Literal = Literal_ as unknown as LiteralConstructor

interface LiteralConstructor {
	new <L extends InferableLiteral>(...literals: L[]): Literal<L>
	new <L extends InferableLiteral>(literals: Set<L>): Literal<L>
	new <L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal<L>
}
