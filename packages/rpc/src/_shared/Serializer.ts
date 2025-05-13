// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface Serializer<Representation = unknown> {
	/** Custom serialization function. */
	serialize(value: unknown): Representation

	/** Custom deserialization function */
	deserialize(representation: Representation): unknown
}
