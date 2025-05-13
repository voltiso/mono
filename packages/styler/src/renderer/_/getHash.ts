// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-plusplus */
/* eslint-disable unicorn/prefer-code-point */
/* eslint-disable no-bitwise */

export function getHash32(str: string): number {
	let hash = 5_381

	let i = str.length

	while (i) {
		// eslint-disable-next-line sonarjs/no-nested-incdec
		hash = (hash * 33) ^ str.charCodeAt(--i)
	}

	/* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
	 * integers. Since we want the results to be always positive, convert the
	 * signed int to an unsigned by doing an unsigned bit-shift. */
	return hash >>> 0
}

export function base64UrlFromUInt32Be(num: number): string {
	return (
		btoa(
			String.fromCharCode(
				(num >> 24) & 0xff,
				(num >> 16) & 0xff,
				(num >> 8) & 0xff,
				num & 0xff,
			),
		)
			.replace(/\+/gu, '-')
			.replace(/\//gu, '_')
			// eslint-disable-next-line sonarjs/single-char-in-character-classes
			.replace(/[=]/gu, '')
	)

	// console.log('base64UrlFromUInt32Be', { num: num / 1e9 })

	// const buffer = Buffer.alloc(4) // Buffer is node-only
	// buffer.writeUInt32BE(num)
	// return buffer.toString('base64url')
}

export function getHash32Str(str: string): string {
	const hash = getHash32(str)
	return base64UrlFromUInt32Be(hash)
}

export function getHash(str: string): string {
	const hash = getHash32Str(str)
	const result = hash.charCodeAt(0) <= 57 ? `_${hash}` : hash
	// console.log('getHash', { str, hash, result })
	return result
}

// ! old server-only version below
// no longer used - we now always hash to make it work with SSR and React 18 parallel rendering - can't determine the order with Suspenses used

// /**
//  * Generate hash to use with CSS classNames and html ids
//  *
//  * ⚠️ Server-only
//  */
// export function getHash(styleStr: string): string {
// 	/**
// 	 * `eval('require')` is the only thing that works with NextJS/webpack to
// 	 * ignore the import when bundling
// 	 */
// 	const crypto =
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, no-eval
// 		eval('require')(
// 			/* webpackIgnore: true*/ 'node:crypto',
// 			// eslint-disable-next-line @typescript-eslint/consistent-type-imports
// 		) as typeof import('crypto')

// 	const digest = crypto.createHash('sha1').update(styleStr).digest('base64url')
// 	// eslint-disable-next-line regexp/prefer-regexp-exec, @typescript-eslint/no-non-null-assertion
// 	return digest.match(/[^\d-].{5}/u)![0]!
// }
