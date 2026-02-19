// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Extend using modula augmentation / declaration merging
 *
 * @example
 *
 * ```ts
 * declare module '@voltiso/transactor' {
 * 	export interface TransactorConfig {
 * 		disableBranding: true
 * 	}
 * }
 * ```
 *
 * Available options:
 *
 * - `disableBranding: true` - disables nominal type branding for document IDs and
 *   some other strings
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TransactorConfig {
	// disableBranding: true
}
