// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type _ApplyUnknownPathTokens<
	Acc extends string,
	Path extends string,
	Tokens,
> = Tokens extends readonly []
	? `${Acc}${Path}`
	: Tokens extends readonly [infer Token, ...infer TokensTail]
		? Token extends string
			? Path extends `{${string}}${infer PathTail}`
				? _ApplyUnknownPathTokens<`${Acc}${Token}`, PathTail, TokensTail>
				: Path extends `**${infer PathTail}`
					? _ApplyUnknownPathTokens<`${Acc}${Token}`, PathTail, TokensTail>
					: Path extends `*${infer PathTail}`
						? _ApplyUnknownPathTokens<`${Acc}${Token}`, PathTail, TokensTail>
						: Path extends `${infer Char}${infer PathTail}`
							? _ApplyUnknownPathTokens<`${Acc}${Char}`, PathTail, Tokens>
							: Acc
			: // : `${Acc}${Path}`
				never
		: never

export type ApplyUnknownPathTokens<
	Path extends string,
	Tokens extends readonly string[],
> = _ApplyUnknownPathTokens<'', Path, Tokens>

//

export function applyUnknownPathTokens<
	Path extends string,
	Tokens extends readonly string[],
>(path: Path, tokens: Tokens): ApplyUnknownPathTokens<Path, Tokens> {
	let currentPath = path as string

	for (const token of tokens) {
		currentPath = currentPath.replace(/\{([^{}]*)\}|\*{1,2}/u, token)
	}

	return currentPath as never
}
