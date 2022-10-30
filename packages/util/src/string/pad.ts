// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '~/$strip'

export function padStart(
	str: string | number,
	targetLength: number,
	padWith: string = ' ',
) {
	$assert(padWith.length === 1)
	let current = `${str}`
	while (current.length < targetLength) current = padWith + current
	return current
}

export function padEnd(
	str: string | number,
	targetLength: number,
	padWith: string = ' ',
) {
	$assert(padWith.length === 1)
	let current = `${str}`
	while (current.length < targetLength) current = current + padWith
	return current
}