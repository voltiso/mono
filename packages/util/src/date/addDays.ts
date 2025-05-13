// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function addDays(date: Date, numDays: number): Date {
	return new Date(new Date(date).setUTCDate(date.getUTCDate() + numDays))
}

export function nextDay(date: Date): Date {
	return addDays(date, 1)
}

export function prevDay(date: Date): Date {
	return addDays(date, -1)
}
