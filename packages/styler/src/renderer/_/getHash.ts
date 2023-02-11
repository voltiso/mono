// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Generate hash to use with CSS classNames and html ids
 *
 * ⚠️ Server-only
 */
export function getHash(styleStr: string): string {
	/**
	 * `eval('require')` is the only thing that works with NextJS/webpack to
	 * ignore the import when bundling
	 */
	const crypto =
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, no-eval
		eval('require')(
			/* webpackIgnore: true*/ 'node:crypto',
			// eslint-disable-next-line @typescript-eslint/consistent-type-imports
		) as typeof import('crypto')

	const digest = crypto.createHash('sha1').update(styleStr).digest('base64url')
	// eslint-disable-next-line regexp/prefer-regexp-exec, @typescript-eslint/no-non-null-assertion
	return digest.match(/[^\d-].{5}/u)![0]!
}
