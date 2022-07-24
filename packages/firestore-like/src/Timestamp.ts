// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface Timestamp {
	toDate: () => Date
}

export function isTimestamp(x: unknown): x is Timestamp {
	return Boolean((x as Timestamp).toDate)
}

export interface TypeofTimestamp {
	fromDate: (date: Date) => Timestamp
}
