// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertDev } from '_'

/**
 * Development-only code block
 *
 * - Runs immediately and synchronously
 *
 * @strip 👗 Use `@voltiso/transform/strip` to strip from production code
 */
export function $dev(body: () => void): void {
	assertDev()
	body()
}
