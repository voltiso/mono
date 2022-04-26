import { IsLiteralOfType } from '../IsLiteral'

export type IsNumberLiteral<X, T = true, F = false> = IsLiteralOfType<X, number, T, F>
