// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type FieldValue = {}

export type TypeofFieldValue = {
	delete: () => FieldValue
	increment: (n: number) => FieldValue

	arrayUnion: (...items: unknown[]) => FieldValue
	arrayRemove: (...items: unknown[]) => FieldValue
}
