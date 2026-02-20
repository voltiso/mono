// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * A Universal Recursive Proxy Mock.
 *
 * It can be:
 *
 * 1. An Object (import { anything } from '...')
 * 2. A Function (useRouter())
 * 3. A Component (<Link />)
 * 4. Chained indefinitely (useRouter().push().then()...)
 */
const proxy: any = new Proxy(() => proxy, {
	get(_target, prop) {
		// 1. Handle ES Module interop
		if (prop === '__esModule') return true
		if (prop === 'default') return proxy

		// 2. Handle React Component usage (e.g. <Link />)
		// If React checks for $$typeof, we can pretend to be a specialized object if needed,
		// but usually returning the proxy is enough.

		// 3. Handle Promises (await import(...))
		// We don't want to hang indefinitely if someone awaits this
		if (prop === 'then') return undefined

		// 4. Default: Return the proxy itself for infinite chaining
		return proxy
	},

	// 5. Handle Function Calls (e.g. useRouter(), usePathname())
	apply(_target, _thisArg, _argArray) {
		// If used as a Component: <Link>...
		// The return value of a component must be null, false, or a valid element.
		// Returning the proxy (a function) is technically not valid JSX,
		// but typically Jest/JSDOM won't crash unless you inspect the output deep in the tree.
		// To be safer for React rendering, we could return `null`.

		// HOWEVER, if this is `useRouter()`, it MUST return an object (the proxy).
		// So we return the proxy to satisfy hooks.
		return proxy
	},

	// 6. Handle Constructor Calls (new Image())
	construct() {
		return proxy
	},
})

export default proxy
