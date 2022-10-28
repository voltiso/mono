// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @strip Use `@voltiso/transform/strip` to strip from production code */
export const $expect: jest.Expect =
	typeof expect !== 'undefined' ? expect : (undefined as never)

/** @strip Use `@voltiso/transform/strip` to strip from production code */
export const $describe: jest.Describe =
	typeof describe !== 'undefined' ? describe : (undefined as never)

/** @strip Use `@voltiso/transform/strip` to strip from production code */
export const $it: jest.It =
	typeof it !== 'undefined' ? it : (undefined as never)

/**
 * @deprecated Use `$it` instead
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $test: jest.It =
	typeof test !== 'undefined' ? test : (undefined as never)
