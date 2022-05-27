import { IsLiteralOfType } from '../../IsLiteral'

export type IsStringLiteral<X, T = true, F = false> = IsLiteralOfType<X, string, T, F>
