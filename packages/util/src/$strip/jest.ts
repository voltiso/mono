// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @strip Use `@voltiso/transform/strip` to strip from production code */
export const $expect: jest.Expect =
	// eslint-disable-next-line unicorn/no-negated-condition
	typeof expect !== 'undefined' ? expect : (undefined as never)

/** @strip Use `@voltiso/transform/strip` to strip from production code */
export const $describe: jest.Describe =
	// eslint-disable-next-line unicorn/no-negated-condition
	typeof describe !== 'undefined' ? describe : (undefined as never)

/** @strip Use `@voltiso/transform/strip` to strip from production code */
export const $it: jest.It =
	// eslint-disable-next-line unicorn/no-negated-condition
	typeof it !== 'undefined' ? it : (undefined as never)

/**
 * @deprecated Use `$it` instead
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $test: jest.It =
	// eslint-disable-next-line unicorn/no-negated-condition
	typeof test !== 'undefined' ? test : (undefined as never)
