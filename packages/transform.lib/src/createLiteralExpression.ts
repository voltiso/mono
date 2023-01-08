// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

export type CreateLiteralExpressionOptions = {
	singleQuote: boolean
	multiLine: boolean
}

export const defaultCreateLiteralExpressionOptions = {
	singleQuote: true,
	multiLine: true,
}

export function createLiteralExpression(
	x: unknown,
	partialOptions: Partial<CreateLiteralExpressionOptions>,
): ts.Expression {
	const options = {
		...defaultCreateLiteralExpressionOptions,
		partialOptions,
	} as CreateLiteralExpressionOptions

	if (typeof x === 'string')
		return ts.factory.createStringLiteral(x, options.singleQuote)

	if (typeof x === 'number')
		return ts.factory.createNumericLiteral(
			x,
			/* tokenFlags */ ts.TokenFlags.None,
		)

	if (typeof x === 'bigint') return ts.factory.createBigIntLiteral(x.toString())

	if (x === true) return ts.factory.createTrue()

	if (x === false) return ts.factory.createFalse()

	if (x === null) return ts.factory.createNull()

	if (x === undefined) return ts.factory.createVoidZero()

	if (Array.isArray(x))
		return ts.factory.createArrayLiteralExpression(
			x.map(element => createLiteralExpression(element, options)),
			options.multiLine,
		)

	if (typeof x === 'object') {
		return ts.factory.createObjectLiteralExpression(
			Object.entries(x).map(([key, value]) =>
				ts.factory.createPropertyAssignment(
					key,
					createLiteralExpression(value, options),
				),
			),
			options.multiLine,
		)
	}

	throw new Error(`createLiteralExpression(${x as string}): not implemented`)
}
