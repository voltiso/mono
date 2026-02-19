// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as jestGlobals from '@jest/globals'

/**
 * @internal This is not tested, just an idea
 *
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $expect: typeof jestGlobals.expect = jestGlobals.expect

/**
 * @internal This is not tested, just an idea
 *
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $describe: typeof jestGlobals.describe = jestGlobals.describe

/**
 * @internal This is not tested, just an idea
 *
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $it: typeof jestGlobals.it = jestGlobals.it

/**
 * @deprecated Use `$it` instead
 * @internal This is not tested, just an idea
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $test: typeof jestGlobals.test = jestGlobals.test
