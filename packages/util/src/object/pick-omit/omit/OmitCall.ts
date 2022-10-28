// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Omit call and construct signatures */
export type OmitCall_<T> = {
	[K in keyof T]: T[K]
}

export type OmitCall<T extends object> = OmitCall_<T>

/** Omit call and construct signatures */
export type $OmitCall_<T> = T extends any ? OmitCall_<T> : never

export type $OmitCall<T extends object> = $OmitCall_<T>
