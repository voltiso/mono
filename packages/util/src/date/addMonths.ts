// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function addMonths(date: Date, numMonths: number): Date {
	return new Date(new Date(date).setUTCMonth(date.getUTCMonth() + numMonths))
}

export function nextMonth(date: Date): Date {
	return addMonths(date, 1)
}

export function prevMonth(date: Date): Date {
	return addMonths(date, -1)
}
