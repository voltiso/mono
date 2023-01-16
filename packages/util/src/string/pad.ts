// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '_'

export function padStart(
	str: string | number,
	targetLength: number,
	padWith = ' ',
) {
	$assert(padWith.length === 1)
	let current = `${str}`
	while (current.length < targetLength) current = padWith + current
	return current
}

export function padEnd(
	str: string | number,
	targetLength: number,
	padWith = ' ',
) {
	$assert(padWith.length === 1)
	let current = `${str}`
	while (current.length < targetLength) current += padWith
	return current
}
