// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export { useServerInsertedHTML } from 'next/navigation'

// // ! `react-native` will complain about `next` package missing
// // import { useServerInsertedHTML } from 'next/navigation'
// const { useServerInsertedHTML } = (() => {
// 	try {
// 		// eslint-disable-next-line @typescript-eslint/consistent-type-imports, n/global-require, unicorn/prefer-module, @typescript-eslint/no-require-imports
// 		return require('next/navigation') as typeof import('next/navigation')
// 	} catch {
// 		return {
// 			// eslint-disable-next-line @typescript-eslint/no-empty-function
// 			useServerInsertedHTML: () => {},
// 		}
// 	}
// })()

// export { useServerInsertedHTML }
