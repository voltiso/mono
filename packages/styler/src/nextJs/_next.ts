// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export { useServerInsertedHTML } from 'next/navigation'

// // ! `react-native` will complain about `next` package missing
// // import { useServerInsertedHTML } from 'next/navigation'
// const { useServerInsertedHTML } = (() => {
// 	try {
// 		return require('next/navigation') as typeof import('next/navigation')
// 	} catch {
// 		return {
// 			useServerInsertedHTML: () => {},
// 		}
// 	}
// })()

// export { useServerInsertedHTML }
