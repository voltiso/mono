// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type MergeCss<A, B> = Omit<A, keyof B> & {
	[k in keyof B]: k extends keyof A ? A[k] | B[k] : B[k]
}

export type MergeCss3<A, B, C> = MergeCss<MergeCss<A, B>, C>
