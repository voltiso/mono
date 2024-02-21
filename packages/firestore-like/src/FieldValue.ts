// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FieldValue {}

export interface TypeofFieldValue {
	delete: () => FieldValue
	increment: (n: number) => FieldValue

	arrayUnion: (...items: unknown[]) => FieldValue
	arrayRemove: (...items: unknown[]) => FieldValue
}
